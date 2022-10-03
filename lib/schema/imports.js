"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.spec2Map = exports.toAliasMaps = exports.addMemberMap = exports.toString = void 0;
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
const toString = (imps) => {
    let ret = (0, record_1.reduce)(imps, [], (p, c, k) => {
        if ((0, type_1.isString)(c)) {
            p.push(`import * as ${c} from '${k}'`);
        }
        else if (Array.isArray(c)) {
            p.push(`import { ${c.join(',')} } from '${k}'`);
        }
        else if ((0, type_1.isObject)(c)) {
            let aliases = (0, record_1.reduce)(c, [], (p, member, alias) => p.concat(`${member} as ${alias}`));
            p.push(`import { ${aliases.join(',')} } from '${k}'`);
        }
        return p;
    }).join(';\n');
    return ret.length > 0 ? `${ret};` : '';
};
exports.toString = toString;
/**
 * addMemberMap to an ImportMap.
 */
const addMemberMap = (imports, imps) => {
    imports = (0, record_1.clone)(imports);
    if ((0, type_1.isObject)(imports)) {
        (0, record_1.map)(imps, (i, k) => {
            if (imports[k] != null) {
                if ((0, type_1.isString)(imports[k])) {
                    imports[k] = (0, array_1.dedupe)([imports[k], ...i]);
                }
                else if (Array.isArray(imports[k])) {
                    imports[k] = (0, array_1.dedupe)([...imports[k], ...i]);
                }
                else if ((0, type_1.isObject)(imports[k])) {
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
exports.addMemberMap = addMemberMap;
/**
 * toAliasMaps converts an ImportMap into a map of AliasMaps.
 *
 * Each property will be the module path and the value the aliased imports.
 */
const toAliasMaps = (imps) => (0, record_1.map)(imps, exports.spec2Map);
exports.toAliasMaps = toAliasMaps;
/**
 * spec2Map converts an import Spec into an AliasMap.
 */
const spec2Map = (s) => {
    if ((0, type_1.isString)(s))
        return ({ [s]: s });
    if (Array.isArray(s))
        return s.reduce((p, c) => { p[c] = c; return p; }, {});
    return s;
};
exports.spec2Map = spec2Map;
//# sourceMappingURL=imports.js.map