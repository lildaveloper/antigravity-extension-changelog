/**
 * @license
 * Copyright Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
/* GENERATED CODE, DO NOT MODIFY */
/**
 * @fileoverview added by tsickle
 * Generated from: third_party/javascript/safevalues/builders/html_sanitizer/sanitizer_table/default_sanitizer_table.ts
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
goog.module('google3.third_party.javascript.safevalues.builders.html_sanitizer.sanitizer_table.default_sanitizer_table');
var module = module || { id: 'third_party/javascript/safevalues/builders/html_sanitizer/sanitizer_table/default_sanitizer_table.closure.js' };
goog.require('google3.third_party.javascript.tslib.tslib');
const tsickle_pure_1 = goog.requireType("google3.third_party.javascript.safevalues.internals.pure");
const tsickle_sanitizer_table_2 = goog.requireType("google3.third_party.javascript.safevalues.builders.html_sanitizer.sanitizer_table.sanitizer_table");
const pure_1 = goog.require('google3.third_party.javascript.safevalues.internals.pure');
const sanitizer_table_1 = goog.require('google3.third_party.javascript.safevalues.builders.html_sanitizer.sanitizer_table.sanitizer_table');
/** @type {!ReadonlyArray<string>} */
const ALLOWED_ELEMENTS = [
    'ARTICLE',
    'SECTION',
    'NAV',
    'ASIDE',
    'H1',
    'H2',
    'H3',
    'H4',
    'H5',
    'H6',
    'HEADER',
    'FOOTER',
    'ADDRESS',
    'P',
    'HR',
    'PRE',
    'BLOCKQUOTE',
    'OL',
    'UL',
    'LH',
    'LI',
    'DL',
    'DT',
    'DD',
    'FIGURE',
    'FIGCAPTION',
    'MAIN',
    'DIV',
    'EM',
    'STRONG',
    'SMALL',
    'S',
    'CITE',
    'Q',
    'DFN',
    'ABBR',
    'RUBY',
    'RB',
    'RT',
    'RTC',
    'RP',
    'DATA',
    'TIME',
    'CODE',
    'VAR',
    'SAMP',
    'KBD',
    'SUB',
    'SUP',
    'I',
    'B',
    'U',
    'MARK',
    'BDI',
    'BDO',
    'SPAN',
    'BR',
    'WBR',
    'NOBR',
    'INS',
    'DEL',
    'PICTURE',
    'PARAM',
    'TRACK',
    'MAP',
    'TABLE',
    'CAPTION',
    'COLGROUP',
    'COL',
    'TBODY',
    'THEAD',
    'TFOOT',
    'TR',
    'TD',
    'TH',
    'SELECT',
    'DATALIST',
    'OPTGROUP',
    'OPTION',
    'OUTPUT',
    'PROGRESS',
    'METER',
    'FIELDSET',
    'LEGEND',
    'DETAILS',
    'SUMMARY',
    'MENU',
    'DIALOG',
    'SLOT',
    'CANVAS',
    'FONT',
    'CENTER',
    'ACRONYM',
    'BASEFONT',
    'BIG',
    'DIR',
    'HGROUP',
    'STRIKE',
    'TT',
];
/** @type {!ReadonlyArray<!Array<?>>} */
const ELEMENT_POLICIES = [
    [
        'A',
        new Map([
            [
                'href',
                {
                    policyAction: sanitizer_table_1.AttributePolicyAction.KEEP_AND_USE_NAVIGATION_URL_POLICY,
                },
            ],
        ]),
    ],
    [
        'AREA',
        new Map([
            [
                'href',
                {
                    policyAction: sanitizer_table_1.AttributePolicyAction.KEEP_AND_USE_NAVIGATION_URL_POLICY,
                },
            ],
        ]),
    ],
    [
        'LINK',
        new Map([
            [
                'href',
                {
                    policyAction: sanitizer_table_1.AttributePolicyAction.KEEP_AND_USE_RESOURCE_URL_POLICY,
                    conditions: new Map([
                        [
                            'rel',
                            new Set([
                                'alternate',
                                'author',
                                'bookmark',
                                'canonical',
                                'cite',
                                'help',
                                'icon',
                                'license',
                                'next',
                                'prefetch',
                                'dns-prefetch',
                                'prerender',
                                'preconnect',
                                'preload',
                                'prev',
                                'search',
                                'subresource',
                            ]),
                        ],
                    ]),
                },
            ],
        ]),
    ],
    [
        'SOURCE',
        new Map([
            [
                'src',
                {
                    policyAction: sanitizer_table_1.AttributePolicyAction.KEEP_AND_USE_RESOURCE_URL_POLICY,
                },
            ],
            [
                'srcset',
                {
                    policyAction: sanitizer_table_1.AttributePolicyAction.KEEP_AND_USE_RESOURCE_URL_POLICY_FOR_SRCSET,
                },
            ],
        ]),
    ],
    [
        'IMG',
        new Map([
            [
                'src',
                {
                    policyAction: sanitizer_table_1.AttributePolicyAction.KEEP_AND_USE_RESOURCE_URL_POLICY,
                },
            ],
            [
                'srcset',
                {
                    policyAction: sanitizer_table_1.AttributePolicyAction.KEEP_AND_USE_RESOURCE_URL_POLICY_FOR_SRCSET,
                },
            ],
        ]),
    ],
    [
        'VIDEO',
        new Map([
            [
                'src',
                {
                    policyAction: sanitizer_table_1.AttributePolicyAction.KEEP_AND_USE_RESOURCE_URL_POLICY,
                },
            ],
        ]),
    ],
    [
        'AUDIO',
        new Map([
            [
                'src',
                {
                    policyAction: sanitizer_table_1.AttributePolicyAction.KEEP_AND_USE_RESOURCE_URL_POLICY,
                },
            ],
        ]),
    ],
];
/** @type {!ReadonlyArray<string>} */
const ALLOWED_GLOBAL_ATTRIBUTES = [
    'title',
    'aria-atomic',
    'aria-autocomplete',
    'aria-busy',
    'aria-checked',
    'aria-current',
    'aria-disabled',
    'aria-dropeffect',
    'aria-expanded',
    'aria-haspopup',
    'aria-hidden',
    'aria-invalid',
    'aria-label',
    'aria-level',
    'aria-live',
    'aria-multiline',
    'aria-multiselectable',
    'aria-orientation',
    'aria-posinset',
    'aria-pressed',
    'aria-readonly',
    'aria-relevant',
    'aria-required',
    'aria-selected',
    'aria-setsize',
    'aria-sort',
    'aria-valuemax',
    'aria-valuemin',
    'aria-valuenow',
    'aria-valuetext',
    'alt',
    'align',
    'autocapitalize',
    'autocomplete',
    'autocorrect',
    'autofocus',
    'autoplay',
    'bgcolor',
    'border',
    'cellpadding',
    'cellspacing',
    'checked',
    'cite',
    'color',
    'cols',
    'colspan',
    'controls',
    'controlslist',
    'coords',
    'crossorigin',
    'datetime',
    'disabled',
    'download',
    'draggable',
    'enctype',
    'face',
    'formenctype',
    'frameborder',
    'height',
    'hreflang',
    'hidden',
    'inert',
    'ismap',
    'label',
    'lang',
    'loop',
    'max',
    'maxlength',
    'media',
    'minlength',
    'min',
    'multiple',
    'muted',
    'nonce',
    'open',
    'playsinline',
    'placeholder',
    'preload',
    'rel',
    'required',
    'reversed',
    'role',
    'rows',
    'rowspan',
    'selected',
    'shape',
    'size',
    'sizes',
    'slot',
    'span',
    'spellcheck',
    'start',
    'step',
    'summary',
    'translate',
    'type',
    'usemap',
    'valign',
    'value',
    'width',
    'wrap',
    'itemscope',
    'itemtype',
    'itemid',
    'itemprop',
    'itemref',
];
/** @type {!ReadonlyArray<!Array<?>>} */
const GLOBAL_ATTRIBUTE_POLICIES = [
    [
        'dir',
        {
            policyAction: sanitizer_table_1.AttributePolicyAction.KEEP_AND_NORMALIZE,
            conditions: (0, pure_1.pure)((/**
             * @return {!Map<string, !Set<string>>}
             */
            () => {
                return new Map([
                    ['dir', new Set(['auto', 'ltr', 'rtl'])],
                ]);
            })),
        },
    ],
    [
        'async',
        {
            policyAction: sanitizer_table_1.AttributePolicyAction.KEEP_AND_NORMALIZE,
            conditions: (0, pure_1.pure)((/**
             * @return {!Map<string, !Set<string>>}
             */
            () => {
                return new Map([
                    ['async', new Set(['async'])],
                ]);
            })),
        },
    ],
    [
        'loading',
        {
            policyAction: sanitizer_table_1.AttributePolicyAction.KEEP_AND_NORMALIZE,
            conditions: (0, pure_1.pure)((/**
             * @return {!Map<string, !Set<string>>}
             */
            () => {
                return new Map([
                    ['loading', new Set(['eager', 'lazy'])],
                ]);
            })),
        },
    ],
    [
        'poster',
        {
            policyAction: sanitizer_table_1.AttributePolicyAction.KEEP_AND_USE_RESOURCE_URL_POLICY,
        },
    ],
    [
        'target',
        {
            policyAction: sanitizer_table_1.AttributePolicyAction.KEEP_AND_NORMALIZE,
            conditions: (0, pure_1.pure)((/**
             * @return {!Map<string, !Set<string>>}
             */
            () => {
                return new Map([
                    ['target', new Set(['_self', '_blank'])],
                ]);
            })),
        },
    ],
];
/**
 * Sanitizer table for the default sanitizer configuration
 * // BEGIN-INTERNAL
 * This SanitizerTable was generated from the checked in html contract:
 *  webutil/html/types/codegen/html5_contract.textpb
 *
 * You can regenerate this file with:
 * webutil/html/types/codegen/update_generated_source_files.sh  // END-INTERNAL
 * @type {!tsickle_sanitizer_table_2.SanitizerTable}
 */
