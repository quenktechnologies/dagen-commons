import { AbstractPlugin, Conf } from '@quenk/dagen/lib/plugin';
import { Context } from '@quenk/dagen/lib/compiler';
import { Future, pure, raise } from '@quenk/noni/lib/control/monad/future';
import { Schema } from '@quenk/dagen/lib/schema';
import { Nunjucks } from '@quenk/dagen/lib/compiler/generator/nunjucks';

import { check } from './check';
import { toString } from '../../schema/imports';
import { takeImports, castPointers } from '../../schema/validation';
import { ImportMap, addMemberMap } from '../../schema/imports';
import { parameters2TS } from '../../schema/parameters';

/**
 * ValidationPlugin adds APIs needed to generator validation APIs
 * in dagen templates.
 */
export class ValidationPlugin extends AbstractPlugin {

    constructor(public name: string, public key: string, public ctx: Context) {

        super(ctx);

    }

    schema: Schema = <Schema>{};

    configure(c: Conf): Future<Conf> {

        if ((c[this.name] != null) && c[this.name]['key'])
            this.key = <string>c[this.name]['key'];

        return pure(c);

    }

    checkSchema(): Future<Schema[]> {

        return pure([check(this.key)]);

    }

    beforeOutput(s: Schema) {

        let eImps = takeImports(s, this.key);

        if (eImps.isLeft()) return <Future<Schema>>raise(eImps.takeLeft());

        s.imports = addMemberMap((<ImportMap>s.imports) || {}, eImps.takeRight());

        return pure(castPointers(s, this.key));

    }

    configureGenerator(g: Nunjucks) {

        g.env.addGlobal('imports2TS', toString);

        g.env.addGlobal('hasTest', (s: Schema) => {

            console.warn('hasTest: is deprecated, use hasValidators instead');
            return (s[this.key] != null)

        });

        g.env.addGlobal('hasValidators', (s: Schema) =>
            Array.isArray(s[this.key]) && ((<string[]>s[this.key]).length > 0));

        g.env.addGlobal('getValidators', (s: Schema) => s[this.key]);

        g.env.addGlobal('parameters2TS', parameters2TS);

        return pure(g);

    }

}

/**
 * create a new ValidationPlugin instance.
 */
export const create = (ctx: Context) =>
    new ValidationPlugin('validation', 'validation', ctx);
