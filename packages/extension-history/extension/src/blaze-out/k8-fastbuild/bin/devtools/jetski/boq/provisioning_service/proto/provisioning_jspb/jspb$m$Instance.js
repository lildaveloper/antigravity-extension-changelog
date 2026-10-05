// source: devtools/jetski/boq/provisioning_service/proto/provisioning.proto
/**
 * @fileoverview
 * @suppress {useOfGoogProvide,missingRequire}
 */
// NO CHECKED-IN PROTOBUF GENCODE
// GENERATED CODE -- DO NOT EDIT!

goog.provide('jspb$devtools_jetski_provisioning$MutableInstance');
goog.provide('jspb$ro.devtools_jetski_provisioning$ReadonlyInstance');

goog.require('jspb$devtools_jetski_provisioning$MutableInstanceMetrics');
goog.require('jspb$devtools_jetski_provisioning$storage$MutableSidecarStatusInfo');
goog.require('jspb$google$protobuf$MutableTimestamp');
goog.require('jspb_internal_adapters');
goog.require('jspb_internal_public_for_gencode');
/** @suppress {extraRequire} */
goog.requireType('google3.javascript.apps.jspb.internal_records');
goog.requireType('google3.javascript.common.asserts.asserts');
goog.requireType('jspb$devtools_jetski_provisioning$ImmutableInstance');
goog.requireType('jspb$e.devtools_jetski_provisioning$InstanceStatus');
goog.requireType('jspb$r$devtools_jetski_provisioning$Instance$internalDoNotUseReader');
goog.requireType('jspb$ro.devtools_jetski_provisioning$ReadonlyInstanceMetrics');
goog.requireType('jspb$ro.devtools_jetski_provisioning$storage$ReadonlySidecarStatusInfo');
goog.requireType('jspb$ro.google$protobuf$ReadonlyTimestamp');

/**
 * @final
 * @extends {jspb_internal_public_for_gencode.GeneratedMessage<!jspb$devtools_jetski_provisioning$ImmutableInstance>}
 * @implements {jspb$r$devtools_jetski_provisioning$Instance$internalDoNotUseReader}
 */
