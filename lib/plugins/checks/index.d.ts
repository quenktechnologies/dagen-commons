import { Context } from '@quenk/dagen/lib/compiler';
import { Nunjucks } from '@quenk/dagen/lib/compiler/generator/nunjucks';
import { ValidationPlugin } from '../validation';
/**
 * CheckPlugin
 */
export declare class CheckPlugin extends ValidationPlugin {
    configureGenerator(g: Nunjucks): import("@quenk/noni/lib/control/monad/future").Future<Nunjucks>;
}
/**
 * create a new ValidationPlugin instance.
 */
export declare const create: (ctx: Context) => CheckPlugin;
