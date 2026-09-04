/**
 * @license
 * Copyright Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
/**
 * @fileoverview This file re-exports all of the wrappers to ensure that we have
 * a clearly defined interface.
 * Generated from: third_party/javascript/safevalues/dom/index.ts
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
goog.module('google3.third_party.javascript.safevalues.dom.index');
var module = module || { id: 'third_party/javascript/safevalues/dom/index.closure.js' };
goog.require('google3.third_party.javascript.tslib.tslib');
const tsickle_anchor_1 = goog.requireType("google3.third_party.javascript.safevalues.dom.elements.anchor");
const tsickle_area_2 = goog.requireType("google3.third_party.javascript.safevalues.dom.elements.area");
const tsickle_base_3 = goog.requireType("google3.third_party.javascript.safevalues.dom.elements.base");
const tsickle_button_4 = goog.requireType("google3.third_party.javascript.safevalues.dom.elements.button");
const tsickle_element_5 = goog.requireType("google3.third_party.javascript.safevalues.dom.elements.element");
const tsickle_embed_6 = goog.requireType("google3.third_party.javascript.safevalues.dom.elements.embed");
const tsickle_form_7 = goog.requireType("google3.third_party.javascript.safevalues.dom.elements.form");
const tsickle_iframe_8 = goog.requireType("google3.third_party.javascript.safevalues.dom.elements.iframe");
const tsickle_input_9 = goog.requireType("google3.third_party.javascript.safevalues.dom.elements.input");
const tsickle_link_10 = goog.requireType("google3.third_party.javascript.safevalues.dom.elements.link");
const tsickle_object_11 = goog.requireType("google3.third_party.javascript.safevalues.dom.elements.object");
const tsickle_script_12 = goog.requireType("google3.third_party.javascript.safevalues.dom.elements.script");
const tsickle_style_13 = goog.requireType("google3.third_party.javascript.safevalues.dom.elements.style");
const tsickle_svg_14 = goog.requireType("google3.third_party.javascript.safevalues.dom.elements.svg");
const tsickle_svg_use_15 = goog.requireType("google3.third_party.javascript.safevalues.dom.elements.svg_use");
const tsickle_document_16 = goog.requireType("google3.third_party.javascript.safevalues.dom.globals.document");
const tsickle_dom_parser_17 = goog.requireType("google3.third_party.javascript.safevalues.dom.globals.dom_parser");
const tsickle_global_18 = goog.requireType("google3.third_party.javascript.safevalues.dom.globals.global");
const tsickle_location_19 = goog.requireType("google3.third_party.javascript.safevalues.dom.globals.location");
const tsickle_range_20 = goog.requireType("google3.third_party.javascript.safevalues.dom.globals.range");
const tsickle_service_worker_container_21 = goog.requireType("google3.third_party.javascript.safevalues.dom.globals.service_worker_container");
const tsickle_url_22 = goog.requireType("google3.third_party.javascript.safevalues.dom.globals.url");
const tsickle_window_23 = goog.requireType("google3.third_party.javascript.safevalues.dom.globals.window");
const tsickle_worker_24 = goog.requireType("google3.third_party.javascript.safevalues.dom.globals.worker");
// BEGIN-INTERNAL
// TODO(b/333544967): Prettier removes the comment on the last line, so we have
// to disable the formatting here.
// prettier-ignore
// END-INTERNAL
const anchor_1 = goog.require('google3.third_party.javascript.safevalues.dom.elements.anchor');
exports.setAnchorHref = anchor_1.setAnchorHref;
exports.setAnchorHrefLite = anchor_1.setAnchorHrefLite;
const area_1 = goog.require('google3.third_party.javascript.safevalues.dom.elements.area');
exports.setAreaHref = area_1.setAreaHref;
const base_1 = goog.require('google3.third_party.javascript.safevalues.dom.elements.base');
exports.setBaseHref = base_1.setBaseHref;
const button_1 = goog.require('google3.third_party.javascript.safevalues.dom.elements.button');
exports.setButtonFormaction = button_1.setButtonFormaction;
const element_1 = goog.require('google3.third_party.javascript.safevalues.dom.elements.element');
exports.buildPrefixedAttributeSetter = element_1.buildPrefixedAttributeSetter;
exports.elementInsertAdjacentHtml = element_1.elementInsertAdjacentHtml;
exports.setElementAttribute = element_1.setElementAttribute;
exports.setElementInnerHtml = element_1.setElementInnerHtml;
exports.setElementOuterHtml = element_1.setElementOuterHtml;
exports.setElementPrefixedAttribute = element_1.setElementPrefixedAttribute;
const embed_1 = goog.require('google3.third_party.javascript.safevalues.dom.elements.embed');
exports.setEmbedSrc = embed_1.setEmbedSrc;
const form_1 = goog.require('google3.third_party.javascript.safevalues.dom.elements.form');
exports.setFormAction = form_1.setFormAction;
exports.setFormActionLite = form_1.setFormActionLite;
const iframe_1 = goog.require('google3.third_party.javascript.safevalues.dom.elements.iframe');
exports.IframeIntent = iframe_1.IframeIntent;
exports.setIframeSrc = iframe_1.setIframeSrc;
exports.setIframeSrcdoc = iframe_1.setIframeSrcdoc;
exports.setIframeSrcdocWithIntent = iframe_1.setIframeSrcdocWithIntent;
exports.setIframeSrcWithIntent = iframe_1.setIframeSrcWithIntent;
exports.TypeCannotBeUsedWithIframeIntentError = iframe_1.TypeCannotBeUsedWithIframeIntentError;
const input_1 = goog.require('google3.third_party.javascript.safevalues.dom.elements.input');
exports.setInputFormaction = input_1.setInputFormaction;
const link_1 = goog.require('google3.third_party.javascript.safevalues.dom.elements.link');
exports.setLinkHrefAndRel = link_1.setLinkHrefAndRel;
exports.setLinkWithResourceUrlHrefAndRel = link_1.setLinkWithResourceUrlHrefAndRel;
const object_1 = goog.require('google3.third_party.javascript.safevalues.dom.elements.object');
exports.setObjectData = object_1.setObjectData;
const script_1 = goog.require('google3.third_party.javascript.safevalues.dom.elements.script');
exports.setScriptSrc = script_1.setScriptSrc;
exports.setScriptTextContent = script_1.setScriptTextContent;
const style_1 = goog.require('google3.third_party.javascript.safevalues.dom.elements.style');
exports.setStyleTextContent = style_1.setStyleTextContent;
const svg_1 = goog.require('google3.third_party.javascript.safevalues.dom.elements.svg');
exports.setSvgAttribute = svg_1.setSvgAttribute;
const svg_use_1 = goog.require('google3.third_party.javascript.safevalues.dom.elements.svg_use');
exports.setSvgUseHref = svg_use_1.setSvgUseHref;
const document_1 = goog.require('google3.third_party.javascript.safevalues.dom.globals.document');
exports.documentExecCommand = document_1.documentExecCommand;
exports.documentExecCommandInsertHtml = document_1.documentExecCommandInsertHtml;
exports.documentWrite = document_1.documentWrite;
const dom_parser_1 = goog.require('google3.third_party.javascript.safevalues.dom.globals.dom_parser');
exports.domParserParseFromString = dom_parser_1.domParserParseFromString;
exports.domParserParseHtml = dom_parser_1.domParserParseHtml;
exports.domParserParseXml = dom_parser_1.domParserParseXml;
const global_1 = goog.require('google3.third_party.javascript.safevalues.dom.globals.global');
exports.fetchResourceUrl = global_1.fetchResourceUrl;
exports.globalEval = global_1.globalEval;
const location_1 = goog.require('google3.third_party.javascript.safevalues.dom.globals.location');
exports.locationAssign = location_1.locationAssign;
exports.locationReplace = location_1.locationReplace;
exports.setLocationHref = location_1.setLocationHref;
const range_1 = goog.require('google3.third_party.javascript.safevalues.dom.globals.range');
exports.rangeCreateContextualFragment = range_1.rangeCreateContextualFragment;
const service_worker_container_1 = goog.require('google3.third_party.javascript.safevalues.dom.globals.service_worker_container');
exports.serviceWorkerContainerRegister = service_worker_container_1.serviceWorkerContainerRegister;
const url_1 = goog.require('google3.third_party.javascript.safevalues.dom.globals.url');
exports.objectUrlFromSafeSource = url_1.objectUrlFromSafeSource;
const window_1 = goog.require('google3.third_party.javascript.safevalues.dom.globals.window');
exports.getScriptNonce = window_1.getScriptNonce;
exports.getStyleNonce = window_1.getStyleNonce;
exports.windowOpen = window_1.windowOpen;
const worker_1 = goog.require('google3.third_party.javascript.safevalues.dom.globals.worker');
exports.createSharedWorker = worker_1.createSharedWorker;
exports.createWorker = worker_1.createWorker;
exports.workerGlobalScopeImportScripts = worker_1.workerGlobalScopeImportScripts;
/** @typedef {!tsickle_worker_24.WorkerGlobalScopeWithImportScripts} */
exports.WorkerGlobalScopeWithImportScripts; // re-export typedef
