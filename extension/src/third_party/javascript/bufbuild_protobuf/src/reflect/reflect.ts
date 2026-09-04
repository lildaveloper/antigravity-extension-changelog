/**
 * @license
 * Copyright 2021-2025 Buf Technologies, Inc
 * SPDX-License-Identifier: Apache-2.0
 */
// Copyright 2021-2025 Buf Technologies, Inc.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
/**
 * @fileoverview added by tsickle
 * Generated from: third_party/javascript/bufbuild_protobuf/src/reflect/reflect.ts
 * @suppress {checkTypes} added by tsickle
 * @suppress {extraRequire} added by tsickle
 * @suppress {missingRequire} added by tsickle
 * @suppress {uselessCode} added by tsickle
 * @suppress {suspiciousCode} added by tsickle
 * @suppress {missingReturn} added by tsickle
 * @suppress {unusedLocalVariables} added by tsickle
 * @suppress {missingOverride} added by tsickle
 * @suppress {const} added by tsickle
 */
goog.module('google3.third_party.javascript.bufbuild_protobuf.src.reflect.reflect');
var module = module || { id: 'third_party/javascript/bufbuild_protobuf/src/reflect/reflect.closure.js' };
goog.require('google3.third_party.javascript.tslib.tslib');
const tsickle_descriptors_1 = goog.requireType("google3.third_party.javascript.bufbuild_protobuf.src.descriptors");
const tsickle_types_2 = goog.requireType("google3.third_party.javascript.bufbuild_protobuf.src.types");
const tsickle_reflect_check_3 = goog.requireType("google3.third_party.javascript.bufbuild_protobuf.src.reflect.reflect$2dcheck");
const tsickle_error_4 = goog.requireType("google3.third_party.javascript.bufbuild_protobuf.src.reflect.error");
const tsickle_reflect_types_5 = goog.requireType("google3.third_party.javascript.bufbuild_protobuf.src.reflect.reflect$2dtypes");
const tsickle_unsafe_6 = goog.requireType("google3.third_party.javascript.bufbuild_protobuf.src.reflect.unsafe");
const tsickle_create_7 = goog.requireType("google3.third_party.javascript.bufbuild_protobuf.src.create");
const tsickle_wrappers_8 = goog.requireType("google3.third_party.javascript.bufbuild_protobuf.src.wkt.wrappers");
const tsickle_scalar_9 = goog.requireType("google3.third_party.javascript.bufbuild_protobuf.src.reflect.scalar");
const tsickle_proto_int64_10 = goog.requireType("google3.third_party.javascript.bufbuild_protobuf.src.proto$2dint64");
const tsickle_guard_11 = goog.requireType("google3.third_party.javascript.bufbuild_protobuf.src.reflect.guard");
const tsickle_struct_pb_12 = goog.requireType("google3.third_party.javascript.bufbuild_protobuf.src.wkt.gen.google.protobuf.struct_pb");
const tsickle_json_value_13 = goog.requireType("google3.third_party.javascript.bufbuild_protobuf.src.json$2dvalue");
const tsickle_binary_encoding_14 = goog.requireType("google3.third_party.javascript.bufbuild_protobuf.src.wire.binary$2dencoding");
const descriptors_js_1 = goog.require('google3.third_party.javascript.bufbuild_protobuf.src.descriptors');
const reflect_check_js_1 = goog.require('google3.third_party.javascript.bufbuild_protobuf.src.reflect.reflect$2dcheck');
const error_js_1 = goog.require('google3.third_party.javascript.bufbuild_protobuf.src.reflect.error');
const unsafe_js_1 = goog.require('google3.third_party.javascript.bufbuild_protobuf.src.reflect.unsafe');
const create_js_1 = goog.require('google3.third_party.javascript.bufbuild_protobuf.src.create');
const wrappers_js_1 = goog.require('google3.third_party.javascript.bufbuild_protobuf.src.wkt.wrappers');
const scalar_js_1 = goog.require('google3.third_party.javascript.bufbuild_protobuf.src.reflect.scalar');
const proto_int64_js_1 = goog.require('google3.third_party.javascript.bufbuild_protobuf.src.proto$2dint64');
const guard_js_1 = goog.require('google3.third_party.javascript.bufbuild_protobuf.src.reflect.guard');
/**
 * Create a ReflectMessage.
 * @template Desc
 * @param {Desc} messageDesc
 * @param {(undefined|?)=} message
 * @param {boolean=} check
 * @return {!tsickle_reflect_types_5.ReflectMessage}
 */
