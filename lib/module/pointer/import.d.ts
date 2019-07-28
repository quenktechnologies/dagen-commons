/**
 * Additional helper functions for dealing with module pointers embeded in
 * Data Document Schemas.
 */
/** imports */
import { Import } from '@quenk/noni/lib/platform/node/module/pointer';
/**
 * ModuleImportMap is a mapping of module paths to lists of Imports.
 */
export interface ModuleImportMap {
    [key: string]: Import[];
}
/**
 * fromList converts an Import list into a ModuleImportMap
 */
export declare const fromList: (imps: Import[]) => ModuleImportMap;
