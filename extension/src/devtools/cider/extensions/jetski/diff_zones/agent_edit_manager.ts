/**
 * @fileoverview added by tsickle
 * Generated from: devtools/cider/extensions/jetski/diff_zones/agent_edit_manager.ts
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
goog.module('google3.devtools.cider.extensions.jetski.diff_zones.agent_edit_manager');
var module = module || { id: 'devtools/cider/extensions/jetski/diff_zones/agent_edit_manager.closure.js' };
goog.require('google3.third_party.javascript.tslib.tslib');
const tsickle_vscode_1 = goog.requireType("vscode");
const tsickle_diff_zone_renderer_2 = goog.requireType("google3.devtools.cider.extensions.jetski.diff_zones.diff_zone_renderer");
const tsickle_hunk_storage_3 = goog.requireType("google3.devtools.cider.extensions.jetski.diff_zones.hunk_storage");
const tsickle_utils_4 = goog.requireType("google3.devtools.cider.extensions.jetski.diff_zones.utils");
const vscode = goog.require('vscode'); // from //devtools/cider/extensions:vscode
const hunk_storage_1 = goog.require('google3.devtools.cider.extensions.jetski.diff_zones.hunk_storage');
const utils_1 = goog.require('google3.devtools.cider.extensions.jetski.diff_zones.utils');
const diff_zone_renderer_1 = goog.require('google3.devtools.cider.extensions.jetski.diff_zones.diff_zone_renderer');
exports.computeNotebookDiffStats = diff_zone_renderer_1.computeNotebookDiffStats;
exports.parseNotebookCells = diff_zone_renderer_1.parseNotebookCells;
/**
 * Shapes of messages received from the Jetski iframe.
 * @record
 */
function AddAgentEditMessage() { }
exports.AddAgentEditMessage = AddAgentEditMessage;
/* istanbul ignore if */
if (false) {
    /**
     * @type {(undefined|string)}
     * @public
     */
    AddAgentEditMessage.prototype.fileUri;
    /**
     * @type {(undefined|string)}
     * @public
     */
    AddAgentEditMessage.prototype.originalContents;
    /**
     * @type {(undefined|string)}
     * @public
     */
    AddAgentEditMessage.prototype.modifiedContents;
    /**
     * @type {(undefined|boolean)}
     * @public
     */
    AddAgentEditMessage.prototype.skipOpen;
    /**
     * @type {(undefined|number)}
     * @public
     */
    AddAgentEditMessage.prototype.turnIndex;
    /**
     * @type {(undefined|string)}
     * @public
     */
    AddAgentEditMessage.prototype.conversationId;
    /**
     * @type {(undefined|boolean)}
     * @public
     */
    AddAgentEditMessage.prototype.strictNav;
}
/**
 * Per-file diff state sent back to the iframe for the Changes Overview toolbar.
 * @record
 */
function FileAgentEditState() { }
exports.FileAgentEditState = FileAgentEditState;
/* istanbul ignore if */
if (false) {
    /**
     * @type {string}
     * @public
     */
    FileAgentEditState.prototype.uri;
    /**
     * @type {number}
     * @public
     */
    FileAgentEditState.prototype.numLinesInserted;
    /**
     * @type {number}
     * @public
     */
    FileAgentEditState.prototype.numLinesDeleted;
    /**
     * @type {boolean}
     * @public
     */
    FileAgentEditState.prototype.createdByCascade;
}
/**
 * Diff display mode configuration option for agent file edits.
 * @typedef {string}
 */
exports.DiffZoneType;
/**
 * @record
 */
function FileOpenOptions() { }
/* istanbul ignore if */
if (false) {
    /**
     * @type {boolean}
     * @public
     */
    FileOpenOptions.prototype.shouldOpen;
    /**
     * @type {boolean}
     * @public
     */
    FileOpenOptions.prototype.preview;
}
/**
 * Options for configuring AgentEditManager.
 * @record
 */
function AgentEditManagerOptions() { }
exports.AgentEditManagerOptions = AgentEditManagerOptions;
/* istanbul ignore if */
if (false) {
    /**
     * @type {(undefined|boolean)}
     * @public
     */
    AgentEditManagerOptions.prototype.autoAcceptOnChat;
    /**
     * @type {(undefined|number)}
     * @public
     */
    AgentEditManagerOptions.prototype.ageOutThreshold;
}
/**
 * Manages the lifecycle of interactive editor diff zones.
 * Tracks active diff zones, handles hunk resolution events, and manages cleaning them up.
 * @implements {tsickle_vscode_1.TextDocumentContentProvider}
 * @extends {tsickle_vscode_1.Disposable}
 */
