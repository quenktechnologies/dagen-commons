/**
 * Additional helper functions for dealing with module pointers embeded in
 * Data Document Schemas.
 */

/** imports */
import { Value } from '@quenk/noni/lib/data/json';
import { Pointer, Import } from '@quenk/noni/lib/platform/node/module/pointer';
import { Schema, isObjectType, isSumType } from '@quenk/dagen/lib/schema';
import { isObject, isString } from '@quenk/noni/lib/data/type';
import { reduce } from '@quenk/noni/lib/data/record';

/**
 * Spec specifies member of a module to be used that may or may
 * not require function application.
 *
 * If this type is a string then it references a pointer to the member
 * directly.
 *
 * If it is an array, then the first index MUST be a pointer to a function
 * that when the second index (which must be an array of values) is applied,
 * the target member is provided.
 */
export type Spec
    = Pointer
    | [Pointer, Value[]]
    ;

/**
 * Imports
 */
export interface Imports {

    [key: string]: Import[]

}


/**
 * takePointers extracts all occurences of a key that is assumed to be a 
 * Spec.
 */
export const takePointers =
    (imps: Pointer[], key: string, s: Schema): Pointer[] => {

        let target = s[key];

        if (isString(target)) {

            imps.push(target);

        } else if (Array.isArray(target)) {

            let list = <Spec[]>target;

            list.forEach(m => imps.push(isString(m) ? m : m[0]));

        }

        if (isObjectType(s) && isObject(s.properties)) {

            return reduce(s.properties, imps, (p, c) => takePointers(p, key, c));

        } else if (isSumType(s)) {

            return reduce(s.variants, imps, (p, c) => takePointers(p, key, c));

        }

        return imps;

    }
