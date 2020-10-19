"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.create = exports.CheckPlugin = void 0;
const future_1 = require("@quenk/noni/lib/control/monad/future");
const imports_1 = require("../../schema/imports");
const validation_1 = require("../../schema/validation");
const imports_2 = require("../../schema/imports");
const parameters_1 = require("../../schema/parameters");
const validation_2 = require("../validation");
/**
 * CheckPlugin
 */
class CheckPlugin extends validation_2.ValidationPlugin {
    beforeOutput(s) {
        let eImps = validation_1.takeImports(s, this.key);
        if (eImps.isLeft())
            return future_1.raise(eImps.takeLeft());
        s.imports = imports_2.addMemberMap(s.imports || {}, eImps.takeRight());
        s = validation_1.castPointers(s, this.key);
        s = validation_1.castPointers(s, `${this.key}-complete`);
        s = validation_1.castPointers(s, `${this.key}-partial`);
        return future_1.pure(s);
    }
    configureGenerator(g) {
        g.env.addGlobal('imports2TS', imports_1.toString);
        g.env.addGlobal('hasChecks', (s, mode) => {
            if (Array.isArray(s[this.key])) {
                return (s[this.key].length > 0);
            }
            else if (mode === 'partial') {
                let key = `${this.key}-partial`;
                return Array.isArray(s[key]) && (s[key].length > 0);
            }
            else {
                let key = `${this.key}-partial`;
                return Array.isArray(s[key]) && (s[key].length > 0);
            }
        });
        g.env.addGlobal('getChecks', (s, mode) => {
            let ret = [];
            if (Array.isArray(s[this.key]))
                ret = ret.concat(s[this.key]);
            let key = this.key + '-' + (mode === 'partial') ?
                'partial' : 'complete';
            if (Array.isArray(s[key]))
                ret = ret.concat(s[key]);
            return ret;
        });
        g.env.addGlobal('parameters2TS', parameters_1.parameters2TS);
        return future_1.pure(g);
    }
}
exports.CheckPlugin = CheckPlugin;
/**
 * create a new ValidationPlugin instance.
 */
exports.create = (ctx) => new CheckPlugin('checks', 'checks', ctx);
//# sourceMappingURL=index.js.map