function reflect(messageDesc, message, check = true) {
    return new ReflectMessageImpl(messageDesc, message, check);
}
exports.reflect = reflect;
/** @type {!WeakMap<!tsickle_descriptors_1.DescMessage, !Array<?>>} */
const messageSortedFields = new WeakMap();
/**
 * @implements {tsickle_reflect_types_5.ReflectMessage}
 */
class ReflectMessageImpl {
    /**
     * @public
     * @return {!Array<?>}
     */
    get sortedFields() {
        /** @type {(undefined|!Array<?>)} */
        const cached = messageSortedFields.get(this.desc);
        if (cached) {
            return cached;
        }
        /** @type {!Array<?>} */
        const sortedFields = this.desc.fields
            .concat()
            .sort((/**
         * @param {?} a
         * @param {?} b
         * @return {number}
         */
        (a, b) => a.number - b.number));
        messageSortedFields.set(this.desc, sortedFields);
        return sortedFields;
    }
    /**
     * @public
     * @param {!tsickle_descriptors_1.DescMessage} messageDesc
     * @param {(undefined|*)=} message
     * @param {boolean=} check
     */
    constructor(messageDesc, message, check = true) {
        this.lists = new Map();
        this.maps = new Map();
        this.check = check;
        this.desc = messageDesc;
        this.message = this[unsafe_js_1.unsafeLocal] = message ?? (0, create_js_1.create)(messageDesc);
        this.fields = messageDesc.fields;
        this.oneofs = messageDesc.oneofs;
        this.members = messageDesc.members;
    }
    /**
     * @public
     * @param {number} number
     * @return {(undefined|?)}
     */
    findNumber(number) {
        if (!this._fieldsByNumber) {
            this._fieldsByNumber = new Map(this.desc.fields.map((/**
             * @param {?} f
             * @return {!Array<?>}
             */
            (f) => [f.number, f])));
        }
        return this._fieldsByNumber.get(number);
    }
    /**
     * @public
     * @param {!tsickle_descriptors_1.DescOneof} oneof
     * @return {(undefined|?)}
     */
    oneofCase(oneof) {
        assertOwn(this.message, oneof);
        return (0, unsafe_js_1.unsafeOneofCase)(this.message, oneof);
    }
    /**
     * @public
     * @param {?} field
     * @return {boolean}
     */
    isSet(field) {
        assertOwn(this.message, field);
        return (0, unsafe_js_1.unsafeIsSet)(this.message, field);
    }
    /**
     * @public
     * @param {?} field
     * @return {void}
     */
    clear(field) {
        assertOwn(this.message, field);
        (0, unsafe_js_1.unsafeClear)(this.message, field);
    }
    /**
     * @public
     * @template Field
     * @param {Field} field
     * @return {?}
     */
    get(field) {
        assertOwn(this.message, field);
        /** @type {*} */
        const value = (0, unsafe_js_1.unsafeGet)(this.message, field);
        switch (field.fieldKind) {
            case "list":
                // eslint-disable-next-line no-case-declarations
                /** @type {(undefined|!tsickle_reflect_types_5.ReflectList<*>)} */
                let list = this.lists.get(field);
                if (!list || list[unsafe_js_1.unsafeLocal] !== value) {
                    this.lists.set(field, 
                    // biome-ignore lint/suspicious/noAssignInExpressions: no
                    (list = new ReflectListImpl(field, (/** @type {!Array<*>} */ (value)), this.check)));
                }
                return (/** @type {?} */ (list));
            case "map":
                /** @type {(undefined|!tsickle_reflect_types_5.ReflectMap<*, *>)} */
                let map = this.maps.get(field);
                if (!map || map[unsafe_js_1.unsafeLocal] !== value) {
                    this.maps.set(field, 
                    // biome-ignore lint/suspicious/noAssignInExpressions: no
                    (map = new ReflectMapImpl(field, (/** @type {?} */ (value)), this.check)));
                }
                return (/** @type {?} */ (map));
            case "message":
                return (/** @type {?} */ (messageToReflect(field, value, this.check)));
            case "scalar":
                return (/** @type {?} */ ((value === undefined
                    ? (0, scalar_js_1.scalarZeroValue)(field.scalar, false)
                    : longToReflect(field, value))));
            case "enum":
                return (/** @type {?} */ ((value ??
                    field.enum.values[0].number)));
        }
    }
    /**
     * @public
     * @template Field
     * @param {Field} field
     * @param {*} value
     * @return {void}
     */
    set(field, value) {
        assertOwn(this.message, field);
        if (this.check) {
            /** @type {(undefined|!tsickle_error_4.FieldError)} */
            const err = (0, reflect_check_js_1.checkField)(field, value);
            if (err) {
                throw err;
            }
        }
        /** @type {*} */
        let local;
        if (field.fieldKind == "message") {
            local = messageToLocal(field, value);
        }
        else if ((0, guard_js_1.isReflectMap)(value) || (0, guard_js_1.isReflectList)(value)) {
            local = value[unsafe_js_1.unsafeLocal];
        }
        else {
            local = longToLocal(field, value);
        }
        (0, unsafe_js_1.unsafeSet)(this.message, field, local);
    }
    /**
     * @public
     * @return {(undefined|!Array<{no: number, wireType: !tsickle_binary_encoding_14.WireType, data: !Uint8Array}>)}
     */
    getUnknown() {
        return this.message.$unknown;
    }
    /**
     * @public
     * @param {!Array<{no: number, wireType: !tsickle_binary_encoding_14.WireType, data: !Uint8Array}>} value
     * @return {void}
     */
    setUnknown(value) {
        this.message.$unknown = value;
    }
}
/* istanbul ignore if */
if (false) {
    /**
     * @const {!tsickle_descriptors_1.DescMessage}
     * @public
     */
    ReflectMessageImpl.prototype.desc;
    /**
     * @const {!ReadonlyArray<?>}
     * @public
     */
    ReflectMessageImpl.prototype.fields;
    /**
     * @const {!ReadonlyArray<(?|!tsickle_descriptors_1.DescOneof)>}
     * @public
     */
    ReflectMessageImpl.prototype.members;
    /**
     * @const {*}
     * @public
     */
    ReflectMessageImpl.prototype.message;
    /**
     * @const {!ReadonlyArray<!tsickle_descriptors_1.DescOneof>}
     * @public
     */
    ReflectMessageImpl.prototype.oneofs;
    /* Skipping unnamed member:
    readonly [unsafeLocal]: Message;*/
    /**
     * @const {boolean}
     * @private
     */
    ReflectMessageImpl.prototype.check;
    /**
     * @type {(undefined|!Map<number, ?>)}
     * @private
     */
    ReflectMessageImpl.prototype._fieldsByNumber;
    /**
     * @type {!Map<?, !tsickle_reflect_types_5.ReflectList<*>>}
     * @private
     */
    ReflectMessageImpl.prototype.lists;
    /**
     * @type {!Map<?, !tsickle_reflect_types_5.ReflectMap<*, *>>}
     * @private
     */
    ReflectMessageImpl.prototype.maps;
}
/**
 * @param {*} owner
 * @param {(?|!tsickle_descriptors_1.DescOneof)} member
 * @return {void}
 */
