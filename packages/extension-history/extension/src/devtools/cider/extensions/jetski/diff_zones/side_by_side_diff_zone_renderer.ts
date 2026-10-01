/**
 * @fileoverview added by tsickle
 * Generated from: devtools/cider/extensions/jetski/diff_zones/side_by_side_diff_zone_renderer.ts
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
goog.module('google3.devtools.cider.extensions.jetski.diff_zones.side_by_side_diff_zone_renderer');
var module = module || { id: 'devtools/cider/extensions/jetski/diff_zones/side_by_side_diff_zone_renderer.closure.js' };
goog.require('google3.third_party.javascript.tslib.tslib');
const tsickle_vscode_1 = goog.requireType("vscode");
const tsickle_agent_edit_manager_2 = goog.requireType("google3.devtools.cider.extensions.jetski.diff_zones.agent_edit_manager");
const tsickle_diff_zone_renderer_3 = goog.requireType("google3.devtools.cider.extensions.jetski.diff_zones.diff_zone_renderer");
const tsickle_utils_4 = goog.requireType("google3.devtools.cider.extensions.jetski.diff_zones.utils");
const tsickle_hunk_storage_5 = goog.requireType("google3.devtools.cider.extensions.jetski.diff_zones.hunk_storage");
const vscode = goog.require('vscode');
const diff_zone_renderer_1 = goog.require('google3.devtools.cider.extensions.jetski.diff_zones.diff_zone_renderer');
const utils_1 = goog.require('google3.devtools.cider.extensions.jetski.diff_zones.utils');
/**
 * Implementation of DiffZoneRenderer using standard side-by-side vscode.diff views.
 * @implements {tsickle_diff_zone_renderer_3.DiffZoneRenderer}
 */
