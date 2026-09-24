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
 * Generated from: third_party/javascript/bufbuild_protobuf/src/registry.ts
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
goog.module('google3.third_party.javascript.bufbuild_protobuf.src.registry');
var module = module || { id: 'third_party/javascript/bufbuild_protobuf/src/registry.closure.js' };
goog.require('google3.third_party.javascript.tslib.tslib');
const tsickle_descriptor_pb_1 = goog.requireType("google3.third_party.javascript.bufbuild_protobuf.src.wkt.gen.google.protobuf.descriptor_pb");
const tsickle_descriptors_2 = goog.requireType("google3.third_party.javascript.bufbuild_protobuf.src.descriptors");
const tsickle_text_format_3 = goog.requireType("google3.third_party.javascript.bufbuild_protobuf.src.wire.text$2dformat");
const tsickle_nested_types_4 = goog.requireType("google3.third_party.javascript.bufbuild_protobuf.src.reflect.nested$2dtypes");
const tsickle_unsafe_5 = goog.requireType("google3.third_party.javascript.bufbuild_protobuf.src.reflect.unsafe");
const tsickle_names_6 = goog.requireType("google3.third_party.javascript.bufbuild_protobuf.src.reflect.names");
const descriptors_js_1 = goog.require('google3.third_party.javascript.bufbuild_protobuf.src.descriptors');
const text_format_js_1 = goog.require('google3.third_party.javascript.bufbuild_protobuf.src.wire.text$2dformat');
const nested_types_js_1 = goog.require('google3.third_party.javascript.bufbuild_protobuf.src.reflect.nested$2dtypes');
const unsafe_js_1 = goog.require('google3.third_party.javascript.bufbuild_protobuf.src.reflect.unsafe');
const names_js_1 = goog.require('google3.third_party.javascript.bufbuild_protobuf.src.reflect.names');
/**
 * A set of descriptors for messages, enumerations, extensions,
 * and services.
 * @record
 */
function Registry() { }
exports.Registry = Registry;
/* istanbul ignore if */
if (false) {
    /**
     * @const {string}
     * @public
     */
    Registry.prototype.kind;
    /**
     * All types (message, enumeration, extension, or service) contained
     * in this registry.
     * @public
     * @return {!IterableIterator<(!tsickle_descriptors_2.DescEnum|!tsickle_descriptors_2.DescMessage|!tsickle_descriptors_2.DescService|?), ?, ?>}
     */
    Registry.prototype[Symbol.iterator] = function () { };
    /**
     * Look up a type (message, enumeration, extension, or service) by
     * its fully qualified name.
     * @public
     * @param {string} typeName
     * @return {(undefined|!tsickle_descriptors_2.DescEnum|!tsickle_descriptors_2.DescMessage|!tsickle_descriptors_2.DescService|?)}
     */
    Registry.prototype.get = function (typeName) { };
    /**
     * Look up a message descriptor by its fully qualified name.
     * @public
     * @param {string} typeName
     * @return {(undefined|!tsickle_descriptors_2.DescMessage)}
     */
    Registry.prototype.getMessage = function (typeName) { };
    /**
     * Look up an enumeration descriptor by its fully qualified name.
     * @public
     * @param {string} typeName
     * @return {(undefined|!tsickle_descriptors_2.DescEnum)}
     */
    Registry.prototype.getEnum = function (typeName) { };
    /**
     * Look up an extension descriptor by its fully qualified name.
     * @public
     * @param {string} typeName
     * @return {(undefined|?)}
     */
    Registry.prototype.getExtension = function (typeName) { };
    /**
     * Look up an extension by the extendee - the message it extends - and
     * the extension number.
     * @public
     * @param {!tsickle_descriptors_2.DescMessage} extendee
     * @param {number} no
     * @return {(undefined|?)}
     */
    Registry.prototype.getExtensionFor = function (extendee, no) { };
    /**
     * Look up a service descriptor by its fully qualified name.
     * @public
     * @param {string} typeName
     * @return {(undefined|!tsickle_descriptors_2.DescService)}
     */
    Registry.prototype.getService = function (typeName) { };
}
/**
 * A registry that allows adding and removing descriptors.
 * @record
 * @extends {Registry}
 */
function MutableRegistry() { }
exports.MutableRegistry = MutableRegistry;
/* istanbul ignore if */
if (false) {
    /**
     * Adds the given descriptor - but not types nested within - to the registry.
     * @public
     * @param {(!tsickle_descriptors_2.DescEnum|!tsickle_descriptors_2.DescMessage|!tsickle_descriptors_2.DescService|?)} desc
     * @return {void}
     */
    MutableRegistry.prototype.add = function (desc) { };
    /**
     * Remove the given descriptor - but not types nested within - from the registry.
     * @public
     * @param {(!tsickle_descriptors_2.DescEnum|!tsickle_descriptors_2.DescMessage|!tsickle_descriptors_2.DescService|?)} desc
     * @return {void}
     */
    MutableRegistry.prototype.remove = function (desc) { };
}
/**
 * A registry that includes files.
 * @record
 * @extends {Registry}
 */
function FileRegistry() { }
exports.FileRegistry = FileRegistry;
/* istanbul ignore if */
if (false) {
    /**
     * All files in this registry.
     * @const {!Iterable<!tsickle_descriptors_2.DescFile, ?, ?>}
     * @public
     */
    FileRegistry.prototype.files;
    /**
     * Look up a file descriptor by file name.
     * @public
     * @param {string} fileName
     * @return {(undefined|!tsickle_descriptors_2.DescFile)}
     */
    FileRegistry.prototype.getFile = function (fileName) { };
}
/**
 * Create a registry from the given inputs.
 *
 * An input can be:
 * - Any message, enum, service, or extension descriptor, which adds just the
 *   descriptor for this type.
 * - A file descriptor, which adds all typed defined in this file.
 * - A registry, which adds all types from the registry.
 *
 * For duplicate descriptors (same type name), the one given last wins.
 * @param {...(!tsickle_descriptors_2.DescEnum|!tsickle_descriptors_2.DescFile|!tsickle_descriptors_2.DescMessage|!tsickle_descriptors_2.DescService|!Registry|?)} input
 * @return {!Registry}
 */
function createRegistry(...input) {
    return initBaseRegistry(input);
}
exports.createRegistry = createRegistry;
/**
 * Create a registry that allows adding and removing descriptors.
 * @param {...(!tsickle_descriptors_2.DescEnum|!tsickle_descriptors_2.DescFile|!tsickle_descriptors_2.DescMessage|!tsickle_descriptors_2.DescService|!Registry|?)} input
 * @return {!MutableRegistry}
 */
function createMutableRegistry(...input) {
    /** @type {!BaseRegistry} */
    const reg = initBaseRegistry(input);
    return {
        ...reg,
        /**
         * @public
         * @param {(!tsickle_descriptors_2.DescEnum|!tsickle_descriptors_2.DescMessage|!tsickle_descriptors_2.DescService|?)} desc
         * @return {void}
         */
        remove(desc) {
            if (desc.kind == "extension") {
                reg.extendees.get(desc.extendee.typeName)?.delete(desc.number);
            }
            reg.types.delete(desc.typeName);
        },
    };
}
exports.createMutableRegistry = createMutableRegistry;
/**
 * @param {...?} args
 * @return {!FileRegistry}
 */