function assertOwn(owner, member) {
    if (member.parent.typeName !== owner.$typeName) {
        throw new error_js_1.FieldError(member, `cannot use ${member.toString()} with message ${owner.$typeName}`, "ForeignFieldError");
    }
}
/**
 * Create a ReflectList.
 * @template V
 * @param {?} field
 * @param {(undefined|!Array<*>)=} unsafeInput
 * @param {boolean=} check
 * @return {!tsickle_reflect_types_5.ReflectList<V>}
 */
function reflectList(field, unsafeInput, check = true) {
    return new ReflectListImpl(field, unsafeInput ?? [], check);
}
exports.reflectList = reflectList;
/**
 * @template V
 * @implements {tsickle_reflect_types_5.ReflectList<V>}
 */
class ReflectListImpl {
    /**
     * @public
     * @return {?}
     */
    field() {
        return this._field;
    }
    /**
     * @public
     * @return {number}
     */
    get size() {
        return this._arr.length;
    }
    /**
     * @public
     * @param {?} field
     * @param {!Array<*>} unsafeInput
     * @param {boolean} check
     */
    constructor(field, unsafeInput, check) {
        this._field = field;
        this._arr = this[unsafe_js_1.unsafeLocal] = unsafeInput;
        this.check = check;
    }
    /**
     * @public
     * @param {number} index
     * @return {(undefined|V)}
     */
    get(index) {
        /** @type {*} */
        const item = this._arr[index];
        return item === undefined
            ? undefined
            : ((/** @type {V} */ (listItemToReflect(this._field, item, this.check))));
    }
    /**
     * @public
     * @param {number} index
     * @param {V} item
     * @return {void}
     */
    set(index, item) {
        if (index < 0 || index >= this._arr.length) {
            throw new error_js_1.FieldError(this._field, `list item #${index + 1}: out of range`);
        }
        if (this.check) {
            /** @type {(undefined|!tsickle_error_4.FieldError)} */
            const err = (0, reflect_check_js_1.checkListItem)(this._field, index, item);
            if (err) {
                throw err;
            }
        }
        this._arr[index] = listItemToLocal(this._field, item);
    }
    /**
     * @public
     * @param {V} item
     * @return {undefined}
     */
    add(item) {
        if (this.check) {
            /** @type {(undefined|!tsickle_error_4.FieldError)} */
            const err = (0, reflect_check_js_1.checkListItem)(this._field, this._arr.length, item);
            if (err) {
                throw err;
            }
        }
        this._arr.push(listItemToLocal(this._field, item));
        return undefined;
    }
    /**
     * @public
     * @return {void}
     */
    clear() {
        this._arr.splice(0, this._arr.length);
    }
    /**
     * @public
     * @return {!Generator<V, void, *>}
     */
    [Symbol.iterator]() {
        return this.values();
    }
    /**
     * @public
     * @return {!ArrayIterator<number>}
     */
    keys() {
        return this._arr.keys();
    }
    /**
     * @public
     * @return {!Generator<V, void, *>}
     */
    *values() {
        for (const item of this._arr) {
            yield (/** @type {V} */ (listItemToReflect(this._field, item, this.check)));
        }
    }
    /**
     * @public
     * @return {!IterableIterator<!Array<?>, ?, ?>}
     */
    *entries() {
        for (let i = 0; i < this._arr.length; i++) {
            yield [i, (/** @type {V} */ (listItemToReflect(this._field, this._arr[i], this.check)))];
        }
    }
}
/* istanbul ignore if */
if (false) {
    /* Skipping unnamed member:
    [unsafeLocal]: unknown[];*/
    /**
     * @type {!Array<*>}
     * @private
     */
    ReflectListImpl.prototype._arr;
    /**
     * @type {?}
     * @private
     */
    ReflectListImpl.prototype._field;
    /**
     * @type {boolean}
     * @private
     */
    ReflectListImpl.prototype.check;
}
/**
 * Create a ReflectMap.
 * @template K, V
 * @param {?} field
 * @param {(undefined|?)=} unsafeInput
 * @param {boolean=} check
 * @return {!tsickle_reflect_types_5.ReflectMap<K, V>}
 */
