/**
 * @fileoverview An internal library for managing descriptor information.
 *
 * These types need to be available to generated code but generally do not
 * constitute a reasonable user-visible API. As a result, we will need to expose
 * these descriptor references as opaque types which then need to be resolved
 * into linked descriptor information.
 *
 *
 * DO NOT USE THIS OUTSIDE OF THIS PACKAGE.
 * Generated from: javascript/apps/jspb/internal_descriptor.ts
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
goog.module('google3.javascript.apps.jspb.internal_descriptor');
var module = module || { id: 'javascript/apps/jspb/internal_descriptor.closure.js' };
goog.require('google3.third_party.javascript.tslib.tslib');
const tsickle_descriptor_1 = goog.requireType("google3.javascript.apps.jspb.descriptor");
const tsickle_internal_2 = goog.requireType("jspb.internal");
const tsickle_mutable_message_3 = goog.requireType("jspb.mutable_message");
const tsickle_constructors_4 = goog.requireType("google3.javascript.apps.jspb.types.constructors");
const tsickle_reflect_5 = goog.requireType("goog.reflect");
const descriptor_1 = goog.require('google3.javascript.apps.jspb.descriptor');
const internal_1 = goog.require('jspb.internal');
const reflect_1 = goog.require('goog.reflect');
/** @typedef {!Object} */
var InternalArg;
/** @type {symbol} */
const SERIALIZED_DESCRIPTOR_PROTO_KEY = Symbol();
/** @type {symbol} */
const DESCRIPTOR_TYPE_REFERENCE_CACHE_KEY = Symbol();
/**
 * @record
 * @template M
 * @extends {tsickle_constructors_4.MessageConstructor}
 */
function MessageConstructorWithDescriptor() { }
/* istanbul ignore if */
if (false) {
    /* Skipping unnamed member:
    [SERIALIZED_DESCRIPTOR_PROTO_KEY]?: string;*/
    /* Skipping unnamed member:
    [DESCRIPTOR_TYPE_REFERENCE_CACHE_KEY]?: DescriptorTypeReferenceImpl<M>;*/
}
/**
 * A global registry of all descriptor type references.
 * @type {!Map<string, !tsickle_descriptor_1.DescriptorTypeReference<!tsickle_mutable_message_3.MutableMessage<?>, string>>}
 */
const GLOBAL_TYPE_REGISTRY = new Map();
/**
 * A global registry of all enum descriptor type references.
 * @type {!Map<string, !tsickle_descriptor_1.EnumDescriptorTypeReference<number>>}
 */
const GLOBAL_ENUM_TYPE_REGISTRY = new Map();
/**
 * A global registry of all extension references.
 * @type {!Map<string, !Map<number, !ExtensionReference<!tsickle_mutable_message_3.MutableMessage<?>>>>}
 */
const GLOBAL_EXTENSION_REGISTRY = new Map();
/** @typedef {!Map<number, !ExtensionReference<!tsickle_mutable_message_3.MutableMessage<?>>>} */
var ExtensionRegistry;
/**
 * Encapsulates a reference to a descriptor type.
 *
 * This is hidden and uses a local arg so that users cannot construct instances.
 *
 * @final
 * @template M
 * @extends {tsickle_descriptor_1.DescriptorTypeReference<M, string>}
 */
