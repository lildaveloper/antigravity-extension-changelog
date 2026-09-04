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
 * Generated from: third_party/javascript/bufbuild_protobuf/src/equals.ts
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
goog.module('google3.third_party.javascript.bufbuild_protobuf.src.equals');
var module = module || { id: 'third_party/javascript/bufbuild_protobuf/src/equals.closure.js' };
goog.require('google3.third_party.javascript.tslib.tslib');
const tsickle_types_1 = goog.requireType("google3.third_party.javascript.bufbuild_protobuf.src.types");
const tsickle_scalar_2 = goog.requireType("google3.third_party.javascript.bufbuild_protobuf.src.reflect.scalar");
const tsickle_reflect_3 = goog.requireType("google3.third_party.javascript.bufbuild_protobuf.src.reflect.reflect");
const tsickle_descriptors_4 = goog.requireType("google3.third_party.javascript.bufbuild_protobuf.src.descriptors");
const tsickle_reflect_5 = goog.requireType("google3.third_party.javascript.bufbuild_protobuf.src.reflect.index");
const tsickle_registry_6 = goog.requireType("google3.third_party.javascript.bufbuild_protobuf.src.registry");
const tsickle_wkt_7 = goog.requireType("google3.third_party.javascript.bufbuild_protobuf.src.wkt.index");
const tsickle_extensions_8 = goog.requireType("google3.third_party.javascript.bufbuild_protobuf.src.extensions");
const tsickle_binary_encoding_9 = goog.requireType("google3.third_party.javascript.bufbuild_protobuf.src.wire.binary$2dencoding");
const scalar_js_1 = goog.require('google3.third_party.javascript.bufbuild_protobuf.src.reflect.scalar');
const reflect_js_1 = goog.require('google3.third_party.javascript.bufbuild_protobuf.src.reflect.reflect');
const descriptors_js_1 = goog.require('google3.third_party.javascript.bufbuild_protobuf.src.descriptors');
const index_js_1 = goog.require('google3.third_party.javascript.bufbuild_protobuf.src.wkt.index');
const extensions_js_1 = goog.require('google3.third_party.javascript.bufbuild_protobuf.src.extensions');
/**
 * @record
 */
function EqualsOptions() { }
/* istanbul ignore if */
if (false) {
    /**
     * A registry to look up extensions, and messages packed in Any.
     *
     * @type {!tsickle_registry_6.Registry}
     * @public
     */
    EqualsOptions.prototype.registry;
    /**
     * Unpack google.protobuf.Any before comparing.
     * If a type is not in the registry, comparison falls back to comparing the
     * fields of Any.
     *
     * @type {(undefined|boolean)}
     * @public
     */
    EqualsOptions.prototype.unpackAny;
    /**
     * Consider extensions when comparing.
     *
     * @type {(undefined|boolean)}
     * @public
     */
    EqualsOptions.prototype.extensions;
    /**
     * Consider unknown fields when comparing.
     * The registry is used to distinguish between extensions, and unknown fields
     * caused by schema changes.
     *
     * @type {(undefined|boolean)}
     * @public
     */
    EqualsOptions.prototype.unknown;
}
/**
 * Compare two messages of the same type.
 *
 * Note that this function disregards extensions and unknown fields, and that
 * NaN is not equal NaN, following the IEEE standard.
 * @template Desc
 * @param {Desc} schema
 * @param {?} a
 * @param {?} b
 * @param {(undefined|!EqualsOptions)=} options
 * @return {boolean}
 */
function equals(schema, a, b, options) {
    if ((/** @type {*} */ (a)).$typeName != schema.typeName || (/** @type {*} */ (b)).$typeName != schema.typeName) {
        return false;
    }
    if (a === b) {
        return true;
    }
    return reflectEquals((0, reflect_js_1.reflect)(schema, a), (0, reflect_js_1.reflect)(schema, b), options);
}
exports.equals = equals;
/**
 * @param {!tsickle_reflect_5.ReflectMessage} a
 * @param {!tsickle_reflect_5.ReflectMessage} b
 * @param {(undefined|!EqualsOptions)=} opts
 * @return {boolean}
 */