function createFileRegistry(...args) {
    /** @type {!BaseRegistry} */
    const registry = createBaseRegistry();
    if (!args.length) {
        return registry;
    }
    if ("$typeName" in args[0] &&
        args[0].$typeName == "google.protobuf.FileDescriptorSet") {
        for (const file of args[0].file) {
            addFile(file, registry);
        }
        return registry;
    }
    if ("$typeName" in args[0]) {
        /** @type {?} */
        const input = args[0];
        /** @type {function(string): (undefined|!tsickle_descriptors_2.DescFile|?)} */
        const resolve = (/** @type {function(string): (undefined|!tsickle_descriptors_2.DescFile|?)} */ (args[1]));
        /** @type {!Set<string>} */
        const seen = new Set();
        /**
         * @param {?} file
         * @return {!Array<?>}
         */
        function recurseDeps(file) {
            /** @type {!Array<?>} */
            const deps = [];
            for (const protoFileName of file.dependency) {
                if (registry.getFile(protoFileName) != undefined) {
                    continue;
                }
                if (seen.has(protoFileName)) {
                    continue;
                }
                /** @type {(undefined|!tsickle_descriptors_2.DescFile|?)} */
                const dep = resolve(protoFileName);
                if (!dep) {
                    throw new Error(`Unable to resolve ${protoFileName}, imported by ${file.name}`);
                }
                if ("kind" in dep) {
                    registry.addFile(dep, false, true);
                }
                else {
                    seen.add(dep.name);
                    deps.push(dep);
                }
            }
            return deps.concat(...deps.map(recurseDeps));
        }
        for (const file of [input, ...recurseDeps(input)].reverse()) {
            addFile(file, registry);
        }
    }
    else {
        for (const fileReg of (/** @type {!Array<!FileRegistry>} */ (args))) {
            for (const file of fileReg.files) {
                registry.addFile(file);
            }
        }
    }
    return registry;
}
exports.createFileRegistry = createFileRegistry;
/**
 * @record
 * @extends {FileRegistry}
 */
function BaseRegistry() { }
/* istanbul ignore if */
if (false) {
    /**
     * @type {!Map<string, (!tsickle_descriptors_2.DescEnum|!tsickle_descriptors_2.DescMessage|!tsickle_descriptors_2.DescService|?)>}
     * @public
     */
    BaseRegistry.prototype.types;
    /**
     * @type {!Map<string, !Map<number, ?>>}
     * @public
     */
    BaseRegistry.prototype.extendees;
    /**
     * @public
     * @param {(!tsickle_descriptors_2.DescEnum|!tsickle_descriptors_2.DescMessage|!tsickle_descriptors_2.DescService|?)} desc
     * @return {void}
     */
    BaseRegistry.prototype.add = function (desc) { };
    /**
     * @public
     * @param {!tsickle_descriptors_2.DescFile} file
     * @param {(undefined|boolean)=} skipTypes
     * @param {(undefined|boolean)=} withDeps
     * @return {void}
     */
    BaseRegistry.prototype.addFile = function (file, skipTypes, withDeps) { };
}
/** @type {symbol} */
const CACHED_TYPES_IN_FILE = Symbol();
/** @typedef {(!tsickle_descriptors_2.DescEnum|!tsickle_descriptors_2.DescMessage|!tsickle_descriptors_2.DescService|?)} */
var AnyDesc;
/**
 * Returns the flattened types of a file, cached on the `DescFile` itself
 * under a module-private symbol property.
 *
 * Generated code calls `fileDesc()` once per proto file, and each call
 * registers the types of the file's entire transitive import closure, so
 * without the cache `nestedTypes()` re-walks a file's descriptor tree once
 * per dependent rather than once overall. Descriptors are immutable once
 * constructed, so the list is computed at most once per file.
 *
 * @param {!tsickle_descriptors_2.DescFile} file
 * @return {!ReadonlyArray<(!tsickle_descriptors_2.DescEnum|!tsickle_descriptors_2.DescMessage|!tsickle_descriptors_2.DescService|?)>}
 */
function fileTypes(file) {
    return (((/** @type {*} */ ((/** @type {*} */ (file)))))[CACHED_TYPES_IN_FILE] ??= [...(0, nested_types_js_1.nestedTypes)(file)]);
}
/** @type {symbol} */
const CACHED_TRANSITIVE_FILES = Symbol();
/**
 * Returns the file and every file it transitively imports, in depth-first
 * pre-order with duplicates removed, cached on the `DescFile` itself under a
 * module-private symbol property.
 *
 * `addFile()` previously recursed into `file.dependencies` without
 * deduplication, so a diamond-shaped import graph was visited once per import
 * path rather than once per file. A descriptor's dependency list is immutable,
 * so the flattened closure is computed at most once per file, and a file's
 * closure reuses the cached closures of its dependencies.
 *
 * @param {!tsickle_descriptors_2.DescFile} file
 * @return {!ReadonlyArray<!tsickle_descriptors_2.DescFile>}
 */
function transitiveFiles(file) {
    return (((/** @type {*} */ ((/** @type {*} */ (file)))))[CACHED_TRANSITIVE_FILES] ??= flattenFiles(file));
}
/**
 * @param {!tsickle_descriptors_2.DescFile} root
 * @return {!ReadonlyArray<!tsickle_descriptors_2.DescFile>}
 */
function flattenFiles(root) {
    /** @type {!Array<!tsickle_descriptors_2.DescFile>} */
    const result = [root];
    /** @type {!Set<!tsickle_descriptors_2.DescFile>} */
    const seen = new Set(result);
    for (const dep of root.dependencies) {
        for (const file of transitiveFiles(dep)) {
            if (!seen.has(file)) {
                seen.add(file);
                result.push(file);
            }
        }
    }
    return result;
}
/**
 * @return {!BaseRegistry}
 */
