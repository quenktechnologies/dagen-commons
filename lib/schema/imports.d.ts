import { ModuleMemberMap } from '../module/pointer/member';
/**
 * TypeScript output.
 */
export declare type TypeScript = string;
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
    [key: string]: string | string[] | {
        [key: string]: string;
    };
}
/**
 * toString converts an ImportMap into a string of ECMAScript imports.
 */
export declare const toString: (imps: ImportMap) => string;
/**
 * addMemberMap takes to an ImportMap.
 */
export declare const addMemberMap: (imports: ImportMap, imps: ModuleMemberMap) => ImportMap;
