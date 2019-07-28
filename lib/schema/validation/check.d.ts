export declare const check: (key: string) => {
    type: string;
    definitions: {
        string: {
            type: string;
        };
        array: {
            type: string;
            items: {
                type: string;
                variants: {
                    string: {
                        type: string;
                    };
                    tuple: {
                        type: string;
                        items: ({
                            type: string;
                            items?: undefined;
                        } | {
                            type: string;
                            items: {
                                type: string;
                            };
                        })[];
                    };
                };
            };
        };
    };
    additionalProperties: {
        type: string;
        properties: {
            [x: string]: {
                type: string;
                variant: {
                    string: {
                        type: string;
                        ref: string;
                    };
                    array: {
                        type: string;
                        ref: string;
                    };
                };
            };
        };
    };
};
