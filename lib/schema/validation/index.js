"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const either_1 = require("@quenk/noni/lib/data/either");
const pointer_1 = require("@quenk/noni/lib/platform/node/module/pointer");
const schema_1 = require("@quenk/dagen/lib/schema");
const type_1 = require("@quenk/noni/lib/data/type");
const record_1 = require("@quenk/noni/lib/data/record");
const pointer_2 = require("../../module/pointer");
const import_1 = require("../../module/pointer/import");
const array_1 = require("@quenk/noni/lib/data/array");
/**
 * takeImports from the preconditions declared on a Schema at "key"
 * recursively.
 */
exports.takeImports = (s, key) => {
    let eList = pointer_1.compileList(pointer_2.takePointers([], key, s));
    if (eList.isLeft())
        return either_1.left(eList.takeLeft());
    let group = import_1.fromList(eList.takeRight());
    return either_1.right(record_1.map(group, g => array_1.dedupe(g.map(i => i.member))));
};
/**
 * castPointers turns all occurences of pointers to preconditions into
 * their code equivalent.
 */
exports.castPointers = (s, key) => {
    let target = s[key];
    s = record_1.clone(s);
    if (type_1.isString(target)) {
        s[key] = pointer_1.getMember(target);
    }
    else if (Array.isArray(target)) {
        let list = target.map(m => type_1.isString(m) ?
            pointer_1.getMember(m) : `${pointer_1.getMember(m[0])}(${m[1].join(',')})`);
        s[key] = `_every<Type,Type>(${list.join(',')})`;
    }
    if (schema_1.isObjectType(s) && type_1.isObject(s.properties)) {
        s.properties = record_1.map(s.properties, c => exports.castPointers(c, key));
    }
    else if (schema_1.isSumType(s)) {
        s.variants = record_1.map(s.variants, c => exports.castPointers(c, key));
    }
    return s;
};
//# sourceMappingURL=index.js.map