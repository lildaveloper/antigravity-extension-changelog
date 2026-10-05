/**
 * @fileoverview added by tsickle
 * Generated from: devtools/cider/extensions/jetski/diff_zones/resolved_diff_decorations.ts
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
goog.module('google3.devtools.cider.extensions.jetski.diff_zones.resolved_diff_decorations');
var module = module || { id: 'devtools/cider/extensions/jetski/diff_zones/resolved_diff_decorations.closure.js' };
goog.require('google3.third_party.javascript.tslib.tslib');
const tsickle_vscode_1 = goog.requireType("vscode");
const tsickle_agent_edit_manager_2 = goog.requireType("google3.devtools.cider.extensions.jetski.diff_zones.agent_edit_manager");
const tsickle_diff_zone_renderer_3 = goog.requireType("google3.devtools.cider.extensions.jetski.diff_zones.diff_zone_renderer");
const vscode = goog.require('vscode'); // from //devtools/cider/extensions:vscode
/**
 * Scheme of both sides of a read-only (Resolved) diff.
 * @type {string}
 */
const RESOLVED_DIFF_SCHEME = 'jetski-diff';
/**
 * Shown after the first non-blank line of a rejected change, like a blame
 * annotation.
 * @type {string}
 */
const REJECTED_LABEL = '✗ Rejected';
/**
 * Shown the same way on a rejected deletion, whose lines were kept.
 * @type {string}
 */
const REJECTED_LINES_KEPT_LABEL = '✗ Rejected (lines kept)';
/**
 * Hover on a rejected change.
 * @type {string}
 */
const REJECTED_HOVER = 'You rejected this change.';
/**
 * The side and file shown by an editor of a read-only (Resolved) diff,
 * given its document URI (`jetski-diff://<original|modified>/<encoded file
 * URI>`, see ExtensionApiImpl.openVirtualDiff), or undefined for any other
 * editor.
 * @param {!tsickle_vscode_1.Uri} uri
 * @return {(undefined|{side: string, fileUri: string})}
 */
function resolvedDiffSide(uri) {
    if (uri.scheme !== RESOLVED_DIFF_SCHEME)
        return undefined;
    /** @type {string} */
    const side = uri.authority;
    if (side !== 'original' && side !== 'modified')
        return undefined;
    // The path is the file URI, already decoded by vscode.Uri.
    /** @type {string} */
    const fileUri = uri.path.substring(1);
    return fileUri ? { side, fileUri } : undefined;
}
/**
 * Whether the diff showing `uri` is the one `marks` describe. The virtual
 * URIs are reused by every read-only diff of the file, so the tab's title
 * must end with the marks' label. Without a tab to check, the URI decides.
 * @param {!tsickle_vscode_1.Uri} uri
 * @param {!tsickle_agent_edit_manager_2.ResolvedDiffMarks} marks
 * @return {boolean}
 */
function isMarkedDiff(uri, marks) {
    /** @type {string} */
    const uriString = uri.toString();
    /** @type {!Array<!tsickle_vscode_1.Tab>} */
    const tabs = (vscode.window.tabGroups?.all ?? [])
        .flatMap((/**
     * @param {!tsickle_vscode_1.TabGroup} group
     * @return {!ReadonlyArray<!tsickle_vscode_1.Tab>}
     */
    (group) => group.tabs))
        .filter((/**
     * @param {!tsickle_vscode_1.Tab} tab
     * @return {boolean}
     */
    (tab) => {
        /** @type {(undefined|{original: (undefined|!tsickle_vscode_1.Uri), modified: (undefined|!tsickle_vscode_1.Uri)})} */
        const input = (/** @type {(undefined|{original: (undefined|!tsickle_vscode_1.Uri), modified: (undefined|!tsickle_vscode_1.Uri)})} */ (tab.input));
        return (input?.original?.toString() === uriString ||
            input?.modified?.toString() === uriString);
    }));
    return (tabs.length === 0 ||
        tabs.some((/**
         * @param {!tsickle_vscode_1.Tab} tab
         * @return {boolean}
         */
        (tab) => tab.label.endsWith(`(${marks.outcomeLabel})`))));
}
/**
 * Marks the rejected changes in read-only (Resolved) diffs, from
 * `AgentEditManager.getResolvedDiffMarks`:
 * - on the right, a rejected change gets a "Rejected" label after its first
 *   non-blank line, like a blame annotation, and its added lines are struck
 *   through and dimmed;
 * - on the left, a rejected change that only deletes lines gets a "Rejected
 *   (lines kept)" label the same way, as those lines were kept.
 * Accepted changes are not marked. Only used by VS Code.
 * @param {!tsickle_agent_edit_manager_2.AgentEditManager} agentEditManager
 * @return {!tsickle_vscode_1.Disposable}
 */