jspb$devtools_jetski_provisioning$MutableInstance = class extends jspb_internal_public_for_gencode.GeneratedMessage {
  /**
   * @usedViaDotConstructor
   * @param {?Array<?>=} data See go/jspb-api-gotchas#construct_from_array
   */
  constructor(data) {
    super(data);
  }


  /**
   * optional int32 replica_index = 1;
   * @override
   * @return {number}
   */
  getReplicaIndex() {
    return jspb_internal_adapters.getInt32FieldWithDefault(this, 1);
  }


  /**
   * @param {number|null|undefined} value
   * @return {!jspb$devtools_jetski_provisioning$MutableInstance} returns this
   */
  setReplicaIndex(value) {
    return jspb_internal_adapters.setInt32Field(this, 1, value);
  }


  /**
   * Clears the field.
   * @return {!jspb$devtools_jetski_provisioning$MutableInstance} returns this
   */
  clearReplicaIndex() {
    return jspb_internal_adapters.clearField(this, 1);
  }


  /**
   * Returns whether this field is set.
   * @override
   * @return {boolean}
   */
  hasReplicaIndex() {
    return jspb_internal_adapters.hasInt32Field(this, 1);
  }


  /**
   * optional int32 replica_index = 1;
   * @override
   * @return {number|undefined}
   */
  getReplicaIndexOrUndefined() {
    return jspb_internal_adapters.getInt32FieldOrUndefined(this, 1);
  }


  /**
   * optional string instance_id = 2;
   * @override
   * @return {string}
   */
  getInstanceId() {
    return jspb_internal_adapters.getStringFieldWithDefault(this, 2);
  }


  /**
   * @param {string|null|undefined} value
   * @return {!jspb$devtools_jetski_provisioning$MutableInstance} returns this
   */
  setInstanceId(value) {
    return jspb_internal_adapters.setStringField(this, 2, value);
  }


  /**
   * Clears the field.
   * @return {!jspb$devtools_jetski_provisioning$MutableInstance} returns this
   */
  clearInstanceId() {
    return jspb_internal_adapters.clearField(this, 2);
  }


  /**
   * Returns whether this field is set.
   * @override
   * @return {boolean}
   */
  hasInstanceId() {
    return jspb_internal_adapters.hasStringField(this, 2);
  }


  /**
   * optional string instance_id = 2;
   * @override
   * @return {string|undefined}
   */
  getInstanceIdOrUndefined() {
    return jspb_internal_adapters.getStringFieldOrUndefined(this, 2);
  }


  /**
   * optional string instance_fqdn = 3;
   * @override
   * @return {string}
   */
  getInstanceFqdn() {
    return jspb_internal_adapters.getStringFieldWithDefault(this, 3);
  }


  /**
   * @param {string|null|undefined} value
   * @return {!jspb$devtools_jetski_provisioning$MutableInstance} returns this
   */
  setInstanceFqdn(value) {
    return jspb_internal_adapters.setStringField(this, 3, value);
  }


  /**
   * Clears the field.
   * @return {!jspb$devtools_jetski_provisioning$MutableInstance} returns this
   */
  clearInstanceFqdn() {
    return jspb_internal_adapters.clearField(this, 3);
  }


  /**
   * Returns whether this field is set.
   * @override
   * @return {boolean}
   */
  hasInstanceFqdn() {
    return jspb_internal_adapters.hasStringField(this, 3);
  }


  /**
   * optional string instance_fqdn = 3;
   * @override
   * @return {string|undefined}
   */
  getInstanceFqdnOrUndefined() {
    return jspb_internal_adapters.getStringFieldOrUndefined(this, 3);
  }


  /**
   * optional int32 jetski_port = 4;
   * @override
   * @return {number}
   */
  getJetskiPort() {
    return jspb_internal_adapters.getInt32FieldWithDefault(this, 4);
  }


  /**
   * @param {number|null|undefined} value
   * @return {!jspb$devtools_jetski_provisioning$MutableInstance} returns this
   */
  setJetskiPort(value) {
    return jspb_internal_adapters.setInt32Field(this, 4, value);
  }


  /**
   * Clears the field.
   * @return {!jspb$devtools_jetski_provisioning$MutableInstance} returns this
   */
  clearJetskiPort() {
    return jspb_internal_adapters.clearField(this, 4);
  }


  /**
   * Returns whether this field is set.
   * @override
   * @return {boolean}
   */
  hasJetskiPort() {
    return jspb_internal_adapters.hasInt32Field(this, 4);
  }


  /**
   * optional int32 jetski_port = 4;
   * @override
   * @return {number|undefined}
   */
  getJetskiPortOrUndefined() {
    return jspb_internal_adapters.getInt32FieldOrUndefined(this, 4);
  }


  /**
   * optional string jetski_csrf_token = 7;
   * @override
   * @return {string}
   */
  getJetskiCsrfToken() {
    return jspb_internal_adapters.getStringFieldWithDefault(this, 7);
  }


  /**
   * @param {string|null|undefined} value
   * @return {!jspb$devtools_jetski_provisioning$MutableInstance} returns this
   */
  setJetskiCsrfToken(value) {
    return jspb_internal_adapters.setStringField(this, 7, value);
  }


  /**
   * Clears the field.
   * @return {!jspb$devtools_jetski_provisioning$MutableInstance} returns this
   */
  clearJetskiCsrfToken() {
    return jspb_internal_adapters.clearField(this, 7);
  }


  /**
   * Returns whether this field is set.
   * @override
   * @return {boolean}
   */
  hasJetskiCsrfToken() {
    return jspb_internal_adapters.hasStringField(this, 7);
  }


  /**
   * optional string jetski_csrf_token = 7;
   * @override
   * @return {string|undefined}
   */
  getJetskiCsrfTokenOrUndefined() {
    return jspb_internal_adapters.getStringFieldOrUndefined(this, 7);
  }


  /**
   * optional google.protobuf.Timestamp expiry_time = 5;
   * @override
   * @return {!jspb$google$protobuf$MutableTimestamp|undefined}
   */
  getExpiryTime() {
    return jspb_internal_adapters.getWrapperFieldOrUndefined(this, jspb$google$protobuf$MutableTimestamp, 5);
  }


  /**
   * optional google.protobuf.Timestamp expiry_time = 5;
   * @override
   * @return {!jspb$ro.google$protobuf$ReadonlyTimestamp}
   */
  getReadonlyExpiryTime() {
    return jspb_internal_adapters.getReadonlyWrapperField(this, jspb$google$protobuf$MutableTimestamp, 5);
  }


  /**
   * optional google.protobuf.Timestamp expiry_time = 5;
   * @param {!jspb_internal_public_for_gencode.OrUndefinedToken<U>=} legacyOrUndefined
   * @return {!jspb$google$protobuf$MutableTimestamp|R}
   * @template U
   * @template R := cond(eq(U, 'undefined'), 'undefined', 'jspb$google$protobuf$MutableTimestamp') =:
   * @tsType (legacyOrUndefined: import('google3/javascript/apps/jspb/internal_public').OrUndefinedToken<undefined>): ಠ_ಠ.clutz.jspb$google$protobuf$MutableTimestamp|undefined
   * @tsType (): ಠ_ಠ.clutz.jspb$google$protobuf$MutableTimestamp
   */
  getMutableExpiryTime(legacyOrUndefined) {
    return jspb_internal_adapters.getMutableWrapperField(this, jspb$google$protobuf$MutableTimestamp, 5, legacyOrUndefined);
  }


  /**
   * @param {!jspb$ro.google$protobuf$ReadonlyTimestamp|null|undefined} value
   * @return {!jspb$devtools_jetski_provisioning$MutableInstance} returns this
   */
  setExpiryTime(value) {
    return jspb_internal_adapters.setWrapperField(this, jspb$google$protobuf$MutableTimestamp, 5, value);
  }


  /**
   * Clears the field.
   * @return {!jspb$devtools_jetski_provisioning$MutableInstance} returns this
   */
  clearExpiryTime() {
    return jspb_internal_adapters.clearField(this, 5);
  }


  /**
   * Returns whether this field is set.
   * @override
   * @return {boolean}
   */
  hasExpiryTime() {
    return jspb_internal_adapters.hasWrapperField(this, jspb$google$protobuf$MutableTimestamp, 5);
  }


  /**
   * optional google.protobuf.Timestamp expiry_time = 5;
   * @override
   * @return {!jspb$ro.google$protobuf$ReadonlyTimestamp|undefined}
   */
  getExpiryTimeOrUndefined() {
    return jspb_internal_adapters.getReadonlyWrapperFieldOrUndefined(this, jspb$google$protobuf$MutableTimestamp, 5);
  }


  /**
   * optional google.protobuf.Timestamp last_checkin_time = 17;
   * @override
   * @return {!jspb$google$protobuf$MutableTimestamp|undefined}
   */
  getLastCheckinTime() {
    return jspb_internal_adapters.getWrapperFieldOrUndefined(this, jspb$google$protobuf$MutableTimestamp, 17);
  }


  /**
   * optional google.protobuf.Timestamp last_checkin_time = 17;
   * @override
   * @return {!jspb$ro.google$protobuf$ReadonlyTimestamp}
   */
  getReadonlyLastCheckinTime() {
    return jspb_internal_adapters.getReadonlyWrapperField(this, jspb$google$protobuf$MutableTimestamp, 17);
  }


  /**
   * optional google.protobuf.Timestamp last_checkin_time = 17;
   * @param {!jspb_internal_public_for_gencode.OrUndefinedToken<U>=} legacyOrUndefined
   * @return {!jspb$google$protobuf$MutableTimestamp|R}
   * @template U
   * @template R := cond(eq(U, 'undefined'), 'undefined', 'jspb$google$protobuf$MutableTimestamp') =:
   * @tsType (legacyOrUndefined: import('google3/javascript/apps/jspb/internal_public').OrUndefinedToken<undefined>): ಠ_ಠ.clutz.jspb$google$protobuf$MutableTimestamp|undefined
   * @tsType (): ಠ_ಠ.clutz.jspb$google$protobuf$MutableTimestamp
   */
  getMutableLastCheckinTime(legacyOrUndefined) {
    return jspb_internal_adapters.getMutableWrapperField(this, jspb$google$protobuf$MutableTimestamp, 17, legacyOrUndefined);
  }


  /**
   * @param {!jspb$ro.google$protobuf$ReadonlyTimestamp|null|undefined} value
   * @return {!jspb$devtools_jetski_provisioning$MutableInstance} returns this
   */
  setLastCheckinTime(value) {
    return jspb_internal_adapters.setWrapperField(this, jspb$google$protobuf$MutableTimestamp, 17, value);
  }


  /**
   * Clears the field.
   * @return {!jspb$devtools_jetski_provisioning$MutableInstance} returns this
   */
  clearLastCheckinTime() {
    return jspb_internal_adapters.clearField(this, 17);
  }


  /**
   * Returns whether this field is set.
   * @override
   * @return {boolean}
   */
  hasLastCheckinTime() {
    return jspb_internal_adapters.hasWrapperField(this, jspb$google$protobuf$MutableTimestamp, 17);
  }


  /**
   * optional google.protobuf.Timestamp last_checkin_time = 17;
   * @override
   * @return {!jspb$ro.google$protobuf$ReadonlyTimestamp|undefined}
   */
  getLastCheckinTimeOrUndefined() {
    return jspb_internal_adapters.getReadonlyWrapperFieldOrUndefined(this, jspb$google$protobuf$MutableTimestamp, 17);
  }


  /**
   * optional InstanceStatus status = 6;
   * @override
   * @return {!jspb$e.devtools_jetski_provisioning$InstanceStatus}
   */
  getStatus() {
    return /** @type {!jspb$e.devtools_jetski_provisioning$InstanceStatus} */ (jspb_internal_adapters.getEnumFieldWithDefault(this, 6));
  }


  /**
   * @param {!jspb$e.devtools_jetski_provisioning$InstanceStatus|null|undefined} value
   * @return {!jspb$devtools_jetski_provisioning$MutableInstance} returns this
   */
  setStatus(value) {
    return jspb_internal_adapters.setEnumField(this, 6, value);
  }


  /**
   * Clears the field.
   * @return {!jspb$devtools_jetski_provisioning$MutableInstance} returns this
   */
  clearStatus() {
    return jspb_internal_adapters.clearField(this, 6);
  }


  /**
   * Returns whether this field is set.
   * @override
   * @return {boolean}
   */
  hasStatus() {
    return jspb_internal_adapters.hasEnumField(this, 6);
  }


  /**
   * optional InstanceStatus status = 6;
   * @override
   * @return {!jspb$e.devtools_jetski_provisioning$InstanceStatus|undefined}
   */
  getStatusOrUndefined() {
    return /** @type {!jspb$e.devtools_jetski_provisioning$InstanceStatus|undefined} */ (jspb_internal_adapters.getEnumFieldOrUndefined(this, 6));
  }


  /**
   * optional InstanceMetrics metrics = 8;
   * @override
   * @return {!jspb$devtools_jetski_provisioning$MutableInstanceMetrics|undefined}
   */
  getMetrics() {
    return jspb_internal_adapters.getWrapperFieldOrUndefined(this, jspb$devtools_jetski_provisioning$MutableInstanceMetrics, 8);
  }


  /**
   * optional InstanceMetrics metrics = 8;
   * @override
   * @return {!jspb$ro.devtools_jetski_provisioning$ReadonlyInstanceMetrics}
   */
  getReadonlyMetrics() {
    return jspb_internal_adapters.getReadonlyWrapperField(this, jspb$devtools_jetski_provisioning$MutableInstanceMetrics, 8);
  }


  /**
   * optional InstanceMetrics metrics = 8;
   * @param {!jspb_internal_public_for_gencode.OrUndefinedToken<U>=} legacyOrUndefined
   * @return {!jspb$devtools_jetski_provisioning$MutableInstanceMetrics|R}
   * @template U
   * @template R := cond(eq(U, 'undefined'), 'undefined', 'jspb$devtools_jetski_provisioning$MutableInstanceMetrics') =:
   * @tsType (legacyOrUndefined: import('google3/javascript/apps/jspb/internal_public').OrUndefinedToken<undefined>): ಠ_ಠ.clutz.jspb$devtools_jetski_provisioning$MutableInstanceMetrics|undefined
   * @tsType (): ಠ_ಠ.clutz.jspb$devtools_jetski_provisioning$MutableInstanceMetrics
   */
  getMutableMetrics(legacyOrUndefined) {
    return jspb_internal_adapters.getMutableWrapperField(this, jspb$devtools_jetski_provisioning$MutableInstanceMetrics, 8, legacyOrUndefined);
  }


  /**
   * @param {!jspb$ro.devtools_jetski_provisioning$ReadonlyInstanceMetrics|null|undefined} value
   * @return {!jspb$devtools_jetski_provisioning$MutableInstance} returns this
   */
  setMetrics(value) {
    return jspb_internal_adapters.setWrapperField(this, jspb$devtools_jetski_provisioning$MutableInstanceMetrics, 8, value);
  }


  /**
   * Clears the field.
   * @return {!jspb$devtools_jetski_provisioning$MutableInstance} returns this
   */
  clearMetrics() {
    return jspb_internal_adapters.clearField(this, 8);
  }


  /**
   * Returns whether this field is set.
   * @override
   * @return {boolean}
   */
  hasMetrics() {
    return jspb_internal_adapters.hasWrapperField(this, jspb$devtools_jetski_provisioning$MutableInstanceMetrics, 8);
  }


  /**
   * optional InstanceMetrics metrics = 8;
   * @override
   * @return {!jspb$ro.devtools_jetski_provisioning$ReadonlyInstanceMetrics|undefined}
   */
  getMetricsOrUndefined() {
    return jspb_internal_adapters.getReadonlyWrapperFieldOrUndefined(this, jspb$devtools_jetski_provisioning$MutableInstanceMetrics, 8);
  }


  /**
   * repeated storage.SidecarStatusInfo sidecars = 9;
   * @param {!jspb_internal_public_for_gencode.DoNotFreezeToken=} freezeOptOut
   * @tsType (freezeOptOut: import('google3/javascript/apps/jspb/internal_public').DoNotFreezeToken): ಠ_ಠ.clutz.jspb$devtools_jetski_provisioning$storage$MutableSidecarStatusInfo[]
   * @tsType (): readonly ಠ_ಠ.clutz.jspb$devtools_jetski_provisioning$storage$MutableSidecarStatusInfo[]
   * @override
   * @return {!ReadonlyArray<!jspb$devtools_jetski_provisioning$storage$MutableSidecarStatusInfo>}
   */
  getSidecarsList(freezeOptOut) {
    return jspb_internal_adapters.getRepeatedWrapperField(this, jspb$devtools_jetski_provisioning$storage$MutableSidecarStatusInfo, 9, jspb_internal_adapters.getRepeatedFieldReturnType(freezeOptOut));
  }


  /**
   * repeated storage.SidecarStatusInfo sidecars = 9;
   * @override
   * @return {!ReadonlyArray<!jspb$ro.devtools_jetski_provisioning$storage$ReadonlySidecarStatusInfo>}
   */
  getReadonlySidecarsList() {
    return jspb_internal_adapters.getReadonlyRepeatedWrapperField(this, jspb$devtools_jetski_provisioning$storage$MutableSidecarStatusInfo, 9);
  }


  /**
   * @param {!ReadonlyArray<!jspb$ro.devtools_jetski_provisioning$storage$ReadonlySidecarStatusInfo>|null|undefined} value
   * @return {!jspb$devtools_jetski_provisioning$MutableInstance} returns this
   */
  setSidecarsList(value) {
    return jspb_internal_adapters.setRepeatedWrapperField(this, jspb$devtools_jetski_provisioning$storage$MutableSidecarStatusInfo, 9, value);
  }


  /**
   * Gets mutable repeated field reference.
   * @param {number} index
   * @return {!jspb$devtools_jetski_provisioning$storage$MutableSidecarStatusInfo}
   */
  getMutableSidecars(index) {
    return jspb_internal_adapters.getRepeatedIndexedMutableWrapper(this, 9, jspb$devtools_jetski_provisioning$storage$MutableSidecarStatusInfo, index);
  }


  /**
   * Gets readonly repeated field reference.
   * @override
   * @param {number} index
   * @return {!jspb$ro.devtools_jetski_provisioning$storage$ReadonlySidecarStatusInfo}
   */
  getReadonlySidecars(index) {
    return jspb_internal_adapters.getRepeatedIndexedReadonlyWrapper(this, 9, jspb$devtools_jetski_provisioning$storage$MutableSidecarStatusInfo, index);
  }


  /**
   * Adds repeated field and returns `this`.
   * @param {!jspb$ro.devtools_jetski_provisioning$storage$ReadonlySidecarStatusInfo} value
   * @param {number=} index
   * @return {!jspb$devtools_jetski_provisioning$MutableInstance} returns this
   */
  addSidecars(value, index) {
    return jspb_internal_adapters.addToRepeatedWrapperField(this, 9, jspb$devtools_jetski_provisioning$storage$MutableSidecarStatusInfo, value, index);
  }


  /**
   * Adds repeated field and returns newly added submessage.
   * @param {!jspb$devtools_jetski_provisioning$storage$MutableSidecarStatusInfo=} value
   * @param {number=} index
   * @return {!jspb$devtools_jetski_provisioning$storage$MutableSidecarStatusInfo} the value that was added
   */
  addAndReturnSidecars(value, index) {
    return jspb_internal_adapters.addAndReturnRepeatedWrapperField(this, 9, jspb$devtools_jetski_provisioning$storage$MutableSidecarStatusInfo, value, index);
  }


  /**
   * Adds multiple values to a repeated field and returns `this`.
   * @param {!Iterable<!jspb$ro.devtools_jetski_provisioning$storage$ReadonlySidecarStatusInfo>} values
   * @return {!jspb$devtools_jetski_provisioning$MutableInstance} returns this
   */
  addAllSidecars(values) {
    return jspb_internal_adapters.addAllToRepeatedWrapperField(this, 9, jspb$devtools_jetski_provisioning$storage$MutableSidecarStatusInfo, values);
  }


  /**
   * Sets repeated field value at `index` and returns `this`.
   * @param {number} index
   * @param {!jspb$ro.devtools_jetski_provisioning$storage$ReadonlySidecarStatusInfo} value
   * @return {!jspb$devtools_jetski_provisioning$MutableInstance} returns this
   */
  setSidecars(index, value) {
    return jspb_internal_adapters.setRepeatedIndexedWrapper(this, 9, jspb$devtools_jetski_provisioning$storage$MutableSidecarStatusInfo, index, value);
  }


  /**
   * Removes a value from a repeated field and returns `this`.
   * @param {number=} index defaults to the end
   * @return {!jspb$devtools_jetski_provisioning$MutableInstance} returns this
   */
  removeSidecars(index) {
    return jspb_internal_adapters.removeFromRepeatedWrapperField(this, 9, jspb$devtools_jetski_provisioning$storage$MutableSidecarStatusInfo, index);
  }


  /**
   * Clears the field.
   * @return {!jspb$devtools_jetski_provisioning$MutableInstance} returns this
   */
  clearSidecarsList() {
    return jspb_internal_adapters.clearField(this, 9);
  }


  /**
   * Returns the size of this field.
   * @override
   * @return {number}
   */
  getSidecarsCount() {
    return jspb_internal_adapters.getRepeatedWrapperCount(this, jspb$devtools_jetski_provisioning$storage$MutableSidecarStatusInfo, 9);
  }


  /**
   * optional string version = 10;
   * @override
   * @return {string}
   */
  getVersion() {
    return jspb_internal_adapters.getStringFieldWithDefault(this, 10);
  }


  /**
   * @param {string|null|undefined} value
   * @return {!jspb$devtools_jetski_provisioning$MutableInstance} returns this
   */
  setVersion(value) {
    return jspb_internal_adapters.setStringField(this, 10, value);
  }


  /**
   * Clears the field.
   * @return {!jspb$devtools_jetski_provisioning$MutableInstance} returns this
   */
  clearVersion() {
    return jspb_internal_adapters.clearField(this, 10);
  }


  /**
   * Returns whether this field is set.
   * @override
   * @return {boolean}
   */
  hasVersion() {
    return jspb_internal_adapters.hasStringField(this, 10);
  }


  /**
   * optional string version = 10;
   * @override
   * @return {string|undefined}
   */
  getVersionOrUndefined() {
    return jspb_internal_adapters.getStringFieldOrUndefined(this, 10);
  }


  /**
   * optional float uptime7d = 11;
   * @override
   * @return {number}
   */
  getUptime7d() {
    return jspb_internal_adapters.getFloatingPointFieldWithDefault(this, 11);
  }


  /**
   * @param {number|null|undefined} value
   * @return {!jspb$devtools_jetski_provisioning$MutableInstance} returns this
   */
  setUptime7d(value) {
    return jspb_internal_adapters.setFloatingPointField(this, 11, value);
  }


  /**
   * Clears the field.
   * @return {!jspb$devtools_jetski_provisioning$MutableInstance} returns this
   */
  clearUptime7d() {
    return jspb_internal_adapters.clearField(this, 11);
  }


  /**
   * Returns whether this field is set.
   * @override
   * @return {boolean}
   */
  hasUptime7d() {
    return jspb_internal_adapters.hasFloatingPointField(this, 11);
  }


  /**
   * optional float uptime7d = 11;
   * @override
   * @return {number|undefined}
   */
  getUptime7dOrUndefined() {
    return jspb_internal_adapters.getFloatingPointFieldOrUndefined(this, 11);
  }


  /**
   * optional string error_message = 12;
   * @override
   * @return {string}
   */
  getErrorMessage() {
    return jspb_internal_adapters.getStringFieldWithDefault(this, 12);
  }


  /**
   * @param {string|null|undefined} value
   * @return {!jspb$devtools_jetski_provisioning$MutableInstance} returns this
   */
  setErrorMessage(value) {
    return jspb_internal_adapters.setStringField(this, 12, value);
  }


  /**
   * Clears the field.
   * @return {!jspb$devtools_jetski_provisioning$MutableInstance} returns this
   */
  clearErrorMessage() {
    return jspb_internal_adapters.clearField(this, 12);
  }


  /**
   * Returns whether this field is set.
   * @override
   * @return {boolean}
   */
  hasErrorMessage() {
    return jspb_internal_adapters.hasStringField(this, 12);
  }


  /**
   * optional string error_message = 12;
   * @override
   * @return {string|undefined}
   */
  getErrorMessageOrUndefined() {
    return jspb_internal_adapters.getStringFieldOrUndefined(this, 12);
  }


  /**
   * optional google.protobuf.Timestamp create_time = 13;
   * @override
   * @return {!jspb$google$protobuf$MutableTimestamp|undefined}
   */
  getCreateTime() {
    return jspb_internal_adapters.getWrapperFieldOrUndefined(this, jspb$google$protobuf$MutableTimestamp, 13);
  }


  /**
   * optional google.protobuf.Timestamp create_time = 13;
   * @override
   * @return {!jspb$ro.google$protobuf$ReadonlyTimestamp}
   */
  getReadonlyCreateTime() {
    return jspb_internal_adapters.getReadonlyWrapperField(this, jspb$google$protobuf$MutableTimestamp, 13);
  }


  /**
   * optional google.protobuf.Timestamp create_time = 13;
   * @param {!jspb_internal_public_for_gencode.OrUndefinedToken<U>=} legacyOrUndefined
   * @return {!jspb$google$protobuf$MutableTimestamp|R}
   * @template U
   * @template R := cond(eq(U, 'undefined'), 'undefined', 'jspb$google$protobuf$MutableTimestamp') =:
   * @tsType (legacyOrUndefined: import('google3/javascript/apps/jspb/internal_public').OrUndefinedToken<undefined>): ಠ_ಠ.clutz.jspb$google$protobuf$MutableTimestamp|undefined
   * @tsType (): ಠ_ಠ.clutz.jspb$google$protobuf$MutableTimestamp
   */
  getMutableCreateTime(legacyOrUndefined) {
    return jspb_internal_adapters.getMutableWrapperField(this, jspb$google$protobuf$MutableTimestamp, 13, legacyOrUndefined);
  }


  /**
   * @param {!jspb$ro.google$protobuf$ReadonlyTimestamp|null|undefined} value
   * @return {!jspb$devtools_jetski_provisioning$MutableInstance} returns this
   */
  setCreateTime(value) {
    return jspb_internal_adapters.setWrapperField(this, jspb$google$protobuf$MutableTimestamp, 13, value);
  }


  /**
   * Clears the field.
   * @return {!jspb$devtools_jetski_provisioning$MutableInstance} returns this
   */
  clearCreateTime() {
    return jspb_internal_adapters.clearField(this, 13);
  }


  /**
   * Returns whether this field is set.
   * @override
   * @return {boolean}
   */
  hasCreateTime() {
    return jspb_internal_adapters.hasWrapperField(this, jspb$google$protobuf$MutableTimestamp, 13);
  }


  /**
   * optional google.protobuf.Timestamp create_time = 13;
   * @override
   * @return {!jspb$ro.google$protobuf$ReadonlyTimestamp|undefined}
   */
  getCreateTimeOrUndefined() {
    return jspb_internal_adapters.getReadonlyWrapperFieldOrUndefined(this, jspb$google$protobuf$MutableTimestamp, 13);
  }


  /**
   * optional google.protobuf.Timestamp stop_time = 14;
   * @override
   * @return {!jspb$google$protobuf$MutableTimestamp|undefined}
   */
  getStopTime() {
    return jspb_internal_adapters.getWrapperFieldOrUndefined(this, jspb$google$protobuf$MutableTimestamp, 14);
  }


  /**
   * optional google.protobuf.Timestamp stop_time = 14;
   * @override
   * @return {!jspb$ro.google$protobuf$ReadonlyTimestamp}
   */
  getReadonlyStopTime() {
    return jspb_internal_adapters.getReadonlyWrapperField(this, jspb$google$protobuf$MutableTimestamp, 14);
  }


  /**
   * optional google.protobuf.Timestamp stop_time = 14;
   * @param {!jspb_internal_public_for_gencode.OrUndefinedToken<U>=} legacyOrUndefined
   * @return {!jspb$google$protobuf$MutableTimestamp|R}
   * @template U
   * @template R := cond(eq(U, 'undefined'), 'undefined', 'jspb$google$protobuf$MutableTimestamp') =:
   * @tsType (legacyOrUndefined: import('google3/javascript/apps/jspb/internal_public').OrUndefinedToken<undefined>): ಠ_ಠ.clutz.jspb$google$protobuf$MutableTimestamp|undefined
   * @tsType (): ಠ_ಠ.clutz.jspb$google$protobuf$MutableTimestamp
   */
  getMutableStopTime(legacyOrUndefined) {
    return jspb_internal_adapters.getMutableWrapperField(this, jspb$google$protobuf$MutableTimestamp, 14, legacyOrUndefined);
  }


  /**
   * @param {!jspb$ro.google$protobuf$ReadonlyTimestamp|null|undefined} value
   * @return {!jspb$devtools_jetski_provisioning$MutableInstance} returns this
   */
  setStopTime(value) {
    return jspb_internal_adapters.setWrapperField(this, jspb$google$protobuf$MutableTimestamp, 14, value);
  }


  /**
   * Clears the field.
   * @return {!jspb$devtools_jetski_provisioning$MutableInstance} returns this
   */
  clearStopTime() {
    return jspb_internal_adapters.clearField(this, 14);
  }


  /**
   * Returns whether this field is set.
   * @override
   * @return {boolean}
   */
  hasStopTime() {
    return jspb_internal_adapters.hasWrapperField(this, jspb$google$protobuf$MutableTimestamp, 14);
  }


  /**
   * optional google.protobuf.Timestamp stop_time = 14;
   * @override
   * @return {!jspb$ro.google$protobuf$ReadonlyTimestamp|undefined}
   */
  getStopTimeOrUndefined() {
    return jspb_internal_adapters.getReadonlyWrapperFieldOrUndefined(this, jspb$google$protobuf$MutableTimestamp, 14);
  }


};