function reflectEquals(a, b, opts) {
    if (a.desc.typeName === "google.protobuf.Any" && opts?.unpackAny == true) {
        return anyUnpackedEquals((/** @type {?} */ (a.message)), (/** @type {?} */ (b.message)), opts);
    }
    for (const f of a.fields) {
        if (!fieldEquals(f, a, b, opts)) {
            return false;
        }
    }
    if (opts?.unknown == true && !unknownEquals(a, b, opts.registry)) {
        return false;
    }
    if (opts?.extensions == true && !extensionsEquals(a, b, opts)) {
        return false;
    }
    return true;
}
// TODO(tstamm) add an option to consider NaN equal to NaN?
/**
 * @param {?} f
 * @param {!tsickle_reflect_5.ReflectMessage} a
 * @param {!tsickle_reflect_5.ReflectMessage} b
 * @param {(undefined|!EqualsOptions)} opts
 * @return {boolean}
 */
function fieldEquals(f, a, b, opts) {
    if (!a.isSet(f) && !b.isSet(f)) {
        return true;
    }
    if (!a.isSet(f) || !b.isSet(f)) {
        return false;
    }
    switch (f.fieldKind) {
        case "scalar":
            return (0, scalar_js_1.scalarEquals)(f.scalar, a.get(f), b.get(f));
        case "enum":
            return a.get(f) === b.get(f);
        case "message":
            return reflectEquals(a.get(f), b.get(f), opts);
        case "map": {
            // TODO(tstamm) can't we compare sizes first?
            /** @type {!tsickle_reflect_5.ReflectMap<*, *>} */
            const mapA = a.get(f);
            /** @type {!tsickle_reflect_5.ReflectMap<*, *>} */
            const mapB = b.get(f);
            /** @type {!Array<*>} */
            const keys = [];
            for (const k of mapA.keys()) {
                if (!mapB.has(k)) {
                    return false;
                }
                keys.push(k);
            }
            for (const k of mapB.keys()) {
                if (!mapA.has(k)) {
                    return false;
                }
            }
            for (const key of keys) {
                /** @type {*} */
                const va = mapA.get(key);
                /** @type {*} */
                const vb = mapB.get(key);
                if (va === vb) {
                    continue;
                }
                switch (f.mapKind) {
                    case "enum":
                        return false;
                    case "message":
                        if (!reflectEquals((/** @type {!tsickle_reflect_5.ReflectMessage} */ (va)), (/** @type {!tsickle_reflect_5.ReflectMessage} */ (vb)), opts)) {
                            return false;
                        }
                        break;
                    case "scalar":
                        if (!(0, scalar_js_1.scalarEquals)(f.scalar, (/** @type {(string|number|bigint|boolean|!Uint8Array)} */ (va)), (/** @type {(string|number|bigint|boolean|!Uint8Array)} */ (vb)))) {
                            return false;
                        }
                        break;
                }
            }
            break;
        }
        case "list": {
            /** @type {!tsickle_reflect_5.ReflectList<*>} */
            const listA = a.get(f);
            /** @type {!tsickle_reflect_5.ReflectList<*>} */
            const listB = b.get(f);
            if (listA.size != listB.size) {
                return false;
            }
            for (let i = 0; i < listA.size; i++) {
                /** @type {*} */
                const va = listA.get(i);
                /** @type {*} */
                const vb = listB.get(i);
                if (va === vb) {
                    continue;
                }
                switch (f.listKind) {
                    case "enum":
                        return false;
                    case "message":
                        if (!reflectEquals((/** @type {!tsickle_reflect_5.ReflectMessage} */ (va)), (/** @type {!tsickle_reflect_5.ReflectMessage} */ (vb)), opts)) {
                            return false;
                        }
                        break;
                    case "scalar":
                        if (!(0, scalar_js_1.scalarEquals)(f.scalar, (/** @type {(string|number|bigint|boolean|!Uint8Array)} */ (va)), (/** @type {(string|number|bigint|boolean|!Uint8Array)} */ (vb)))) {
                            return false;
                        }
                        break;
                }
            }
            break;
        }
    }
    return true;
}
/**
 * @param {?} a
 * @param {?} b
 * @param {!EqualsOptions} opts
 * @return {boolean}
 */
function anyUnpackedEquals(a, b, opts) {
    if (a.typeUrl !== b.typeUrl) {
        return false;
    }
    /** @type {(undefined|*)} */
    const unpackedA = (0, index_js_1.anyUnpack)(a, opts.registry);
    /** @type {(undefined|*)} */
    const unpackedB = (0, index_js_1.anyUnpack)(b, opts.registry);
    if (unpackedA && unpackedB) {
        /** @type {(undefined|!tsickle_descriptors_4.DescMessage)} */
        const schema = opts.registry.getMessage(unpackedA.$typeName);
        if (schema) {
            return equals(schema, unpackedA, unpackedB, opts);
        }
    }
    return (0, scalar_js_1.scalarEquals)(descriptors_js_1.ScalarType.BYTES, a.value, b.value);
}
/**
 * @param {!tsickle_reflect_5.ReflectMessage} a
 * @param {!tsickle_reflect_5.ReflectMessage} b
 * @param {(undefined|!tsickle_registry_6.Registry)} registry
 * @return {boolean}
 */
