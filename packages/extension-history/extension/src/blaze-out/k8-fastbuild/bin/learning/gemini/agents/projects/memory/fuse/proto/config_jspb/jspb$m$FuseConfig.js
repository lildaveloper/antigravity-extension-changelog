// source: learning/gemini/agents/projects/memory/fuse/proto/config.proto
/**
 * @fileoverview
 * @suppress {useOfGoogProvide,missingRequire}
 */
// NO CHECKED-IN PROTOBUF GENCODE
// GENERATED CODE -- DO NOT EDIT!

goog.provide('jspb$jetski_memory$MutableFuseConfig');
goog.provide('jspb$ro.jetski_memory$ReadonlyFuseConfig');

goog.require('jspb$google$protobuf$MutableDuration');
goog.require('jspb$jetski_memory$MutableFakeMemoryBackendConfig');
goog.require('jspb$jetski_memory$MutableMemoryMountConfig');
goog.require('jspb_internal_adapters');
goog.require('jspb_internal_public_for_gencode');
/** @suppress {extraRequire} */
goog.requireType('google3.javascript.apps.jspb.internal_records');
goog.requireType('google3.javascript.common.asserts.asserts');
goog.requireType('jspb$e.jetski_memory$FuseConfig$BackendConfigCase');
goog.requireType('jspb$jetski_memory$ImmutableFuseConfig');
goog.requireType('jspb$jetski_memory$ImmutableMemoryMountConfig');
goog.requireType('jspb$r$jetski_memory$FuseConfig$internalDoNotUseReader');
goog.requireType('jspb$ro.google$protobuf$ReadonlyDuration');
goog.requireType('jspb$ro.jetski_memory$ReadonlyFakeMemoryBackendConfig');
goog.requireType('jspb$ro.jetski_memory$ReadonlyMemoryMountConfig');

/**
 * @final
 * @extends {jspb_internal_public_for_gencode.GeneratedMessage<!jspb$jetski_memory$ImmutableFuseConfig>}
 * @implements {jspb$r$jetski_memory$FuseConfig$internalDoNotUseReader}
 */
