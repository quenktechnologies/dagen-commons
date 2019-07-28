/**
 * ModuleMemberMap is a map of module paths to members that should be
 * imported form each.
 */
export interface ModuleMemberMap {
    [key: string]: string[];
}
