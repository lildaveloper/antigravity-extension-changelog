/**
 * @fileoverview added by tsickle
 * Generated from: devtools/cider/extensions/jetski/editor_state_watcher.ts
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
goog.module('google3.devtools.cider.extensions.jetski.editor_state_watcher');
var module = module || { id: 'devtools/cider/extensions/jetski/editor_state_watcher.closure.js' };
goog.require('google3.third_party.javascript.tslib.tslib');
const tsickle_protobuf_1 = goog.requireType("google3.third_party.javascript.bufbuild_protobuf.src.index");
const tsickle_connect_2 = goog.requireType("google3.third_party.javascript.connectrpc_connect.src.index");
const tsickle_iframe_messages_pb_3 = goog.requireType("google3.third_party.gemini_coder.proto.iframe_messages_pb");
const tsickle_workspace_4 = goog.requireType("google3.devtools.cider.extensionutils.workspace");
const tsickle_editor_state_protocol_5 = goog.requireType("google3.third_party.gemini_coder.agent_ui_toolkit.dev.extension.editor_state_protocol");
const tsickle_vscode_6 = goog.requireType("vscode");
const tsickle_jetski_instance_7 = goog.requireType("google3.devtools.cider.extensions.jetski.jetski_instance");
const tsickle_notebook_utils_interface_8 = goog.requireType("google3.devtools.cider.extensions.jetski.notebook_utils_interface");
const protobuf_1 = goog.require('google3.third_party.javascript.bufbuild_protobuf.src.index');
const connect_1 = goog.require('google3.third_party.javascript.connectrpc_connect.src.index'); // from //third_party/javascript/connectrpc_connect
// from //third_party/javascript/connectrpc_connect
const iframe_messages_pb_1 = goog.require('google3.third_party.gemini_coder.proto.iframe_messages_pb');
const workspace_1 = goog.require('google3.devtools.cider.extensionutils.workspace');
const vscode = goog.require('vscode'); // from //devtools/cider/extensions:vscode
// Match the exact 500ms debounce interval used by Jetski desktop
// (see third_party/vscode_ext/jetski/src/contextRefresh/contextRefreshListeners.ts).
/** @type {number} */
const REFRESH_CONTEXT_DEBOUNCE_TIME_MS = 500;
/** @type {!Set<string>} */
const SUPPORTED_SCHEMES = new Set([
    'file',
    'vscode-notebook-cell',
    'vscode-remote',
]);
/**
 * Configuration for the EditorStateWatcher.
 * @record
 */
function EditorStateWatcherConfig() { }
exports.EditorStateWatcherConfig = EditorStateWatcherConfig;
/* istanbul ignore if */
if (false) {
    /**
     * @type {(undefined|!tsickle_notebook_utils_interface_8.NotebookUtils)}
     * @public
     */
    EditorStateWatcherConfig.prototype.notebookUtils;
    /**
     * @type {function(): !Array<!tsickle_jetski_instance_7.JetskiInstance>}
     * @public
     */
    EditorStateWatcherConfig.prototype.views;
    /**
     * @type {(undefined|?)}
     * @public
     */
    EditorStateWatcherConfig.prototype.windowOverride;
    /**
     * @type {(undefined|?)}
     * @public
     */
    EditorStateWatcherConfig.prototype.workspaceOverride;
}
/**
 * Listens to VS Code window and workspace events, debounces rapid changes,
 * and forwards active editor state updates to the webview iframe.
 */