function createBaseRegistry() {
    /** @type {!Map<string, (!tsickle_descriptors_2.DescEnum|!tsickle_descriptors_2.DescMessage|!tsickle_descriptors_2.DescService|?)>} */
    const types = new Map();
    /** @type {!Map<string, !Map<number, ?>>} */
    const extendees = new Map();
    /** @type {!Map<string, !tsickle_descriptors_2.DescFile>} */
    const files = new Map();
    return {
        kind: "registry",
        types,
        extendees,
        /**
         * @public
         * @return {!MapIterator<(!tsickle_descriptors_2.DescEnum|!tsickle_descriptors_2.DescMessage|!tsickle_descriptors_2.DescService|?)>}
         */
        [Symbol.iterator]() {
            return types.values();
        },
        /**
         * @public
         * @return {!MapIterator<!tsickle_descriptors_2.DescFile>}
         */
        get files() {
            return files.values();
        },
        /**
         * @public
         * @param {!tsickle_descriptors_2.DescFile} file
         * @param {(undefined|boolean)} skipTypes
         * @param {(undefined|boolean)} withDeps
         * @return {void}
         */
        addFile(file, skipTypes, withDeps) {
            for (const f of withDeps ? transitiveFiles(file) : [file]) {
                files.set(f.proto.name, f);
                if (!skipTypes) {
                    for (const type of fileTypes(f)) {
                        this.add(type);
                    }
                }
            }
        },
        /**
         * @public
         * @param {(!tsickle_descriptors_2.DescEnum|!tsickle_descriptors_2.DescMessage|!tsickle_descriptors_2.DescService|?)} desc
         * @return {void}
         */
        add(desc) {
            if (desc.kind == "extension") {
                /** @type {(undefined|!Map<number, ?>)} */
                let numberToExt = extendees.get(desc.extendee.typeName);
                if (!numberToExt) {
                    extendees.set(desc.extendee.typeName, 
                    // biome-ignore lint/suspicious/noAssignInExpressions: no
                    (numberToExt = new Map()));
                }
                numberToExt.set(desc.number, desc);
            }
            types.set(desc.typeName, desc);
        },
        /**
         * @public
         * @param {string} typeName
         * @return {(undefined|!tsickle_descriptors_2.DescEnum|!tsickle_descriptors_2.DescMessage|!tsickle_descriptors_2.DescService|?)}
         */
        get(typeName) {
            return types.get(typeName);
        },
        /**
         * @public
         * @param {string} fileName
         * @return {(undefined|!tsickle_descriptors_2.DescFile)}
         */
        getFile(fileName) {
            return files.get(fileName);
        },
        /**
         * @public
         * @param {string} typeName
         * @return {(undefined|!tsickle_descriptors_2.DescMessage)}
         */
        getMessage(typeName) {
            /** @type {(undefined|!tsickle_descriptors_2.DescEnum|!tsickle_descriptors_2.DescMessage|!tsickle_descriptors_2.DescService|?)} */
            const t = types.get(typeName);
            return t?.kind == "message" ? t : undefined;
        },
        /**
         * @public
         * @param {string} typeName
         * @return {(undefined|!tsickle_descriptors_2.DescEnum)}
         */
        getEnum(typeName) {
            /** @type {(undefined|!tsickle_descriptors_2.DescEnum|!tsickle_descriptors_2.DescMessage|!tsickle_descriptors_2.DescService|?)} */
            const t = types.get(typeName);
            return t?.kind == "enum" ? t : undefined;
        },
        /**
         * @public
         * @param {string} typeName
         * @return {(undefined|?)}
         */
        getExtension(typeName) {
            /** @type {(undefined|!tsickle_descriptors_2.DescEnum|!tsickle_descriptors_2.DescMessage|!tsickle_descriptors_2.DescService|?)} */
            const t = types.get(typeName);
            return t?.kind == "extension" ? t : undefined;
        },
        /**
         * @public
         * @param {!tsickle_descriptors_2.DescMessage} extendee
         * @param {number} no
         * @return {(undefined|?)}
         */
        getExtensionFor(extendee, no) {
            return extendees.get(extendee.typeName)?.get(no);
        },
        /**
         * @public
         * @param {string} typeName
         * @return {(undefined|!tsickle_descriptors_2.DescService)}
         */
        getService(typeName) {
            /** @type {(undefined|!tsickle_descriptors_2.DescEnum|!tsickle_descriptors_2.DescMessage|!tsickle_descriptors_2.DescService|?)} */
            const t = types.get(typeName);
            return t?.kind == "service" ? t : undefined;
        },
    };
}
/**
 * @param {!Iterable<(!tsickle_descriptors_2.DescEnum|!tsickle_descriptors_2.DescFile|!tsickle_descriptors_2.DescMessage|!tsickle_descriptors_2.DescService|!Registry|?), ?, ?>} inputs
 * @return {!BaseRegistry}
 */
