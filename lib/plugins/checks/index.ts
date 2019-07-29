import { Context } from '@quenk/dagen/lib/compiler';
import { Nunjucks } from '@quenk/dagen/lib/compiler/generator/nunjucks';
import { ValidationPlugin } from '../validation';
import { parameters2TS } from '../../schema/parameters';

/**
 * CheckPlugin
 */
export class CheckPlugin extends ValidationPlugin {

    configureGenerator(g: Nunjucks) {

        g.env.addGlobal('parameters2TS', parameters2TS);

        return super.configureGenerator(g);

    }

}

/**
 * create a new ValidationPlugin instance.
 */
export const create = (ctx: Context) =>
    new CheckPlugin('checks', 'checks', ctx);
