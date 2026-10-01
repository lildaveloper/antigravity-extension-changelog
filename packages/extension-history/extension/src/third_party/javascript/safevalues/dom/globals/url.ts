/**
 * @license
 * Copyright Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
/**
 * @fileoverview added by tsickle
 * Generated from: third_party/javascript/safevalues/dom/globals/url.ts
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
goog.module('google3.third_party.javascript.safevalues.dom.globals.url');
var module = module || { id: 'third_party/javascript/safevalues/dom/globals/url.closure.js' };
goog.require('google3.third_party.javascript.tslib.tslib');
const tsickle_url_builders_1 = goog.requireType("google3.third_party.javascript.safevalues.builders.url_builders");
const url_builders_1 = goog.require('google3.third_party.javascript.safevalues.builders.url_builders'); // LINE-INTERNAL
// LINE-INTERNAL
// BEGIN-EXTERNAL
// /**
//  * A pattern that matches safe MIME types. Only matches image, video, audio and
//  * application/octet-stream types, with some parameter support (most notably, we
//  * haven't implemented the more complex parts like %-encoded characters or
//  * non-alphanumerical ones for simplicity's sake). Also, the specs are fairly
//  * complex, and they don't necessarily agree with Chrome on some aspects, and so
//  * we settled on a subset where the behavior makes sense to all parties
//  * involved.
//  * Use application/octet-stream for blobs that are meant to be downloaded.
//  *
//  * The spec is available at https://mimesniff.spec.whatwg.org/ (and see
//  * https://tools.ietf.org/html/rfc2397 for data: urls, which override some of
//  * it).
//  */
// function isSafeMimeType(mimeType: string): boolean {
//   if (mimeType.toLowerCase() === 'application/octet-stream') {
//     return true;
//   }
//   const match = mimeType.match(/^([^;]+)(?:;\w+=(?:\w+|"[\w;,= ]+"))*$/i);
//   return (
//     match?.length === 2 &&
//     (isSafeImageMimeType(match[1]) ||
//       isSafeVideoMimeType(match[1]) ||
//       isSafeAudioMimeType(match[1]) ||
//       isSafeFontMimeType(match[1]))
//   );
// }
//
// function isSafeImageMimeType(mimeType: string): boolean {
//   return /^image\/(?:bmp|gif|jpeg|jpg|png|tiff|webp|x-icon|heic|heif|avif|x-ms-bmp)$/i.test(
//     mimeType,
//   );
// }
//
// function isSafeVideoMimeType(mimeType: string): boolean {
//   return /^video\/(?:mpeg|mp4|ogg|webm|x-matroska|quicktime|x-ms-wmv)$/i.test(
//     mimeType,
//   );
// }
//
// function isSafeAudioMimeType(mimeType: string): boolean {
//   return /^audio\/(?:3gpp2|3gpp|aac|amr|L16|midi|mp3|mp4|mpeg|oga|ogg|opus|x-m4a|x-matroska|x-wav|wav|webm)$/i.test(
//     mimeType,
//   );
// }
//
// function isSafeFontMimeType(mimeType: string): boolean {
//   return /^font\/[\w-]+$/i.test(mimeType);
// }
// END-EXTERNAL
/**
 * Wraps URL.createObjectURL, checking the safety of the source. For blobs, the
 * function validates that the Blob's type is amongst the safe MIME types, and
 * throws if that's not the case. URL.revokeObjectURL should be called on the
 * returned URL to free the resources.
 * @param {(!Blob|!MediaSource)} source
 * @return {string}
 */
function objectUrlFromSafeSource(source) {
    // BEGIN-INTERNAL
    return (0, url_builders_1.objectUrlFromSafeSource)(source).toString();
    // END-INTERNAL
    // BEGIN-EXTERNAL
    // // MediaSource support in Safari is limited
    // // https://developer.mozilla.org/en-US/docs/Web/API/MediaSource#browser_compatibility
    // if (typeof MediaSource !== 'undefined' && source instanceof MediaSource) {
    //   return URL.createObjectURL(source);
    // }
    // const blob = source as Blob;
    // if (!isSafeMimeType(blob.type)) {
    //   let message = '';
    //   if (DEV_MODE) {
    //     message = `unsafe blob MIME type: ${blob.type}`;
    //   }
    //   throw new Error(message);
    // }
    // return URL.createObjectURL(blob);
    // END-EXTERNAL
}
exports.objectUrlFromSafeSource = objectUrlFromSafeSource;