class SideBySideDiffZoneRenderer {
    /**
     * @public
     */
    constructor() {
        this.type = 'sideBySide';
        /**
         * Maps normalized fileUri -> original file contents for potential revert.
         */
        this.fallbackEdits = new Map();
        this.providerDisposable =
            vscode.workspace.registerTextDocumentContentProvider(SideBySideDiffZoneRenderer.FALLBACK_SCHEME, this);
    }
    /**
     * @public
     * @param {!tsickle_vscode_1.Uri} uri
     * @param {!tsickle_vscode_1.TextDocument} doc
     * @param {!tsickle_agent_edit_manager_2.AddAgentEditMessage} message
     * @param {function(string): (undefined|!tsickle_hunk_storage_5.HunkResolutionAction)} _getStoredResolution
     * @param {function(!tsickle_diff_zone_renderer_3.HunkResolutionEvent): !Promise<void>} _onHunkResolved
     * @return {!Promise<!tsickle_diff_zone_renderer_3.RenderTextEditResult>}
     */
    async renderTextEdit(uri, doc, message, _getStoredResolution, _onHunkResolved) {
        /** @type {string} */
        const fileUri = (/** @type {string} */ (message.fileUri));
        /** @type {string} */
        const originalContents = (/** @type {string} */ (message.originalContents));
        /** @type {string} */
        const modifiedContents = (/** @type {string} */ (message.modifiedContents));
        /** @type {string} */
        const normalizedUri = (0, utils_1.normalizeUri)(fileUri);
        this.fallbackEdits.set(normalizedUri, originalContents);
        /** @type {string} */
        const currentContent = doc.getText();
        if (currentContent !== modifiedContents) {
            /** @type {!tsickle_vscode_1.WorkspaceEdit} */
            const edit = new vscode.WorkspaceEdit();
            if (doc.lineCount === 0) {
                edit.insert(uri, new vscode.Position(0, 0), modifiedContents);
            }
            else {
                /** @type {!tsickle_vscode_1.Range} */
                const fullRange = new vscode.Range(new vscode.Position(0, 0), doc.lineAt(doc.lineCount - 1).range.end);
                edit.replace(uri, fullRange, modifiedContents);
            }
            await vscode.workspace.applyEdit(edit);
        }
        /** @type {{numLinesInserted: number, numLinesDeleted: number}} */
        const counts = (0, diff_zone_renderer_1.computeLineCounts)(originalContents, modifiedContents);
        return {
            added: false,
            fullyResolved: false,
            hunks: [
                {
                    insertions: new Array(counts.numLinesInserted).fill(''),
                    deletions: new Array(counts.numLinesDeleted).fill(''),
                },
            ],
        };
    }
    /**
     * @public
     * @param {!tsickle_vscode_1.Uri} _uri
     * @param {!tsickle_vscode_1.NotebookDocument} _document
     * @param {!tsickle_agent_edit_manager_2.AddAgentEditMessage} _message
     * @param {function(string): (undefined|!tsickle_hunk_storage_5.HunkResolutionAction)} _getStoredResolution
     * @param {function(!tsickle_diff_zone_renderer_3.HunkResolutionEvent): !Promise<void>} _onHunkResolved
     * @return {!Promise<!tsickle_diff_zone_renderer_3.RenderNotebookEditResult>}
     */
    async renderNotebookEdit(_uri, _document, _message, _getStoredResolution, _onHunkResolved) {
        console.warn('[Jetski] SideBySide diff view for notebooks is not supported.');
        return { added: false, fullyResolved: false, hunks: [] };
    }
    /**
     * @public
     * @param {string} _fileUri
     * @param {(number|string)} _target
     * @return {void}
     */
    focusHunk(_fileUri, _target) { }
    /**
     * @public
     * @param {string} _fileUri
     * @return {void}
     */
    focusExistingZone(_fileUri) { }
    /**
     * @public
     * @param {string} fileUri
     * @param {boolean=} preview
     * @return {!Promise<void>}
     */
    async revealDocument(fileUri, preview = true) {
        /** @type {string} */
        const normalizedUri = (0, utils_1.normalizeUri)(fileUri);
        /** @type {!tsickle_vscode_1.Uri} */
        const uri = vscode.Uri.parse(normalizedUri);
        /** @type {!tsickle_vscode_1.Uri} */
        const originalVirtualUri = vscode.Uri.parse(`${SideBySideDiffZoneRenderer.FALLBACK_SCHEME}://original/${encodeURIComponent(normalizedUri)}`);
        /** @type {string} */
        const fileName = normalizedUri.substring(normalizedUri.lastIndexOf('/') + 1);
        await vscode.commands.executeCommand('vscode.diff', originalVirtualUri, uri, `${fileName} (Agent Edit)`, { preview });
    }
    /**
     * @public
     * @param {string} fileUri
     * @param {boolean} accept
     * @return {!Promise<boolean>}
     */
    async closeDiffZone(fileUri, accept) {
        /** @type {string} */
        const normalizedUri = (0, utils_1.normalizeUri)(fileUri);
        /** @type {(undefined|string)} */
        const originalContents = this.fallbackEdits.get(normalizedUri);
        if (originalContents === undefined) {
            return false;
        }
        this.fallbackEdits.delete(normalizedUri);
        /** @type {!tsickle_vscode_1.Uri} */
        const uri = vscode.Uri.parse(fileUri);
        if (!accept) {
            /** @type {!tsickle_vscode_1.TextDocument} */
            const doc = await vscode.workspace.openTextDocument(uri);
            /** @type {!tsickle_vscode_1.WorkspaceEdit} */
            const edit = new vscode.WorkspaceEdit();
            if (doc.lineCount === 0) {
                edit.insert(uri, new vscode.Position(0, 0), originalContents);
            }
            else {
                /** @type {!tsickle_vscode_1.Range} */
                const fullRange = new vscode.Range(new vscode.Position(0, 0), doc.lineAt(doc.lineCount - 1).range.end);
                edit.replace(uri, fullRange, originalContents);
            }
            await vscode.workspace.applyEdit(edit);
        }
        try {
            /** @type {!tsickle_vscode_1.TextDocument} */
            const freshDoc = await vscode.workspace.openTextDocument(uri);
            await freshDoc.save();
        }
        catch (saveErr) {
            console.error(`[Jetski] Failed to save document ${fileUri}:`, saveErr);
        }
        return true;
    }
    /**
     * @public
     * @return {!Promise<void>}
     */
    async disposeAll() {
        this.fallbackEdits.clear();
    }
    /**
     * @public
     * @param {!tsickle_vscode_1.Uri} uri
     * @return {(undefined|string)}
     */
    provideTextDocumentContent(uri) {
        /** @type {string} */
        const fileUri = decodeURIComponent(uri.path.substring(1));
        /** @type {string} */
        const normalizedUri = (0, utils_1.normalizeUri)(fileUri);
        return this.fallbackEdits.get(normalizedUri);
    }
    /**
     * @public
     * @return {void}
     */
    dispose() {
        this.fallbackEdits.clear();
        this.providerDisposable?.dispose();
    }
}
exports.SideBySideDiffZoneRenderer = SideBySideDiffZoneRenderer;
/**
 * Scheme used by the virtual document content provider for original file contents.
 */
SideBySideDiffZoneRenderer.FALLBACK_SCHEME = 'jetski-edit-original';
/* istanbul ignore if */
if (false) {
    /**
     * Scheme used by the virtual document content provider for original file contents.
     * @const {string}
     * @public
     */
    SideBySideDiffZoneRenderer.FALLBACK_SCHEME;
    /**
     * @const {string}
     * @public
     */
    SideBySideDiffZoneRenderer.prototype.type;
    /**
     * Maps normalized fileUri -> original file contents for potential revert.
     * @const {!Map<string, string>}
     * @private
     */
    SideBySideDiffZoneRenderer.prototype.fallbackEdits;
    /**
     * @const {!tsickle_vscode_1.Disposable}
     * @private
     */
    SideBySideDiffZoneRenderer.prototype.providerDisposable;
}
