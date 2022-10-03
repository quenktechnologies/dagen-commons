"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.create = exports.ImportsPlugin = void 0;
const plugin_1 = require("@quenk/dagen/lib/plugin");
const future_1 = require("@quenk/noni/lib/control/monad/future");
const record_1 = require("@quenk/noni/lib/data/record");
const imports_1 = require("../schema/imports");
/**
 * ImportsPlugin provides helper functions for outputting imports in a
 * generated JavaScript file.
 *
 * Currently adds the following global functions:
 *
 * 1. addImports - Adds an [[ImportMap]] to an existing one returning the result.
 * 2. imports2TS - Converts an [[ImportMap]] into a string list of imports.
 */
class ImportsPlugin extends plugin_1.AbstractPlugin {
    constructor() {
        super(...arguments);
        this.name = 'imports';
    }
    configureGenerator(g) {
        g.env.addGlobal('addImports', (existing, target) => (0, record_1.merge)(existing, target));
        g.env.addGlobal('imports2TS', imports_1.toString);
        return (0, future_1.pure)(g);
    }
}
exports.ImportsPlugin = ImportsPlugin;
/**
 * create a new ImportsPlugin instance.
 */
const create = (ctx) => new ImportsPlugin(ctx);
exports.create = create;
//# sourceMappingURL=imports.js.map