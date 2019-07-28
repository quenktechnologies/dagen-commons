import { Context } from '@quenk/dagen/lib/compiler';
import { ValidationPlugin } from '../validation';
/**
 * CheckPlugin
 */
export declare class CheckPlugin extends ValidationPlugin {
    key: string;
    name: string;
}
/**
 * create a new ValidationPlugin instance.
 */
export declare const create: (ctx: Context) => CheckPlugin;
