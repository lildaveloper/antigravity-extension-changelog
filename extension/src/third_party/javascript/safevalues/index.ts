/**
 * @license
 * Copyright Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
/**
 * @fileoverview added by tsickle
 * Generated from: third_party/javascript/safevalues/index.ts
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
goog.module('google3.third_party.javascript.safevalues.index');
var module = module || { id: 'third_party/javascript/safevalues/index.closure.js' };
goog.require('google3.third_party.javascript.tslib.tslib');
const tsickle_attribute_builders_1 = goog.requireType("google3.third_party.javascript.safevalues.builders.attribute_builders");
const tsickle_document_fragment_builders_2 = goog.requireType("google3.third_party.javascript.safevalues.builders.document_fragment_builders");
const tsickle_html_builders_3 = goog.requireType("google3.third_party.javascript.safevalues.builders.html_builders");
const tsickle_html_formatter_4 = goog.requireType("google3.third_party.javascript.safevalues.builders.html_formatter");
const tsickle_default_css_sanitizer_5 = goog.requireType("google3.third_party.javascript.safevalues.builders.html_sanitizer.default_css_sanitizer");
const tsickle_html_sanitizer_6 = goog.requireType("google3.third_party.javascript.safevalues.builders.html_sanitizer.html_sanitizer");
const tsickle_html_sanitizer_builder_7 = goog.requireType("google3.third_party.javascript.safevalues.builders.html_sanitizer.html_sanitizer_builder");
const tsickle_url_policy_8 = goog.requireType("google3.third_party.javascript.safevalues.builders.html_sanitizer.url_policy");
const tsickle_resource_url_builders_9 = goog.requireType("google3.third_party.javascript.safevalues.builders.resource_url_builders");
const tsickle_script_builders_10 = goog.requireType("google3.third_party.javascript.safevalues.builders.script_builders");
const tsickle_style_sheet_builders_11 = goog.requireType("google3.third_party.javascript.safevalues.builders.style_sheet_builders");
const tsickle_url_builders_12 = goog.requireType("google3.third_party.javascript.safevalues.builders.url_builders");
const tsickle_attribute_impl_13 = goog.requireType("google3.third_party.javascript.safevalues.internals.attribute_impl");
const tsickle_html_impl_14 = goog.requireType("google3.third_party.javascript.safevalues.internals.html_impl");
const tsickle_resource_url_impl_15 = goog.requireType("google3.third_party.javascript.safevalues.internals.resource_url_impl");
const tsickle_script_impl_16 = goog.requireType("google3.third_party.javascript.safevalues.internals.script_impl");
const tsickle_style_sheet_impl_17 = goog.requireType("google3.third_party.javascript.safevalues.internals.style_sheet_impl");
const tsickle_url_impl_18 = goog.requireType("google3.third_party.javascript.safevalues.internals.url_impl");
const tsickle_reporting_19 = goog.requireType("google3.third_party.javascript.safevalues.reporting.reporting");
/** Safe builders */
const attribute_builders_1 = goog.require('google3.third_party.javascript.safevalues.builders.attribute_builders');
exports.safeAttrPrefix = attribute_builders_1.safeAttrPrefix;
const document_fragment_builders_1 = goog.require('google3.third_party.javascript.safevalues.builders.document_fragment_builders');
exports.htmlFragment = document_fragment_builders_1.htmlFragment;
exports.htmlToNode = document_fragment_builders_1.htmlToNode;
exports.svgFragment = document_fragment_builders_1.svgFragment;
const html_builders_1 = goog.require('google3.third_party.javascript.safevalues.builders.html_builders');
exports.concatHtmls = html_builders_1.concatHtmls;
exports.createHtml = html_builders_1.createHtml;
exports.doctypeHtml = html_builders_1.doctypeHtml;
exports.htmlEscape = html_builders_1.htmlEscape;
exports.joinHtmls = html_builders_1.joinHtmls;
exports.nodeToHtml = html_builders_1.nodeToHtml;
exports.scriptToHtml = html_builders_1.scriptToHtml;
exports.scriptUrlToHtml = html_builders_1.scriptUrlToHtml;
// BEGIN-INTERNAL
// TODO(b/333544967): Prettier removes the comment on the last line, so we have
// to disable the formatting here.
// prettier-ignore
const html_builders_2 = html_builders_1;
exports.styleSheetToHtml = html_builders_2.styleSheetToHtml;
// END-INTERNAL
const html_formatter_1 = goog.require('google3.third_party.javascript.safevalues.builders.html_formatter'); // LINE-INTERNAL
exports.HtmlFormatter = html_formatter_1.HtmlFormatter;
// LINE-INTERNAL
const default_css_sanitizer_1 = goog.require('google3.third_party.javascript.safevalues.builders.html_sanitizer.default_css_sanitizer');
exports.sanitizeHtmlWithCss = default_css_sanitizer_1.sanitizeHtmlWithCss;
const html_sanitizer_1 = goog.require('google3.third_party.javascript.safevalues.builders.html_sanitizer.html_sanitizer');
exports.sanitizeHtml = html_sanitizer_1.sanitizeHtml;
exports.sanitizeHtmlAssertUnchanged = html_sanitizer_1.sanitizeHtmlAssertUnchanged;
exports.sanitizeHtmlToFragment = html_sanitizer_1.sanitizeHtmlToFragment;
/** @typedef {!tsickle_html_sanitizer_6.CssSanitizer} */
exports.CssSanitizer; // re-export typedef
/** @typedef {!tsickle_html_sanitizer_6.HtmlSanitizer} */
exports.HtmlSanitizer; // re-export typedef
const html_sanitizer_builder_1 = goog.require('google3.third_party.javascript.safevalues.builders.html_sanitizer.html_sanitizer_builder');
exports.CssSanitizerBuilder = html_sanitizer_builder_1.CssSanitizerBuilder;
exports.HtmlSanitizerBuilder = html_sanitizer_builder_1.HtmlSanitizerBuilder;
const url_policy_1 = goog.require('google3.third_party.javascript.safevalues.builders.html_sanitizer.url_policy');
exports.UrlPolicyHintsType = url_policy_1.UrlPolicyHintsType;
/** @typedef {!tsickle_url_policy_8.UrlPolicy} */
exports.UrlPolicy; // re-export typedef
/** @typedef {!tsickle_url_policy_8.UrlPolicyHints} */
exports.UrlPolicyHints; // re-export typedef
const resource_url_builders_1 = goog.require('google3.third_party.javascript.safevalues.builders.resource_url_builders');
exports.appendParams = resource_url_builders_1.appendParams;
exports.appendPathSegment = resource_url_builders_1.appendPathSegment;
exports.objectUrlFromScript = resource_url_builders_1.objectUrlFromScript;
exports.replaceFragment = resource_url_builders_1.replaceFragment;
exports.replaceParams = resource_url_builders_1.replaceParams;
exports.toAbsoluteResourceUrl = resource_url_builders_1.toAbsoluteResourceUrl;
exports.trustedResourceUrl = resource_url_builders_1.trustedResourceUrl;
const script_builders_1 = goog.require('google3.third_party.javascript.safevalues.builders.script_builders');
exports.concatScripts = script_builders_1.concatScripts;
exports.safeScript = script_builders_1.safeScript;
exports.safeScriptWithArgs = script_builders_1.safeScriptWithArgs;
exports.valueAsScript = script_builders_1.valueAsScript;
const style_sheet_builders_1 = goog.require('google3.third_party.javascript.safevalues.builders.style_sheet_builders');
exports.concatStyleSheets = style_sheet_builders_1.concatStyleSheets;
exports.safeStyleRule = style_sheet_builders_1.safeStyleRule;
exports.safeStyleSheet = style_sheet_builders_1.safeStyleSheet;
// BEGIN-INTERNAL
const url_builders_1 = goog.require('google3.third_party.javascript.safevalues.builders.url_builders');
exports.SanitizableUrlScheme = url_builders_1.SanitizableUrlScheme;
exports.addJavaScriptUrlSanitizationCallback = url_builders_1.addJavaScriptUrlSanitizationCallback;
exports.fromMediaSource = url_builders_1.fromMediaSource;
exports.fromTrustedResourceUrl = url_builders_1.fromTrustedResourceUrl;
exports.objectUrlFromSafeSource = url_builders_1.objectUrlFromSafeSource;
exports.removeJavaScriptUrlSanitizationCallback = url_builders_1.removeJavaScriptUrlSanitizationCallback;
exports.safeUrl = url_builders_1.safeUrl;
exports.sanitizeUrl = url_builders_1.sanitizeUrl;
exports.sanitizeUrlForMigration = url_builders_1.sanitizeUrlForMigration;
exports.trySanitizeUrl = url_builders_1.trySanitizeUrl;
/** @typedef {!tsickle_url_builders_12.Scheme} */
exports.Scheme; // re-export typedef
// END-INTERNAL
/** Types, constants and unwrappers */
const attribute_impl_1 = goog.require('google3.third_party.javascript.safevalues.internals.attribute_impl');
exports.SafeAttributePrefix = attribute_impl_1.SafeAttributePrefix;
exports.unwrapAttributePrefix = attribute_impl_1.unwrapAttributePrefix;
const html_impl_1 = goog.require('google3.third_party.javascript.safevalues.internals.html_impl');
exports.EMPTY_HTML = html_impl_1.EMPTY_HTML;
exports.SafeHtml = html_impl_1.SafeHtml;
exports.isHtml = html_impl_1.isHtml;
exports.unwrapHtml = html_impl_1.unwrapHtml;
const resource_url_impl_1 = goog.require('google3.third_party.javascript.safevalues.internals.resource_url_impl');
exports.TrustedResourceUrl = resource_url_impl_1.TrustedResourceUrl;
exports.isResourceUrl = resource_url_impl_1.isResourceUrl;
exports.unwrapResourceUrl = resource_url_impl_1.unwrapResourceUrl;
const script_impl_1 = goog.require('google3.third_party.javascript.safevalues.internals.script_impl');
exports.EMPTY_SCRIPT = script_impl_1.EMPTY_SCRIPT;
exports.SafeScript = script_impl_1.SafeScript;
exports.isScript = script_impl_1.isScript;
exports.unwrapScript = script_impl_1.unwrapScript;
const style_sheet_impl_1 = goog.require('google3.third_party.javascript.safevalues.internals.style_sheet_impl');
exports.SafeStyleSheet = style_sheet_impl_1.SafeStyleSheet;
exports.isStyleSheet = style_sheet_impl_1.isStyleSheet;
exports.unwrapStyleSheet = style_sheet_impl_1.unwrapStyleSheet;
// BEGIN-INTERNAL
const url_impl_1 = goog.require('google3.third_party.javascript.safevalues.internals.url_impl');
exports.ABOUT_BLANK = url_impl_1.ABOUT_BLANK;
exports.INNOCUOUS_URL = url_impl_1.INNOCUOUS_URL;
exports.SafeUrl = url_impl_1.SafeUrl;
exports.isUrl = url_impl_1.isUrl;
exports.unwrapUrl = url_impl_1.unwrapUrl;
// END-INTERNAL
const reporting_1 = goog.require('google3.third_party.javascript.safevalues.reporting.reporting'); // LINE-INTERNAL
exports.reportOnlyHtmlPassthrough = reporting_1.reportOnlyHtmlPassthrough;