class DescriptorTypeReferenceImpl extends descriptor_1.DescriptorTypeReference {
    /**
     * @public
     * @param {(undefined|!tsickle_constructors_4.MessageConstructor<M>)} ctor
     * @param {string} typeName
     * @param {number} fieldPresence
     * @param {string} serializedDescriptorProto
     * @param {!ReadonlyArray<(undefined|function(): !tsickle_descriptor_1.DescriptorTypeReference<?, string>|function(): !tsickle_descriptor_1.EnumDescriptorTypeReference<?>|!Map<number, !ExtensionReference<!tsickle_mutable_message_3.MutableMessage<?>>>)>} maybeChildTypes
     * @param {!Object} internalArg
     */
    constructor(ctor, typeName, fieldPresence, serializedDescriptorProto, maybeChildTypes, internalArg) {
        super(internalArg);
        this.ctor = ctor;
        this.typeName = typeName;
        this.fieldPresence = fieldPresence;
        this.serializedDescriptorProto = serializedDescriptorProto;
        (0, reflect_1.sinkValue)(maybeChildTypes);
        GLOBAL_TYPE_REGISTRY.set(typeName, this);
        if (ctor) {
            (/** @type {!MessageConstructorWithDescriptor<M>} */ (this.constructorWithDescriptor()))[SERIALIZED_DESCRIPTOR_PROTO_KEY] =
                serializedDescriptorProto;
        }
    }
    /**
     * @public
     * @return {string}
     */
    getTypeName() {
        return this.typeName;
    }
    /**
     * @public
     * @param {!Object} internalArg
     * @return {string}
     */
    getSerializedDescriptorProto(internalArg) {
        assertInternalArg(internalArg);
        return this.serializedDescriptorProto;
    }
    /**
     * @public
     * @param {!Object} internalArg
     * @return {!Map<number, !ExtensionReference<M>>}
     */
    getExtensions(internalArg) {
        assertInternalArg(internalArg);
        /** @type {(undefined|!Map<number, !ExtensionReference<!tsickle_mutable_message_3.MutableMessage<?>>>)} */
        let extensions = GLOBAL_EXTENSION_REGISTRY.get(this.typeName);
        if (extensions == null) {
            GLOBAL_EXTENSION_REGISTRY.set(this.typeName, (extensions = new Map()));
        }
        return extensions;
    }
    /**
     * @public
     * @param {!Object} internalArg
     * @return {(undefined|!tsickle_constructors_4.MessageConstructor<M>)}
     */
    getConstructor(internalArg) {
        assertInternalArg(internalArg);
        return this.ctor;
    }
    /**
     * @private
     * @return {(undefined|!MessageConstructorWithDescriptor<M>)}
     */
    constructorWithDescriptor() {
        return (/** @type {(undefined|!MessageConstructorWithDescriptor<M>)} */ (this.ctor));
    }
}
exports.DescriptorTypeReferenceImpl = DescriptorTypeReferenceImpl;
/* istanbul ignore if */
if (false) {
    /**
     * @const {(undefined|!tsickle_constructors_4.MessageConstructor<M>)}
     * @private
     */
    DescriptorTypeReferenceImpl.prototype.ctor;
    /**
     * @const {string}
     * @private
     */
    DescriptorTypeReferenceImpl.prototype.typeName;
    /**
     * @const {number}
     * @public
     */
    DescriptorTypeReferenceImpl.prototype.fieldPresence;
    /**
     * @const {string}
     * @public
     */
    DescriptorTypeReferenceImpl.prototype.serializedDescriptorProto;
}
/**
 * A doubly indirected type reference. We do this to avoid dep cycles.
 * @typedef {(function(): !tsickle_descriptor_1.DescriptorTypeReference<?, string>|function(): !tsickle_descriptor_1.EnumDescriptorTypeReference<?>)}
 */
var TypeReferenceGetter;
/**
 * Encapsulates a reference to an extension. Only loaded when the extendee's
 * descriptor is referenced: to pin a reference you need both.
 *
 * This is hidden and uses a local arg so that users cannot construct instances.
 *
 * @final
 * @template M
 */
