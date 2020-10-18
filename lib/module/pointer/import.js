"use strict";
/**
 * Additional helper functions for dealing with module pointers embeded in
 * Data Document Schemas.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.fromList = void 0;
/**
 * fromList converts an Import list into a ModuleImportMap
 */
exports.fromList = (imps) => imps.reduce((p, c) => {
    p[c.module] = Array.isArray(p[c.module]) ? p[c.module] : [];
    p[c.module].push(c);
    return p;
}, {});
//# sourceMappingURL=import.js.map