function reflectMap(field, unsafeInput, check = true) {
    return new ReflectMapImpl(field, unsafeInput, check);
}
exports.reflectMap = reflectMap;
/**
 * @template K, V
 * @implements {tsickle_reflect_types_5.ReflectMap<K, V>}
 */
class ReflectMapImpl {
    /**
     * @public
     * @param {?} field
     * @param {(undefined|?)=} unsafeInput
     * @param {boolean=} check
     */
    constructor(field, unsafeInput, check = true) {
        this.obj = this[unsafe_js_1.unsafeLocal] = unsafeInput ?? {};
        this.check = check;
        this._field = field;
    }
    /**
     * @public
     * @return {?}
     */
    field() {
        return this._field;
    }
    /**
     * @public
     * @template THIS
     * @this {THIS}
     * @param {K} key
     * @param {V} value
     * @return {THIS}
     */
    set(key, value) {
        if ((/** @type {!ReflectMapImpl} */ (this)).check) {
            /** @type {(undefined|!tsickle_error_4.FieldError)} */
            const err = (0, reflect_check_js_1.checkMapEntry)((/** @type {!ReflectMapImpl} */ (this))._field, key, value);
            if (err) {
                throw err;
            }
        }
        (/** @type {!ReflectMapImpl} */ (this)).obj[mapKeyToLocal(key)] = mapValueToLocal((/** @type {!ReflectMapImpl} */ (this))._field, value);
        return (/** @type {!ReflectMapImpl} */ (this));
    }
    /**
     * @public
     * @param {K} key
     * @return {boolean}
     */
    delete(key) {
        /** @type {(string|number)} */
        const k = mapKeyToLocal(key);
        /** @type {boolean} */
        const has = Object.prototype.hasOwnProperty.call(this.obj, k);
        if (has) {
            delete this.obj[k];
        }
        return has;
    }
    /**
     * @public
     * @return {void}
     */
    clear() {
        for (const key of Object.keys(this.obj)) {
            delete this.obj[key];
        }
    }
    /**
     * @public
     * @param {K} key
     * @return {(undefined|V)}
     */
    get(key) {
        /** @type {*} */
        let val = this.obj[mapKeyToLocal(key)];
        if (val !== undefined) {
            val = mapValueToReflect(this._field, val, this.check);
        }
        return (/** @type {(undefined|V)} */ (val));
    }
    /**
     * @public
     * @param {K} key
     * @return {boolean}
     */
    has(key) {
        return Object.prototype.hasOwnProperty.call(this.obj, mapKeyToLocal(key));
    }
    /**
     * @public
     * @return {!MapIterator<K>}
     */
    *keys() {
        for (const objKey of Object.keys(this.obj)) {
            yield (/** @type {K} */ (mapKeyToReflect(objKey, this._field.mapKey)));
        }
    }
    /**
     * @public
     * @return {!MapIterator<!Array<?>>}
     */
    *entries() {
        for (const objEntry of Object.entries(this.obj)) {
            yield [
                (/** @type {K} */ (mapKeyToReflect(objEntry[0], this._field.mapKey))),
                (/** @type {V} */ (mapValueToReflect(this._field, objEntry[1], this.check))),
            ];
        }
    }
    /**
     * @public
     * @return {!MapIterator<!Array<?>>}
     */
    [Symbol.iterator]() {
        return this.entries();
    }
    /**
     * @public
     * @return {number}
     */
    get size() {
        return Object.keys(this.obj).length;
    }
    /**
     * @public
     * @return {!MapIterator<V>}
     */
    *values() {
        for (const val of Object.values(this.obj)) {
            yield (/** @type {V} */ (mapValueToReflect(this._field, val, this.check)));
        }
    }
    /**
     * @public
     * @param {function(V, K, !ReadonlyMap<K, V>): void} callbackfn
     * @param {*=} thisArg
     * @return {void}
     */
    forEach(callbackfn, thisArg) {
        for (const mapEntry of this.entries()) {
            callbackfn.call(thisArg, mapEntry[1], mapEntry[0], this);
        }
    }
}
/* istanbul ignore if */
if (false) {
    /**
     * @const {boolean}
     * @private
     */
    ReflectMapImpl.prototype.check;
    /**
     * @const {?}
     * @private
     */
    ReflectMapImpl.prototype._field;
    /* Skipping unnamed member:
    [unsafeLocal]: Record<string, unknown>;*/
    /**
     * @const {?}
     * @private
     */
    ReflectMapImpl.prototype.obj;
}
/**
 * @param {?} field
 * @param {*} value
 * @return {*}
 */