jspb$jetski_memory$MutableFuseConfig = class extends jspb_internal_public_for_gencode.GeneratedMessage {
  /**
   * @usedViaDotConstructor
   * @param {?Array<?>=} data See go/jspb-api-gotchas#construct_from_array
   */
  constructor(data) {
    super(data);
  }


  /**
   * @override
   * @return {!jspb$e.jetski_memory$FuseConfig$BackendConfigCase}
   */
  getBackendConfigCase() {
    return /** @type {!jspb$e.jetski_memory$FuseConfig$BackendConfigCase} */(jspb_internal_adapters.computeOneofCase(this, jspb$jetski_memory$MutableFuseConfig.oneofGroup_backend_config_));
  }


  /**
   * @return {!jspb$jetski_memory$MutableFuseConfig}
   */
  clearBackendConfig() {
    return jspb_internal_adapters.clearAllFieldsInOneof(this, jspb$jetski_memory$MutableFuseConfig.oneofGroup_backend_config_);
  }


  /**
   * optional string config = 1;
   * @override
   * @return {string}
   */
  getConfig() {
    return jspb_internal_adapters.getStringFieldWithDefault(this, 1, "~/.gemini/config/memory.txtpb");
  }


  /**
   * @param {string|null|undefined} value
   * @return {!jspb$jetski_memory$MutableFuseConfig} returns this
   */
  setConfig(value) {
    return jspb_internal_adapters.setStringField(this, 1, value);
  }


  /**
   * Clears the field.
   * @return {!jspb$jetski_memory$MutableFuseConfig} returns this
   */
  clearConfig() {
    return jspb_internal_adapters.clearField(this, 1);
  }


  /**
   * Returns whether this field is set.
   * @override
   * @return {boolean}
   */
  hasConfig() {
    return jspb_internal_adapters.hasStringField(this, 1);
  }


  /**
   * optional string config = 1;
   * @override
   * @return {string|undefined}
   */
  getConfigOrUndefined() {
    return jspb_internal_adapters.getStringFieldOrUndefined(this, 1);
  }


  /**
   * optional string smith_backend_target = 2;
   * @override
   * @return {string}
   * @deprecated
   */
  getSmithBackendTarget() {
    return jspb_internal_adapters.getOneofStringFieldWithDefault(this, 2, jspb$jetski_memory$MutableFuseConfig.oneofGroup_backend_config_);
  }


  /**
   * @param {string|null|undefined} value
   * @return {!jspb$jetski_memory$MutableFuseConfig} returns this
   * @deprecated
   */
  setSmithBackendTarget(value) {
    return jspb_internal_adapters.setOneofStringField(this, 2, jspb$jetski_memory$MutableFuseConfig.oneofGroup_backend_config_, value);
  }


  /**
   * Clears the field.
   * @return {!jspb$jetski_memory$MutableFuseConfig} returns this
   * @deprecated
   */
  clearSmithBackendTarget() {
    return jspb_internal_adapters.clearOneofField(this, 2, jspb$jetski_memory$MutableFuseConfig.oneofGroup_backend_config_);
  }


  /**
   * Returns whether this field is set.
   * @override
   * @return {boolean}
   * @deprecated
   */
  hasSmithBackendTarget() {
    return jspb_internal_adapters.hasOneofStringField(this, 2, jspb$jetski_memory$MutableFuseConfig.oneofGroup_backend_config_);
  }


  /**
   * optional string smith_backend_target = 2;
   * @override
   * @return {string|undefined}
   * @deprecated
   */
  getSmithBackendTargetOrUndefined() {
    return jspb_internal_adapters.getOneofStringFieldOrUndefined(this, 2, jspb$jetski_memory$MutableFuseConfig.oneofGroup_backend_config_);
  }


  /**
   * optional string dumbo_backend_target = 26;
   * @override
   * @return {string}
   * @deprecated
   */
  getDumboBackendTarget() {
    return jspb_internal_adapters.getOneofStringFieldWithDefault(this, 26, jspb$jetski_memory$MutableFuseConfig.oneofGroup_backend_config_);
  }


  /**
   * @param {string|null|undefined} value
   * @return {!jspb$jetski_memory$MutableFuseConfig} returns this
   * @deprecated
   */
  setDumboBackendTarget(value) {
    return jspb_internal_adapters.setOneofStringField(this, 26, jspb$jetski_memory$MutableFuseConfig.oneofGroup_backend_config_, value);
  }


  /**
   * Clears the field.
   * @return {!jspb$jetski_memory$MutableFuseConfig} returns this
   * @deprecated
   */
  clearDumboBackendTarget() {
    return jspb_internal_adapters.clearOneofField(this, 26, jspb$jetski_memory$MutableFuseConfig.oneofGroup_backend_config_);
  }


  /**
   * Returns whether this field is set.
   * @override
   * @return {boolean}
   * @deprecated
   */
  hasDumboBackendTarget() {
    return jspb_internal_adapters.hasOneofStringField(this, 26, jspb$jetski_memory$MutableFuseConfig.oneofGroup_backend_config_);
  }


  /**
   * optional string dumbo_backend_target = 26;
   * @override
   * @return {string|undefined}
   * @deprecated
   */
  getDumboBackendTargetOrUndefined() {
    return jspb_internal_adapters.getOneofStringFieldOrUndefined(this, 26, jspb$jetski_memory$MutableFuseConfig.oneofGroup_backend_config_);
  }


  /**
   * optional FakeMemoryBackendConfig fake_backend = 21;
   * @override
   * @return {!jspb$jetski_memory$MutableFakeMemoryBackendConfig|undefined}
   * @deprecated
   */
  getFakeBackend() {
    return jspb_internal_adapters.getOneofWrapperFieldOrUndefined(this, jspb$jetski_memory$MutableFakeMemoryBackendConfig, 21, jspb$jetski_memory$MutableFuseConfig.oneofGroup_backend_config_);
  }


  /**
   * optional FakeMemoryBackendConfig fake_backend = 21;
   * @override
   * @return {!jspb$ro.jetski_memory$ReadonlyFakeMemoryBackendConfig}
   * @deprecated
   */
  getReadonlyFakeBackend() {
    return jspb_internal_adapters.getReadonlyOneofWrapperField(this, jspb$jetski_memory$MutableFakeMemoryBackendConfig, 21, jspb$jetski_memory$MutableFuseConfig.oneofGroup_backend_config_);
  }


  /**
   * optional FakeMemoryBackendConfig fake_backend = 21;
   * @param {!jspb_internal_public_for_gencode.OrUndefinedToken<U>=} legacyOrUndefined
   * @return {!jspb$jetski_memory$MutableFakeMemoryBackendConfig|R}
   * @template U
   * @template R := cond(eq(U, 'undefined'), 'undefined', 'jspb$jetski_memory$MutableFakeMemoryBackendConfig') =:
   * @tsType (legacyOrUndefined: import('google3/javascript/apps/jspb/internal_public').OrUndefinedToken<undefined>): ಠ_ಠ.clutz.jspb$jetski_memory$MutableFakeMemoryBackendConfig|undefined
   * @tsType (): ಠ_ಠ.clutz.jspb$jetski_memory$MutableFakeMemoryBackendConfig
   * @deprecated
   */
  getMutableFakeBackend(legacyOrUndefined) {
    return jspb_internal_adapters.getMutableOneofWrapperField(this, jspb$jetski_memory$MutableFakeMemoryBackendConfig, 21, jspb$jetski_memory$MutableFuseConfig.oneofGroup_backend_config_, legacyOrUndefined);
  }


  /**
   * @param {!jspb$ro.jetski_memory$ReadonlyFakeMemoryBackendConfig|null|undefined} value
   * @return {!jspb$jetski_memory$MutableFuseConfig} returns this
   * @deprecated
   */
  setFakeBackend(value) {
    return jspb_internal_adapters.setOneofWrapperField(this, jspb$jetski_memory$MutableFakeMemoryBackendConfig, 21, jspb$jetski_memory$MutableFuseConfig.oneofGroup_backend_config_, value);
  }


  /**
   * Clears the field.
   * @return {!jspb$jetski_memory$MutableFuseConfig} returns this
   * @deprecated
   */
  clearFakeBackend() {
    return jspb_internal_adapters.clearOneofField(this, 21, jspb$jetski_memory$MutableFuseConfig.oneofGroup_backend_config_);
  }


  /**
   * Returns whether this field is set.
   * @override
   * @return {boolean}
   * @deprecated
   */
  hasFakeBackend() {
    return jspb_internal_adapters.hasOneofWrapperField(this, jspb$jetski_memory$MutableFakeMemoryBackendConfig, 21, jspb$jetski_memory$MutableFuseConfig.oneofGroup_backend_config_);
  }


  /**
   * optional FakeMemoryBackendConfig fake_backend = 21;
   * @override
   * @return {!jspb$ro.jetski_memory$ReadonlyFakeMemoryBackendConfig|undefined}
   * @deprecated
   */
  getFakeBackendOrUndefined() {
    return jspb_internal_adapters.getReadonlyOneofWrapperFieldOrUndefined(this, jspb$jetski_memory$MutableFakeMemoryBackendConfig, 21, jspb$jetski_memory$MutableFuseConfig.oneofGroup_backend_config_);
  }


  /**
   * optional string root_dir = 12;
   * @override
   * @return {string}
   */
  getRootDir() {
    return jspb_internal_adapters.getStringFieldWithDefault(this, 12, "~/memory");
  }


  /**
   * @param {string|null|undefined} value
   * @return {!jspb$jetski_memory$MutableFuseConfig} returns this
   */
  setRootDir(value) {
    return jspb_internal_adapters.setStringField(this, 12, value);
  }


  /**
   * Clears the field.
   * @return {!jspb$jetski_memory$MutableFuseConfig} returns this
   */
  clearRootDir() {
    return jspb_internal_adapters.clearField(this, 12);
  }


  /**
   * Returns whether this field is set.
   * @override
   * @return {boolean}
   */
  hasRootDir() {
    return jspb_internal_adapters.hasStringField(this, 12);
  }


  /**
   * optional string root_dir = 12;
   * @override
   * @return {string|undefined}
   */
  getRootDirOrUndefined() {
    return jspb_internal_adapters.getStringFieldOrUndefined(this, 12);
  }


  /**
   * repeated string memory_groups = 20;
   * @override
   * @param {!jspb_internal_public_for_gencode.DoNotFreezeToken=} freezeOptOut
   * @tsType (freezeOptOut: import('google3/javascript/apps/jspb/internal_public').DoNotFreezeToken): string[]
   * @tsType (): readonly string[]
   * @return {!ReadonlyArray<string>}
   * @deprecated
   */
  getMemoryGroupsList(freezeOptOut) {
    return jspb_internal_adapters.getRepeatedStringField(this, 20, jspb_internal_adapters.getRepeatedFieldReturnType(freezeOptOut));
  }


  /**
   * @param {!ReadonlyArray<string>|null|undefined} value
   * @return {!jspb$jetski_memory$MutableFuseConfig} returns this
   * @deprecated
   */
  setMemoryGroupsList(value) {
    return jspb_internal_adapters.setRepeatedStringField(this, 20, value);
  }


  /**
   * @param {string} value
   * @param {number=} index
   * @return {!jspb$jetski_memory$MutableFuseConfig} returns this
   * @deprecated
   */
  addMemoryGroups(value, index) {
    return jspb_internal_adapters.addToRepeatedStringField(this, 20, value, index);
  }


  /**
   * @param {!Iterable<string>} values
   * @return {!jspb$jetski_memory$MutableFuseConfig} returns this
   * @deprecated
   */
  addAllMemoryGroups(values) {
    return jspb_internal_adapters.addAllToRepeatedStringField(this, 20, values);
  }


  /**
   * @param {number=} index If not passed, defaults to the end.
   * @return {!jspb$jetski_memory$MutableFuseConfig} returns this
   * @deprecated
   */
  removeMemoryGroups(index) {
    return jspb_internal_adapters.removeFromRepeatedStringField(this, 20, index);
  }


  /**
   * Returns value at `index`.
   * @override
   * @param {number} index
   * @return {string}
   * @deprecated
   */
  getMemoryGroups(index) {
   return jspb_internal_adapters.getRepeatedIndexedStringField(this, 20, index);
  }


  /**
   * @param {number} index
   * @param {string} value
   * @return {!jspb$jetski_memory$MutableFuseConfig} returns this
   * @deprecated
   */
  setMemoryGroups(index, value) {
    return jspb_internal_adapters.setRepeatedIndexedStringField(this, 20, index, value);
  }


  /**
   * Clears the field.
   * @return {!jspb$jetski_memory$MutableFuseConfig} returns this
   * @deprecated
   */
  clearMemoryGroupsList() {
    return jspb_internal_adapters.clearField(this, 20);
  }


  /**
   * Returns the size of this field.
   * @override
   * @return {number}
   * @deprecated
   */
  getMemoryGroupsCount() {
    return jspb_internal_adapters.getRepeatedStringCount(this, 20);
  }


  /**
   * map<string, MemoryMountConfig> mounts = 27;
   * @override
   * @return {!Map<string,!jspb$jetski_memory$MutableMemoryMountConfig>}
   */
  getMountsMap() {
    return jspb_internal_adapters.getStringWrapperMapField(this, 27,
        jspb$jetski_memory$MutableMemoryMountConfig);}



  /**
   * map<string, MemoryMountConfig> mounts = 27;
   * @override
   * @return {!Map<string,!jspb$ro.jetski_memory$ReadonlyMemoryMountConfig>}
   */
  getReadonlyMountsMap() {
    return jspb_internal_adapters.getReadonlyStringWrapperMapField(this, 27,
        jspb$jetski_memory$MutableMemoryMountConfig);}



  /**
   * @param {string} key The key of value to set or replace.
   * @param {!jspb$ro.jetski_memory$ReadonlyMemoryMountConfig} value The new value.
   * @return {!jspb$jetski_memory$MutableFuseConfig} returns this
   */
  putMounts(key, value) {
    return jspb_internal_adapters.putStringWrapperMapField(this, 27, key, value, jspb$jetski_memory$MutableMemoryMountConfig);
  }


  /**
   * @param {!ReadonlyMap<string,!jspb$ro.jetski_memory$ReadonlyMemoryMountConfig>} value The new values.
   * @return {!jspb$jetski_memory$MutableFuseConfig} returns this
   */
  putAllMounts(value) {
    return jspb_internal_adapters.putAllStringWrapperMapField(this, 27, value, jspb$jetski_memory$MutableMemoryMountConfig);
  }


  /**
   * @param {!ReadonlyMap<string,!jspb$ro.jetski_memory$ReadonlyMemoryMountConfig>|undefined} value The new values.
   * @return {!jspb$jetski_memory$MutableFuseConfig} returns this
   */
  setMountsMap(value) {
    return jspb_internal_adapters.setStringWrapperMapField(this, 27, value, jspb$jetski_memory$MutableMemoryMountConfig);
  }


  /**
   * @param {string} key The key of value to remove.
   * @return {!jspb$jetski_memory$MutableFuseConfig} returns this
   */
  deleteMounts(key) {
    return jspb_internal_adapters.deleteStringWrapperMapField(this, 27, key, jspb$jetski_memory$MutableMemoryMountConfig);
  }


  /**
   * Clears the field.
   * @return {!jspb$jetski_memory$MutableFuseConfig} returns this
   */
  clearMountsMap() {
    return jspb_internal_adapters.clearMapField(this, 27);
  }


  /**
   * optional bool debug = 5;
   * @override
   * @return {boolean}
   */
  getDebug() {
    return jspb_internal_adapters.getBooleanFieldWithDefault(this, 5);
  }


  /**
   * @param {boolean|null|undefined} value
   * @return {!jspb$jetski_memory$MutableFuseConfig} returns this
   */
  setDebug(value) {
    return jspb_internal_adapters.setBooleanField(this, 5, value);
  }


  /**
   * Clears the field.
   * @return {!jspb$jetski_memory$MutableFuseConfig} returns this
   */
  clearDebug() {
    return jspb_internal_adapters.clearField(this, 5);
  }


  /**
   * Returns whether this field is set.
   * @override
   * @return {boolean}
   */
  hasDebug() {
    return jspb_internal_adapters.hasBooleanField(this, 5);
  }


  /**
   * optional bool debug = 5;
   * @override
   * @return {boolean|undefined}
   */
  getDebugOrUndefined() {
    return jspb_internal_adapters.getBooleanFieldOrUndefined(this, 5);
  }


  /**
   * optional string daemon_socket_file = 23;
   * @override
   * @return {string}
   */
  getDaemonSocketFile() {
    return jspb_internal_adapters.getStringFieldWithDefault(this, 23);
  }


  /**
   * @param {string|null|undefined} value
   * @return {!jspb$jetski_memory$MutableFuseConfig} returns this
   */
  setDaemonSocketFile(value) {
    return jspb_internal_adapters.setStringField(this, 23, value);
  }


  /**
   * Clears the field.
   * @return {!jspb$jetski_memory$MutableFuseConfig} returns this
   */
  clearDaemonSocketFile() {
    return jspb_internal_adapters.clearField(this, 23);
  }


  /**
   * Returns whether this field is set.
   * @override
   * @return {boolean}
   */
  hasDaemonSocketFile() {
    return jspb_internal_adapters.hasStringField(this, 23);
  }


  /**
   * optional string daemon_socket_file = 23;
   * @override
   * @return {string|undefined}
   */
  getDaemonSocketFileOrUndefined() {
    return jspb_internal_adapters.getStringFieldOrUndefined(this, 23);
  }


  /**
   * optional int32 daemon_port = 28;
   * @override
   * @return {number}
   */
  getDaemonPort() {
    return jspb_internal_adapters.getInt32FieldWithDefault(this, 28);
  }


  /**
   * @param {number|null|undefined} value
   * @return {!jspb$jetski_memory$MutableFuseConfig} returns this
   */
  setDaemonPort(value) {
    return jspb_internal_adapters.setInt32Field(this, 28, value);
  }


  /**
   * Clears the field.
   * @return {!jspb$jetski_memory$MutableFuseConfig} returns this
   */
  clearDaemonPort() {
    return jspb_internal_adapters.clearField(this, 28);
  }


  /**
   * Returns whether this field is set.
   * @override
   * @return {boolean}
   */
  hasDaemonPort() {
    return jspb_internal_adapters.hasInt32Field(this, 28);
  }


  /**
   * optional int32 daemon_port = 28;
   * @override
   * @return {number|undefined}
   */
  getDaemonPortOrUndefined() {
    return jspb_internal_adapters.getInt32FieldOrUndefined(this, 28);
  }


  /**
   * optional string log_dir = 15;
   * @override
   * @return {string}
   */
  getLogDir() {
    return jspb_internal_adapters.getStringFieldWithDefault(this, 15);
  }


  /**
   * @param {string|null|undefined} value
   * @return {!jspb$jetski_memory$MutableFuseConfig} returns this
   */
  setLogDir(value) {
    return jspb_internal_adapters.setStringField(this, 15, value);
  }


  /**
   * Clears the field.
   * @return {!jspb$jetski_memory$MutableFuseConfig} returns this
   */
  clearLogDir() {
    return jspb_internal_adapters.clearField(this, 15);
  }


  /**
   * Returns whether this field is set.
   * @override
   * @return {boolean}
   */
  hasLogDir() {
    return jspb_internal_adapters.hasStringField(this, 15);
  }


  /**
   * optional string log_dir = 15;
   * @override
   * @return {string|undefined}
   */
  getLogDirOrUndefined() {
    return jspb_internal_adapters.getStringFieldOrUndefined(this, 15);
  }


  /**
   * optional int32 num_threads = 6;
   * @override
   * @return {number}
   */
  getNumThreads() {
    return jspb_internal_adapters.getInt32FieldWithDefault(this, 6, 4);
  }


  /**
   * @param {number|null|undefined} value
   * @return {!jspb$jetski_memory$MutableFuseConfig} returns this
   */
  setNumThreads(value) {
    return jspb_internal_adapters.setInt32Field(this, 6, value);
  }


  /**
   * Clears the field.
   * @return {!jspb$jetski_memory$MutableFuseConfig} returns this
   */
  clearNumThreads() {
    return jspb_internal_adapters.clearField(this, 6);
  }


  /**
   * Returns whether this field is set.
   * @override
   * @return {boolean}
   */
  hasNumThreads() {
    return jspb_internal_adapters.hasInt32Field(this, 6);
  }


  /**
   * optional int32 num_threads = 6;
   * @override
   * @return {number|undefined}
   */
  getNumThreadsOrUndefined() {
    return jspb_internal_adapters.getInt32FieldOrUndefined(this, 6);
  }


  /**
   * optional bool async_flush = 14;
   * @override
   * @return {boolean}
   */
  getAsyncFlush() {
    return jspb_internal_adapters.getBooleanFieldWithDefault(this, 14, true);
  }


  /**
   * @param {boolean|null|undefined} value
   * @return {!jspb$jetski_memory$MutableFuseConfig} returns this
   */
  setAsyncFlush(value) {
    return jspb_internal_adapters.setBooleanField(this, 14, value);
  }


  /**
   * Clears the field.
   * @return {!jspb$jetski_memory$MutableFuseConfig} returns this
   */
  clearAsyncFlush() {
    return jspb_internal_adapters.clearField(this, 14);
  }


  /**
   * Returns whether this field is set.
   * @override
   * @return {boolean}
   */
  hasAsyncFlush() {
    return jspb_internal_adapters.hasBooleanField(this, 14);
  }


  /**
   * optional bool async_flush = 14;
   * @override
   * @return {boolean|undefined}
   */
  getAsyncFlushOrUndefined() {
    return jspb_internal_adapters.getBooleanFieldOrUndefined(this, 14);
  }


  /**
   * optional google.protobuf.Duration debounce_window = 18;
   * @override
   * @return {!jspb$google$protobuf$MutableDuration|undefined}
   */
  getDebounceWindow() {
    return jspb_internal_adapters.getWrapperFieldOrUndefined(this, jspb$google$protobuf$MutableDuration, 18);
  }


  /**
   * optional google.protobuf.Duration debounce_window = 18;
   * @override
   * @return {!jspb$ro.google$protobuf$ReadonlyDuration}
   */
  getReadonlyDebounceWindow() {
    return jspb_internal_adapters.getReadonlyWrapperField(this, jspb$google$protobuf$MutableDuration, 18);
  }


  /**
   * optional google.protobuf.Duration debounce_window = 18;
   * @param {!jspb_internal_public_for_gencode.OrUndefinedToken<U>=} legacyOrUndefined
   * @return {!jspb$google$protobuf$MutableDuration|R}
   * @template U
   * @template R := cond(eq(U, 'undefined'), 'undefined', 'jspb$google$protobuf$MutableDuration') =:
   * @tsType (legacyOrUndefined: import('google3/javascript/apps/jspb/internal_public').OrUndefinedToken<undefined>): ಠ_ಠ.clutz.jspb$google$protobuf$MutableDuration|undefined
   * @tsType (): ಠ_ಠ.clutz.jspb$google$protobuf$MutableDuration
   */
  getMutableDebounceWindow(legacyOrUndefined) {
    return jspb_internal_adapters.getMutableWrapperField(this, jspb$google$protobuf$MutableDuration, 18, legacyOrUndefined);
  }


  /**
   * @param {!jspb$ro.google$protobuf$ReadonlyDuration|null|undefined} value
   * @return {!jspb$jetski_memory$MutableFuseConfig} returns this
   */
  setDebounceWindow(value) {
    return jspb_internal_adapters.setWrapperField(this, jspb$google$protobuf$MutableDuration, 18, value);
  }


  /**
   * Clears the field.
   * @return {!jspb$jetski_memory$MutableFuseConfig} returns this
   */
  clearDebounceWindow() {
    return jspb_internal_adapters.clearField(this, 18);
  }


  /**
   * Returns whether this field is set.
   * @override
   * @return {boolean}
   */
  hasDebounceWindow() {
    return jspb_internal_adapters.hasWrapperField(this, jspb$google$protobuf$MutableDuration, 18);
  }


  /**
   * optional google.protobuf.Duration debounce_window = 18;
   * @override
   * @return {!jspb$ro.google$protobuf$ReadonlyDuration|undefined}
   */
  getDebounceWindowOrUndefined() {
    return jspb_internal_adapters.getReadonlyWrapperFieldOrUndefined(this, jspb$google$protobuf$MutableDuration, 18);
  }


  /**
   * optional google.protobuf.Duration poll_changes_period = 19;
   * @override
   * @return {!jspb$google$protobuf$MutableDuration|undefined}
   */
  getPollChangesPeriod() {
    return jspb_internal_adapters.getWrapperFieldOrUndefined(this, jspb$google$protobuf$MutableDuration, 19);
  }


  /**
   * optional google.protobuf.Duration poll_changes_period = 19;
   * @override
   * @return {!jspb$ro.google$protobuf$ReadonlyDuration}
   */
  getReadonlyPollChangesPeriod() {
    return jspb_internal_adapters.getReadonlyWrapperField(this, jspb$google$protobuf$MutableDuration, 19);
  }


  /**
   * optional google.protobuf.Duration poll_changes_period = 19;
   * @param {!jspb_internal_public_for_gencode.OrUndefinedToken<U>=} legacyOrUndefined
   * @return {!jspb$google$protobuf$MutableDuration|R}
   * @template U
   * @template R := cond(eq(U, 'undefined'), 'undefined', 'jspb$google$protobuf$MutableDuration') =:
   * @tsType (legacyOrUndefined: import('google3/javascript/apps/jspb/internal_public').OrUndefinedToken<undefined>): ಠ_ಠ.clutz.jspb$google$protobuf$MutableDuration|undefined
   * @tsType (): ಠ_ಠ.clutz.jspb$google$protobuf$MutableDuration
   */
  getMutablePollChangesPeriod(legacyOrUndefined) {
    return jspb_internal_adapters.getMutableWrapperField(this, jspb$google$protobuf$MutableDuration, 19, legacyOrUndefined);
  }


  /**
   * @param {!jspb$ro.google$protobuf$ReadonlyDuration|null|undefined} value
   * @return {!jspb$jetski_memory$MutableFuseConfig} returns this
   */
  setPollChangesPeriod(value) {
    return jspb_internal_adapters.setWrapperField(this, jspb$google$protobuf$MutableDuration, 19, value);
  }


  /**
   * Clears the field.
   * @return {!jspb$jetski_memory$MutableFuseConfig} returns this
   */
  clearPollChangesPeriod() {
    return jspb_internal_adapters.clearField(this, 19);
  }


  /**
   * Returns whether this field is set.
   * @override
   * @return {boolean}
   */
  hasPollChangesPeriod() {
    return jspb_internal_adapters.hasWrapperField(this, jspb$google$protobuf$MutableDuration, 19);
  }


  /**
   * optional google.protobuf.Duration poll_changes_period = 19;
   * @override
   * @return {!jspb$ro.google$protobuf$ReadonlyDuration|undefined}
   */
  getPollChangesPeriodOrUndefined() {
    return jspb_internal_adapters.getReadonlyWrapperFieldOrUndefined(this, jspb$google$protobuf$MutableDuration, 19);
  }


  /**
   * optional int64 cache_max_mb = 9;
   * @override
   * @return {!gbigint}
   */
  getCacheMaxMb() {
    return jspb_internal_adapters.getInt64GbigintFieldWithDefault(this, 9, jspb_internal_public_for_gencode.toGbigint(512));
  }


  /**
   * optional int64 cache_max_mb = 9;
   * @override
   * @return {number}
   * @deprecated unsafe int64 behavior: go/jspb-api-gotchas#int64
   */
  getCacheMaxMb_asLegacyNumberOrString() {
    return jspb_internal_adapters.getInt64FieldWithDefault(this, 9, 512);
  }


  /**
   * optional int64 cache_max_mb = 9;
   * @override
   * @return {string}
   */
  getCacheMaxMb_asString() {
    return jspb_internal_adapters.getInt64FieldWithDefault_asString(this, 9, '512');
  }


  /**
   * @param {number|string|!gbigint|null|undefined} value
   * @return {!jspb$jetski_memory$MutableFuseConfig} returns this
   */
  setCacheMaxMb(value) {
    return jspb_internal_adapters.setInt64Field(this, 9, value);
  }


  /**
   * Clears the field.
   * @return {!jspb$jetski_memory$MutableFuseConfig} returns this
   */
  clearCacheMaxMb() {
    return jspb_internal_adapters.clearField(this, 9);
  }


  /**
   * Returns whether this field is set.
   * @override
   * @return {boolean}
   */
  hasCacheMaxMb() {
    return jspb_internal_adapters.hasInt64Field(this, 9);
  }


  /**
   * optional int64 cache_max_mb = 9;
   * @override
   * @return {!gbigint|undefined}
   */
  getCacheMaxMbOrUndefined() {
    return jspb_internal_adapters.getInt64GbigintFieldOrUndefined(this, 9);
  }


  /**
   * optional int64 cache_max_mb = 9;
   * @override
   * @return {number|undefined}
   * @deprecated unsafe int64 behavior: go/jspb-api-gotchas#int64
   */
  getCacheMaxMbOrUndefined_asLegacyNumberOrString() {
    return jspb_internal_adapters.getInt64FieldOrUndefined(this, 9);
  }


  /**
   * optional int64 cache_max_mb = 9;
   * @override
   * @return {string|undefined}
   */
  getCacheMaxMbOrUndefined_asString() {
    return jspb_internal_adapters.getInt64FieldOrUndefined_asString(this, 9);
  }


  /**
   * optional int64 sql_max_ram_mb = 30;
   * @override
   * @return {!gbigint}
   */
  getSqlMaxRamMb() {
    return jspb_internal_adapters.getInt64GbigintFieldWithDefault(this, 30, jspb_internal_public_for_gencode.toGbigint(8192));
  }


  /**
   * optional int64 sql_max_ram_mb = 30;
   * @override
   * @return {number}
   * @deprecated unsafe int64 behavior: go/jspb-api-gotchas#int64
   */
  getSqlMaxRamMb_asLegacyNumberOrString() {
    return jspb_internal_adapters.getInt64FieldWithDefault(this, 30, 8192);
  }


  /**
   * optional int64 sql_max_ram_mb = 30;
   * @override
   * @return {string}
   */
  getSqlMaxRamMb_asString() {
    return jspb_internal_adapters.getInt64FieldWithDefault_asString(this, 30, '8192');
  }


  /**
   * @param {number|string|!gbigint|null|undefined} value
   * @return {!jspb$jetski_memory$MutableFuseConfig} returns this
   */
  setSqlMaxRamMb(value) {
    return jspb_internal_adapters.setInt64Field(this, 30, value);
  }


  /**
   * Clears the field.
   * @return {!jspb$jetski_memory$MutableFuseConfig} returns this
   */
  clearSqlMaxRamMb() {
    return jspb_internal_adapters.clearField(this, 30);
  }


  /**
   * Returns whether this field is set.
   * @override
   * @return {boolean}
   */
  hasSqlMaxRamMb() {
    return jspb_internal_adapters.hasInt64Field(this, 30);
  }


  /**
   * optional int64 sql_max_ram_mb = 30;
   * @override
   * @return {!gbigint|undefined}
   */
  getSqlMaxRamMbOrUndefined() {
    return jspb_internal_adapters.getInt64GbigintFieldOrUndefined(this, 30);
  }


  /**
   * optional int64 sql_max_ram_mb = 30;
   * @override
   * @return {number|undefined}
   * @deprecated unsafe int64 behavior: go/jspb-api-gotchas#int64
   */
  getSqlMaxRamMbOrUndefined_asLegacyNumberOrString() {
    return jspb_internal_adapters.getInt64FieldOrUndefined(this, 30);
  }


  /**
   * optional int64 sql_max_ram_mb = 30;
   * @override
   * @return {string|undefined}
   */
  getSqlMaxRamMbOrUndefined_asString() {
    return jspb_internal_adapters.getInt64FieldOrUndefined_asString(this, 30);
  }


  /**
   * optional bool disable_skills = 29;
   * @override
   * @return {boolean}
   */
  getDisableSkills() {
    return jspb_internal_adapters.getBooleanFieldWithDefault(this, 29);
  }


  /**
   * @param {boolean|null|undefined} value
   * @return {!jspb$jetski_memory$MutableFuseConfig} returns this
   */
  setDisableSkills(value) {
    return jspb_internal_adapters.setBooleanField(this, 29, value);
  }


  /**
   * Clears the field.
   * @return {!jspb$jetski_memory$MutableFuseConfig} returns this
   */
  clearDisableSkills() {
    return jspb_internal_adapters.clearField(this, 29);
  }


  /**
   * Returns whether this field is set.
   * @override
   * @return {boolean}
   */
  hasDisableSkills() {
    return jspb_internal_adapters.hasBooleanField(this, 29);
  }


  /**
   * optional bool disable_skills = 29;
   * @override
   * @return {boolean|undefined}
   */
  getDisableSkillsOrUndefined() {
    return jspb_internal_adapters.getBooleanFieldOrUndefined(this, 29);
  }


};

