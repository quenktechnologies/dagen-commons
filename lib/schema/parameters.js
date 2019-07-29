"use strict";
/**
 * When generating code we sometimes need to specify function parameters in
 * the schema. This module provides an API for that.
 */
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * parameters2TS converts a parameter list into TypeScript code.
 */
exports.parameters2TS = (params) => params.map(p => `${p.name} : ${p.type}`).join(',');
//# sourceMappingURL=parameters.js.map