class EditorStateWatcher {
    /**
     * @public
     * @param {!EditorStateWatcherConfig} config
     */
    constructor(config) {
        this.recencyCounter = 0;
        this.tabRecency = new Map();
        this.views = config.views;
        this.notebookUtils = config.notebookUtils;
        this.windowOverride = config.windowOverride;
        this.workspaceOverride = config.workspaceOverride;
    }
    /**
     * @private
     * @return {?}
     */
    get window() {
        return this.windowOverride ?? vscode.window;
    }
    /**
     * @private
     * @return {?}
     */
    get workspace() {
        return this.workspaceOverride ?? vscode.workspace;
    }
    /**
     * @private
     * @param {(undefined|string)} uri
     * @return {void}
     */
    markActive(uri) {
        if (uri) {
            /** @type {string} */
            const normalized = (0, workspace_1.toJetskiFileUri)(uri).toString();
            this.tabRecency.set(normalized, ++this.recencyCounter);
        }
    }
    /**
     * Wires up event listeners to native VS Code window/workspace events
     * and returns a disposable to clean them up.
     * @public
     * @return {!tsickle_vscode_6.Disposable}
     */
    watch() {
        // Record current active editor.
        this.markActive(this.window.activeTextEditor?.document.uri.toString());
        this.markActive(this.window.activeNotebookEditor?.notebook.uri.toString());
        return vscode.Disposable.from(this.window.onDidChangeActiveTextEditor((/**
         * @param {(undefined|!tsickle_vscode_6.TextEditor)} e
         * @return {void}
         */
        (e) => {
            this.markActive(e?.document.uri.toString());
            /** @type {(undefined|?)} */
            const activeDoc = this.buildTextDocument(e, e?.document);
            this.forward('ACTIVE_EDITOR_CHANGED', activeDoc);
        })), this.window.onDidChangeActiveNotebookEditor((/**
         * @param {(undefined|!tsickle_vscode_6.NotebookEditor)} e
         * @return {void}
         */
        (e) => {
            this.markActive(e?.notebook.uri.toString());
            /** @type {(undefined|?)} */
            const activeDoc = this.buildNotebookDocument(e);
            this.forward('ACTIVE_EDITOR_CHANGED', activeDoc);
        })), this.window.onDidChangeTextEditorSelection((/**
         * @param {!tsickle_vscode_6.TextEditorSelectionChangeEvent} e
         * @return {void}
         */
        (e) => {
            /** @type {(undefined|?)} */
            const activeDoc = this.buildTextDocument(e.textEditor, e.textEditor.document);
            if (!activeDoc)
                return;
            this.forward('SELECTION_CHANGED', activeDoc);
        })), this.window.onDidChangeTextEditorVisibleRanges((/**
         * @param {!tsickle_vscode_6.TextEditorVisibleRangesChangeEvent} e
         * @return {void}
         */
        (e) => {
            /** @type {(undefined|?)} */
            const activeDoc = this.buildTextDocument(e.textEditor, e.textEditor.document);
            if (!activeDoc)
                return;
            this.forward('VISIBLE_RANGES_CHANGED', activeDoc);
        })), this.window.onDidChangeNotebookEditorVisibleRanges?.((/**
         * @param {!tsickle_vscode_6.NotebookEditorVisibleRangesChangeEvent} e
         * @return {void}
         */
        (e) => {
            /** @type {(undefined|?)} */
            const activeDoc = this.buildNotebookDocument(e.notebookEditor);
            if (!activeDoc)
                return;
            this.forward('VISIBLE_RANGES_CHANGED', activeDoc);
        })), this.workspace.onDidSaveTextDocument((/**
         * @param {!tsickle_vscode_6.TextDocument} d
         * @return {void}
         */
        (d) => {
            if (this.window.activeTextEditor?.document.uri.toString() ===
                d.uri.toString()) {
                /** @type {(undefined|?)} */
                const activeDoc = this.buildTextDocument(this.window.activeTextEditor, d);
                if (!activeDoc)
                    return;
                this.forward('SAVE', activeDoc);
            }
        })), this.workspace.onDidSaveNotebookDocument((/**
         * @param {!tsickle_vscode_6.NotebookDocument} n
         * @return {void}
         */
        (n) => {
            if (this.window.activeNotebookEditor?.notebook.uri.toString() ===
                n.uri.toString()) {
                /** @type {(undefined|?)} */
                const activeDoc = this.buildNotebookDocument(this.window.activeNotebookEditor);
                if (!activeDoc)
                    return;
                this.forward('SAVE', activeDoc);
            }
        })));
    }
    /**
     * Event to be called when a webview focused message is received.
     * @public
     * @return {void}
     */
    webviewFocused() {
        /** @type {(undefined|!tsickle_vscode_6.TextEditor)} */
        const activeEditor = this.window.activeTextEditor;
        /** @type {(undefined|?)} */
        let activeDoc;
        if (activeEditor) {
            activeDoc = this.buildTextDocument(activeEditor, activeEditor.document);
        }
        else {
            /** @type {(undefined|!tsickle_vscode_6.NotebookEditor)} */
            const activeNotebook = this.window.activeNotebookEditor;
            if (activeNotebook) {
                activeDoc = this.buildNotebookDocument(activeNotebook);
            }
        }
        this.forward('ACTIVE_EDITOR_CHANGED', activeDoc);
    }
    /**
     * Gets the current editor state.
     * @public
     * @return {?}
     */
    getCurrentEditorState() {
        /** @type {(undefined|?)} */
        let activeDocument;
        /** @type {(undefined|!tsickle_vscode_6.TextEditor)} */
        const activeEditor = this.window.activeTextEditor;
        /** @type {(undefined|!tsickle_vscode_6.NotebookEditor)} */
        const activeNotebookEditor = this.window.activeNotebookEditor;
        if (activeEditor) {
            activeDocument = this.buildTextDocument(activeEditor, activeEditor.document);
        }
        else if (activeNotebookEditor) {
            activeDocument = this.buildNotebookDocument(activeNotebookEditor);
        }
        /** @type {!Array<?>} */
        const otherDocuments = this.getSortedOtherDocuments(activeDocument?.uri);
        return (0, protobuf_1.create)(iframe_messages_pb_1.GetEditorStateResponseSchema, {
            activeDocument,
            otherDocuments,
        });
    }
    /**
     * @private
     * @param {(undefined|string)} activeUri
     * @return {!Array<?>}
     */
    getSortedOtherDocuments(activeUri) {
        /** @type {!Set<string>} */
        const openTabUris = new Set(this.getOpenTabUris()
            .map((/**
         * @param {string} uri
         * @return {string}
         */
        (uri) => (0, workspace_1.toJetskiFileUri)(uri).toString()))
            .filter((/**
         * @param {string} uri
         * @return {boolean}
         */
        (uri) => uri !== activeUri)));
        /** @type {!Map<string, !tsickle_vscode_6.TextDocument>} */
        const textDocsMap = new Map();
        for (const doc of this.workspace?.textDocuments ?? []) {
            textDocsMap.set((0, workspace_1.toJetskiFileUri)(doc.uri).toString(), doc);
        }
        /** @type {!Map<string, !tsickle_vscode_6.NotebookDocument>} */
        const notebookDocsMap = new Map();
        for (const nb of this.workspace?.notebookDocuments ?? []) {
            notebookDocsMap.set((0, workspace_1.toJetskiFileUri)(nb.uri).toString(), nb);
        }
        /** @type {!Array<?>} */
        const otherDocuments = [];
        for (const uriStr of openTabUris) {
            /** @type {(undefined|!tsickle_vscode_6.TextDocument)} */
            const textDoc = textDocsMap.get(uriStr);
            if (textDoc) {
                otherDocuments.push((0, protobuf_1.create)(iframe_messages_pb_1.EditorStateMessage_DocumentSchema, {
                    uri: (0, workspace_1.toJetskiFileUri)(textDoc.uri).toString(),
                    version: textDoc.version,
                    languageId: textDoc.languageId,
                }));
                continue;
            }
            /** @type {(undefined|!tsickle_vscode_6.NotebookDocument)} */
            const nbDoc = notebookDocsMap.get(uriStr);
            if (nbDoc) {
                otherDocuments.push((0, protobuf_1.create)(iframe_messages_pb_1.EditorStateMessage_DocumentSchema, {
                    uri: (0, workspace_1.toJetskiFileUri)(nbDoc.uri).toString(),
                    version: nbDoc.version,
                    languageId: nbDoc.notebookType,
                }));
                continue;
            }
            // Unloaded tab
            otherDocuments.push((0, protobuf_1.create)(iframe_messages_pb_1.EditorStateMessage_DocumentSchema, {
                uri: (0, workspace_1.toJetskiFileUri)(uriStr).toString(),
            }));
        }
        otherDocuments.sort((/**
         * @param {?} a
         * @param {?} b
         * @return {number}
         */
        (a, b) => (this.tabRecency.get(b.uri) ?? 0) - (this.tabRecency.get(a.uri) ?? 0)));
        return otherDocuments;
    }
    /**
     * @public
     * @param {string} action
     * @param {(undefined|?)=} activeDocument
     * @return {void}
     */
    forward(action, activeDocument) {
        if (this.debounceTimer) {
            clearTimeout(this.debounceTimer);
        }
        this.debounceTimer = setTimeout((/**
         * @return {void}
         */
        () => {
            this.debounceTimer = undefined;
            this.forwardImmediate(action, activeDocument);
        }), REFRESH_CONTEXT_DEBOUNCE_TIME_MS);
    }
    /**
     * @private
     * @param {!tsickle_vscode_6.Range} range
     * @param {number=} lineOffset
     * @return {?}
     */
    toProtoRange(range, lineOffset = 0) {
        return (0, protobuf_1.create)(iframe_messages_pb_1.EditorStateMessage_Document_RangeSchema, {
            start: {
                line: range.start.line + lineOffset,
                character: range.start.character,
            },
            end: {
                line: range.end.line + lineOffset,
                character: range.end.character,
            },
        });
    }
    /**
     * @private
     * @param {!tsickle_vscode_6.Tab} tab
     * @return {(undefined|!tsickle_vscode_6.Uri)}
     */
    getTabUri(tab) {
        /** @type {*} */
        const input = tab.input;
        if (vscode.TabInputText && input instanceof vscode.TabInputText) {
            return (/** @type {!tsickle_vscode_6.TabInputText} */ (input)).uri;
        }
        if (vscode.TabInputNotebook && input instanceof vscode.TabInputNotebook) {
            return (/** @type {!tsickle_vscode_6.TabInputNotebook} */ (input)).uri;
        }
        if (vscode.TabInputTextDiff && input instanceof vscode.TabInputTextDiff) {
            return (/** @type {!tsickle_vscode_6.TabInputTextDiff} */ (input)).modified;
        }
        if (vscode.TabInputNotebookDiff &&
            input instanceof vscode.TabInputNotebookDiff) {
            return (/** @type {!tsickle_vscode_6.TabInputNotebookDiff} */ (input)).modified;
        }
        return undefined;
    }
    /**
     * @private
     * @return {!Array<string>}
     */
    getOpenTabUris() {
        // Collect URIs of all documents currently open in editor tabs.
        // vscode.workspace.textDocuments can contain documents that are loaded in memory
        // but not actively open in any tab group. We filter them to match the visible tabs.
        return (this.window?.tabGroups?.all ?? [])
            .flatMap((/**
         * @param {!tsickle_vscode_6.TabGroup} tg
         * @return {!ReadonlyArray<!tsickle_vscode_6.Tab>}
         */
        (tg) => tg.tabs))
            .map((/**
         * @param {!tsickle_vscode_6.Tab} tab
         * @return {(undefined|!tsickle_vscode_6.Uri)}
         */
        (tab) => this.getTabUri(tab)))
            .filter((/**
         * @param {(undefined|!tsickle_vscode_6.Uri)} uri
         * @return {boolean}
         */
        (uri) => !!uri && SUPPORTED_SCHEMES.has(uri.scheme)))
            .map((/**
         * @param {!tsickle_vscode_6.Uri} uri
         * @return {string}
         */
        (uri) => uri.toString()));
    }
    /**
     * @public
     * @param {string} action
     * @param {(undefined|?)=} activeDocument
     * @return {void}
     */
    forwardImmediate(action, activeDocument) {
        /** @type {!Array<?>} */
        const otherDocuments = this.getSortedOtherDocuments(activeDocument?.uri);
        /** @type {?} */
        const msg = (0, protobuf_1.create)(iframe_messages_pb_1.EditorStateMessageSchema, {
            action,
            activeDocument,
            otherDocuments,
        });
        for (const view of this.views()) {
            void view.api.setEditorState(msg).catch((/**
             * @param {*} e
             * @return {void}
             */
            (e) => {
                // Ignore NotFound: the webview may not have registered the handler yet
                // during initial startup/focus, or the view does not support this RPC method
                // (e.g. non-chat views or version skew). Once ready, the webview pulls state.
                if (connect_1.ConnectError.from(e).code === connect_1.Code.NotFound) {
                    return;
                }
                throw e;
            }));
        }
    }
    /**
     * Builds an EditorStateMessage.Document from a vscode.TextDocument.
     * The document can be either a standard file text document or a notebook cell text document.
     * @public
     * @param {(undefined|!tsickle_vscode_6.TextEditor)} editor
     * @param {(undefined|!tsickle_vscode_6.TextDocument)} document
     * @return {(undefined|?)}
     */
    buildTextDocument(editor, document) {
        if (!document || !SUPPORTED_SCHEMES.has(document.uri.scheme)) {
            return undefined;
        }
        return this.buildFileTextDocument(editor, document);
    }
    /**
     * @public
     * @param {(undefined|!tsickle_vscode_6.NotebookEditor)} notebookEditor
     * @return {(undefined|?)}
     */
    buildNotebookDocument(notebookEditor) {
        if (!notebookEditor) {
            return undefined;
        }
        /** @type {!tsickle_vscode_6.NotebookDocument} */
        const notebookDocument = notebookEditor.notebook;
        /** @type {string} */
        const text = this.notebookUtils?.flattenNotebook(notebookDocument) ?? '';
        return (0, protobuf_1.create)(iframe_messages_pb_1.EditorStateMessage_DocumentSchema, {
            uri: (0, workspace_1.toJetskiFileUri)(notebookDocument.uri).toString(),
            version: notebookDocument.version,
            languageId: notebookDocument.notebookType,
            text,
        });
    }
    /**
     * @private
     * @param {!tsickle_vscode_6.TextDocument} document
     * @return {(undefined|!tsickle_vscode_6.NotebookCell)}
     */
    getNotebookCellForDocument(document) {
        if (this.workspace?.notebookDocuments) {
            for (const nb of this.workspace.notebookDocuments) {
                /** @type {(undefined|!tsickle_vscode_6.NotebookCell)} */
                const targetCell = nb
                    .getCells()
                    .find((/**
                 * @param {!tsickle_vscode_6.NotebookCell} c
                 * @return {boolean}
                 */
                (c) => c.document.uri.toString() === document.uri.toString()));
                if (targetCell) {
                    return targetCell;
                }
            }
        }
        return undefined;
    }
    /**
     * @private
     * @param {(undefined|!tsickle_vscode_6.TextEditor)} editor
     * @param {!tsickle_vscode_6.TextDocument} document
     * @return {?}
     */
    buildFileTextDocument(editor, document) {
        /** @type {(undefined|?)} */
        let selection;
        if (editor?.selection) {
            selection = this.toProtoRange(editor.selection);
        }
        /** @type {(undefined|?)} */
        let visibleRange;
        if (editor?.visibleRanges?.[0]) {
            visibleRange = this.toProtoRange(editor.visibleRanges[0]);
        }
        /** @type {string} */
        let uriStr = document.uri.toString();
        if (document.uri.scheme === 'vscode-notebook-cell') {
            /** @type {(undefined|!tsickle_vscode_6.NotebookCell)} */
            const cell = this.getNotebookCellForDocument(document);
            if (cell) {
                uriStr = document.uri
                    .with({ fragment: this.notebookUtils?.getCellId(cell) ?? '' })
                    .toString();
            }
        }
        else {
            uriStr = (0, workspace_1.toJetskiFileUri)(document.uri).toString();
        }
        return (0, protobuf_1.create)(iframe_messages_pb_1.EditorStateMessage_DocumentSchema, {
            uri: uriStr,
            version: document.version,
            languageId: document.languageId,
            text: document.getText(),
            selection,
            visibleRange,
        });
    }
}
exports.EditorStateWatcher = EditorStateWatcher;
/* istanbul ignore if */
if (false) {
    /**
     * @type {(undefined|number)}
     * @private
     */
    EditorStateWatcher.prototype.debounceTimer;
    /**
     * @const {(undefined|!tsickle_notebook_utils_interface_8.NotebookUtils)}
     * @private
     */
    EditorStateWatcher.prototype.notebookUtils;
    /**
     * @type {number}
     * @private
     */
    EditorStateWatcher.prototype.recencyCounter;
    /**
     * @const {!Map<string, number>}
     * @private
     */
    EditorStateWatcher.prototype.tabRecency;
    /**
     * @const {function(): !Array<!tsickle_jetski_instance_7.JetskiInstance>}
     * @private
     */
    EditorStateWatcher.prototype.views;
    /**
     * @const {(undefined|?)}
     * @private
     */
    EditorStateWatcher.prototype.windowOverride;
    /**
     * @const {(undefined|?)}
     * @private
     */
    EditorStateWatcher.prototype.workspaceOverride;
}