function messageToLocal(field, value) {
    if (!(0, guard_js_1.isReflectMessage)(value)) {
        return value;
    }
    if ((0, wrappers_js_1.isWrapper)((/** @type {!tsickle_reflect_types_5.ReflectMessage} */ (value)).message) &&
        !field.oneof &&
        field.fieldKind == "message") {
        // Types from google/protobuf/wrappers.proto are unwrapped when used in
        // a singular field that is not part of a oneof group.
        return (/** @type {!tsickle_reflect_types_5.ReflectMessage} */ (value)).message.value;
    }
    if ((/** @type {!tsickle_reflect_types_5.ReflectMessage} */ (value)).desc.typeName == "google.protobuf.Struct" &&
        field.parent.typeName != "google.protobuf.Value") {
        // google.protobuf.Struct is represented with JsonObject when used in a
        // field, except when used in google.protobuf.Value.
        return wktStructToLocal((/** @type {?} */ ((/** @type {!tsickle_reflect_types_5.ReflectMessage} */ (value)).message)));
    }
    return (/** @type {!tsickle_reflect_types_5.ReflectMessage} */ (value)).message;
}
/**
 * @param {?} field
 * @param {*} value
 * @param {boolean} check
 * @return {!ReflectMessageImpl}
 */
function messageToReflect(field, value, check) {
    if (value !== undefined) {
        if ((0, wrappers_js_1.isWrapperDesc)(field.message) &&
            !field.oneof &&
            field.fieldKind == "message") {
            // Types from google/protobuf/wrappers.proto are unwrapped when used in
            // a singular field that is not part of a oneof group.
            value = {
                $typeName: field.message.typeName,
                value: longToReflect(field.message.fields[0], value),
            };
        }
        else if (field.message.typeName == "google.protobuf.Struct" &&
            field.parent.typeName != "google.protobuf.Value" &&
            (0, guard_js_1.isObject)(value)) {
            // google.protobuf.Struct is represented with JsonObject when used in a
            // field, except when used in google.protobuf.Value.
            value = wktStructToReflect((/** @type {!Object<string,(null|string|number|boolean|?|!Array<?>)>} */ (value)));
        }
    }
    return new ReflectMessageImpl(field.message, (/** @type {(undefined|*)} */ (value)), check);
}
/**
 * @param {?} field
 * @param {*} value
 * @return {*}
 */
