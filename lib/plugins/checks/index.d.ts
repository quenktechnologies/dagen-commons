import { Context } from '@quenk/dagen/lib/compiler';
import { Future } from '@quenk/noni/lib/control/monad/future';
import { Schema } from '@quenk/dagen/lib/schema';
import { Nunjucks } from '@quenk/dagen/lib/compiler/generator/nunjucks';
import { ValidationPlugin } from '../validators';
/**
 * CheckPlugin
 */
export declare class CheckPlugin extends ValidationPlugin {
    beforeOutput(s: Schema): Future<Schema>;
    configureGenerator(g: Nunjucks): Future<Nunjucks>;
}
/**
 * create a new ValidationPlugin instance.
 */
export declare const create: (ctx: Context) => CheckPlugin;