function initBaseRegistry(inputs) {
    /** @type {!BaseRegistry} */
    const registry = createBaseRegistry();
    for (const input of inputs) {
        switch (input.kind) {
            case "registry":
                for (const n of input) {
                    registry.add(n);
                }
                break;
            case "file":
                registry.addFile(input);
                break;
            default:
                registry.add(input);
                break;
        }
    }
    return registry;
}
// bootstrap-inject google.protobuf.Edition.EDITION_PROTO2: const $name: Edition.$localName = $number;
/** @type {!tsickle_descriptor_pb_1.Edition} */
const EDITION_PROTO2 = 998;
// bootstrap-inject google.protobuf.Edition.EDITION_PROTO3: const $name: Edition.$localName = $number;
/** @type {!tsickle_descriptor_pb_1.Edition} */
const EDITION_PROTO3 = 999;
// bootstrap-inject google.protobuf.FieldDescriptorProto.Type.TYPE_STRING: const $name: FieldDescriptorProto_Type.$localName = $number;
/** @type {!tsickle_descriptor_pb_1.FieldDescriptorProto_Type} */
const TYPE_STRING = 9;
// bootstrap-inject google.protobuf.FieldDescriptorProto.Type.TYPE_GROUP: const $name: FieldDescriptorProto_Type.$localName = $number;
/** @type {!tsickle_descriptor_pb_1.FieldDescriptorProto_Type} */
const TYPE_GROUP = 10;
// bootstrap-inject google.protobuf.FieldDescriptorProto.Type.TYPE_MESSAGE: const $name: FieldDescriptorProto_Type.$localName = $number;
/** @type {!tsickle_descriptor_pb_1.FieldDescriptorProto_Type} */
const TYPE_MESSAGE = 11;
// bootstrap-inject google.protobuf.FieldDescriptorProto.Type.TYPE_BYTES: const $name: FieldDescriptorProto_Type.$localName = $number;
/** @type {!tsickle_descriptor_pb_1.FieldDescriptorProto_Type} */
const TYPE_BYTES = 12;
// bootstrap-inject google.protobuf.FieldDescriptorProto.Type.TYPE_ENUM: const $name: FieldDescriptorProto_Type.$localName = $number;
/** @type {!tsickle_descriptor_pb_1.FieldDescriptorProto_Type} */
const TYPE_ENUM = 14;
// bootstrap-inject google.protobuf.FieldDescriptorProto.Label.LABEL_REPEATED: const $name: FieldDescriptorProto_Label.$localName = $number;
/** @type {!tsickle_descriptor_pb_1.FieldDescriptorProto_Label} */
const LABEL_REPEATED = 3;
// bootstrap-inject google.protobuf.FieldDescriptorProto.Label.LABEL_REQUIRED: const $name: FieldDescriptorProto_Label.$localName = $number;
/** @type {!tsickle_descriptor_pb_1.FieldDescriptorProto_Label} */
const LABEL_REQUIRED = 2;
// bootstrap-inject google.protobuf.FieldOptions.JSType.JS_STRING: const $name: FieldOptions_JSType.$localName = $number;
/** @type {!tsickle_descriptor_pb_1.FieldOptions_JSType} */
const JS_STRING = 1;
// bootstrap-inject google.protobuf.MethodOptions.IdempotencyLevel.IDEMPOTENCY_UNKNOWN: const $name: MethodOptions_IdempotencyLevel.$localName = $number;
/** @type {!tsickle_descriptor_pb_1.MethodOptions_IdempotencyLevel} */
const IDEMPOTENCY_UNKNOWN = 0;
// bootstrap-inject google.protobuf.FeatureSet.FieldPresence.EXPLICIT: const $name: FeatureSet_FieldPresence.$localName = $number;
/** @type {!tsickle_descriptor_pb_1.FeatureSet_FieldPresence} */
const EXPLICIT = 1;
// bootstrap-inject google.protobuf.FeatureSet.FieldPresence.IMPLICIT: const $name: FeatureSet_FieldPresence.$localName = $number;
/** @type {!tsickle_descriptor_pb_1.FeatureSet_FieldPresence} */
const IMPLICIT = 2;
// bootstrap-inject google.protobuf.FeatureSet.FieldPresence.LEGACY_REQUIRED: const $name: FeatureSet_FieldPresence.$localName = $number;
/** @type {!tsickle_descriptor_pb_1.FeatureSet_FieldPresence} */
const LEGACY_REQUIRED = 3;
// bootstrap-inject google.protobuf.FeatureSet.RepeatedFieldEncoding.PACKED: const $name: FeatureSet_RepeatedFieldEncoding.$localName = $number;
/** @type {!tsickle_descriptor_pb_1.FeatureSet_RepeatedFieldEncoding} */
const PACKED = 1;
// bootstrap-inject google.protobuf.FeatureSet.MessageEncoding.DELIMITED: const $name: FeatureSet_MessageEncoding.$localName = $number;
/** @type {!tsickle_descriptor_pb_1.FeatureSet_MessageEncoding} */
const DELIMITED = 2;
// bootstrap-inject google.protobuf.FeatureSet.EnumType.OPEN: const $name: FeatureSet_EnumType.$localName = $number;
/** @type {!tsickle_descriptor_pb_1.FeatureSet_EnumType} */
const OPEN = 1;
// biome-ignore format: want this to read well
// bootstrap-inject defaults: EDITION_PROTO2 to EDITION_2024: export const minimumEdition: SupportedEdition = $minimumEdition, maximumEdition: SupportedEdition = $maximumEdition;
// generated from protoc v33.0
/** @type {!tsickle_descriptor_pb_1.Edition} */
exports.minimumEdition = 998;
/** @type {!tsickle_descriptor_pb_1.Edition} */
exports.maximumEdition = 1001;
/** @type {*} */
const featureDefaults = (/** @type {*} */ ({
    // EDITION_PROTO2
    998: {
        fieldPresence: 1, // EXPLICIT,
        // EXPLICIT,
        enumType: 2, // CLOSED,
        // CLOSED,
        repeatedFieldEncoding: 2, // EXPANDED,
        // EXPANDED,
        utf8Validation: 3, // NONE,
        // NONE,
        messageEncoding: 1, // LENGTH_PREFIXED,
        // LENGTH_PREFIXED,
        jsonFormat: 2, // LEGACY_BEST_EFFORT,
        // LEGACY_BEST_EFFORT,
        enforceNamingStyle: 2, // STYLE_LEGACY,
        // STYLE_LEGACY,
        defaultSymbolVisibility: 1, // EXPORT_ALL,
    },
    // EDITION_PROTO3
    999: {
        fieldPresence: 2, // IMPLICIT,
        // IMPLICIT,
        enumType: 1, // OPEN,
        // OPEN,
        repeatedFieldEncoding: 1, // PACKED,
        // PACKED,
        utf8Validation: 2, // VERIFY,
        // VERIFY,
        messageEncoding: 1, // LENGTH_PREFIXED,
        // LENGTH_PREFIXED,
        jsonFormat: 1, // ALLOW,
        // ALLOW,
        enforceNamingStyle: 2, // STYLE_LEGACY,
        // STYLE_LEGACY,
        defaultSymbolVisibility: 1, // EXPORT_ALL,
    },
    // EDITION_2023
    1000: {
        fieldPresence: 1, // EXPLICIT,
        // EXPLICIT,
        enumType: 1, // OPEN,
        // OPEN,
        repeatedFieldEncoding: 1, // PACKED,
        // PACKED,
        utf8Validation: 2, // VERIFY,
        // VERIFY,
        messageEncoding: 1, // LENGTH_PREFIXED,
        // LENGTH_PREFIXED,
        jsonFormat: 1, // ALLOW,
        // ALLOW,
        enforceNamingStyle: 2, // STYLE_LEGACY,
        // STYLE_LEGACY,
        defaultSymbolVisibility: 1, // EXPORT_ALL,
    },
    // EDITION_2024
    1001: {
        fieldPresence: 1, // EXPLICIT,
        // EXPLICIT,
        enumType: 1, // OPEN,
        // OPEN,
        repeatedFieldEncoding: 1, // PACKED,
        // PACKED,
        utf8Validation: 2, // VERIFY,
        // VERIFY,
        messageEncoding: 1, // LENGTH_PREFIXED,
        // LENGTH_PREFIXED,
        jsonFormat: 1, // ALLOW,
        // ALLOW,
        enforceNamingStyle: 1, // STYLE2024,
        // STYLE2024,
        defaultSymbolVisibility: 2, // EXPORT_TOP_LEVEL,
    },
}));
/**
 * Create a descriptor for a file, add it to the registry.
 * @param {?} proto
 * @param {!BaseRegistry} reg
 * @return {void}
 */
function addFile(proto, reg) {
    /** @type {!tsickle_descriptors_2.DescFile} */
    const file = {
        kind: "file",
        proto,
        deprecated: proto.options?.deprecated ?? false,
        edition: getFileEdition(proto),
        name: proto.name.replace(/\.proto$/, ""),
        dependencies: findFileDependencies(proto, reg),
        enums: [],
        messages: [],
        extensions: [],
        services: [],
        /**
         * @public
         * @return {string}
         */
        toString() {
            // eslint-disable-next-line @typescript-eslint/restrict-template-expressions -- we asserted above
            return `file ${proto.name}`;
        },
    };
    /** @type {!Map<string, !tsickle_descriptors_2.DescMessage>} */
    const mapEntriesStore = new Map();
    /** @type {!FileMapEntries} */
    const mapEntries = {
        /**
         * @public
         * @param {string} typeName
         * @return {(undefined|!tsickle_descriptors_2.DescMessage)}
         */
        get(typeName) {
            return mapEntriesStore.get(typeName);
        },
        /**
         * @public
         * @param {!tsickle_descriptors_2.DescMessage} desc
         * @return {void}
         */
        add(desc) {
            assert(desc.proto.options?.mapEntry === true);
            mapEntriesStore.set(desc.typeName, desc);
        },
    };
    for (const enumProto of proto.enumType) {
        addEnum(enumProto, file, undefined, reg);
    }
    for (const messageProto of proto.messageType) {
        addMessage(messageProto, file, undefined, reg, mapEntries);
    }
    for (const serviceProto of proto.service) {
        addService(serviceProto, file, reg);
    }
    addExtensions(file, reg);
    for (const mapEntry of mapEntriesStore.values()) {
        // to create a map field, we need access to the map entry's fields
        addFields(mapEntry, reg, mapEntries);
    }
    for (const message of file.messages) {
        addFields(message, reg, mapEntries);
        addExtensions(message, reg);
    }
    reg.addFile(file, true);
}
/**
 * Stores map entries - messages for map fields synthesized by the compiler.
 * We need to track them while we create a DescFile from a FileDescriptorProto.
 * @record
 */
