/**
 * When generating code we sometimes need to specify function parameters in
 * the schema. This module provides an API for that.
 */
/** imports */
/**
 * TypeScript
 */
export declare type TypeScript = string;
/**
 * Name of the parameter.
 */
export declare type Name = string;
/**
 * Type of the parameter.
 */
export declare type Type = string;
/**
 * Parameter specifies the name and type of a parameter to a function.
 */
export interface Parameter {
    /**
     * name of the identifier.
     */
    name: Name;
    /**
     * type of the parameter.
     */
    type: Type;
}
/**
 * parameters2TS converts a parameter list into TypeScript code.
 */
export declare const parameters2TS: (params: Parameter[]) => TypeScript;