class ExtensionReference {
    /**
     * @public
     * @param {string} extendeeName
     * @param {string} extensionScope
     * @param {number} fieldNumber
     * @param {string} serializedFieldDescriptorProto
     * @param {(undefined|function(): (function(): !tsickle_descriptor_1.DescriptorTypeReference<?, string>|function(): !tsickle_descriptor_1.EnumDescriptorTypeReference<?>))} maybeExtType
     * @param {!Object} internalArg
     */
    constructor(extendeeName, extensionScope, fieldNumber, serializedFieldDescriptorProto, maybeExtType, internalArg) {
        this.extendeeName = extendeeName;
        this.extensionScope = extensionScope;
        this.fieldNumber = fieldNumber;
        this.serializedFieldDescriptorProto = serializedFieldDescriptorProto;
        this.maybeExtType = maybeExtType;
        assertInternalArg(internalArg);
        /** @type {(undefined|!Map<number, !ExtensionReference<!tsickle_mutable_message_3.MutableMessage<?>>>)} */
        let extensions = GLOBAL_EXTENSION_REGISTRY.get(this.extendeeName);
        if (extensions == null) {
            GLOBAL_EXTENSION_REGISTRY.set(this.extendeeName, (extensions = new Map()));
        }
        (0, reflect_1.sinkValue)(maybeExtType);
        extensions.set(this.fieldNumber, this);
    }
    /**
     * @public
     * @param {!Object} internalArg
     * @return {string}
     */
    getExtendeeName(internalArg) {
        assertInternalArg(internalArg);
        return this.extendeeName;
    }
    /**
     * @public
     * @param {!Object} internalArg
     * @return {(undefined|string)}
     */
    getExtensionScope(internalArg) {
        assertInternalArg(internalArg);
        return this.extensionScope;
    }
    /**
     * @public
     * @param {!Object} internalArg
     * @return {string}
     */
    getSerializedDescriptorProto(internalArg) {
        assertInternalArg(internalArg);
        return this.serializedFieldDescriptorProto;
    }
}
exports.ExtensionReference = ExtensionReference;
/* istanbul ignore if */
if (false) {
    /**
     * @const {string}
     * @private
     */
    ExtensionReference.prototype.extendeeName;
    /**
     * @const {string}
     * @private
     */
    ExtensionReference.prototype.extensionScope;
    /**
     * @const {number}
     * @private
     */
    ExtensionReference.prototype.fieldNumber;
    /**
     * @const {string}
     * @private
     */
    ExtensionReference.prototype.serializedFieldDescriptorProto;
    /**
     * @const {(undefined|function(): (function(): !tsickle_descriptor_1.DescriptorTypeReference<?, string>|function(): !tsickle_descriptor_1.EnumDescriptorTypeReference<?>))}
     * @public
     */
    ExtensionReference.prototype.maybeExtType;
}
/**
 * Encapsulates a reference to an enum type.
 *
 * This is hidden and uses a local arg so that users cannot construct instances.
 *
 * @final
 * @template T
 * @extends {tsickle_descriptor_1.EnumDescriptorTypeReference<T>}
 */
class EnumDescriptorTypeReferenceImpl extends descriptor_1.EnumDescriptorTypeReference {
    /**
     * @public
     * @param {string} typeName
     * @param {string} serializedEnumDescriptorProto
     * @param {!Object} internalArg
     */
    constructor(typeName, serializedEnumDescriptorProto, internalArg) {
        super(internalArg);
        this.typeName = typeName;
        this.serializedEnumDescriptorProto = serializedEnumDescriptorProto;
        assertInternalArg(internalArg);
        GLOBAL_ENUM_TYPE_REGISTRY.set(typeName, this);
    }
    /**
     * @public
     * @return {string}
     */
    getTypeName() {
        return this.typeName;
    }
    /**
     * @public
     * @param {!Object} internalArg
     * @return {string}
     */
    getSerializedEnumDescriptorProto(internalArg) {
        assertInternalArg(internalArg);
        return this.serializedEnumDescriptorProto;
    }
}
exports.EnumDescriptorTypeReferenceImpl = EnumDescriptorTypeReferenceImpl;
/* istanbul ignore if */
if (false) {
    /**
     * @const {string}
     * @private
     */
    EnumDescriptorTypeReferenceImpl.prototype.typeName;
    /**
     * @const {string}
     * @private
     */
    EnumDescriptorTypeReferenceImpl.prototype.serializedEnumDescriptorProto;
}
/** @typedef {!tsickle_descriptor_1.DescriptorTypeReference<!tsickle_mutable_message_3.MutableMessage<?>, string>} */
var SomeDescriptorTypeReference;
/** @typedef {!tsickle_descriptor_1.EnumDescriptorTypeReference<number>} */
var SomeEnumDescriptorTypeReference;
/** @typedef {!ExtensionReference<!tsickle_mutable_message_3.MutableMessage<?>>} */
var SomeExtensionReference;
/**
 * Retrieves a DescriptorTypeReference for a given message type.
 * @typedef {function(): !tsickle_descriptor_1.DescriptorTypeReference<?, string>}
 */