exports.DEFAULT_SANITIZER_TABLE = new sanitizer_table_1.SanitizerTable(new Set(ALLOWED_ELEMENTS), new Map(ELEMENT_POLICIES), new Set(ALLOWED_GLOBAL_ATTRIBUTES), new Map(GLOBAL_ATTRIBUTE_POLICIES), undefined);
// BEGIN-INTERNAL
/**
 * This is similar to the default sanitizer configuration, but tries to allow as
 * many things while still guaranteeing the security of the output.
 *
 * This configuration does not protect against go/dom-clobbering.
 *
 * We construct it directly rather than relying on the `HtmlSanitizerBuilder` to
 * make sure that the compiler knows it can be dead-code eliminated when unused.
 * @type {!tsickle_sanitizer_table_2.SanitizerTable}
 */
exports.LENIENT_SANITIZER_TABLE = new sanitizer_table_1.SanitizerTable(new Set(ALLOWED_ELEMENTS.concat(['BUTTON', 'INPUT'])), new Map(ELEMENT_POLICIES), new Set((0, pure_1.pure)((/**
 * @return {!Array<string>}
 */
() => ALLOWED_GLOBAL_ATTRIBUTES.concat(['class', 'id', 'name'])))), new Map((0, pure_1.pure)((/**
 * @return {!Array<!Array<?>>}
 */
() => GLOBAL_ATTRIBUTE_POLICIES.concat([
    // safevalues doesn't have a style sanitizer
    ['style', { policyAction: sanitizer_table_1.AttributePolicyAction.KEEP }],
])))), undefined);
/**
 * This is also similar to the default sanitizer configuration, but tries to be
 * even more lenient than the LENIENT_SANITIZER_TABLE while still guaranteeing
 * that the output cannot cause XSS in modern browsers. This should only be
 * used when absolutely necessary. See go/super-lenient-sanitizer for more
 * information.
 *
 * We construct it directly rather than relying on the `HtmlSanitizerBuilder` to
 * make sure that the compiler knows it can be dead-code eliminated when unused.
 * @type {!tsickle_sanitizer_table_2.SanitizerTable}
 */
exports.SUPER_LENIENT_SANITIZER_TABLE = new sanitizer_table_1.SanitizerTable(new Set((0, pure_1.pure)((/**
 * @return {!Array<string>}
 */
() => ALLOWED_ELEMENTS.concat([
    'STYLE',
    'TITLE',
    'INPUT',
    'TEXTAREA',
    'BUTTON',
    'LABEL',
])))), new Map(ELEMENT_POLICIES), new Set((0, pure_1.pure)((/**
 * @return {!Array<string>}
 */
() => ALLOWED_GLOBAL_ATTRIBUTES.concat([
    'class',
    'id',
    'tabindex',
    'contenteditable',
    'name',
])))), new Map((0, pure_1.pure)((/**
 * @return {!Array<!Array<?>>}
 */
() => GLOBAL_ATTRIBUTE_POLICIES.concat([
    // safevalues doesn't have a style sanitizer
    ['style', { policyAction: sanitizer_table_1.AttributePolicyAction.KEEP }],
])))), new Set(['data-', 'aria-']));
