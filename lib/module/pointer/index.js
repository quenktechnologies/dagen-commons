"use strict";
/**
 * Additional helper functions for dealing with module pointers embeded in
 * Data Document Schemas.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.takePointers = void 0;
const schema_1 = require("@quenk/dagen/lib/schema");
const type_1 = require("@quenk/noni/lib/data/type");
const record_1 = require("@quenk/noni/lib/data/record");
/**
 * takePointers extracts all occurences of a key that is assumed to be a
 * Spec.
 */
const takePointers = (imps, key, s) => {
    let target = s[key];
    if ((0, type_1.isString)(target)) {
        imps.push(target);
    }
    else if (Array.isArray(target)) {
        let list = target;
        list.forEach(m => imps.push((0, type_1.isString)(m) ? m : m[0]));
    }
    if ((0, schema_1.isObjectType)(s) && (0, type_1.isObject)(s.properties)) {
        return (0, record_1.reduce)(s.properties, imps, (p, c) => (0, exports.takePointers)(p, key, c));
    }
    else if ((0, schema_1.isArrayType)(s)) {
        return (0, exports.takePointers)(imps, key, s.items);
    }
    else if ((0, schema_1.isSumType)(s)) {
        return (0, record_1.reduce)(s.variants, imps, (p, c) => (0, exports.takePointers)(p, key, c));
    }
    return imps;
};
exports.takePointers = takePointers;
//# sourceMappingURL=index.js.map