function FileMapEntries() { }
/* istanbul ignore if */
if (false) {
    /**
     * @public
     * @param {!tsickle_descriptors_2.DescMessage} desc
     * @return {void}
     */
    FileMapEntries.prototype.add = function (desc) { };
    /**
     * @public
     * @param {string} typeName
     * @return {(undefined|!tsickle_descriptors_2.DescMessage)}
     */
    FileMapEntries.prototype.get = function (typeName) { };
}
/**
 * Create descriptors for extensions, and add them to the message / file,
 * and to our cart.
 * Recurses into nested types.
 * @param {(!tsickle_descriptors_2.DescFile|!tsickle_descriptors_2.DescMessage)} desc
 * @param {!BaseRegistry} reg
 * @return {void}
 */
function addExtensions(desc, reg) {
    switch (desc.kind) {
        case "file":
            for (const proto of (/** @type {!tsickle_descriptors_2.DescFile} */ (desc)).proto.extension) {
                /** @type {?} */
                const ext = newField(proto, desc, reg);
                (/** @type {!tsickle_descriptors_2.DescFile} */ (desc)).extensions.push(ext);
                reg.add(ext);
            }
            break;
        case "message":
            for (const proto of (/** @type {!tsickle_descriptors_2.DescMessage} */ (desc)).proto.extension) {
                /** @type {?} */
                const ext = newField(proto, desc, reg);
                (/** @type {!tsickle_descriptors_2.DescMessage} */ (desc)).nestedExtensions.push(ext);
                reg.add(ext);
            }
            for (const message of (/** @type {!tsickle_descriptors_2.DescMessage} */ (desc)).nestedMessages) {
                addExtensions(message, reg);
            }
            break;
    }
}
/**
 * Create descriptors for fields and oneof groups, and add them to the message.
 * Recurses into nested types.
 * @param {!tsickle_descriptors_2.DescMessage} message
 * @param {!Registry} reg
 * @param {!FileMapEntries} mapEntries
 * @return {void}
 */
function addFields(message, reg, mapEntries) {
    /** @type {!Array<!tsickle_descriptors_2.DescOneof>} */
    const allOneofs = message.proto.oneofDecl.map((/**
     * @param {?} proto
     * @return {!tsickle_descriptors_2.DescOneof}
     */
    (proto) => newOneof(proto, message)));
    /** @type {!Set<!tsickle_descriptors_2.DescOneof>} */
    const oneofsSeen = new Set();
    for (const proto of message.proto.field) {
        /** @type {(undefined|!tsickle_descriptors_2.DescOneof)} */
        const oneof = findOneof(proto, allOneofs);
        /** @type {?} */
        const field = newField(proto, message, reg, oneof, mapEntries);
        message.fields.push(field);
        message.field[field.localName] = field;
        if (oneof === undefined) {
            message.members.push(field);
        }
        else {
            oneof.fields.push(field);
            if (!oneofsSeen.has(oneof)) {
                oneofsSeen.add(oneof);
                message.members.push(oneof);
            }
        }
    }
    for (const oneof of allOneofs.filter((/**
     * @param {!tsickle_descriptors_2.DescOneof} o
     * @return {boolean}
     */
    (o) => oneofsSeen.has(o)))) {
        message.oneofs.push(oneof);
    }
    for (const child of message.nestedMessages) {
        addFields(child, reg, mapEntries);
    }
}
/**
 * Create a descriptor for an enumeration, and add it our cart and to the
 * parent type, if any.
 * @param {?} proto
 * @param {!tsickle_descriptors_2.DescFile} file
 * @param {(undefined|!tsickle_descriptors_2.DescMessage)} parent
 * @param {!BaseRegistry} reg
 * @return {void}
 */
function addEnum(proto, file, parent, reg) {
    /** @type {(undefined|string)} */
    const sharedPrefix = findEnumSharedPrefix(proto.name, proto.value);
    /** @type {?} */
    const desc = {
        kind: "enum",
        proto,
        deprecated: proto.options?.deprecated ?? false,
        file,
        parent,
        open: true,
        name: proto.name,
        typeName: makeTypeName(proto, parent, file),
        value: {},
        values: [],
        sharedPrefix,
        /**
         * @public
         * @return {string}
         */
        toString() {
            return `enum ${this.typeName}`;
        },
    };
    desc.open = isEnumOpen(desc);
    reg.add(desc);
    for (const p of proto.value) {
        /** @type {string} */
        const name = p.name;
        desc.values.push(
        // biome-ignore lint/suspicious/noAssignInExpressions: no
        (desc.value[p.number] = {
            kind: (/** @type {string} */ ("enum_value")),
            proto: p,
            deprecated: p.options?.deprecated ?? false,
            parent: desc,
            name,
            localName: (0, names_js_1.safeObjectProperty)(sharedPrefix == undefined
                ? name
                : name.substring(sharedPrefix.length)),
            number: p.number,
            /**
             * @public
             * @return {string}
             */
            toString() {
                return `enum value ${desc.typeName}.${name}`;
            },
        }));
    }
    (parent?.nestedEnums ?? file.enums).push(desc);
}
/**
 * Create a descriptor for a message, including nested types, and add it to our
 * cart. Note that this does not create descriptors fields.
 * @param {?} proto
 * @param {!tsickle_descriptors_2.DescFile} file
 * @param {(undefined|!tsickle_descriptors_2.DescMessage)} parent
 * @param {!BaseRegistry} reg
 * @param {!FileMapEntries} mapEntries
 * @return {void}
 */
function addMessage(proto, file, parent, reg, mapEntries) {
    /** @type {!tsickle_descriptors_2.DescMessage} */
    const desc = {
        kind: "message",
        proto,
        deprecated: proto.options?.deprecated ?? false,
        file,
        parent,
        name: proto.name,
        typeName: makeTypeName(proto, parent, file),
        fields: [],
        field: {},
        oneofs: [],
        members: [],
        nestedEnums: [],
        nestedMessages: [],
        nestedExtensions: [],
        /**
         * @public
         * @return {string}
         */
        toString() {
            return `message ${this.typeName}`;
        },
    };
    if (proto.options?.mapEntry === true) {
        mapEntries.add(desc);
    }
    else {
        (parent?.nestedMessages ?? file.messages).push(desc);
        reg.add(desc);
    }
    for (const enumProto of proto.enumType) {
        addEnum(enumProto, file, desc, reg);
    }
    for (const messageProto of proto.nestedType) {
        addMessage(messageProto, file, desc, reg, mapEntries);
    }
}
/**
 * Create a descriptor for a service, including methods, and add it to our
 * cart.
 * @param {?} proto
 * @param {!tsickle_descriptors_2.DescFile} file
 * @param {!BaseRegistry} reg
 * @return {void}
 */