/**
 * @override
 * @return {!jspb$devtools_jetski_provisioning$ImmutableInstance}
 */
jspb$devtools_jetski_provisioning$MutableInstance.prototype.toImmutable;
/**
 * @override
 * @return {!jspb$devtools_jetski_provisioning$MutableInstance}
 */
jspb$devtools_jetski_provisioning$MutableInstance.prototype.clone;
/**
 * @const {function(string):!jspb$devtools_jetski_provisioning$MutableInstance}
 */
jspb$devtools_jetski_provisioning$MutableInstance.deserialize = /** @pureOrBreakMyCode */(jspb_internal_public_for_gencode.makeMutableDeserializeFunction(jspb$devtools_jetski_provisioning$MutableInstance));

/**
 * Returns whether the given value is an instance of jspb$devtools_jetski_provisioning$MutableInstance.
 * @const {!google3.javascript.common.asserts.asserts.TypeGuard<!jspb$devtools_jetski_provisioning$MutableInstance>}
 */
jspb$devtools_jetski_provisioning$MutableInstance.hasInstance = /** @pureOrBreakMyCode */ (jspb_internal_public_for_gencode.makeHasMutableInstance(jspb$devtools_jetski_provisioning$MutableInstance));

/**
 * Object form of Instance as accepted by the `fromObject` method.
 * @typedef {{
 *  replicaIndex: (?number|undefined),
 *  instanceId: (?string|undefined),
 *  instanceFqdn: (?string|undefined),
 *  jetskiPort: (?number|undefined),
 *  jetskiCsrfToken: (?string|undefined),
 *  expiryTime: (?jspb$google$protobuf$MutableTimestamp.ObjectFormat|undefined),
 *  lastCheckinTime: (?jspb$google$protobuf$MutableTimestamp.ObjectFormat|undefined),
 *  status: (?number|undefined),
 *  metrics: (?jspb$devtools_jetski_provisioning$MutableInstanceMetrics.ObjectFormat|undefined),
 *  sidecarsList: (?Array<!jspb$devtools_jetski_provisioning$storage$MutableSidecarStatusInfo.ObjectFormat>|undefined),
 *  version: (?string|undefined),
 *  uptime7d: (?number|undefined),
 *  errorMessage: (?string|undefined),
 *  createTime: (?jspb$google$protobuf$MutableTimestamp.ObjectFormat|undefined),
 *  stopTime: (?jspb$google$protobuf$MutableTimestamp.ObjectFormat|undefined)
 * }}
 */
