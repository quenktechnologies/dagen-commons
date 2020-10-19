import { Context } from '@quenk/dagen/lib/compiler';
import { Future, pure, raise } from '@quenk/noni/lib/control/monad/future';
import { Schema } from '@quenk/dagen/lib/schema';
import { Nunjucks } from '@quenk/dagen/lib/compiler/generator/nunjucks';

import { toString } from '../../schema/imports';
import { takeImports, castPointers } from '../../schema/validation';
import { ImportMap, addMemberMap } from '../../schema/imports';
import { parameters2TS } from '../../schema/parameters';
import { ValidationPlugin } from '../validation';

/**
 * CheckPlugin
 */
export class CheckPlugin extends ValidationPlugin {

    beforeOutput(s: Schema) {

        let eImps = takeImports(s, this.key);

        if (eImps.isLeft()) return <Future<Schema>>raise(eImps.takeLeft());

        s.imports = addMemberMap((<ImportMap>s.imports) || {}, eImps.takeRight());

        s = castPointers(s, this.key);
        s = castPointers(s, `${this.key}-complete`);
        s = castPointers(s, `${this.key}-partial`);

        return pure(s);

    }

    configureGenerator(g: Nunjucks) {

        g.env.addGlobal('imports2TS', toString);

        g.env.addGlobal('hasChecks', (s: Schema, mode: string) => {

            if (Array.isArray(s[this.key])) {

                return ((<string[]>s[this.key]).length > 0);

            } else if (mode === 'partial') {

                let key = `${this.key}-partial`;
                return Array.isArray(s[key]) && ((<string[]>s[key]).length > 0);

            } else {

                let key = `${this.key}-partial`;
                return Array.isArray(s[key]) && ((<string[]>s[key]).length > 0);
            }

        });

        g.env.addGlobal('getChecks', (s: Schema, mode:string) => {

            let ret = <string[]>[];

            if (Array.isArray(s[this.key]))
                ret = ret.concat(<string[]>s[this.key]);

            let key = this.key + '-'  + (mode === 'partial') ? 
            'partial' : 'complete';

            if (Array.isArray(s[key]))
                ret = ret.concat(<string[]>s[key]);

            return ret;

        });

        g.env.addGlobal('parameters2TS', parameters2TS);

        return pure(g);

    }

}

/**
 * create a new ValidationPlugin instance.
 */
export const create = (ctx: Context) =>
    new CheckPlugin('checks', 'checks', ctx);