/**
 * @override
 * @return {!jspb$jetski_memory$ImmutableFuseConfig}
 */
jspb$jetski_memory$MutableFuseConfig.prototype.toImmutable;
/**
 * @override
 * @return {!jspb$jetski_memory$MutableFuseConfig}
 */
jspb$jetski_memory$MutableFuseConfig.prototype.clone;
/**
 * @const {function(string):!jspb$jetski_memory$MutableFuseConfig}
 */
jspb$jetski_memory$MutableFuseConfig.deserialize = /** @pureOrBreakMyCode */(jspb_internal_public_for_gencode.makeMutableDeserializeFunction(jspb$jetski_memory$MutableFuseConfig));

/**
 * Returns whether the given value is an instance of jspb$jetski_memory$MutableFuseConfig.
 * @const {!google3.javascript.common.asserts.asserts.TypeGuard<!jspb$jetski_memory$MutableFuseConfig>}
 */
jspb$jetski_memory$MutableFuseConfig.hasInstance = /** @pureOrBreakMyCode */ (jspb_internal_public_for_gencode.makeHasMutableInstance(jspb$jetski_memory$MutableFuseConfig));

/**
 * Object form of FuseConfig as accepted by the `fromObject` method.
 * @typedef {{
 *  config: (?string|undefined),
 *  smithBackendTarget: (?string|undefined),
 *  dumboBackendTarget: (?string|undefined),
 *  fakeBackend: (?jspb$jetski_memory$MutableFakeMemoryBackendConfig.ObjectFormat|undefined),
 *  rootDir: (?string|undefined),
 *  memoryGroupsList: (?Array<string>|undefined),
 *  mountsMap: (?Array<!Array<!jspb$jetski_memory$MutableMemoryMountConfig.ObjectFormat|string>>|undefined),
 *  debug: (?boolean|undefined),
 *  daemonSocketFile: (?string|undefined),
 *  daemonPort: (?number|undefined),
 *  logDir: (?string|undefined),
 *  numThreads: (?number|undefined),
 *  asyncFlush: (?boolean|undefined),
 *  debounceWindow: (?jspb$google$protobuf$MutableDuration.ObjectFormat|undefined),
 *  pollChangesPeriod: (?jspb$google$protobuf$MutableDuration.ObjectFormat|undefined),
 *  cacheMaxMb: (?number|string|undefined),
 *  sqlMaxRamMb: (?number|string|undefined),
 *  disableSkills: (?boolean|undefined)
 * }}
 */
