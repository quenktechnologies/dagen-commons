import { Context } from '@quenk/dagen/lib/compiler';
import { ValidationPlugin } from '../validation';

/**
 * CheckPlugin
 */
export class CheckPlugin extends ValidationPlugin { }

/**
 * create a new ValidationPlugin instance.
 */
export const create = (ctx: Context) =>
    new CheckPlugin('checks', 'checks', ctx);
