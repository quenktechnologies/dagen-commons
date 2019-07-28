import { Either } from '@quenk/noni/lib/data/either';
import { Schema } from '@quenk/dagen/lib/schema';
import { ModuleMemberMap } from '../../module/pointer/member';
/**
 * takeImports from the preconditions declared on a Schema at "key"
 * recursively.
 */
export declare const takeImports: (s: Schema, key: string) => Either<Error, ModuleMemberMap>;
/**
 * castPointers turns all occurences of pointers to preconditions into
 * their code equivalent.
 */
export declare const castPointers: (s: Schema, key: string) => Schema;