jspb$devtools_jetski_provisioning$MutableInstance.ObjectFormat;
/**
 * Serializes the message to binary data (in protobuf wire format).
 *
 * If you see this method undefined, you probably need to import
 * the message type directly.
 *
 * @return {!Uint8Array}
 * @deprecated please call the static method instead: this one is only sometimes defined.
 */
jspb$devtools_jetski_provisioning$MutableInstance.prototype.serializeBinary;

/**
 * Serializes the message to an unstable object format.
 *
 * @private
 * @return {!jspb$devtools_jetski_provisioning$MutableInstance.ObjectFormat}
 * @deprecated see go/jspb-api-gotchas#objects. This is only sometimes defined.
 */
jspb$devtools_jetski_provisioning$MutableInstance.prototype.toObject;

if (jspb_internal_public_for_gencode.GENERATE_TYPE_NAME_PROPERTIES) {
  /**
   * The proto type name for devtools_jetski_provisioning$MutableInstance.
   *
   * @nodts
   * @nocollapse
   * @const {string|undefined}
   */
  jspb$devtools_jetski_provisioning$MutableInstance.internalDoNotUse_debugOnlyProtoTypeName = "devtools_jetski_provisioning.Instance";
}

/**
 * @typedef {!jspb$devtools_jetski_provisioning$ImmutableInstance|!jspb$devtools_jetski_provisioning$MutableInstance}
 */