function unknownEquals(a, b, registry) {
    /**
     * @param {!tsickle_reflect_5.ReflectMessage} msg
     * @param {(undefined|!tsickle_registry_6.Registry)} registry
     * @return {!Array<{no: number, wireType: !tsickle_binary_encoding_9.WireType, data: !Uint8Array}>}
     */
    function getTrulyUnknown(msg, registry) {
        /** @type {!Array<{no: number, wireType: !tsickle_binary_encoding_9.WireType, data: !Uint8Array}>} */
        const u = msg.getUnknown() ?? [];
        return registry
            ? u.filter((/**
             * @param {{no: number, wireType: !tsickle_binary_encoding_9.WireType, data: !Uint8Array}} uf
             * @return {boolean}
             */
            (uf) => !registry.getExtensionFor(msg.desc, uf.no)))
            : u;
    }
    /** @type {!Array<{no: number, wireType: !tsickle_binary_encoding_9.WireType, data: !Uint8Array}>} */
    const unknownA = getTrulyUnknown(a, registry);
    /** @type {!Array<{no: number, wireType: !tsickle_binary_encoding_9.WireType, data: !Uint8Array}>} */
    const unknownB = getTrulyUnknown(b, registry);
    if (unknownA.length != unknownB.length) {
        return false;
    }
    for (let i = 0; i < unknownA.length; i++) {
        /** @type {{no: number, wireType: !tsickle_binary_encoding_9.WireType, data: !Uint8Array}} */
        const a = unknownA[i];
        /** @type {{no: number, wireType: !tsickle_binary_encoding_9.WireType, data: !Uint8Array}} */
        const b = unknownB[i];
        if (a.no != b.no) {
            return false;
        }
        if (a.wireType != b.wireType) {
            return false;
        }
        if (!(0, scalar_js_1.scalarEquals)(descriptors_js_1.ScalarType.BYTES, a.data, b.data)) {
            return false;
        }
    }
    return true;
}
/**
 * @param {!tsickle_reflect_5.ReflectMessage} a
 * @param {!tsickle_reflect_5.ReflectMessage} b
 * @param {!EqualsOptions} opts
 * @return {boolean}
 */
function extensionsEquals(a, b, opts) {
    /**
     * @param {!tsickle_reflect_5.ReflectMessage} msg
     * @param {!tsickle_registry_6.Registry} registry
     * @return {!Array<?>}
     */
    function getSetExtensions(msg, registry) {
        return (msg.getUnknown() ?? [])
            .map((/**
         * @param {{no: number, wireType: !tsickle_binary_encoding_9.WireType, data: !Uint8Array}} uf
         * @return {(undefined|?)}
         */
        (uf) => registry.getExtensionFor(msg.desc, uf.no)))
            .filter((/**
         * @param {(undefined|?)} e
         * @return {boolean}
         */
        (e) => e != undefined))
            .filter((/**
         * @param {?} e
         * @param {number} index
         * @param {!Array<?>} arr
         * @return {boolean}
         */
        (e, index, arr) => arr.indexOf(e) === index));
    }
    /** @type {!Array<?>} */
    const extensionsA = getSetExtensions(a, opts.registry);
    /** @type {!Array<?>} */
    const extensionsB = getSetExtensions(b, opts.registry);
    if (extensionsA.length != extensionsB.length ||
        extensionsA.some((/**
         * @param {?} e
         * @return {boolean}
         */
        (e) => !extensionsB.includes(e)))) {
        return false;
    }
    for (const extension of extensionsA) {
        const [containerA__tsickle_destructured_1, field__tsickle_destructured_2] = (0, extensions_js_1.createExtensionContainer)(extension, (0, extensions_js_1.getExtension)(a.message, extension));
        const containerA = /** @type {!tsickle_reflect_5.ReflectMessage} */ (containerA__tsickle_destructured_1);
        const field = /** @type {?} */ (field__tsickle_destructured_2);
        const [containerB__tsickle_destructured_3] = (0, extensions_js_1.createExtensionContainer)(extension, (0, extensions_js_1.getExtension)(b.message, extension));
        const containerB = /** @type {!tsickle_reflect_5.ReflectMessage} */ (containerB__tsickle_destructured_3);
        if (!fieldEquals(field, containerA, containerB, opts)) {
            return false;
        }
    }
    return true;
}
