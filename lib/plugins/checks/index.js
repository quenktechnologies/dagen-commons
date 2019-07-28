"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const validation_1 = require("../validation");
/**
 * CheckPlugin
 */
class CheckPlugin extends validation_1.ValidationPlugin {
    constructor() {
        super(...arguments);
        this.key = 'checks';
        this.name = 'checks';
    }
}
exports.CheckPlugin = CheckPlugin;
/**
 * create a new ValidationPlugin instance.
 */
exports.create = (ctx) => new CheckPlugin(ctx);
//# sourceMappingURL=index.js.map