function addService(proto, file, reg) {
    /** @type {!tsickle_descriptors_2.DescService} */
    const desc = {
        kind: "service",
        proto,
        deprecated: proto.options?.deprecated ?? false,
        file,
        name: proto.name,
        typeName: makeTypeName(proto, undefined, file),
        methods: [],
        method: {},
        /**
         * @public
         * @return {string}
         */
        toString() {
            return `service ${this.typeName}`;
        },
    };
    file.services.push(desc);
    reg.add(desc);
    for (const methodProto of proto.method) {
        /** @type {!tsickle_descriptors_2.DescMethod} */
        const method = newMethod(methodProto, desc, reg);
        desc.methods.push(method);
        desc.method[method.localName] = method;
    }
}
/**
 * Create a descriptor for a method.
 * @param {?} proto
 * @param {!tsickle_descriptors_2.DescService} parent
 * @param {!Registry} reg
 * @return {!tsickle_descriptors_2.DescMethod}
 */
function newMethod(proto, parent, reg) {
    /** @type {string} */
    let methodKind;
    if (proto.clientStreaming && proto.serverStreaming) {
        methodKind = "bidi_streaming";
    }
    else if (proto.clientStreaming) {
        methodKind = "client_streaming";
    }
    else if (proto.serverStreaming) {
        methodKind = "server_streaming";
    }
    else {
        methodKind = "unary";
    }
    /** @type {(undefined|!tsickle_descriptors_2.DescMessage)} */
    const input = reg.getMessage(trimLeadingDot(proto.inputType));
    /** @type {(undefined|!tsickle_descriptors_2.DescMessage)} */
    const output = reg.getMessage(trimLeadingDot(proto.outputType));
    assert(input, `invalid MethodDescriptorProto: input_type ${proto.inputType} not found`);
    assert(output, `invalid MethodDescriptorProto: output_type ${proto.inputType} not found`);
    /** @type {string} */
    const name = proto.name;
    return {
        kind: "rpc",
        proto,
        deprecated: proto.options?.deprecated ?? false,
        parent,
        name,
        localName: (0, names_js_1.safeObjectProperty)(name.length
            ? (0, names_js_1.safeObjectProperty)(name[0].toLowerCase() + name.substring(1))
            : name),
        methodKind,
        input,
        output,
        idempotency: proto.options?.idempotencyLevel ?? IDEMPOTENCY_UNKNOWN,
        /**
         * @public
         * @return {string}
         */
        toString() {
            return `rpc ${parent.typeName}.${name}`;
        },
    };
}
/**
 * Create a descriptor for a oneof group.
 * @param {?} proto
 * @param {!tsickle_descriptors_2.DescMessage} parent
 * @return {!tsickle_descriptors_2.DescOneof}
 */
function newOneof(proto, parent) {
    return {
        kind: "oneof",
        proto,
        deprecated: false,
        parent,
        fields: [],
        name: proto.name,
        localName: (0, names_js_1.safeObjectProperty)((0, names_js_1.protoCamelCase)(proto.name)),
        /**
         * @public
         * @return {string}
         */
        toString() {
            return `oneof ${parent.typeName}.${this.name}`;
        },
    };
}
/**
 * @param {?} proto
 * @param {(!tsickle_descriptors_2.DescFile|!tsickle_descriptors_2.DescMessage)} parentOrFile
 * @param {!Registry} reg
 * @param {(undefined|!tsickle_descriptors_2.DescOneof)=} oneof
 * @param {(undefined|!FileMapEntries)=} mapEntries
 * @return {?}
 */
function newField(proto, parentOrFile, reg, oneof, mapEntries) {
    /** @type {boolean} */
    const isExtension = mapEntries === undefined;
    /** @typedef {string} */
    var AllKeys;
    /** @type {?} */
    const field = {
        kind: "field",
        proto,
        deprecated: proto.options?.deprecated ?? false,
        name: proto.name,
        number: proto.number,
        scalar: undefined,
        message: undefined,
        enum: undefined,
        presence: getFieldPresence(proto, oneof, isExtension, parentOrFile),
        listKind: undefined,
        mapKind: undefined,
        mapKey: undefined,
        delimitedEncoding: undefined,
        packed: undefined,
        longAsString: false,
        getDefaultValue: undefined,
    };
    if (isExtension) {
        // extension field
        /** @type {!tsickle_descriptors_2.DescFile} */
        const file = parentOrFile.kind == "file" ? parentOrFile : (/** @type {!tsickle_descriptors_2.DescMessage} */ (parentOrFile)).file;
        /** @type {(undefined|!tsickle_descriptors_2.DescMessage)} */
        const parent = parentOrFile.kind == "file" ? undefined : parentOrFile;
        /** @type {string} */
        const typeName = makeTypeName(proto, parent, file);
        field.kind = "extension";
        field.file = file;
        field.parent = parent;
        field.oneof = undefined;
        field.typeName = typeName;
        field.jsonName = `[${typeName}]`; // option json_name is not allowed on extension fields
        // option json_name is not allowed on extension fields
        field.toString = (/**
         * @return {string}
         */
        () => `extension ${typeName}`);
        /** @type {(undefined|!tsickle_descriptors_2.DescMessage)} */
        const extendee = reg.getMessage(trimLeadingDot(proto.extendee));
        assert(extendee, `invalid FieldDescriptorProto: extendee ${proto.extendee} not found`);
        field.extendee = extendee;
    }
    else {
        // regular field
        /** @type {(!tsickle_descriptors_2.DescFile|!tsickle_descriptors_2.DescMessage)} */
        const parent = parentOrFile;
        assert(parent.kind == "message");
        field.parent = parent;
        field.oneof = oneof;
        field.localName = oneof
            ? (0, names_js_1.protoCamelCase)(proto.name)
            : (0, names_js_1.safeObjectProperty)((0, names_js_1.protoCamelCase)(proto.name));
        field.jsonName = proto.jsonName;
        field.toString = (/**
         * @return {string}
         */
        () => `field ${(/** @type {!tsickle_descriptors_2.DescMessage} */ (parent)).typeName}.${proto.name}`);
    }
    /** @type {!tsickle_descriptor_pb_1.FieldDescriptorProto_Label} */
    const label = proto.label;
    /** @type {!tsickle_descriptor_pb_1.FieldDescriptorProto_Type} */
    const type = proto.type;
    /** @type {(undefined|!tsickle_descriptor_pb_1.FieldOptions_JSType)} */
    const jstype = proto.options?.jstype;
    if (label === LABEL_REPEATED) {
        // list or map field
        /** @type {(undefined|!tsickle_descriptors_2.DescMessage)} */
        const mapEntry = type == TYPE_MESSAGE
            ? mapEntries?.get(trimLeadingDot(proto.typeName))
            : undefined;
        if (mapEntry) {
            // map field
            field.fieldKind = "map";
            const { key, value } = findMapEntryFields(mapEntry);
            field.mapKey = key.scalar;
            field.mapKind = value.fieldKind;
            field.message = value.message;
            field.delimitedEncoding = false; // map fields are always LENGTH_PREFIXED
            // map fields are always LENGTH_PREFIXED
            field.enum = value.enum;
            field.scalar = value.scalar;
            return (/** @type {?} */ (field));
        }
        // list field
        field.fieldKind = "list";
        switch (type) {
            case TYPE_MESSAGE:
            case TYPE_GROUP:
                field.listKind = "message";
                field.message = reg.getMessage(trimLeadingDot(proto.typeName));
                assert(field.message);
                field.delimitedEncoding = isDelimitedEncoding(proto, parentOrFile);
                break;
            case TYPE_ENUM:
                field.listKind = "enum";
                field.enum = reg.getEnum(trimLeadingDot(proto.typeName));
                assert(field.enum);
                break;
            default:
                field.listKind = "scalar";
                field.scalar = type;
                field.longAsString = jstype == JS_STRING;
                break;
        }
        field.packed = isPackedField(proto, parentOrFile);
        return (/** @type {?} */ (field));
    }
    // singular
    switch (type) {
        case TYPE_MESSAGE:
        case TYPE_GROUP:
            field.fieldKind = "message";
            field.message = reg.getMessage(trimLeadingDot(proto.typeName));
            assert(field.message, `invalid FieldDescriptorProto: type_name ${proto.typeName} not found`);
            field.delimitedEncoding = isDelimitedEncoding(proto, parentOrFile);
            field.getDefaultValue = (/**
             * @return {undefined}
             */
            () => undefined);
            break;
        case TYPE_ENUM: {
            /** @type {(undefined|!tsickle_descriptors_2.DescEnum)} */
            const enumeration = reg.getEnum(trimLeadingDot(proto.typeName));
            assert(enumeration !== undefined, `invalid FieldDescriptorProto: type_name ${proto.typeName} not found`);
            field.fieldKind = "enum";
            field.enum = reg.getEnum(trimLeadingDot(proto.typeName));
            field.getDefaultValue = (/**
             * @return {(undefined|number)}
             */
            () => {
                return (0, unsafe_js_1.unsafeIsSetExplicit)(proto, "defaultValue")
                    ? (0, text_format_js_1.parseTextFormatEnumValue)(enumeration, proto.defaultValue)
                    : undefined;
            });
            break;
        }
        default: {
            field.fieldKind = "scalar";
            field.scalar = type;
            field.longAsString = jstype == JS_STRING;
            field.getDefaultValue = (/**
             * @return {(undefined|string|number|bigint|boolean|!Uint8Array)}
             */
            () => {
                return (0, unsafe_js_1.unsafeIsSetExplicit)(proto, "defaultValue")
                    ? (0, text_format_js_1.parseTextFormatScalarValue)((/** @type {!tsickle_descriptors_2.ScalarType} */ ((/** @type {number} */ (type)))), proto.defaultValue)
                    : undefined;
            });
            break;
        }
    }
    return (/** @type {?} */ (field));
}
/**
 * Parse the "syntax" and "edition" fields, returning one of the supported
 * editions.
 * @param {?} proto
 * @return {!tsickle_descriptor_pb_1.Edition}
 */