exports.DescriptorTypeReferenceGetter;
/**
 * Retrieves a DescriptorTypeReference for a given enum type.
 * @typedef {function(): !tsickle_descriptor_1.EnumDescriptorTypeReference<?>}
 */
exports.EnumDescriptorTypeReferenceGetter;
/** @typedef {function(): !tsickle_descriptor_1.DescriptorTypeReference<?, string>} */
var AnyDescriptorTypeReferenceGetter;
/** @typedef {function(): !tsickle_descriptor_1.EnumDescriptorTypeReference<?>} */
var AnyEnumDescriptorTypeReferenceGetter;
/**
 * Registers the given descriptor information and returns a DescriptorReference.
 *
 * The child types are fully lazy because of cyclic references; and we don't
 * actually even need to retrieve the getters because they're only passed
 * to retain the child types' descriptor constructors (and ideally instantiate
 * them in order, in most cases).
 *
 * @nosideeffects
 * @noinline
 * @template M
 * @param {(undefined|!tsickle_constructors_4.MessageConstructor<M>)} ctor
 * @param {string} typeName
 * @param {number} fieldPresence
 * @param {string} serializedDescriptor
 * @param {...(undefined|function(): !tsickle_descriptor_1.DescriptorTypeReference<?, string>|function(): !tsickle_descriptor_1.EnumDescriptorTypeReference<?>|!Map<number, !ExtensionReference<!tsickle_mutable_message_3.MutableMessage<?>>>)} maybeChildTypes
 * @return {function(): !tsickle_descriptor_1.DescriptorTypeReference<M, string>}
 */
function makeDescriptorGetter(ctor, typeName, fieldPresence, serializedDescriptor, ...maybeChildTypes) {
    // Construct a new descriptor reference and write it onto our ctor.
    /** @type {!DescriptorTypeReferenceImpl<M>} */
    const ref = new DescriptorTypeReferenceImpl(ctor, typeName, fieldPresence, serializedDescriptor, maybeChildTypes, internal_1.DESCRIPTOR_TYPE_REFERENCE_INTERNAL_ARG);
    if (ctor) {
        /** @type {!MessageConstructorWithDescriptor<M>} */
        const ctorWithDescriptor = (/** @type {!MessageConstructorWithDescriptor<M>} */ (ctor));
        ctorWithDescriptor[DESCRIPTOR_TYPE_REFERENCE_CACHE_KEY] ??= ref;
    }
    // Emit a function which retrieves the descriptor reference from our ctor.
    //
    // Note that it's important to run the other logic up-front so as not to
    // close in the serialized descriptor, which will cause it to be retained
    // multiple times in memory.
    return (/**
     * @return {!DescriptorTypeReferenceImpl<M>}
     */
    () => ref);
}
exports.makeDescriptorGetter = makeDescriptorGetter;
/**
 * Registers the given descriptor information and returns a DescriptorReference.
 *
 * The signature on extTypeGetter is fully lazy because, due to extension
 * loading order, our value type my actually not be available at the time of
 * registration.
 *
 * @noinline
 * @nosideeffects
 * @template Extendee
 * @param {string} extendeeName
 * @param {string} extensionScope
 * @param {number} fieldNumber
 * @param {string} serializedFieldDescriptor
 * @param {(undefined|function(): (function(): !tsickle_descriptor_1.DescriptorTypeReference<?, string>|function(): !tsickle_descriptor_1.EnumDescriptorTypeReference<?>))=} extTypeGetter
 * @return {!ExtensionReference<Extendee>}
 */
