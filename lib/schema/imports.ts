/**
 * When generating typescript/ecmascript files we often need to represent
 * imports.
 *
 * We use a specific format to do that and this module provides types
 * and functions for consuming it.
 */
/** imports */
import { isObject, isString } from '@quenk/noni/lib/data/type';
import { reduce, clone, map } from '@quenk/noni/lib/data/record';
import { dedupe } from '@quenk/noni/lib/data/array';
import { ModuleMemberMap } from '../module/pointer/member';

/**
 * TypeScript output.
 */
export type TypeScript = string;

/**
 * Spec type.
 */
export type Spec = string | string[] | AliasMap;

/**
 * ImportMap map.
 *
 * A string value indicates a an aggregated import.
 * An array of strings value indicates a list of members to import.
 * A record value indicates a list of aliased imports where the property
 * is the target member and the value is the alias.
 *
 * In all cases the key is the module we want to import from.
 *
 * Qualified imports are not directly supported but can be accomplished
 * by abusing aliased imports.
 */
export interface ImportMap {

    [key: string]: Spec

}

/**
 * AliasMaps map.
 */
export interface AliasMaps {

    [key: string]: AliasMap

}

/**
 * AliasMap where the key is the identifier and the value is the member
 * imported.
 */
export interface AliasMap {

    [key: string]: string

}

/**
 * toString converts an ImportMap into a string of ECMAScript imports.
 */
export const toString = (imps: ImportMap): TypeScript => {

    let ret = reduce(imps, <string[]>[], (p, c, k) => {

        if (isString(c)) {

            p.push(`import * as ${c} from '${k}'`);

        } else if (Array.isArray(c)) {

            p.push(`import { ${c.join(',')} } from '${k}'`);

        } else if (isObject(c)) {

            let aliases = reduce(c, <string[]>[], (p, member, alias) =>
                p.concat(`${member} as ${alias}`));

            p.push(`import { ${aliases.join(',')} } from '${k}'`);

        }

        return p;

    }).join(';\n');

    return ret.length > 0 ? `${ret};` : '';

}

/**
 * addMemberMap to an ImportMap. 
 */
export const addMemberMap = (imports: ImportMap, imps: ModuleMemberMap) => {

    imports = clone(imports);

    if (isObject(imports)) {

        map(imps, (i, k) => {

            if (imports[k] != null) {

                if (isString(imports[k])) {

                    imports[k] = dedupe([<string>imports[k], ...i]);

                } else if (Array.isArray(imports[k])) {

                    imports[k] = dedupe([...<string[]>imports[k], ...i]);

                } else if (isObject(imports[k])) {

                    i.map(e => ((<{ [key: string]: string }>imports[k])[e] = e));

                }

            } else {

                imports[k] = i;

            }

        });

    } else {

        return imps;

    }

    return imports;

}

/**
 * toAliasMaps converts an ImportMap into a map of AliasMaps.
 *
 * Each property will be the module path and the value the aliased imports.
 */
export const toAliasMaps = (imps: ImportMap): AliasMaps =>
    map(imps, spec2Map);

/**
 * spec2Map converts an import Spec into an AliasMap.
 */
export const spec2Map = (s: Spec): AliasMap => {

    if (isString(s))
        return ({ [s]: s });

    if (Array.isArray(s))
        return s.reduce((p, c) => { p[c] = c; return p; }, <AliasMap>{});

    return s;

}