jspb$jetski_memory$MutableFuseConfig.ObjectFormat;
/**
 * Serializes the message to binary data (in protobuf wire format).
 *
 * If you see this method undefined, you probably need to import
 * the message type directly.
 *
 * @return {!Uint8Array}
 * @deprecated please call the static method instead: this one is only sometimes defined.
 */
jspb$jetski_memory$MutableFuseConfig.prototype.serializeBinary;

/**
 * Serializes the message to an unstable object format.
 *
 * @private
 * @return {!jspb$jetski_memory$MutableFuseConfig.ObjectFormat}
 * @deprecated see go/jspb-api-gotchas#objects. This is only sometimes defined.
 */
jspb$jetski_memory$MutableFuseConfig.prototype.toObject;

if (jspb_internal_public_for_gencode.GENERATE_TYPE_NAME_PROPERTIES) {
  /**
   * The proto type name for jetski_memory$MutableFuseConfig.
   *
   * @nodts
   * @nocollapse
   * @const {string|undefined}
   */
  jspb$jetski_memory$MutableFuseConfig.internalDoNotUse_debugOnlyProtoTypeName = "jetski_memory.FuseConfig";
}

/**
 * @typedef {!jspb$jetski_memory$ImmutableFuseConfig|!jspb$jetski_memory$MutableFuseConfig}
 */
