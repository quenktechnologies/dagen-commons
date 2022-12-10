import { assert } from '@quenk/test/lib/assert';
import { castPointers } from '../../src/schema/validation';

import { merge } from '@quenk/noni/lib/data/record';

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
            validator: '@quenk/types#name'

        },

        age: {

            type: 'string',
            validator: '@quenk/types2#age'

        },

        expires: {

            type: 'string',
            validator: '@quenk/types3#date'


        },

        created_by: {

            type: 'string',
            validator: '../types#date'

        },

        location: {

            type: 'string',
            validator: '@quenk/types#coord'

        },

        status: {

            type: 'string',
            validator: '@quenk/types2#status'

        },

        group: {

            type: 'string',
            validator: [
                '@quenk/types#string',
                ['@quenk/types#enum', [1, 2, 3]],
                ['@quenk/types2#string', []]
            ]

        }

    }

})

const flatPointers = () => merge(schema(), {

    properties: {

        name: {

            type: 'string',
            validator: 'name'

        },

        age: {

            type: 'string',
            validator: 'age'

        },

        expires: {

            type: 'string',
            validator: 'date'

        },

        created_by: {

            type: 'string',
            validator: 'date'

        },

        location: {

            type: 'string',
            validator: 'coord'

        },

        status: {

            type: 'string',
            validator: 'status'

        },

        group: {

            type: 'string',
            validator: '_every<Type,Type>(string,enum(1,2,3),string())'

        }

    }

})

describe('validation', () => {

    describe('castPointers', () => {

        it('should convert a single string', () => {

            assert(castPointers(schema(), 'validator'))
                .equate(flatPointers());

        });

    });

});
