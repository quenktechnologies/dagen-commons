"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.check = void 0;
const check = (key) => ({
    type: 'object',
    definitions: {
        string: {
            type: 'string'
        },
        array: {
            type: 'array',
            items: {
                type: 'sum',
                variants: {
                    string: {
                        type: 'string'
                    },
                    tuple: {
                        type: 'tuple',
                        items: [
                            {
                                type: 'string'
                            },
                            {
                                type: 'array',
                                items: {
                                    type: 'any'
                                }
                            }
                        ]
                    }
                }
            }
        }
    },
    properties: {
        properties: {
            type: 'object',
            properties: {
                [key]: {
                    type: 'sum',
                    variant: {
                        string: {
                            type: 'ref',
                            ref: 'string'
                        },
                        array: {
                            type: 'ref',
                            ref: 'array'
                        }
                    }
                }
            }
        }
    }
});
exports.check = check;
//# sourceMappingURL=check.js.map