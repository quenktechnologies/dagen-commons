import { Either, right, left } from '@quenk/noni/lib/data/either';
import {
    compileList,
    getMember
} from '@quenk/noni/lib/platform/node/module/pointer';
import { isObject, isString } from '@quenk/noni/lib/data/type';
import { map, clone } from '@quenk/noni/lib/data/record';
import { dedupe } from '@quenk/noni/lib/data/array';
import {
    Schema,
    isObjectType,
    isSumType,
    isArrayType
} from '@quenk/dagen/lib/schema';

import { takePointers, Spec } from '../../module/pointer';
import { fromList } from '../../module/pointer/import';
import { ModuleMemberMap } from '../../module/pointer/member';

/**
 * takeImports from the preconditions declared on a Schema at "key"
 * recursively.
 */
export const takeImports = (s: Schema, key: string)
    : Either<Error, ModuleMemberMap> => {

    let eList = compileList(takePointers([], key, s));

    if (eList.isLeft()) return left(eList.takeLeft());

    let group = fromList(eList.takeRight());

    return right(map(group, g => dedupe(g.map(i => i.member))));

}

/**
 * castPointers turns all occurences of pointers to preconditions into
 * their code equivalent.
 */
export const castPointers = (s: Schema, key: string): Schema => {

    let target = s[key];

    s = clone(s);

    if (isString(target)) {

        s[key] = getMember(target);

    } else if (Array.isArray(target)) {

        let list = (<Spec[]>target).map(m => isString(m) ?
            getMember(m) : `${getMember(m[0])}(${m[1].join(',')})`);

        s[key] = `_every<Value, Value>(${list.join(',')})`;

    }

    if (isObjectType(s)) {

        if (isObject(s.properties))
            s.properties = map(s.properties, c => castPointers(c, key));

        if (isObject(s.additionalProperties))
            s.additionalProperties = castPointers(s.additionalProperties, key);

    } else if (isArrayType(s)) {

        s.items = castPointers(s.items, key);

    } else if (isSumType(s)) {

        s.variants = map(s.variants, c => castPointers(c, key));

    }

    return s;

}