function getFileEdition(proto) {
    switch (proto.syntax) {
        case "":
        case "proto2":
            return EDITION_PROTO2;
        case "proto3":
            return EDITION_PROTO3;
        case "editions":
            if (proto.edition in featureDefaults) {
                return (/** @type {!tsickle_descriptor_pb_1.Edition} */ (proto.edition));
            }
            throw new Error(`${proto.name}: unsupported edition`);
        default:
            throw new Error(`${proto.name}: unsupported syntax "${proto.syntax}"`);
    }
}
/**
 * Resolve dependencies of FileDescriptorProto to DescFile.
 * @param {?} proto
 * @param {!FileRegistry} reg
 * @return {!Array<!tsickle_descriptors_2.DescFile>}
 */
function findFileDependencies(proto, reg) {
    return proto.dependency.map((/**
     * @param {string} wantName
     * @return {!tsickle_descriptors_2.DescFile}
     */
    (wantName) => {
        /** @type {(undefined|!tsickle_descriptors_2.DescFile)} */
        const dep = reg.getFile(wantName);
        if (!dep) {
            throw new Error(`Cannot find ${wantName}, imported by ${proto.name}`);
        }
        return dep;
    }));
}
/**
 * Finds a prefix shared by enum values, for example `my_enum_` for
 * `enum MyEnum {MY_ENUM_A=0; MY_ENUM_B=1;}`.
 * @param {string} enumName
 * @param {!Array<?>} values
 * @return {(undefined|string)}
 */
function findEnumSharedPrefix(enumName, values) {
    /** @type {string} */
    const prefix = camelToSnakeCase(enumName) + "_";
    for (const value of values) {
        if (!value.name.toLowerCase().startsWith(prefix)) {
            return undefined;
        }
        /** @type {string} */
        const shortName = value.name.substring(prefix.length);
        if (shortName.length == 0) {
            return undefined;
        }
        if (/^\d/.test(shortName)) {
            // identifiers must not start with numbers
            return undefined;
        }
    }
    return prefix;
}
/**
 * Converts lowerCamelCase or UpperCamelCase into lower_snake_case.
 * This is used to find shared prefixes in an enum.
 * @param {string} camel
 * @return {string}
 */
function camelToSnakeCase(camel) {
    return (camel.substring(0, 1) + camel.substring(1).replace(/[A-Z]/g, (/**
     * @param {string} c
     * @return {string}
     */
    (c) => "_" + c))).toLowerCase();
}
/**
 * Create a fully qualified name for a protobuf type or extension field.
 *
 * The fully qualified name for messages, enumerations, and services is
 * constructed by concatenating the package name (if present), parent
 * message names (for nested types), and the type name. We omit the leading
 * dot added by protobuf compilers. Examples:
 * - mypackage.MyMessage
 * - mypackage.MyMessage.NestedMessage
 *
 * The fully qualified name for extension fields is constructed by
 * concatenating the package name (if present), parent message names (for
 * extensions declared within a message), and the field name. Examples:
 * - mypackage.extfield
 * - mypackage.MyMessage.extfield
 * @param {?} proto
 * @param {(undefined|!tsickle_descriptors_2.DescMessage|!tsickle_descriptors_2.DescService)} parent
 * @param {!tsickle_descriptors_2.DescFile} file
 * @return {string}
 */
function makeTypeName(proto, parent, file) {
    /** @type {string} */
    let typeName;
    if (parent) {
        typeName = `${parent.typeName}.${proto.name}`;
    }
    else if (file.proto.package.length > 0) {
        typeName = `${file.proto.package}.${proto.name}`;
    }
    else {
        typeName = `${proto.name}`;
    }
    return typeName;
}
/**
 * Remove the leading dot from a fully qualified type name.
 * @param {string} typeName
 * @return {string}
 */
