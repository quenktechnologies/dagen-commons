"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const validation_1 = require("../validation");
const parameters_1 = require("../../schema/parameters");
/**
 * CheckPlugin
 */
class CheckPlugin extends validation_1.ValidationPlugin {
    constructor() {
        super(...arguments);
        this.key = 'checks';
        this.name = 'checks';
    }
    configureGenerator(g) {
        g.env.addGlobal('parameters2TS', parameters_1.parameters2TS);
        return super.configureGenerator(g);
    }
}
exports.CheckPlugin = CheckPlugin;
/**
 * create a new ValidationPlugin instance.
 */
exports.create = (ctx) => new CheckPlugin(ctx);
//# sourceMappingURL=index.js.map