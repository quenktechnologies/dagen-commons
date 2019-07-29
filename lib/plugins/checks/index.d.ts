import { Context } from '@quenk/dagen/lib/compiler';
import { ValidationPlugin } from '../validation';
/**
 * CheckPlugin
 */
export declare class CheckPlugin extends ValidationPlugin {
}
/**
 * create a new ValidationPlugin instance.
 */
export declare const create: (ctx: Context) => CheckPlugin;
