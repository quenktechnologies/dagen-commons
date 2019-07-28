"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * When generating typescript/ecmascript files we often need to represent
 * imports.
 *
 * We use a specific format to do that and this module provides types
 * and functions for consuming it.
 */
/** imports */
const type_1 = require("@quenk/noni/lib/data/type");
const record_1 = require("@quenk/noni/lib/data/record");
const array_1 = require("@quenk/noni/lib/data/array");
/**
 * toString converts an ImportMap into a string of ECMAScript imports.
 */
exports.toString = (imps) => {
    let ret = record_1.reduce(imps, [], (p, c, k) => {
        if (type_1.isString(c)) {
            p.push(`import {${c}} from '${k}'`);
        }
        else if (Array.isArray(c)) {
            p.push(`import { ${c.join(',')} } from '${k}'`);
        }
        else if (type_1.isObject(c)) {
            let aliases = record_1.reduce(c, [], (p, member, alias) => p.concat(`${member} as ${alias}`));
            p.push(`import { ${aliases.join(',')} } from '${k}'`);
        }
        return p;
    }).join(';\n');
    return ret.length > 0 ? `${ret};` : '';
};
/**
 * addMemberMap takes to an ImportMap.
 */
exports.addMemberMap = (imports, imps) => {
    imports = record_1.clone(imports);
    if (type_1.isObject(imports)) {
        record_1.map(imps, (i, k) => {
            if (imports[k] != null) {
                if (type_1.isString(imports[k])) {
                    imports[k] = array_1.dedupe([imports[k], ...i]);
                }
                else if (Array.isArray(imports[k])) {
                    imports[k] = array_1.dedupe([...imports[k], ...i]);
                }
                else if (type_1.isObject(imports[k])) {
                    i.map(e => (imports[k][e] = e));
                }
            }
            else {
                imports[k] = i;
            }
        });
    }
    else {
        return imps;
    }
    return imports;
};
//# sourceMappingURL=imports.js.map