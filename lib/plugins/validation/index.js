"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const plugin_1 = require("@quenk/dagen/lib/plugin");
const future_1 = require("@quenk/noni/lib/control/monad/future");
const check_1 = require("./check");
const imports_1 = require("../../schema/imports");
const validation_1 = require("../../schema/validation");
const imports_2 = require("../../schema/imports");
/**
 * ValidationPlugin adds APIs needed to generator validation APIs
 * in dagen templates.
 */
class ValidationPlugin extends plugin_1.AbstractPlugin {
    constructor() {
        super(...arguments);
        this.schema = {};
        this.key = 'validation';
        this.name = 'validation';
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
        g.env.addGlobal('import2TS', imports_1.toString);
        g.env.addGlobal('getPrec', (s) => s[this.key]);
        return future_1.pure(g);
    }
}
exports.ValidationPlugin = ValidationPlugin;
/**
 * create a new ValidationPlugin instance.
 */
exports.create = (ctx) => new ValidationPlugin(ctx);
//# sourceMappingURL=index.js.map