"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.castPointers = exports.takeImports = void 0;
const either_1 = require("@quenk/noni/lib/data/either");
const pointer_1 = require("@quenk/noni/lib/platform/node/module/pointer");
const type_1 = require("@quenk/noni/lib/data/type");
const record_1 = require("@quenk/noni/lib/data/record");
const array_1 = require("@quenk/noni/lib/data/array");
const schema_1 = require("@quenk/dagen/lib/schema");
const pointer_2 = require("../../module/pointer");
const import_1 = require("../../module/pointer/import");
/**
 * takeImports from the preconditions declared on a Schema at "key"
 * recursively.
 */
const takeImports = (s, key) => {
    let eList = (0, pointer_1.compileList)((0, pointer_2.takePointers)([], key, s));
    if (eList.isLeft())
        return (0, either_1.left)(eList.takeLeft());
    let group = (0, import_1.fromList)(eList.takeRight());
    return (0, either_1.right)((0, record_1.map)(group, g => (0, array_1.dedupe)(g.map(i => i.member))));
};
exports.takeImports = takeImports;
const _getMember = (target) => [(0, type_1.isString)(target) && (0, pointer_1.isPointer)(target) ? (0, pointer_1.getMember)(target) : target];
/**
 * castPointers turns all occurences of pointers to preconditions into
 * their code equivalent.
 *
 * Results are stored as an array.
 */
const castPointers = (s, key) => {
    let target = s[key];
    s = (0, record_1.clone)(s);
    if ((0, type_1.isString)(target)) {
        s[key] = _getMember(target);
    }
    else if (Array.isArray(target)) {
        s[key] = target.map(m => (0, type_1.isString)(m) ?
            _getMember(m) : `${_getMember(m[0])}(${m[1].join(',')})`);
    }
    if ((0, schema_1.isObjectType)(s)) {
        if ((0, type_1.isObject)(s.properties))
            s.properties = (0, record_1.map)(s.properties, c => (0, exports.castPointers)(c, key));
        if ((0, type_1.isObject)(s.additionalProperties))
            s.additionalProperties = (0, exports.castPointers)(s.additionalProperties, key);
    }
    else if ((0, schema_1.isArrayType)(s)) {
        s.items = (0, exports.castPointers)(s.items, key);
    }
    else if ((0, schema_1.isSumType)(s)) {
        s.variants = (0, record_1.map)(s.variants, c => (0, exports.castPointers)(c, key));
    }
    return s;
};
exports.castPointers = castPointers;
//# sourceMappingURL=index.js.map