jspb$ro.devtools_jetski_provisioning$ReadonlyInstance = {};

if (goog.DEBUG && !COMPILED) {
  /**
   * @override
   * @return {*}
   * @tsType (): {protoName: 'devtools_jetski_provisioning.Instance'}
   */
  jspb$devtools_jetski_provisioning$MutableInstance.prototype.internalDoNotUse_annotations;
}
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   * @type {string}
   */
  jspb$devtools_jetski_provisioning$MutableInstance.displayName = 'proto.devtools_jetski_provisioning.Instance';
}
/**
 * Interface form of Instance as accepted by `fromFields` and produced by `getFields`.
 * @typedef {{
 *  replicaIndex: (number|undefined),
 *  instanceId: (string|undefined),
 *  instanceFqdn: (string|undefined),
 *  jetskiPort: (number|undefined),
 *  jetskiCsrfToken: (string|undefined),
 *  expiryTime: (!jspb$ro.google$protobuf$ReadonlyTimestamp|undefined),
 *  lastCheckinTime: (!jspb$ro.google$protobuf$ReadonlyTimestamp|undefined),
 *  status: (!jspb$e.devtools_jetski_provisioning$InstanceStatus|undefined),
 *  metrics: (!jspb$ro.devtools_jetski_provisioning$ReadonlyInstanceMetrics|undefined),
 *  sidecarsList: (!ReadonlyArray<!jspb$ro.devtools_jetski_provisioning$storage$ReadonlySidecarStatusInfo>|undefined),
 *  version: (string|undefined),
 *  uptime7d: (number|undefined),
 *  errorMessage: (string|undefined),
 *  createTime: (!jspb$ro.google$protobuf$ReadonlyTimestamp|undefined),
 *  stopTime: (!jspb$ro.google$protobuf$ReadonlyTimestamp|undefined)
 * }}
 */
