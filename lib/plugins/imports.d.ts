import { AbstractPlugin } from '@quenk/dagen/lib/plugin';
import { Context } from '@quenk/dagen/lib/compiler';
import { Nunjucks } from '@quenk/dagen/lib/compiler/generator/nunjucks';
/**
 * ImportsPlugin provides helper functions for outputting imports in a
 * generated JavaScript file.
 *
 * Currently adds the following global functions:
 *
 * 1. addImports - Adds an [[ImportMap]] to an existing one returning the result.
 * 2. imports2TS - Converts an [[ImportMap]] into a string list of imports.
 */
export declare class ImportsPlugin extends AbstractPlugin {
    name: string;
    configureGenerator(g: Nunjucks): import("@quenk/noni/lib/control/monad/future").Future<Nunjucks>;
}
/**
 * create a new ImportsPlugin instance.
 */
export declare const create: (ctx: Context) => ImportsPlugin;