function listItemToLocal(field, value) {
    if (field.listKind == "message") {
        return messageToLocal(field, value);
    }
    return longToLocal(field, value);
}
/**
 * @param {?} field
 * @param {*} value
 * @param {boolean} check
 * @return {*}
 */
function listItemToReflect(field, value, check) {
    if (field.listKind == "message") {
        return messageToReflect(field, value, check);
    }
    return longToReflect(field, value);
}
/**
 * @param {?} field
 * @param {*} value
 * @return {*}
 */
function mapValueToLocal(field, value) {
    if (field.mapKind == "message") {
        return messageToLocal(field, value);
    }
    return longToLocal(field, value);
}
/**
 * @param {?} field
 * @param {*} value
 * @param {boolean} check
 * @return {*}
 */
function mapValueToReflect(field, value, check) {
    if (field.mapKind == "message") {
        return messageToReflect(field, value, check);
    }
    return value;
}
/**
 * @param {*} key
 * @return {(string|number)}
 */
function mapKeyToLocal(key) {
    return typeof key == "string" || typeof key == "number" ? key : String(key);
}
/**
 * Converts a map key (any scalar value except float, double, or bytes) from its
 * representation in a message (string or number, the only possible object key
 * types) to the closest possible type in ECMAScript.
 * @param {string} key
 * @param {!tsickle_descriptors_1.ScalarType} type
 * @return {(string|number|bigint|boolean)}
 */
function mapKeyToReflect(key, type) {
    switch (type) {
        case descriptors_js_1.ScalarType.STRING:
            return key;
        case descriptors_js_1.ScalarType.INT32:
        case descriptors_js_1.ScalarType.FIXED32:
        case descriptors_js_1.ScalarType.UINT32:
        case descriptors_js_1.ScalarType.SFIXED32:
        case descriptors_js_1.ScalarType.SINT32: {
            /** @type {number} */
            const n = Number.parseInt(key);
            if (Number.isFinite(n)) {
                return n;
            }
            break;
        }
        case descriptors_js_1.ScalarType.BOOL:
            switch (key) {
                case "true":
                    return true;
                case "false":
                    return false;
            }
            break;
        case descriptors_js_1.ScalarType.UINT64:
        case descriptors_js_1.ScalarType.FIXED64:
            try {
                return proto_int64_js_1.protoInt64.uParse(key);
            }
            catch {
                //
            }
            break;
        default:
            // INT64, SFIXED64, SINT64
            try {
                return proto_int64_js_1.protoInt64.parse(key);
            }
            catch {
                //
            }
            break;
    }
    return key;
}
/**
 * @param {?} field
 * @param {*} value
 * @return {*}
 */
function longToReflect(field, value) {
    switch (field.scalar) {
        case descriptors_js_1.ScalarType.INT64:
        case descriptors_js_1.ScalarType.SFIXED64:
        case descriptors_js_1.ScalarType.SINT64:
            if ("longAsString" in field &&
                field.longAsString &&
                typeof value == "string") {
                value = proto_int64_js_1.protoInt64.parse(value);
            }
            break;
        case descriptors_js_1.ScalarType.FIXED64:
        case descriptors_js_1.ScalarType.UINT64:
            if ("longAsString" in field &&
                field.longAsString &&
                typeof value == "string") {
                value = proto_int64_js_1.protoInt64.uParse(value);
            }
            break;
    }
    return value;
}
/**
 * @param {?} field
 * @param {*} value
 * @return {*}
 */