function makeExtensionReference(extendeeName, extensionScope, fieldNumber, serializedFieldDescriptor, extTypeGetter) {
    // Note that we don't use the `valueOf` trick here as we want this to be
    // effectful so that a `require` registers the extensions in a file.
    return new ExtensionReference(extendeeName, extensionScope, fieldNumber, serializedFieldDescriptor, extTypeGetter, internal_1.DESCRIPTOR_TYPE_REFERENCE_INTERNAL_ARG);
}
exports.makeExtensionReference = makeExtensionReference;
/**
 * Registers the given enum descriptor information and returns an
 * EnumDescriptorReference.
 * @template T
 * @param {string} typeName
 * @param {string} serializedDescriptor
 * @return {function(): !tsickle_descriptor_1.EnumDescriptorTypeReference<T>}
 */
function makeEnumDescriptorGetter(typeName, serializedDescriptor) {
    return {
        valueOf: (/**
         * @return {function(): !tsickle_descriptor_1.EnumDescriptorTypeReference<T>}
         */
        () => {
            /** @type {!EnumDescriptorTypeReferenceImpl<number>} */
            const ref = new EnumDescriptorTypeReferenceImpl(typeName, serializedDescriptor, internal_1.DESCRIPTOR_TYPE_REFERENCE_INTERNAL_ARG);
            return (/**
             * @return {!tsickle_descriptor_1.EnumDescriptorTypeReference<T>}
             */
            () => (/** @type {!tsickle_descriptor_1.EnumDescriptorTypeReference<T>} */ (ref)));
        }),
    }.valueOf();
}
exports.makeEnumDescriptorGetter = makeEnumDescriptorGetter;
/**
 * Resolves a type name to a descriptor type reference.
 * @param {string} typeName
 * @return {(undefined|!tsickle_descriptor_1.DescriptorTypeReference<!tsickle_mutable_message_3.MutableMessage<?>, string>)}
 */
function resolveMessageType(typeName) {
    if ((0, internal_1.startsWith)(typeName, '.'))
        typeName = typeName.substring(1);
    return GLOBAL_TYPE_REGISTRY.get(typeName);
}
exports.resolveMessageType = resolveMessageType;
/**
 * Resolves a descriptor for the given message type, if possible.
 * @template M
 * @param {!tsickle_constructors_4.MessageConstructor<M>} ctor
 * @return {(undefined|!tsickle_descriptor_1.DescriptorTypeReference<M, string>)}
 */
function resolveCachedMessageType(ctor) {
    /** @type {!MessageConstructorWithDescriptor<M>} */
    const ctorWithDescriptor = (/** @type {!MessageConstructorWithDescriptor<M>} */ (ctor));
    return (/** @type {!DescriptorTypeReferenceImpl<M>} */ (ctorWithDescriptor[DESCRIPTOR_TYPE_REFERENCE_CACHE_KEY]));
}
exports.resolveCachedMessageType = resolveCachedMessageType;
/**
 * Resolves an enum type name to a descriptor type reference.
 * @param {string} typeName
 * @return {(undefined|!tsickle_descriptor_1.EnumDescriptorTypeReference<number>)}
 */
function resolveEnumType(typeName) {
    if ((0, internal_1.startsWith)(typeName, '.'))
        typeName = typeName.substring(1);
    return GLOBAL_ENUM_TYPE_REGISTRY.get(typeName);
}
exports.resolveEnumType = resolveEnumType;
/**
 * @param {!Object} internalArg
 * @return {void}
 */
function assertInternalArg(internalArg) {
    if (internalArg !== internal_1.DESCRIPTOR_TYPE_REFERENCE_INTERNAL_ARG) {
        throw goog.DEBUG
            ? new Error('do not construct your own descriptors')
            : new Error();
    }
}
