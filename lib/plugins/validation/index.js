"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.create = exports.ValidationPlugin = void 0;
const plugin_1 = require("@quenk/dagen/lib/plugin");
const future_1 = require("@quenk/noni/lib/control/monad/future");
const check_1 = require("./check");
const imports_1 = require("../../schema/imports");
const validation_1 = require("../../schema/validation");
const imports_2 = require("../../schema/imports");
const parameters_1 = require("../../schema/parameters");
/**
 * ValidationPlugin adds APIs needed to generator validation APIs
 * in dagen templates.
 */
class ValidationPlugin extends plugin_1.AbstractPlugin {
    constructor(name, key, ctx) {
        super(ctx);
        this.name = name;
        this.key = key;
        this.ctx = ctx;
        this.schema = {};
    }
    configure(c) {
        if ((c[this.name] != null) && c[this.name]['key'])
            this.key = c[this.name]['key'];
        return future_1.pure(c);
    }
    checkSchema() {
        return future_1.pure([check_1.check(this.key)]);
    }
    beforeOutput(s) {
        let eImps = validation_1.takeImports(s, this.key);
        if (eImps.isLeft())
            return future_1.raise(eImps.takeLeft());
        s.imports = imports_2.addMemberMap(s.imports || {}, eImps.takeRight());
        return future_1.pure(validation_1.castPointers(s, this.key));
    }
    configureGenerator(g) {
        g.env.addGlobal('imports2TS', imports_1.toString);
        g.env.addGlobal('hasTest', (s) => {
            console.warn('hasTest: is deprecated, use hasValidators instead');
            return (s[this.key] != null);
        });
        g.env.addGlobal('hasValidators', (s) => Array.isArray(s[this.key]) && (s[this.key].length > 0));
        g.env.addGlobal('getValidators', (s) => s[this.key]);
        g.env.addGlobal('parameters2TS', parameters_1.parameters2TS);
        return future_1.pure(g);
    }
}
exports.ValidationPlugin = ValidationPlugin;
/**
 * create a new ValidationPlugin instance.
 */
exports.create = (ctx) => new ValidationPlugin('validation', 'validators', ctx);
//# sourceMappingURL=index.js.map