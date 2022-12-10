import { AbstractPlugin, Conf } from '@quenk/dagen/lib/plugin';
import { Context } from '@quenk/dagen/lib/compiler';
import { Future } from '@quenk/noni/lib/control/monad/future';
import { Schema } from '@quenk/dagen/lib/schema';
import { Nunjucks } from '@quenk/dagen/lib/compiler/generator/nunjucks';
/**
 * ValidationPlugin adds APIs needed to generator validation APIs
 * in dagen templates.
 */
export declare class ValidationPlugin extends AbstractPlugin {
    name: string;
    key: string;
    ctx: Context;
    constructor(name: string, key: string, ctx: Context);
    schema: Schema;
    configure(c: Conf): Future<Conf>;
    checkSchema(): Future<Schema[]>;
    beforeOutput(s: Schema): Future<Schema>;
    configureGenerator(g: Nunjucks): Future<Nunjucks>;
}
/**
 * create a new ValidationPlugin instance.
 */
export declare const create: (ctx: Context) => ValidationPlugin;