jspb$devtools_jetski_provisioning$MutableInstance.FieldsInterface;

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
 * @param {!jspb$devtools_jetski_provisioning$MutableInstance.FieldsInterface} record
 * @return {!jspb$devtools_jetski_provisioning$ImmutableInstance}
 * @tsType (fields : import('google3/javascript/apps/jspb/internal_records').PartialFields<ಠ_ಠ.clutz.jspb$devtools_jetski_provisioning$MutableInstance, ಠ_ಠ.clutz.jspb$devtools_jetski_provisioning$MutableInstance.FieldsInterface, ಠ_ಠ.clutz.jspbInternalDoNotUse$RecordExtensionRegistry>): ಠ_ಠ.clutz.jspb$devtools_jetski_provisioning$ImmutableInstance
 */
jspb$devtools_jetski_provisioning$MutableInstance.fromFields = /** @pureOrBreakMyCode */ (jspb_internal_public_for_gencode.makeFromFieldsForTesting(jspb$devtools_jetski_provisioning$MutableInstance));

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
 * @param {!jspb$ro.devtools_jetski_provisioning$ReadonlyInstance} value
 * @return {!jspb$devtools_jetski_provisioning$MutableInstance.FieldsInterface}
 * @tsType (value: ಠ_ಠ.clutz.jspb$ro.devtools_jetski_provisioning$ReadonlyInstance): import('google3/javascript/apps/jspb/internal_records').ReadonlyFields<ಠ_ಠ.clutz.jspb$devtools_jetski_provisioning$MutableInstance, ಠ_ಠ.clutz.jspb$devtools_jetski_provisioning$MutableInstance.FieldsInterface, ಠ_ಠ.clutz.jspbInternalDoNotUse$RecordExtensionRegistry>
 */
jspb$devtools_jetski_provisioning$MutableInstance.getFields = /** @pureOrBreakMyCode */ (jspb_internal_public_for_gencode.makeGetFieldsForTesting());

var jspb$b$devtools_jetski_provisioning$storage$SidecarStatusInfo;
Object.defineProperty(this, 'jspb$b$devtools_jetski_provisioning$storage$SidecarStatusInfo', {
  get() { return jspb$b$devtools_jetski_provisioning$storage$SidecarStatusInfo; },
  set(v) { jspb$b$devtools_jetski_provisioning$storage$SidecarStatusInfo = v; },
