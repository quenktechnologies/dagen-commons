import { assert } from '@quenk/test/lib/assert';
import { Context } from '@quenk/dagen/lib/compiler';
import { FileSystemLoader } from '@quenk/dagen/lib/schema/loader/file-system';
import { create } from '../../src/plugins/validation';
import { merge } from '@quenk/noni/lib/data/record';
import { attempt, toPromise } from '@quenk/noni/lib/control/monad/future';

const ctx = new Context({}, [], [], new FileSystemLoader('/'));

const schema = () => ({

    type: 'object',

    imports: {

        '@quenk/types': 'name',

        '@quenk/types2': ['age'],

        '@quenk/types3': {

            'dob': 'date',

            'created_at': 'date',

            'last_modified': 'date'

        }

    },
    properties: {

        name: {

            type: 'string',
            validation: '@quenk/types#name'

        },

        age: {

            type: 'string',
            validation: '@quenk/types2#age'

        },

        expires: {

            type: 'string',
            validation: '@quenk/types3#date'


        },

        created_by: {

            type: 'string',
            validation: '../types#date'

        },

        location: {

            type: 'string',
            validation: '@quenk/types#coord'

        },

        status: {

            type: 'string',
            validation: '@quenk/types2#status'

        },

        group: {

            type: 'string',
            validation: [
                '@quenk/types#string',
                ['@quenk/types#enum', [1, 2, 3]],
                ['@quenk/types2#string', []]
            ]

        }

    }

})

const expected = () => merge(schema(), {

    "imports": {

        "@quenk/types": ["name", "coord", "string", "enum"],

        "@quenk/types2": ["age", "status", "string"],

        "@quenk/types3": {

            "dob": "date",
            "created_at": "date",
            "last_modified": "date",
            "date": "date"
        },
        "../types": ["date"]
    }

});

describe('plugin', () => {

    describe('ValidationPlugin', () => {

        it('should work', () => {

            let plugin = create(ctx);

            let s = schema();

            return toPromise(
                plugin
                    .beforeOutput(s)
                    .chain(() => attempt(() => assert(s).equate(expected()))));

        });

    });

});
