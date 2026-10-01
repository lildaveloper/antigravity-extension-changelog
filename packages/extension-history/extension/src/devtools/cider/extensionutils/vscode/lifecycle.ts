/**
 * @fileoverview added by tsickle
 * Generated from: devtools/cider/extensionutils/vscode/lifecycle.ts
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
goog.module('google3.devtools.cider.extensionutils.vscode.lifecycle');
var module = module || { id: 'devtools/cider/extensionutils/vscode/lifecycle.closure.js' };
goog.require('google3.third_party.javascript.tslib.tslib');
const tsickle_lifecycle_1 = goog.requireType("google3.third_party.antigravity.src.vs.base.common.lifecycle");
const lifecycle_1 = goog.require('google3.third_party.antigravity.src.vs.base.common.lifecycle');
const lifecycle_2 = lifecycle_1;
exports.DisposableStore = lifecycle_2.DisposableStore;
exports.dispose = lifecycle_2.dispose;
exports.MutableDisposable = lifecycle_2.MutableDisposable;
/**
 * @deprecated Use `vscode.Disposable.from`.
 * @param {...!tsickle_lifecycle_1.IDisposable} disposables
 * @return {!tsickle_lifecycle_1.IDisposable}
 */
function combinedDisposable(...disposables) {
    return (0, lifecycle_1.combinedDisposable)(...disposables);
}
exports.combinedDisposable = combinedDisposable;
/**
 * @deprecated Use `new vscode.Disposable`.
 * @param {function(): void} fn
 * @return {!tsickle_lifecycle_1.IDisposable}
 */
function toDisposable(fn) {
    return (0, lifecycle_1.toDisposable)(fn);
}
exports.toDisposable = toDisposable;
