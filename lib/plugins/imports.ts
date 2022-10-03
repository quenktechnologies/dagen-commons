import { AbstractPlugin, } from '@quenk/dagen/lib/plugin';
import { Context } from '@quenk/dagen/lib/compiler';
import { Nunjucks } from '@quenk/dagen/lib/compiler/generator/nunjucks';

import { pure } from '@quenk/noni/lib/control/monad/future';
import { merge } from '@quenk/noni/lib/data/record';

import { toString } from '../schema/imports';

/**
 * ImportsPlugin provides helper functions for outputting imports in a 
 * generated JavaScript file.
 *
 * Currently adds the following global functions:
 *
 * 1. addImports - Adds an [[ImportMap]] to an existing one returning the result.
 * 2. imports2TS - Converts an [[ImportMap]] into a string list of imports.
 */
export class ImportsPlugin extends AbstractPlugin {

    name = 'imports';

    configureGenerator(g: Nunjucks) {

        g.env.addGlobal('addImports', (existing: object, target: object) =>
            merge(existing, target));

        g.env.addGlobal('imports2TS', toString);

        return pure(g);

    }

}

/**
 * create a new ImportsPlugin instance.
 */
export const create = (ctx: Context) =>
    new ImportsPlugin(ctx);
