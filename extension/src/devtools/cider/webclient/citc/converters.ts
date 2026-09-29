/**
 * @fileoverview Converters for CitC related protos.
 * Generated from: devtools/cider/webclient/citc/converters.ts
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
goog.module('google3.devtools.cider.webclient.citc.converters');
var module = module || { id: 'devtools/cider/webclient/citc/converters.closure.js' };
goog.require('google3.third_party.javascript.tslib.tslib');
const tsickle_WorkspaceId_1 = goog.requireType("devtools.sourcerers.WorkspaceId");
const tsickle_check_2 = goog.requireType("google3.javascript.typescript.contrib.check");
const goog_devtools_sourcerers_WorkspaceId_1 = goog.require('devtools.sourcerers.WorkspaceId');
const workspace_id_proto_1 = {};
/** @const */ workspace_id_proto_1.WorkspaceId = goog_devtools_sourcerers_WorkspaceId_1;
const check_1 = goog.require('google3.javascript.typescript.contrib.check');
/**
 * Convert a string to the corresponding proto enum type (case-insensitive).
 * @param {(undefined|null|string)} vcs
 * @return {!jspb$e.devtools$sourcerers$WorkspaceId$Vcs}
 */
function convertStringToVcs(vcs) {
    switch (vcs?.toLowerCase()) {
        case 'piper':
            return workspace_id_proto_1.WorkspaceId.Vcs.PIPER;
        case 'fig':
            return workspace_id_proto_1.WorkspaceId.Vcs.FIG;
        case 'jj':
            return workspace_id_proto_1.WorkspaceId.Vcs.JJ;
        case 'cog':
            return workspace_id_proto_1.WorkspaceId.Vcs.COG;
        case 'remote':
            return workspace_id_proto_1.WorkspaceId.Vcs.REMOTE;
        case 'citc':
            return workspace_id_proto_1.WorkspaceId.Vcs.CITC;
        default:
            return workspace_id_proto_1.WorkspaceId.Vcs.UNKNOWN;
    }
}
exports.convertStringToVcs = convertStringToVcs;
/**
 * Convert VCS to a lower case string.
 * @param {(undefined|null|!jspb$e.devtools$sourcerers$WorkspaceId$Vcs)} vcs
 * @return {(undefined|string)}
 */
function convertVcsToString(vcs) {
    switch (vcs) {
        case workspace_id_proto_1.WorkspaceId.Vcs.PIPER:
            return 'piper';
        case workspace_id_proto_1.WorkspaceId.Vcs.FIG:
            return 'fig';
        case workspace_id_proto_1.WorkspaceId.Vcs.JJ:
            return 'jj';
        case workspace_id_proto_1.WorkspaceId.Vcs.COG:
            return 'cog';
        case workspace_id_proto_1.WorkspaceId.Vcs.REMOTE:
            return 'remote';
        case workspace_id_proto_1.WorkspaceId.Vcs.CITC:
            return 'citc';
        case workspace_id_proto_1.WorkspaceId.Vcs.UNKNOWN:
        case undefined:
        case null:
            return undefined;
        default:
            return (0, check_1.checkExhaustive)(vcs);
    }
}
exports.convertVcsToString = convertVcsToString;
/**
 * Convert VCS to its context key name ('unknown' for UNKNOWN).
 * @param {!jspb$e.devtools$sourcerers$WorkspaceId$Vcs} vcs
 * @return {string}
 */
function convertVcsToContextName(vcs) {
    return convertVcsToString(vcs) ?? 'unknown';
}
exports.convertVcsToContextName = convertVcsToContextName;