jspb$ro.jetski_memory$ReadonlyFuseConfig = {};

if (goog.DEBUG && !COMPILED) {
  /**
   * @override
   * @return {*}
   * @tsType (): {protoName: 'jetski_memory.FuseConfig'}
   */
  jspb$jetski_memory$MutableFuseConfig.prototype.internalDoNotUse_annotations;
}
/**
 * Oneof group definition.
 * @private {!ReadonlyArray<number>}
 * @const
 * @nodts
 */
jspb$jetski_memory$MutableFuseConfig.oneofGroup_backend_config_ = [2,21,26];

if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   * @type {string}
   */
  jspb$jetski_memory$MutableFuseConfig.displayName = 'proto.jetski_memory.FuseConfig';
}
/**
 * Interface form of FuseConfig as accepted by `fromFields` and produced by `getFields`.
 * @typedef {{
 *  config: (string|undefined),
 *  smithBackendTarget: (string|undefined),
 *  dumboBackendTarget: (string|undefined),
 *  fakeBackend: (!jspb$ro.jetski_memory$ReadonlyFakeMemoryBackendConfig|undefined),
 *  rootDir: (string|undefined),
 *  memoryGroupsList: (!ReadonlyArray<string>|undefined),
 *  mountsMap: (!ReadonlyMap<string,!jspb$ro.jetski_memory$ReadonlyMemoryMountConfig>|!ReadonlyMap<string,!jspb$jetski_memory$ImmutableMemoryMountConfig>|undefined),
 *  debug: (boolean|undefined),
 *  daemonSocketFile: (string|undefined),
 *  daemonPort: (number|undefined),
 *  logDir: (string|undefined),
 *  numThreads: (number|undefined),
 *  asyncFlush: (boolean|undefined),
 *  debounceWindow: (!jspb$ro.google$protobuf$ReadonlyDuration|undefined),
 *  pollChangesPeriod: (!jspb$ro.google$protobuf$ReadonlyDuration|undefined),
 *  cacheMaxMb: (!gbigint|undefined),
 *  cacheMaxMb_asLegacyNumberOrString: (number|string|undefined),
 *  sqlMaxRamMb: (!gbigint|undefined),
 *  sqlMaxRamMb_asLegacyNumberOrString: (number|string|undefined),
 *  disableSkills: (boolean|undefined)
 * }}
 */