class AgentEditManager {
    /**
     * @public
     * @param {!tsickle_vscode_1.ExtensionContext} context Extension context for state persistence.
     * @param {function(): (undefined|!tsickle_diff_zone_renderer_2.DiffZoneRenderer)} createDiffZoneRenderer Factory method returning the active DiffZoneRenderer strategy.
     * @param {(undefined|!AgentEditManagerOptions)=} options Options bucket for settings such as autoAcceptOnChat and ageOutThreshold.
     * @param {(undefined|function(string, string, string): !Promise<void>)=} openStandardDiff Optional callback for opening standard resolved diff views.
     */
    constructor(context, createDiffZoneRenderer, options, openStandardDiff) {
        this.createDiffZoneRenderer = createDiffZoneRenderer;
        this.openStandardDiff = openStandardDiff;
        this.activeDiffZoneDetails = new Map();
        /**
         * Per-file insertion/deletion counts.
         */
        this.fileDiffStats = new Map();
        this.onDidChangeDiffZonesEmitter = new vscode.EventEmitter();
        this.onDidChangeDiffZones = this.onDidChangeDiffZonesEmitter.event;
        /**
         * Tracks files currently being processed. Maps file URI to a Promise that
         * resolves when processing completes. Concurrent callers wait for the
         * in-flight processing to finish instead of being silently dropped.
         */
        this.processingFiles = new Map();
        this.autoAcceptOnChat = false;
        this.ageOutThreshold = 5;
        this.hunkStorage = new hunk_storage_1.HunkStorage(context);
        this.autoAcceptOnChat = options?.autoAcceptOnChat ?? false;
        this.ageOutThreshold = options?.ageOutThreshold ?? 5;
        this.updateDiffZoneRenderer();
    }
    /**
     * Disposes active renderer and clears diff zone state.
     * @public
     * @return {void}
     */
    dispose() {
        this.renderer?.dispose();
        this.activeDiffZoneDetails.clear();
        this.fileDiffStats.clear();
    }
    /**
     * @public
     * @param {function(string, string, string): !Promise<void>} openStandardDiff
     * @return {void}
     */
    setOpenStandardDiff(openStandardDiff) {
        this.openStandardDiff = openStandardDiff;
    }
    /**
     * @public
     * @param {boolean} autoAccept
     * @return {void}
     */
    setAutoAcceptOnChat(autoAccept) {
        this.autoAcceptOnChat = autoAccept;
    }
    /**
     * @public
     * @param {number} threshold
     * @return {void}
     */
    setAgeOutThreshold(threshold) {
        this.ageOutThreshold = threshold;
    }
    /**
     * Updates the active DiffZoneRenderer strategy if configuration has changed.
     * @public
     * @return {void}
     */
    updateDiffZoneRenderer() {
        /** @type {(undefined|!tsickle_diff_zone_renderer_2.DiffZoneRenderer)} */
        const newRenderer = this.createDiffZoneRenderer();
        if (newRenderer?.type !== this.renderer?.type) {
            this.renderer?.dispose();
            this.renderer = newRenderer;
        }
        else if (newRenderer && newRenderer !== this.renderer) {
            newRenderer.dispose();
        }
    }
    /**
     * @public
     * @return {string}
     */
    get diffZoneType() {
        return this.renderer?.type ?? 'disabled';
    }
    /**
     * Clears stored hunk resolutions.
     * @public
     * @return {!Promise<void>}
     */
    async clearHunkStorage() {
        await this.hunkStorage.clear();
    }
    /**
     * Gets details (contents) for an active diff zone.
     * @public
     * @param {string} fileUri
     * @return {(undefined|{originalContents: string, modifiedContents: string})}
     */
    getDiffZoneDetails(fileUri) {
        /** @type {string} */
        const normalizedUri = (0, utils_1.normalizeUri)(fileUri);
        return this.activeDiffZoneDetails.get(normalizedUri);
    }
    /**
     * @public
     * @param {string} fileUri
     * @return {boolean}
     */
    hasUnresolvedHunks(fileUri) {
        /** @type {string} */
        const normalizedUri = (0, utils_1.normalizeUri)(fileUri);
        /** @type {(undefined|{originalContents: string, modifiedContents: string, hunkHashes: (undefined|!Array<string>), conversationId: (undefined|string), turnIndex: (undefined|number)})} */
        const details = this.activeDiffZoneDetails.get(normalizedUri);
        return !!(details?.hunkHashes && details.hunkHashes.length > 0);
    }
    /**
     * Provides original file contents for fallback diff views.
     * @public
     * @param {!tsickle_vscode_1.Uri} uri
     * @return {string}
     */
    provideTextDocumentContent(uri) {
        return this.renderer?.provideTextDocumentContent?.(uri) ?? '';
    }
    /**
     * Checks if the file's current content has diverged from both original and modified.
     * @private
     * @param {!tsickle_vscode_1.TextDocument} doc
     * @param {!AddAgentEditMessage} message
     * @return {boolean}
     */
    hasContentDiverged(doc, message) {
        /** @type {string} */
        const rawText = doc.getText();
        /** @type {string} */
        const currentContent = (0, utils_1.normalizeLineEndings)(rawText);
        /** @type {string} */
        const normalizedOriginal = (0, utils_1.normalizeLineEndings)(message.originalContents ?? '');
        /** @type {string} */
        const normalizedModified = (0, utils_1.normalizeLineEndings)(message.modifiedContents ?? '');
        if (currentContent === normalizedOriginal ||
            currentContent === normalizedModified) {
            return false;
        }
        if (message.fileUri) {
            /** @type {string} */
            const normalizedUri = (0, utils_1.normalizeUri)(message.fileUri);
            /** @type {(undefined|{originalContents: string, modifiedContents: string, hunkHashes: (undefined|!Array<string>), conversationId: (undefined|string), turnIndex: (undefined|number)})} */
            const existingDetails = this.activeDiffZoneDetails.get(normalizedUri);
            if (existingDetails?.modifiedContents !== undefined) {
                /** @type {string} */
                const normalizedExistingModified = (0, utils_1.normalizeLineEndings)(existingDetails.modifiedContents);
                if (currentContent === normalizedExistingModified) {
                    return false;
                }
            }
        }
        if (normalizedOriginal === '') {
            return false;
        }
        return true;
    }
    /**
     * Proposes a new file edit using the configured DiffZoneRenderer strategy.
     * @public
     * @param {!AddAgentEditMessage} message
     * @return {!Promise<void>}
     */
    async handleAddAgentEdit(message) {
        if (!this.renderer || this.renderer.type === 'disabled') {
            return;
        }
        if (!message.fileUri ||
            message.originalContents === undefined ||
            message.modifiedContents === undefined) {
            return;
        }
        try {
            /** @type {string} */
            const normalizedUri = (0, utils_1.normalizeUri)(message.fileUri);
            if (message.turnIndex !== undefined) {
                await this.handleResolveStaleAgentEdits(message.turnIndex);
            }
            // Wait to acquire exclusive ownership of this file's processing.
            // Multiple waiters may resume simultaneously when a promise resolves,
            // but only one will find the map entry cleared and proceed past the
            // loop; the others will re-wait on the new owner's promise.
            while (this.processingFiles.has(normalizedUri)) {
                await this.processingFiles.get(normalizedUri);
            }
            const { promise, resolve } = Promise.withResolvers();
            this.processingFiles.set(normalizedUri, promise);
            try {
                /** @type {string} */
                const normalizedModifiedContents = (0, utils_1.normalizeLineEndings)(message.modifiedContents);
                /** @type {boolean} */
                const hasExistingZoneWithSameContent = await this.handleExistingDiffZone(normalizedUri, normalizedModifiedContents, message.skipOpen, message.strictNav);
                if (hasExistingZoneWithSameContent) {
                    return;
                }
                if (this.activeDiffZoneDetails.has(normalizedUri)) {
                    await this.renderer.closeDiffZone(normalizedUri, true);
                }
                /** @type {!tsickle_vscode_1.Uri} */
                const uri = vscode.Uri.parse(normalizedUri);
                /** @type {function(!tsickle_diff_zone_renderer_2.HunkResolutionEvent): !Promise<void>} */
                const onHunkResolved = (/**
                 * @param {!tsickle_diff_zone_renderer_2.HunkResolutionEvent} event
                 * @return {!Promise<void>}
                 */
                async (event) => {
                    await this.handleHunkResolved(message, event);
                });
                /** @type {function(string): (undefined|!tsickle_hunk_storage_3.HunkResolutionAction)} */
                const getStoredResolution = (/**
                 * @param {string} hash
                 * @return {(undefined|!tsickle_hunk_storage_3.HunkResolutionAction)}
                 */
                (hash) => this.hunkStorage.getResolution(message, hash));
                /** @type {!tsickle_diff_zone_renderer_2.RenderTextEditResult} */
                let result;
                if ((0, utils_1.isNotebook)(normalizedUri)) {
                    // If the notebook is already open in an editor, force reload it from
                    // disk to ensure VS Code's in-memory model reflects the agent's
                    // on-disk writes before creating the diff zone. If the document was
                    // dirty from concurrent edits, this reverts to disk so the DiffZone
                    // accurately presents the agent's proposed turn diff.
                    await vscode.AntigravityFiles?.forceResolveFromFile?.(uri);
                    /** @type {!tsickle_vscode_1.NotebookDocument} */
                    const doc = await vscode.workspace.openNotebookDocument(uri);
                    result = await this.renderer.renderNotebookEdit(uri, doc, message, getStoredResolution, onHunkResolved);
                }
                else {
                    /** @type {!tsickle_vscode_1.TextDocument} */
                    const doc = await vscode.workspace.openTextDocument(uri);
                    // Check if the file content has changed since the DiffZone was last
                    // disposed (e.g., on a previous conversation switch). If the content
                    // changed externally (via undo, VCS revert, manual edit, etc.), skip
                    // the destructive DiffZone creation and show a read-only diff.
                    if (message.conversationId !== undefined &&
                        message.turnIndex !== undefined) {
                        /** @type {(undefined|string)} */
                        const snapshot = this.hunkStorage.getSnapshot(message);
                        if (snapshot !== undefined) {
                            /** @type {string} */
                            const currentHash = this.hunkStorage.computeContentHash((0, utils_1.normalizeLineEndings)(doc.getText()));
                            if (currentHash !== snapshot) {
                                console.info(`[Jetski] File content changed since last DiffZone disposal for ${message.fileUri}, showing read-only diff.`);
                                await this.handleFullyResolvedEdit(message);
                                return;
                            }
                            // Content matches the snapshot — safe to recreate. Clear the snapshot.
                            await this.hunkStorage.clearSnapshot(message);
                        }
                    }
                    if (this.hasContentDiverged(doc, message)) {
                        console.info(`[Jetski] File content has diverged for ${message.fileUri}, showing read-only diff.`);
                        await this.handleFullyResolvedEdit(message);
                        return;
                    }
                    if (message.conversationId !== undefined &&
                        message.turnIndex !== undefined &&
                        this.hunkStorage.hasAnyResolutions(message)) {
                        console.info(`[Jetski] Hunks already resolved for ${message.fileUri}, showing read-only diff.`);
                        await this.handleFullyResolvedEdit(message);
                        return;
                    }
                    result = await this.renderer.renderTextEdit(uri, doc, message, getStoredResolution, onHunkResolved);
                }
                if (result.fullyResolved) {
                    await this.handleFullyResolvedEdit(message);
                    return;
                }
                /** @type {!tsickle_vscode_1.WorkspaceConfiguration} */
                const config = vscode.workspace.getConfiguration('jetski-web');
                /** @type {boolean} */
                const autoOpenAll = config.get('autoOpenFiles', false);
                if (autoOpenAll && message.skipOpen !== true) {
                    await this.revealDocument(normalizedUri, false);
                }
                this.activeDiffZoneDetails.set(normalizedUri, {
                    ...message,
                    originalContents: message.originalContents,
                    modifiedContents: message.modifiedContents,
                    hunkHashes: result.hunkHashes ?? [],
                });
                /** @type {number} */
                let totalInserted = 0;
                /** @type {number} */
                let totalDeleted = 0;
                for (const h of result.hunks) {
                    totalInserted += h.insertions.length;
                    totalDeleted += h.deletions.length;
                }
                this.fileDiffStats.set(normalizedUri, {
                    numLinesInserted: totalInserted,
                    numLinesDeleted: totalDeleted,
                });
                this.fireAgentEditsChanged();
            }
            finally {
                resolve();
                this.processingFiles.delete(normalizedUri);
            }
        }
        catch (e) {
            console.error(`[Jetski] Failed to open diff zone for: ${message.fileUri}`, e);
        }
    }
    /**
     * @private
     * @param {!AddAgentEditMessage} message
     * @param {!tsickle_diff_zone_renderer_2.HunkResolutionEvent} event
     * @return {!Promise<void>}
     */
    async handleHunkResolved(message, event) {
        /** @type {string} */
        const fileUri = event.fileUri;
        /** @type {(undefined|{originalContents: string, modifiedContents: string, hunkHashes: (undefined|!Array<string>), conversationId: (undefined|string), turnIndex: (undefined|number)})} */
        const details = this.activeDiffZoneDetails.get(fileUri);
        if (details && details.hunkHashes) {
            if (event.final) {
                // Record all remaining hunks as resolved so state persists across window reloads.
                for (const hunkHash of details.hunkHashes) {
                    await this.hunkStorage.recordResolution(message, hunkHash, event.accept
                        ? hunk_storage_1.HunkResolutionAction.ACCEPT
                        : hunk_storage_1.HunkResolutionAction.REJECT);
                }
                details.hunkHashes = [];
            }
            else {
                /** @type {string} */
                const hunkHash = event.hunkHash ?? details.hunkHashes[event.hunkIndex];
                if (hunkHash) {
                    /** @type {number} */
                    const indexToRecord = event.hunkHash
                        ? details.hunkHashes.indexOf(event.hunkHash)
                        : event.hunkIndex;
                    if (indexToRecord !== -1) {
                        details.hunkHashes.splice(indexToRecord, 1);
                    }
                    await this.hunkStorage.recordResolution(message, hunkHash, event.accept
                        ? hunk_storage_1.HunkResolutionAction.ACCEPT
                        : hunk_storage_1.HunkResolutionAction.REJECT);
                }
            }
        }
        if (event.final) {
            this.activeDiffZoneDetails.delete(fileUri);
            this.fileDiffStats.delete(fileUri);
            this.fireAgentEditsChanged();
        }
    }
    /**
     * @private
     * @param {string} normalizedUri
     * @param {string} normalizedModifiedContents
     * @param {(undefined|boolean)=} skipOpen
     * @param {boolean=} strictNav
     * @return {!Promise<boolean>}
     */
    async handleExistingDiffZone(normalizedUri, normalizedModifiedContents, skipOpen, strictNav = false) {
        /** @type {(undefined|{originalContents: string, modifiedContents: string, hunkHashes: (undefined|!Array<string>), conversationId: (undefined|string), turnIndex: (undefined|number)})} */
        const existingDetails = this.activeDiffZoneDetails.get(normalizedUri);
        if (!existingDetails ||
            (0, utils_1.normalizeLineEndings)(existingDetails.modifiedContents ?? '') !==
                normalizedModifiedContents) {
            return false;
        }
        console.info(`[Jetski] Diff zone already exists with same content for ${normalizedUri}, skipping recreation.`);
        const { shouldOpen, preview } = this.getOpenOptions(skipOpen, strictNav);
        if (shouldOpen) {
            await this.revealDocument(normalizedUri, preview);
            this.renderer?.focusExistingZone(normalizedUri);
        }
        return true;
    }
    /**
     * @private
     * @param {!AddAgentEditMessage} message
     * @return {!Promise<void>}
     */
    async handleFullyResolvedEdit(message) {
        if (message.fileUri === undefined ||
            message.originalContents === undefined ||
            message.modifiedContents === undefined) {
            return;
        }
        const { shouldOpen, preview } = this.getOpenOptions(message.skipOpen, message.strictNav);
        if (!shouldOpen) {
            return;
        }
        if (message.conversationId !== undefined &&
            message.turnIndex !== undefined &&
            !message.strictNav) {
            /** @type {boolean} */
            const isTurnResolved = this.isTurnFullyResolved(message.fileUri, message.conversationId, message.turnIndex);
            if (!isTurnResolved) {
                /** @type {boolean} */
                const opened = await this.openUnresolvedFileFromSameTurn(message.conversationId, message.turnIndex, preview);
                if (opened) {
                    return;
                }
            }
        }
        if (this.openStandardDiff) {
            await this.openStandardDiff(message.fileUri, message.originalContents, message.modifiedContents);
        }
    }
    /**
     * @private
     * @param {(undefined|string)=} conversationId
     * @param {(undefined|number)=} turnIndex
     * @param {(undefined|boolean)=} preview
     * @return {!Promise<boolean>}
     */
    async openUnresolvedFileFromSameTurn(conversationId, turnIndex, preview) {
        if (conversationId === undefined || turnIndex === undefined) {
            return false;
        }
        for (const [uri__tsickle_destructured_1, details__tsickle_destructured_2] of this.activeDiffZoneDetails.entries()) {
            const uri = /** @type {string} */ (uri__tsickle_destructured_1);
            const details = /** @type {{originalContents: string, modifiedContents: string, hunkHashes: (undefined|!Array<string>), conversationId: (undefined|string), turnIndex: (undefined|number)}} */ (details__tsickle_destructured_2);
            if (details.conversationId === conversationId &&
                details.turnIndex === turnIndex &&
                details.hunkHashes &&
                details.hunkHashes.length > 0) {
                await this.revealDocument(uri, preview);
                this.renderer?.focusExistingZone(uri);
                return true;
            }
        }
        return false;
    }
    /**
     * @private
     * @param {string} currentFileUri
     * @param {(undefined|string)=} conversationId
     * @param {(undefined|number)=} turnIndex
     * @return {boolean}
     */
    isTurnFullyResolved(currentFileUri, conversationId, turnIndex) {
        if (conversationId === undefined || turnIndex === undefined) {
            return true;
        }
        for (const [uri__tsickle_destructured_3, details__tsickle_destructured_4] of this.activeDiffZoneDetails.entries()) {
            const uri = /** @type {string} */ (uri__tsickle_destructured_3);
            const details = /** @type {{originalContents: string, modifiedContents: string, hunkHashes: (undefined|!Array<string>), conversationId: (undefined|string), turnIndex: (undefined|number)}} */ (details__tsickle_destructured_4);
            if (uri === currentFileUri) {
                continue;
            }
            if (details.conversationId === conversationId &&
                details.turnIndex === turnIndex &&
                details.hunkHashes &&
                details.hunkHashes.length > 0) {
                return false;
            }
        }
        return true;
    }
    /**
     * Disposes all active diff zones without reverting or applying changes.
     *
     * Records content snapshots for each active text DiffZone before disposing.
     * These snapshots are used to detect external file modifications when the
     * DiffZone is later recreated (e.g., on conversation switch-back).
     * @public
     * @return {!Promise<void>}
     */
    async disposeAllDiffZones() {
        // Record content snapshots before disposing so we can detect external
        // file modifications when the DiffZone is later recreated.
        //
        // We snapshot the EXPECTED file content (modifiedContents) rather than
        // reading the actual file. This way, if the file was reverted externally
        // (e.g., `jj undo`, VCS revert) while the DiffZone was active, the
        // snapshot won't match the current file content on re-creation, and we'll
        // correctly show a read-only diff instead of destructively recreating.
        for (const [uri__tsickle_destructured_5, details__tsickle_destructured_6] of this.activeDiffZoneDetails.entries()) {
            const uri = /** @type {string} */ (uri__tsickle_destructured_5);
            const details = /** @type {{originalContents: string, modifiedContents: string, hunkHashes: (undefined|!Array<string>), conversationId: (undefined|string), turnIndex: (undefined|number)}} */ (details__tsickle_destructured_6);
            if (details.conversationId !== undefined &&
                details.turnIndex !== undefined &&
                !(0, utils_1.isNotebook)(uri)) {
                try {
                    /** @type {string} */
                    const contentHash = this.hunkStorage.computeContentHash((0, utils_1.normalizeLineEndings)(details.modifiedContents));
                    await this.hunkStorage.recordSnapshot({
                        conversationId: details.conversationId,
                        turnIndex: details.turnIndex,
                        fileUri: uri,
                    }, contentHash);
                }
                catch (e) {
                    console.error(`[Jetski] Failed to record content snapshot for ${uri}`, e);
                }
            }
        }
        if (this.renderer) {
            await this.renderer.disposeAll();
        }
        this.activeDiffZoneDetails.clear();
        this.fileDiffStats.clear();
        this.fireAgentEditsChanged();
    }
    /**
     * Resolves all agent edits across all tracked files.
     * @public
     * @param {boolean} accept
     * @return {!Promise<void>}
     */
    async handleResolveAllAgentEdits(accept) {
        /** @type {!Set<string>} */
        const files = new Set([
            ...this.activeDiffZoneDetails.keys(),
            ...this.fileDiffStats.keys(),
        ]);
        await Promise.all(Array.from(files).flatMap((/**
         * @param {string} fileUri
         * @return {!Array<!Promise<*>>}
         */
        (fileUri) => this.resolveEditsInFile(fileUri, accept))));
        this.fireAgentEditsChanged();
    }
    /**
     * Auto-accepts stale agent edits based on turn index.
     * @public
     * @param {number} currentTurnIndex
     * @return {!Promise<void>}
     */
    async handleResolveStaleAgentEdits(currentTurnIndex) {
        if (this.ageOutThreshold <= 0)
            return;
        /** @type {!Set<string>} */
        const staleFiles = new Set();
        for (const [uri__tsickle_destructured_7, details__tsickle_destructured_8] of this.activeDiffZoneDetails.entries()) {
            const uri = /** @type {string} */ (uri__tsickle_destructured_7);
            const details = /** @type {{originalContents: string, modifiedContents: string, hunkHashes: (undefined|!Array<string>), conversationId: (undefined|string), turnIndex: (undefined|number)}} */ (details__tsickle_destructured_8);
            if (details.turnIndex !== undefined &&
                details.turnIndex < currentTurnIndex - this.ageOutThreshold) {
                staleFiles.add(uri);
            }
        }
        if (staleFiles.size > 0) {
            console.info(`[Jetski] Auto-accepting stale edits for: ${Array.from(staleFiles).join(', ')}`);
            await Promise.all(Array.from(staleFiles).flatMap((/**
             * @param {string} fileUri
             * @return {!Array<!Promise<*>>}
             */
            (fileUri) => this.resolveEditsInFile(fileUri, true))));
            this.fireAgentEditsChanged();
        }
    }
    /**
     * Called when a chat message is sent. Auto-accepts background edits if enabled.
     * @public
     * @param {(undefined|string)=} activeFileUri
     * @return {!Promise<void>}
     */
    async onChatSent(activeFileUri) {
        if (!this.autoAcceptOnChat)
            return;
        /** @type {(undefined|string)} */
        const normalizedActiveUri = activeFileUri
            ? (0, utils_1.normalizeUri)(activeFileUri)
            : undefined;
        /** @type {!Set<string>} */
        const filesToAccept = new Set();
        for (const uri of this.activeDiffZoneDetails.keys()) {
            if (uri !== normalizedActiveUri) {
                filesToAccept.add(uri);
            }
        }
        if (filesToAccept.size > 0) {
            console.info(`[Jetski] Auto-accepting edits in background files: ${Array.from(filesToAccept).join(', ')}`);
            await Promise.all(Array.from(filesToAccept).flatMap((/**
             * @param {string} fileUri
             * @return {!Array<!Promise<*>>}
             */
            (fileUri) => this.resolveEditsInFile(fileUri, true))));
            this.fireAgentEditsChanged();
        }
    }
    /**
     * Resolves all agent edits in a specific file.
     * @public
     * @param {string} fileUri
     * @param {boolean} accept
     * @return {!Promise<void>}
     */
    async handleResolveAllAgentEditsInFile(fileUri, accept) {
        /** @type {string} */
        const normalizedUri = (0, utils_1.normalizeUri)(fileUri);
        await Promise.all(this.resolveEditsInFile(normalizedUri, accept));
        this.fireAgentEditsChanged();
    }
    /**
     * @private
     * @param {string} fileUri
     * @param {boolean} accept
     * @return {!Array<!Promise<*>>}
     */
    resolveEditsInFile(fileUri, accept) {
        /** @type {!Array<!Promise<*>>} */
        const promises = [];
        /** @type {(undefined|{originalContents: string, modifiedContents: string, hunkHashes: (undefined|!Array<string>), conversationId: (undefined|string), turnIndex: (undefined|number)})} */
        const details = this.activeDiffZoneDetails.get(fileUri);
        if (details && details.hunkHashes) {
            for (const hash of details.hunkHashes) {
                promises.push(this.hunkStorage.recordResolution({
                    conversationId: details.conversationId,
                    turnIndex: details.turnIndex,
                    fileUri,
                }, hash, accept ? hunk_storage_1.HunkResolutionAction.ACCEPT : hunk_storage_1.HunkResolutionAction.REJECT));
            }
        }
        if (this.renderer) {
            promises.push(this.renderer.closeDiffZone(fileUri, accept));
        }
        this.activeDiffZoneDetails.delete(fileUri);
        this.fileDiffStats.delete(fileUri);
        return promises;
    }
    /**
     * Focuses the next or previous hunk in the diff zone for the specified file.
     * @public
     * @param {string} fileUri
     * @param {string} direction
     * @return {void}
     */
    focusHunk(fileUri, direction) {
        this.renderer?.focusHunk(fileUri, direction);
    }
    /**
     * @private
     * @return {void}
     */
    fireAgentEditsChanged() {
        this.renderer?.onAgentEditsChanged?.();
        this.onDidChangeDiffZonesEmitter.fire(this.getCurrentStates());
    }
    /**
     * Returns the current list of active edit states.
     * @public
     * @return {!Array<!FileAgentEditState>}
     */
    getCurrentStates() {
        /** @type {!Array<!FileAgentEditState>} */
        const states = [];
        for (const [uri__tsickle_destructured_9, stats__tsickle_destructured_10] of this.fileDiffStats.entries()) {
            const uri = /** @type {string} */ (uri__tsickle_destructured_9);
            const stats = /** @type {{numLinesInserted: number, numLinesDeleted: number}} */ (stats__tsickle_destructured_10);
            states.push({
                uri,
                numLinesInserted: stats.numLinesInserted,
                numLinesDeleted: stats.numLinesDeleted,
                createdByCascade: false,
            });
        }
        return states;
    }
    /**
     * @private
     * @param {(undefined|boolean)=} skipOpen
     * @param {boolean=} strictNav
     * @return {!FileOpenOptions}
     */
    getOpenOptions(skipOpen, strictNav = false) {
        if (skipOpen === true) {
            return { shouldOpen: false, preview: true };
        }
        /** @type {!tsickle_vscode_1.WorkspaceConfiguration} */
        const config = vscode.workspace.getConfiguration('jetski-web');
        /** @type {boolean} */
        const autoOpenAll = config.get('autoOpenFiles', false);
        if (strictNav) {
            return { shouldOpen: true, preview: true };
        }
        if (autoOpenAll) {
            return { shouldOpen: true, preview: false };
        }
        return { shouldOpen: false, preview: true };
    }
    /**
     * @private
     * @param {string} uriStr
     * @param {boolean=} preview
     * @return {!Promise<void>}
     */
    async revealDocument(uriStr, preview = true) {
        try {
            /** @type {!tsickle_vscode_1.Uri} */
            const uri = vscode.Uri.parse(uriStr);
            if ((0, utils_1.isNotebook)(uriStr)) {
                /** @type {!tsickle_vscode_1.NotebookDocument} */
                const doc = await vscode.workspace.openNotebookDocument(uri);
                await vscode.window.showNotebookDocument(doc, { preview });
            }
            else {
                /** @type {!tsickle_vscode_1.TextDocument} */
                const doc = await vscode.workspace.openTextDocument(uri);
                await vscode.window.showTextDocument(doc, { preview });
            }
        }
        catch (e) {
            console.error(`[Jetski] Failed to reveal file ${uriStr}`, e);
        }
    }
}
exports.AgentEditManager = AgentEditManager;
/* istanbul ignore if */
if (false) {
    /**
     * @type {(undefined|!tsickle_diff_zone_renderer_2.DiffZoneRenderer)}
     * @private
     */
    AgentEditManager.prototype.renderer;
    /**
     * @const {!Map<string, {originalContents: string, modifiedContents: string, hunkHashes: (undefined|!Array<string>), conversationId: (undefined|string), turnIndex: (undefined|number)}>}
     * @private
     */
    AgentEditManager.prototype.activeDiffZoneDetails;
    /**
     * Per-file insertion/deletion counts.
     * @const {!Map<string, {numLinesInserted: number, numLinesDeleted: number}>}
     * @private
     */
    AgentEditManager.prototype.fileDiffStats;
    /**
     * @const {!tsickle_vscode_1.EventEmitter<!Array<!FileAgentEditState>>}
     * @private
     */
    AgentEditManager.prototype.onDidChangeDiffZonesEmitter;
    /**
     * @const {!tsickle_vscode_1.Event<!Array<!FileAgentEditState>>}
     * @public
     */
    AgentEditManager.prototype.onDidChangeDiffZones;
    /**
     * Tracks files currently being processed. Maps file URI to a Promise that
     * resolves when processing completes. Concurrent callers wait for the
     * in-flight processing to finish instead of being silently dropped.
     * @const {!Map<string, !Promise<void>>}
     * @private
     */
    AgentEditManager.prototype.processingFiles;
    /**
     * @const {!tsickle_hunk_storage_3.HunkStorage}
     * @private
     */
    AgentEditManager.prototype.hunkStorage;
    /**
     * @type {boolean}
     * @private
     */
    AgentEditManager.prototype.autoAcceptOnChat;
    /**
     * @type {number}
     * @private
     */
    AgentEditManager.prototype.ageOutThreshold;
    /**
     * @const {function(): (undefined|!tsickle_diff_zone_renderer_2.DiffZoneRenderer)}
     * @private
     */
    AgentEditManager.prototype.createDiffZoneRenderer;
    /**
     * @type {(undefined|function(string, string, string): !Promise<void>)}
     * @private
     */
    AgentEditManager.prototype.openStandardDiff;
}
