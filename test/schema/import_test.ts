import { assert } from '@quenk/test/lib/assert';
import { toString } from '../../src/schema/imports';

const imports = {

    '@quenk/types': 'name',

    '@quenk/types2': ['age'],

    '@quenk/types3': {

        'dob': 'date',

        'created_at': 'date',

        'last_modified': 'date'

    }

}

const expected = `import {name} from '@quenk/types';\nimport { age } from '@quenk/types2';\nimport { date as dob,date as created_at,date as last_modified } from '@quenk/types3';`;

describe('imports', () => {

    describe('toString', () => {

        it('should work', () => {

            assert(toString(imports)).equal(expected);

        });

    });

});
