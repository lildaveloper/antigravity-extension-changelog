/**
 * @fileoverview added by tsickle
 * Generated from: cloud/developer_experience/antigravity_extensions/vscode/deferred_renderer_switch.ts
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
goog.module('google3.cloud.developer_experience.antigravity_extensions.vscode.deferred_renderer_switch');
var module = module || { id: 'cloud/developer_experience/antigravity_extensions/vscode/deferred_renderer_switch.closure.js' };
goog.require('google3.third_party.javascript.tslib.tslib');
const tsickle_vscode_1 = goog.requireType("vscode");
/**
 * The inline reviews that are open.
 * @record
 */
function InlineReviews() { }
exports.InlineReviews = InlineReviews;
/* istanbul ignore if */
if (false) {
    /**
     * @const {!tsickle_vscode_1.Event<*>}
     * @public
     */
    InlineReviews.prototype.onDidChangeActiveDiffs;
    /**
     * @public
     * @return {boolean}
     */
    InlineReviews.prototype.hasActiveDiffs = function () { };
}
/**
 * Applies a diff renderer switch once no inline review is open. Switching
 * disposes the open inline reviews, which reverts the agent's edits on disk.
 * @extends {tsickle_vscode_1.Disposable}
 */
class DeferredRendererSwitch {
    /**
     * @public
     * @param {function(): void} apply
     */
    constructor(apply) {
        this.apply = apply;
    }
    /**
     * Applies now if `reviews` has none open, or else once they close. A newer
     * request replaces a pending one. Returns whether it applied now.
     * @public
     * @param {(undefined|!InlineReviews)} reviews
     * @return {boolean}
     */
    request(reviews) {
        this.pending?.dispose();
        this.pending = undefined;
        if (!reviews?.hasActiveDiffs()) {
            this.apply();
            return true;
        }
        /** @type {!tsickle_vscode_1.Disposable} */
        const subscription = reviews.onDidChangeActiveDiffs((/**
         * @return {void}
         */
        () => {
            if (reviews.hasActiveDiffs())
                return;
            subscription.dispose();
            if (this.pending === subscription)
                this.pending = undefined;
            this.apply();
        }));
        this.pending = subscription;
        return false;
    }
    /**
     * @public
     * @return {void}
     */
    dispose() {
        this.pending?.dispose();
        this.pending = undefined;
    }
}
exports.DeferredRendererSwitch = DeferredRendererSwitch;
/* istanbul ignore if */
if (false) {
    /**
     * @type {(undefined|!tsickle_vscode_1.Disposable)}
     * @private
     */
    DeferredRendererSwitch.prototype.pending;
    /**
     * @const {function(): void}
     * @private
     */
    DeferredRendererSwitch.prototype.apply;
}