function longToLocal(field, value) {
    switch (field.scalar) {
        case descriptors_js_1.ScalarType.INT64:
        case descriptors_js_1.ScalarType.SFIXED64:
        case descriptors_js_1.ScalarType.SINT64:
            if ("longAsString" in field && field.longAsString) {
                value = String(value);
            }
            else if (typeof value == "string" || typeof value == "number") {
                value = proto_int64_js_1.protoInt64.parse(value);
            }
            break;
        case descriptors_js_1.ScalarType.FIXED64:
        case descriptors_js_1.ScalarType.UINT64:
            if ("longAsString" in field && field.longAsString) {
                value = String(value);
            }
            else if (typeof value == "string" || typeof value == "number") {
                value = proto_int64_js_1.protoInt64.uParse(value);
            }
            break;
    }
    return value;
}
/**
 * @param {(null|string|number|boolean|!Object<string,?>|!Array<?>)} json
 * @return {?}
 */
function wktStructToReflect(json) {
    /** @type {?} */
    const struct = {
        $typeName: "google.protobuf.Struct",
        fields: {},
    };
    if ((0, guard_js_1.isObject)(json)) {
        for (const [k__tsickle_destructured_1, v__tsickle_destructured_2] of Object.entries(json)) {
            const k = /** @type {string} */ (k__tsickle_destructured_1);
            const v = /** @type {(null|string|number|boolean|!Object<string,?>|!Array<?>)} */ (v__tsickle_destructured_2);
            struct.fields[k] = wktValueToReflect(v);
        }
    }
    return struct;
}
/**
 * @param {?} val
 * @return {!Object<string,(null|string|number|boolean|?|!Array<?>)>}
 */
function wktStructToLocal(val) {
    /** @type {!Object<string,(null|string|number|boolean|?|!Array<?>)>} */
    const json = {};
    for (const [k__tsickle_destructured_3, v__tsickle_destructured_4] of Object.entries(val.fields)) {
        const k = /** @type {string} */ (k__tsickle_destructured_3);
        const v = /** @type {?} */ (v__tsickle_destructured_4);
        json[k] = wktValueToLocal(v);
    }
    return json;
}
/**
 * @param {?} val
 * @return {(null|string|number|boolean|!Object<string,?>|!Array<?>)}
 */
function wktValueToLocal(val) {
    switch (val.kind.case) {
        case "structValue":
            return wktStructToLocal((/** @type {{value: ?, case: string}} */ (val.kind)).value);
        case "listValue":
            return (/** @type {{value: ?, case: string}} */ (val.kind)).value.values.map(wktValueToLocal);
        case "nullValue":
        case undefined:
            return null;
        default:
            return (/** @type {({value: number, case: string}|{value: string, case: string}|{value: boolean, case: string})} */ (val.kind)).value;
    }
}
/**
 * @param {(null|string|number|boolean|!Object<string,?>|!Array<?>)} json
 * @return {?}
 */
function wktValueToReflect(json) {
    /** @type {?} */
    const value = {
        $typeName: "google.protobuf.Value",
        kind: { case: undefined },
    };
    switch (typeof json) {
        case "number":
            value.kind = { case: "numberValue", value: json };
            break;
        case "string":
            value.kind = { case: "stringValue", value: json };
            break;
        case "boolean":
            value.kind = { case: "boolValue", value: json };
            break;
        case "object":
            if (json === null) {
                /** @type {!tsickle_struct_pb_12.NullValue} */
                const nullValue = 0;
                value.kind = { case: "nullValue", value: nullValue };
            }
            else if (Array.isArray(json)) {
                /** @type {?} */
                const listValue = {
                    $typeName: "google.protobuf.ListValue",
                    values: [],
                };
                if (Array.isArray(json)) {
                    for (const e of json) {
                        listValue.values.push(wktValueToReflect(e));
                    }
                }
                value.kind = {
                    case: "listValue",
                    value: listValue,
                };
            }
            else {
                value.kind = {
                    case: "structValue",
                    value: wktStructToReflect(json),
                };
            }
            break;
    }
    return value;
}
