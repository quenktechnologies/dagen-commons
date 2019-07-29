import { ModuleMemberMap } from '../module/pointer/member';
/**
 * TypeScript output.
 */
export declare type TypeScript = string;
/**
 * Spec type.
 */
export declare type Spec = string | string[] | AliasMap;
/**
 * ImportMap map.
 *
 * A string value indicates a single import.
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
    [key: string]: Spec;
}
/**
 * AliasMaps map.
 */
export interface AliasMaps {
    [key: string]: AliasMap;
}
/**
 * AliasMap where the key is the identifier and the value is the member
 * imported.
 */
export interface AliasMap {
    [key: string]: string;
}
/**
 * toString converts an ImportMap into a string of ECMAScript imports.
 */
export declare const toString: (imps: ImportMap) => string;
/**
 * addMemberMap to an ImportMap.
 */
export declare const addMemberMap: (imports: ImportMap, imps: ModuleMemberMap) => ImportMap;
/**
 * toAliasMaps converts an ImportMap into a map of AliasMaps.
 *
 * Each property will be the module path and the value the aliased imports.
 */
export declare const toAliasMaps: (imps: ImportMap) => AliasMaps;
/**
 * spec2Map converts an import Spec into an AliasMap.
 */
export declare const spec2Map: (s: Spec) => AliasMap;
