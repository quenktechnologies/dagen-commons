/**
 * Additional helper functions for dealing with module pointers embeded in
 * Data Document Schemas.
 */
/** imports */
import { Value } from '@quenk/noni/lib/data/json';
import { Pointer, Import } from '@quenk/noni/lib/platform/node/module/pointer';
import { Schema } from '@quenk/dagen/lib/schema';
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
export declare type Spec = Pointer | [Pointer, Value[]];
/**
 * Imports
 */
export interface Imports {
    [key: string]: Import[];
}
/**
 * takePointers extracts all occurences of a key that is assumed to be a
 * Spec.
 */
export declare const takePointers: (imps: Pointer[], key: string, s: Schema) => Pointer[];