jspb$jetski_memory$MutableFuseConfig.FieldsInterface;

/**
 * Constructs a set of proto fields into an immutable proto.
 *
 * This method can only be called in TS and must be passed an object.
 * literal with keys matching the setter names (so where you have
 * setFooList on the type, you can write {fooList: ...} here).
 *
 * See go/jspb-fields-interface for more information.
 *
 * This record format is **not a serialization format**.
 * @package this cannot be called from JS.
 * @param {!jspb$jetski_memory$MutableFuseConfig.FieldsInterface} record
 * @return {!jspb$jetski_memory$ImmutableFuseConfig}
 * @tsType (fields : import('google3/javascript/apps/jspb/internal_records').PartialFields<ಠ_ಠ.clutz.jspb$jetski_memory$MutableFuseConfig, ಠ_ಠ.clutz.jspb$jetski_memory$MutableFuseConfig.FieldsInterface, ಠ_ಠ.clutz.jspbInternalDoNotUse$RecordExtensionRegistry>): ಠ_ಠ.clutz.jspb$jetski_memory$ImmutableFuseConfig
 */
jspb$jetski_memory$MutableFuseConfig.fromFields = /** @pureOrBreakMyCode */ (jspb_internal_public_for_gencode.makeFromFieldsForTesting(jspb$jetski_memory$MutableFuseConfig));

