"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.create = exports.CheckPlugin = void 0;
const future_1 = require("@quenk/noni/lib/control/monad/future");
const validation_1 = require("../../schema/validation");
const imports_1 = require("../../schema/imports");
const parameters_1 = require("../../schema/parameters");
const validators_1 = require("../validators");
/**
 * CheckPlugin
 */
class CheckPlugin extends validators_1.ValidationPlugin {
    beforeOutput(s) {
        let keys = [this.key, `${this.key}-complete`, `${this.key}-partial`];
        for (let key of keys) {
            let eimports = (0, validation_1.takeImports)(s, key);
            if (eimports.isLeft())
                return (0, future_1.raise)(eimports.takeLeft());
            s.imports = (0, imports_1.addMemberMap)(s.imports || {}, eimports.takeRight());
        }
        s = (0, validation_1.castPointers)(s, this.key);
        s = (0, validation_1.castPointers)(s, `${this.key}-complete`);
        s = (0, validation_1.castPointers)(s, `${this.key}-partial`);
        return (0, future_1.pure)(s);
    }
    configureGenerator(g) {
        g.env.addGlobal('hasChecks', (s, mode) => {
            let key = `${this.key}-${mode}`;
            if (Array.isArray(s[key]) && (s[key].length > 0))
                return true;
            return (Array.isArray(s[this.key]) &&
                (s[this.key].length > 0));
        });
        g.env.addGlobal('getChecks', (s, mode) => {
            let ret = [];
            let key = `${this.key}-${mode}`;
            if (Array.isArray(s[this.key]))
                ret = ret.concat(s[this.key]);
            if (Array.isArray(s[key]))
                ret = ret.concat(s[key]);
            return ret;
        });
        g.env.addGlobal('parameters2TS', parameters_1.parameters2TS);
        return (0, future_1.pure)(g);
    }
}
exports.CheckPlugin = CheckPlugin;
/**
 * create a new ValidationPlugin instance.
 */
const create = (ctx) => new CheckPlugin('checks', 'checks', ctx);
exports.create = create;
//# sourceMappingURL=index.js.map