function trimLeadingDot(typeName) {
    return typeName.startsWith(".") ? typeName.substring(1) : typeName;
}
/**
 * Did the user put the field in a oneof group?
 * Synthetic oneofs for proto3 optionals are ignored.
 * @param {?} proto
 * @param {!Array<!tsickle_descriptors_2.DescOneof>} allOneofs
 * @return {(undefined|!tsickle_descriptors_2.DescOneof)}
 */
function findOneof(proto, allOneofs) {
    if (!(0, unsafe_js_1.unsafeIsSetExplicit)(proto, "oneofIndex")) {
        return undefined;
    }
    if (proto.proto3Optional) {
        return undefined;
    }
    /** @type {!tsickle_descriptors_2.DescOneof} */
    const oneof = allOneofs[proto.oneofIndex];
    assert(oneof, `invalid FieldDescriptorProto: oneof #${proto.oneofIndex} for field #${proto.number} not found`);
    return oneof;
}
/**
 * Presence of the field.
 * See https://protobuf.dev/programming-guides/field_presence/
 * @param {?} proto
 * @param {(undefined|!tsickle_descriptors_2.DescOneof)} oneof
 * @param {boolean} isExtension
 * @param {(!tsickle_descriptors_2.DescFile|!tsickle_descriptors_2.DescMessage)} parent
 * @return {!tsickle_descriptor_pb_1.FeatureSet_FieldPresence}
 */
function getFieldPresence(proto, oneof, isExtension, parent) {
    if (proto.label == LABEL_REQUIRED) {
        // proto2 required is LEGACY_REQUIRED
        return LEGACY_REQUIRED;
    }
    if (proto.label == LABEL_REPEATED) {
        // repeated fields (including maps) do not track presence
        return IMPLICIT;
    }
    if (!!oneof || proto.proto3Optional) {
        // oneof is always explicit
        return EXPLICIT;
    }
    if (isExtension) {
        // extensions always track presence
        return EXPLICIT;
    }
    /** @type {!tsickle_descriptor_pb_1.FeatureSet_FieldPresence} */
    const resolved = resolveFeature("fieldPresence", { proto, parent });
    if (resolved == IMPLICIT &&
        (proto.type == TYPE_MESSAGE || proto.type == TYPE_GROUP)) {
        // singular message field cannot be implicit
        return EXPLICIT;
    }
    return resolved;
}
/**
 * Pack this repeated field?
 * @param {?} proto
 * @param {(!tsickle_descriptors_2.DescFile|!tsickle_descriptors_2.DescMessage)} parent
 * @return {boolean}
 */
function isPackedField(proto, parent) {
    if (proto.label != LABEL_REPEATED) {
        return false;
    }
    switch (proto.type) {
        case TYPE_STRING:
        case TYPE_BYTES:
        case TYPE_GROUP:
        case TYPE_MESSAGE:
            // length-delimited types cannot be packed
            return false;
    }
    /** @type {(undefined|?)} */
    const o = proto.options;
    if (o && (0, unsafe_js_1.unsafeIsSetExplicit)(o, "packed")) {
        // prefer the field option over edition features
        return o.packed;
    }
    return (PACKED ==
        resolveFeature("repeatedFieldEncoding", {
            proto,
            parent,
        }));
}
/**
 * Find the key and value fields of a synthetic map entry message.
 * @param {!tsickle_descriptors_2.DescMessage} mapEntry
 * @return {{key: ?, value: ?}}
 */
function findMapEntryFields(mapEntry) {
    /** @type {(undefined|?)} */
    const key = mapEntry.fields.find((/**
     * @param {?} f
     * @return {boolean}
     */
    (f) => f.number === 1));
    /** @type {(undefined|?)} */
    const value = mapEntry.fields.find((/**
     * @param {?} f
     * @return {boolean}
     */
    (f) => f.number === 2));
    assert(key &&
        key.fieldKind == "scalar" &&
        key.scalar != descriptors_js_1.ScalarType.BYTES &&
        key.scalar != descriptors_js_1.ScalarType.FLOAT &&
        key.scalar != descriptors_js_1.ScalarType.DOUBLE &&
        value &&
        value.fieldKind != "list" &&
        value.fieldKind != "map");
    return { key, value };
}
/**
 * Enumerations can be open or closed.
 * See https://protobuf.dev/programming-guides/enum/
 * @param {!tsickle_descriptors_2.DescEnum} desc
 * @return {boolean}
 */
function isEnumOpen(desc) {
    return (OPEN ==
        resolveFeature("enumType", {
            proto: desc.proto,
            parent: desc.parent ?? desc.file,
        }));
}
/**
 * Encode the message delimited (a.k.a. proto2 group encoding), or
 * length-prefixed?
 * @param {?} proto
 * @param {(!tsickle_descriptors_2.DescFile|!tsickle_descriptors_2.DescMessage)} parent
 * @return {boolean}
 */
function isDelimitedEncoding(proto, parent) {
    if (proto.type == TYPE_GROUP) {
        return true;
    }
    return (DELIMITED ==
        resolveFeature("messageEncoding", {
            proto,
            parent,
        }));
}
/**
 * A google.protobuf.FeatureSet with just numeric properties.
 * @typedef {?}
 */
var Features;
/**
 * One of the numeric properties of google.protobuf.FeatureSet, excluding 0.
 * @typedef {?}
 */
var ResolvedFeature;
/**
 * @template Name
 * @param {Name} name
 * @param {(!tsickle_descriptors_2.DescFile|!tsickle_descriptors_2.DescMessage|{proto: ?, parent: (!tsickle_descriptors_2.DescFile|!tsickle_descriptors_2.DescMessage)})} ref
 * @return {?}
 */
function resolveFeature(name, ref) {
    /** @type {(undefined|?)} */
    const featureSet = ref.proto.options?.features;
    if (featureSet) {
        /** @type {?} */
        const val = featureSet[name];
        if (val != 0) {
            return (/** @type {?} */ ((/** @type {*} */ (val))));
        }
    }
    if ("kind" in ref) {
        if ((/** @type {(!tsickle_descriptors_2.DescFile|!tsickle_descriptors_2.DescMessage)} */ (ref)).kind == "message") {
            return resolveFeature(name, (/** @type {!tsickle_descriptors_2.DescMessage} */ (ref)).parent ?? (/** @type {!tsickle_descriptors_2.DescMessage} */ (ref)).file);
        }
        /** @type {(undefined|?)} */
        const editionDefaults = ((/** @type {?} */ (featureDefaults)))[(/** @type {!tsickle_descriptors_2.DescFile} */ (ref)).edition];
        if (!editionDefaults) {
            throw new Error(`feature default for edition ${(/** @type {!tsickle_descriptors_2.DescFile} */ (ref)).edition} not found`);
        }
        return (/** @type {?} */ ((/** @type {*} */ (editionDefaults[name]))));
    }
    return resolveFeature(name, (/** @type {{proto: ?, parent: (!tsickle_descriptors_2.DescFile|!tsickle_descriptors_2.DescMessage)}} */ (ref)).parent);
}
/**
 * Assert that condition is truthy or throw error (with message)
 * @param {*} condition
 * @param {(undefined|string)=} msg
 * @return {void}
 */
function assert(condition, msg) {
    if (!condition) {
        throw new Error(msg);
    }
}
