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

        let keys = [this.key, `${this.key}-complete`, `${this.key}-partial`];

        for (let key of keys) {

            let eimports = takeImports(s, key);

            if (eimports.isLeft())
                return <Future<Schema>>raise(eimports.takeLeft());

            s.imports = addMemberMap((<ImportMap>s.imports) || {},
                eimports.takeRight());

        }

        s = castPointers(s, this.key);
        s = castPointers(s, `${this.key}-complete`);
        s = castPointers(s, `${this.key}-partial`);

        return pure(s);

    }

    configureGenerator(g: Nunjucks) {

        g.env.addGlobal('imports2TS', toString);

        g.env.addGlobal('hasChecks', (s: Schema, mode: string) => {

            let key = `${this.key}-${mode}`;

            if (Array.isArray(s[key]) && ((<string[]>s[key]).length > 0))
                return true;

            return (Array.isArray(s[this.key]) &&
                ((<string[]>s[this.key]).length > 0));

        });

        g.env.addGlobal('getChecks', (s: Schema, mode: string) => {

            let ret = <string[]>[];
            let key = `${this.key}-${mode}`;

            if (Array.isArray(s[this.key]))
                ret = ret.concat(<string[]>s[this.key]);

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
