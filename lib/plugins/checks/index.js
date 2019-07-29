"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const validation_1 = require("../validation");
/**
 * CheckPlugin
 */
class CheckPlugin extends validation_1.ValidationPlugin {
}
exports.CheckPlugin = CheckPlugin;
/**
 * create a new ValidationPlugin instance.
 */
exports.create = (ctx) => new CheckPlugin('checks', 'checks', ctx);
//# sourceMappingURL=index.js.map