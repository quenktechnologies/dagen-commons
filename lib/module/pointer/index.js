"use strict";
/**
 * Additional helper functions for dealing with module pointers embeded in
 * Data Document Schemas.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const schema_1 = require("@quenk/dagen/lib/schema");
const type_1 = require("@quenk/noni/lib/data/type");
const record_1 = require("@quenk/noni/lib/data/record");
/**
 * takePointers extracts all occurences of a key that is assumed to be a
 * Spec.
 */
exports.takePointers = (imps, key, s) => {
    let target = s[key];
    if (type_1.isString(target)) {
        imps.push(target);
    }
    else if (Array.isArray(target)) {
        let list = target;
        list.forEach(m => imps.push(type_1.isString(m) ? m : m[0]));
    }
    if (schema_1.isObjectType(s) && type_1.isObject(s.properties)) {
        return record_1.reduce(s.properties, imps, (p, c) => exports.takePointers(p, key, c));
    }
    else if (schema_1.isArrayType(s)) {
        return exports.takePointers(imps, key, s.items);
    }
    else if (schema_1.isSumType(s)) {
        return record_1.reduce(s.variants, imps, (p, c) => exports.takePointers(p, key, c));
    }
    return imps;
};
//# sourceMappingURL=index.js.map