/**
 * Retrieves the fields of this proto in a destructurable interface.
 *
 * This method can only be called in TS and the result must be
 * immediately destructured (so you can write
 * const {a} = Foo.getFields(value);).
 *
 * See go/jspb-fields-interface for more information.
 *
 * @package this cannot be called from JS.
 * @param {!jspb$ro.jetski_memory$ReadonlyFuseConfig} value
 * @return {!jspb$jetski_memory$MutableFuseConfig.FieldsInterface}
 * @tsType (value: ಠ_ಠ.clutz.jspb$ro.jetski_memory$ReadonlyFuseConfig): import('google3/javascript/apps/jspb/internal_records').ReadonlyFields<ಠ_ಠ.clutz.jspb$jetski_memory$MutableFuseConfig, ಠ_ಠ.clutz.jspb$jetski_memory$MutableFuseConfig.FieldsInterface, ಠ_ಠ.clutz.jspbInternalDoNotUse$RecordExtensionRegistry>
 */
jspb$jetski_memory$MutableFuseConfig.getFields = /** @pureOrBreakMyCode */ (jspb_internal_public_for_gencode.makeGetFieldsForTesting());

var jspb$jetski_memory$MutableMemoryConfig;
Object.defineProperty(this, 'jspb$jetski_memory$MutableMemoryConfig', {
  get() { return jspb$jetski_memory$MutableMemoryConfig; },
  set(v) { jspb$jetski_memory$MutableMemoryConfig = v; },