function registerResolvedDiffDecorations(agentEditManager) {
    /** @type {function(string): !tsickle_vscode_1.TextEditorDecorationType} */
    const labelType = (/**
     * @param {string} contentText
     * @return {!tsickle_vscode_1.TextEditorDecorationType}
     */
    (contentText) => vscode.window.createTextEditorDecorationType({
        after: {
            contentText,
            color: new vscode.ThemeColor('editorCodeLens.foreground'),
            fontStyle: 'italic',
            margin: '0 0 0 3em',
        },
        overviewRulerColor: new vscode.ThemeColor('editorOverviewRuler.deletedForeground'),
    }));
    /** @type {!tsickle_vscode_1.TextEditorDecorationType} */
    const rejectedLabel = labelType(REJECTED_LABEL);
    /** @type {!tsickle_vscode_1.TextEditorDecorationType} */
    const linesKeptLabel = labelType(REJECTED_LINES_KEPT_LABEL);
    // Strikes through and dims the added lines of rejected changes, on top of
    // the label.
    /** @type {!tsickle_vscode_1.TextEditorDecorationType} */
    const struckLines = vscode.window.createTextEditorDecorationType({
        isWholeLine: true,
        textDecoration: 'line-through',
        opacity: '0.6',
    });
    /**
     * The end of the line to label in each range still in the document: its
     * first non-blank line, or its first line if all are blank.
     * @type {function(!tsickle_vscode_1.TextDocument, !ReadonlyArray<!tsickle_diff_zone_renderer_3.LineRange>): !Array<!tsickle_vscode_1.DecorationOptions>}
     */
    const labelRanges = (/**
     * @param {!tsickle_vscode_1.TextDocument} document
     * @param {!ReadonlyArray<!tsickle_diff_zone_renderer_3.LineRange>} ranges
     * @return {!Array<!tsickle_vscode_1.DecorationOptions>}
     */
    (document, ranges) => ranges
        .filter((/**
     * @param {!tsickle_diff_zone_renderer_3.LineRange} r
     * @return {boolean}
     */
    (r) => r.startLine < document.lineCount))
        .map((/**
     * @param {!tsickle_diff_zone_renderer_3.LineRange} r
     * @return {{range: !tsickle_vscode_1.Range, hoverMessage: string}}
     */
    (r) => {
        /** @type {number} */
        const last = Math.min(r.endLine, document.lineCount - 1);
        /** @type {number} */
        let line = r.startLine;
        while (line < last && document.lineAt(line).text.trim() === '') {
            line++;
        }
        if (document.lineAt(line).text.trim() === '')
            line = r.startLine;
        /** @type {!tsickle_vscode_1.Position} */
        const end = document.lineAt(line).range.end;
        return {
            range: new vscode.Range(end, end),
            hoverMessage: REJECTED_HOVER,
        };
    })));
    /** @type {function(!tsickle_vscode_1.TextEditor): void} */
    const decorate = (/**
     * @param {!tsickle_vscode_1.TextEditor} editor
     * @return {void}
     */
    (editor) => {
        /** @type {(undefined|{side: string, fileUri: string})} */
        const shown = resolvedDiffSide(editor.document.uri);
        if (!shown)
            return;
        /** @type {(undefined|?)} */
        const found = agentEditManager.getResolvedDiffMarks(shown.fileUri);
        /** @type {(undefined|?)} */
        const marks = found && isMarkedDiff(editor.document.uri, found) ? found : undefined;
        /** @type {!Array<!tsickle_vscode_1.DecorationOptions>} */
        let rejected = [];
        /** @type {!Array<!tsickle_vscode_1.DecorationOptions>} */
        let linesKept = [];
        /** @type {!Array<!tsickle_vscode_1.DecorationOptions>} */
        let struck = [];
        if (marks && shown.side === 'modified') {
            rejected = labelRanges(editor.document, marks.modifiedRanges);
            struck = marks.modifiedRanges.map((/**
             * @param {!tsickle_diff_zone_renderer_3.LineRange} r
             * @return {{range: !tsickle_vscode_1.Range, hoverMessage: string}}
             */
            (r) => ({
                range: new vscode.Range(r.startLine, 0, r.endLine, 0),
                hoverMessage: REJECTED_HOVER,
            })));
        }
        else if (marks) {
            linesKept = labelRanges(editor.document, marks.originalRanges);
        }
        // Also clears marks of a previous diff in the reused editor.
        editor.setDecorations(rejectedLabel, rejected);
        editor.setDecorations(linesKeptLabel, linesKept);
        editor.setDecorations(struckLines, struck);
    });
    /** @type {function(): void} */
    const decorateAll = (/**
     * @return {void}
     */
    () => {
        for (const editor of vscode.window.visibleTextEditors ?? []) {
            decorate(editor);
        }
    });
    /** @type {!tsickle_vscode_1.TabGroups} */
    const tabGroups = vscode.window.tabGroups;
    /** @type {!Array<!tsickle_vscode_1.Disposable>} */
    const disposables = [
        rejectedLabel,
        linesKeptLabel,
        struckLines,
        agentEditManager.onDidChangeResolvedDiffMarks(decorateAll),
        vscode.window.onDidChangeVisibleTextEditors(decorateAll),
        // A reused diff document gets the next diff's text after it shows.
        vscode.workspace.onDidChangeTextDocument((/**
         * @param {!tsickle_vscode_1.TextDocumentChangeEvent} e
         * @return {void}
         */
        (e) => {
            if (e.document.uri.scheme !== RESOLVED_DIFF_SCHEME)
                return;
            for (const editor of vscode.window.visibleTextEditors ?? []) {
                if (editor.document === e.document)
                    decorate(editor);
            }
        })),
        // The tab title, which tells reused diffs apart, can change later.
        ...(tabGroups ? [tabGroups.onDidChangeTabs(decorateAll)] : []),
    ];
    decorateAll();
    return vscode.Disposable.from(...disposables);
}
exports.registerResolvedDiffDecorations = registerResolvedDiffDecorations;
/** @type {{REJECTED_HOVER: string, REJECTED_LABEL: string, REJECTED_LINES_KEPT_LABEL: string, resolvedDiffSide: function(!tsickle_vscode_1.Uri): (undefined|{side: string, fileUri: string})}} */
exports.TEST_ONLY = {
    REJECTED_HOVER,
    REJECTED_LABEL,
    REJECTED_LINES_KEPT_LABEL,
    resolvedDiffSide,
};
