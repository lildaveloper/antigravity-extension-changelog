/**
 * @fileoverview added by tsickle
 * Generated from: devtools/cider/extensions/jetski/terminal_state_tracker.ts
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
goog.module('google3.devtools.cider.extensions.jetski.terminal_state_tracker');
var module = module || { id: 'devtools/cider/extensions/jetski/terminal_state_tracker.closure.js' };
goog.require('google3.third_party.javascript.tslib.tslib');
const tsickle_vscode_1 = goog.requireType("vscode");
const vscode = goog.require('vscode'); // from //devtools/cider/extensions:vscode
// from //devtools/cider/extensions:vscode
/**
 * Maximum number of characters of terminal output retained per terminal.
 * @type {number}
 */
const MAX_TERMINAL_OUTPUT_CHARS = 8192;
/**
 * Inline SVG data URI matching `TerminalSquareIcon` (`#9ca3af` muted-foreground)
 * so the `\@` category dropdown, `\@terminal:` items, and mention pill render a
 * terminal icon inside `<img src={iconUri} />` across iframe origins.
 * @type {string}
 */
exports.TERMINAL_CATEGORY_ICON_URI = 'data:image/svg+xml;utf8,' +
    encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">' +
        '<path fill-rule="evenodd" clip-rule="evenodd" d="M4.02975 19.9703C4.38308 20.3234 4.80908 20.5 5.30775 20.5H18.6923C19.1909 20.5 19.6169 20.3234 19.9703 19.9703C20.3234 19.6169 20.5 19.1909 20.5 18.6923V5.30775C20.5 4.80908 20.3234 4.38308 19.9703 4.02975C19.6169 3.67658 19.1909 3.5 18.6923 3.5H5.30775C4.80908 3.5 4.38308 3.67658 4.02975 4.02975C3.67658 4.38308 3.5 4.80908 3.5 5.30775V18.6923C3.5 19.1909 3.67658 19.6169 4.02975 19.9703ZM5.09625 5.09625C5.16025 5.03208 5.23075 5 5.30775 5H18.6923C18.7693 5 18.8398 5.03208 18.9038 5.09625C18.9679 5.16025 19 5.23075 19 5.30775V18.6923C19 18.7693 18.9679 18.8398 18.9038 18.9038C18.8398 18.9679 18.7693 19 18.6923 19H5.30775C5.23075 19 5.16025 18.9679 5.09625 18.9038C5.03208 18.8398 5 18.7693 5 18.6923V5.30775C5 5.23075 5.03208 5.16025 5.09625 5.09625Z" fill="#9ca3af"/>' +
        '<path d="M11.25 15.8122C11.0375 15.8122 10.8594 15.7403 10.7158 15.5965C10.5719 15.4526 10.5 15.2745 10.5 15.062C10.5 14.8493 10.5719 14.6712 10.7158 14.5277C10.8594 14.384 11.0375 14.3122 11.25 14.3122H15.25C15.4625 14.3122 15.6406 14.3841 15.7842 14.528C15.9281 14.6718 16 14.85 16 15.0625C16 15.2751 15.9281 15.4532 15.7842 15.5967C15.6406 15.7404 15.4625 15.8122 15.25 15.8122H11.25Z" fill="#9ca3af"/>' +
        '<path d="M7.223 8.49222L8.72689 9.99995L7.22795 11.4915C7.07928 11.6401 7.00495 11.8167 7.00495 12.0212C7.00495 12.2257 7.07928 12.4023 7.22795 12.551C7.37661 12.6996 7.5517 12.774 7.7532 12.774C7.95453 12.774 8.1307 12.6996 8.2817 12.551L10.2076 10.6327C10.3883 10.4519 10.4786 10.2409 10.4786 9.99995C10.4786 9.75895 10.3883 9.54803 10.2076 9.3672L8.27675 7.43272C8.12575 7.28405 7.94959 7.20972 7.74825 7.20972C7.54675 7.20972 7.37166 7.28405 7.223 7.43272C7.07433 7.58138 7 7.75797 7 7.96247C7 8.16697 7.07433 8.34355 7.223 8.49222Z" fill="#9ca3af"/>' +
        '</svg>');
/**
 * Regular expression matching ANSI escape sequences for clean LLM context.
 * @type {!RegExp}
 */
const ANSI_ESCAPE_REGEX = 
// eslint-disable-next-line no-control-regex
/[\u001b\u009b][[()#;?]*(?:[0-9]{1,4}(?:;[0-9]{0,4})*)?[0-9A-ORZcf-nqry=><]/g;
/**
 * Strips ANSI escape codes and normalizes carriage returns in terminal output.
 * @param {string} text
 * @return {string}
 */
function stripAnsiCodes(text) {
    return text.replace(ANSI_ESCAPE_REGEX, '').replace(/\r\n/g, '\n');
}
/**
 * Snapshot of a tracked VS Code terminal's state and recent output buffer.
 * @record
 */
function TrackedTerminalState() { }
exports.TrackedTerminalState = TrackedTerminalState;
/* istanbul ignore if */
if (false) {
    /**
     * @const {!tsickle_vscode_1.Terminal}
     * @public
     */
    TrackedTerminalState.prototype.terminal;
    /**
     * @type {string}
     * @public
     */
    TrackedTerminalState.prototype.name;
    /**
     * @type {(undefined|number)}
     * @public
     */
    TrackedTerminalState.prototype.processId;
    /**
     * @type {(undefined|string)}
     * @public
     */
    TrackedTerminalState.prototype.cwd;
    /**
     * @type {string}
     * @public
     */
    TrackedTerminalState.prototype.lastCommand;
    /**
     * @type {(undefined|number)}
     * @public
     */
    TrackedTerminalState.prototype.lastExitCode;
    /**
     * @type {boolean}
     * @public
     */
    TrackedTerminalState.prototype.isRunning;
    /**
     * @type {string}
     * @public
     */
    TrackedTerminalState.prototype.outputBuffer;
}
/**
 * Minimal shape for VS Code 1.93+ TerminalShellExecution APIs.
 * @record
 */
function TerminalShellExecutionLike() { }
exports.TerminalShellExecutionLike = TerminalShellExecutionLike;
/* istanbul ignore if */
if (false) {
    /**
     * @const {{value: string}}
     * @public
     */
    TerminalShellExecutionLike.prototype.commandLine;
    /**
     * @const {(undefined|!tsickle_vscode_1.Uri)}
     * @public
     */
    TerminalShellExecutionLike.prototype.cwd;
    /**
     * @public
     * @return {!AsyncIterable<string, ?, ?>}
     */
    TerminalShellExecutionLike.prototype.read = function () { };
}
/**
 * Event fired when a shell command starts in a terminal.
 * @record
 */
function TerminalShellExecutionStartEventLike() { }
exports.TerminalShellExecutionStartEventLike = TerminalShellExecutionStartEventLike;
/* istanbul ignore if */
if (false) {
    /**
     * @const {!tsickle_vscode_1.Terminal}
     * @public
     */
    TerminalShellExecutionStartEventLike.prototype.terminal;
    /**
     * @const {!TerminalShellExecutionLike}
     * @public
     */
    TerminalShellExecutionStartEventLike.prototype.execution;
}
/**
 * Event fired when a shell command ends in a terminal.
 * @record
 */
function TerminalShellExecutionEndEventLike() { }
exports.TerminalShellExecutionEndEventLike = TerminalShellExecutionEndEventLike;
/* istanbul ignore if */
if (false) {
    /**
     * @const {!tsickle_vscode_1.Terminal}
     * @public
     */
    TerminalShellExecutionEndEventLike.prototype.terminal;
    /**
     * @const {!TerminalShellExecutionLike}
     * @public
     */
    TerminalShellExecutionEndEventLike.prototype.execution;
    /**
     * @const {(undefined|number)}
     * @public
     */
    TerminalShellExecutionEndEventLike.prototype.exitCode;
}
/**
 * Extended window type supporting VS Code terminal shell integration events.
 * @typedef {?}
 */
exports.WindowWithShellIntegration;
/**
 * Tracks VS Code integrated terminals, shell commands, and output buffers via
 * VS Code's Terminal and Shell Integration APIs so the Antigravity agent and
 * `\@terminal` context mentions can read VS Code's terminals.
 * @extends {tsickle_vscode_1.Disposable}
 */
class TerminalStateTracker {
    /**
     * @public
     * @param {(undefined|?)=} windowOverride
     */
    constructor(windowOverride) {
        this.states = new Map();
        this.disposables = [];
        this.windowApi =
            windowOverride ?? ((/** @type {?} */ (vscode.window)));
        this.initialize();
    }
    /**
     * @private
     * @return {void}
     */
    initialize() {
        for (const terminal of this.windowApi.terminals ?? []) {
            this.ensureTerminalTracked(terminal);
        }
        if (typeof this.windowApi.onDidOpenTerminal === 'function') {
            this.disposables.push(this.windowApi.onDidOpenTerminal((/**
             * @param {!tsickle_vscode_1.Terminal} terminal
             * @return {void}
             */
            (terminal) => {
                this.ensureTerminalTracked(terminal);
            })));
        }
        if (typeof this.windowApi.onDidCloseTerminal === 'function') {
            this.disposables.push(this.windowApi.onDidCloseTerminal((/**
             * @param {!tsickle_vscode_1.Terminal} terminal
             * @return {void}
             */
            (terminal) => {
                this.states.delete(terminal);
            })));
        }
        if (typeof this.windowApi.onDidStartTerminalShellExecution === 'function') {
            this.disposables.push(this.windowApi.onDidStartTerminalShellExecution((/**
             * @param {!tsickle_vscode_1.TerminalShellExecutionStartEvent} event
             * @return {void}
             */
            (event) => {
                void this.handleExecutionStart(event);
            })));
        }
        if (typeof this.windowApi.onDidEndTerminalShellExecution === 'function') {
            this.disposables.push(this.windowApi.onDidEndTerminalShellExecution((/**
             * @param {!tsickle_vscode_1.TerminalShellExecutionEndEvent} event
             * @return {void}
             */
            (event) => {
                this.handleExecutionEnd(event);
            })));
        }
    }
    /**
     * @private
     * @param {!tsickle_vscode_1.Terminal} terminal
     * @return {!TrackedTerminalState}
     */
    ensureTerminalTracked(terminal) {
        /** @type {(undefined|!TrackedTerminalState)} */
        const existing = this.states.get(terminal);
        if (existing) {
            existing.name = terminal.name || existing.name;
            return existing;
        }
        /** @type {!TrackedTerminalState} */
        const state = {
            terminal,
            name: terminal.name || 'terminal',
            cwd: terminal.shellIntegration?.cwd?.fsPath,
            lastCommand: '',
            isRunning: false,
            outputBuffer: '',
        };
        this.states.set(terminal, state);
        void Promise.resolve(terminal.processId)
            .then((/**
         * @param {(undefined|number)} pid
         * @return {void}
         */
        (pid) => {
            if (pid !== undefined) {
                state.processId = pid;
            }
        }))
            .catch((/**
         * @return {void}
         */
        () => { }));
        return state;
    }
    /**
     * @private
     * @param {!TerminalShellExecutionStartEventLike} event
     * @return {!Promise<void>}
     */
    async handleExecutionStart(event) {
        /** @type {!TrackedTerminalState} */
        const state = this.ensureTerminalTracked(event.terminal);
        /** @type {string} */
        const cmd = event.execution.commandLine?.value ?? '';
        state.lastCommand = cmd;
        state.isRunning = true;
        state.lastExitCode = undefined;
        if (event.execution.cwd?.fsPath) {
            state.cwd = event.execution.cwd.fsPath;
        }
        if (cmd) {
            this.appendOutput(state, `$ ${cmd}\n`);
        }
        try {
            /** @type {!AsyncIterable<string, ?, ?>} */
            const stream = event.execution.read?.();
            if (!stream)
                return;
            for await (const chunk of stream) {
                if (chunk) {
                    this.appendOutput(state, stripAnsiCodes(chunk));
                }
            }
        }
        catch {
            // Ignore stream read errors if terminal closes mid-execution.
        }
    }
    /**
     * @private
     * @param {!TerminalShellExecutionEndEventLike} event
     * @return {void}
     */
    handleExecutionEnd(event) {
        /** @type {!TrackedTerminalState} */
        const state = this.ensureTerminalTracked(event.terminal);
        state.isRunning = false;
        state.lastExitCode = event.exitCode;
    }
    /**
     * @private
     * @param {!TrackedTerminalState} state
     * @param {string} text
     * @return {void}
     */
    appendOutput(state, text) {
        /** @type {string} */
        const combined = state.outputBuffer + text;
        if (combined.length > MAX_TERMINAL_OUTPUT_CHARS) {
            state.outputBuffer = combined.slice(combined.length - MAX_TERMINAL_OUTPUT_CHARS);
        }
        else {
            state.outputBuffer = combined;
        }
    }
    /**
     * Manually records output for a terminal (useful for tests or custom output hooks).
     * @public
     * @param {!tsickle_vscode_1.Terminal} terminal
     * @param {string} output
     * @param {(undefined|string)=} lastCommand
     * @return {void}
     */
    recordTerminalOutput(terminal, output, lastCommand) {
        /** @type {!TrackedTerminalState} */
        const state = this.ensureTerminalTracked(terminal);
        if (lastCommand !== undefined) {
            state.lastCommand = lastCommand;
        }
        this.appendOutput(state, stripAnsiCodes(output));
    }
    /**
     * Returns the tracked state snapshot for a given VS Code terminal.
     * @public
     * @param {!tsickle_vscode_1.Terminal} terminal
     * @return {!Promise<{processId: string, name: string, cwd: (undefined|string), lastCommand: string, lastExitCode: (undefined|number), isRunning: boolean, outputBuffer: string}>}
     */
    async getTerminalSnapshot(terminal) {
        /** @type {!TrackedTerminalState} */
        const state = this.ensureTerminalTracked(terminal);
        /** @type {(undefined|number)} */
        let pid = state.processId;
        if (pid === undefined) {
            try {
                pid = await terminal.processId;
                state.processId = pid;
            }
            catch {
                pid = undefined;
            }
        }
        return {
            processId: pid !== undefined ? pid.toString() : '',
            name: terminal.name || state.name,
            cwd: state.cwd,
            lastCommand: state.lastCommand,
            lastExitCode: state.lastExitCode,
            isRunning: state.isRunning,
            outputBuffer: state.outputBuffer.trim(),
        };
    }
    /**
     * Returns all currently open VS Code terminals, with the active terminal first.
     * @public
     * @return {!Array<!tsickle_vscode_1.Terminal>}
     */
    getOpenTerminals() {
        /** @type {(undefined|!tsickle_vscode_1.Terminal)} */
        const active = this.windowApi.activeTerminal;
        /** @type {!Array<!tsickle_vscode_1.Terminal>} */
        const all = [...(this.windowApi.terminals ?? [])];
        for (const tracked of this.states.keys()) {
            if (!all.includes(tracked)) {
                all.push(tracked);
            }
        }
        if (active && !all.includes(active)) {
            all.unshift(active);
        }
        else if (active) {
            return [active, ...all.filter((/**
                 * @param {!tsickle_vscode_1.Terminal} t
                 * @return {boolean}
                 */
                (t) => t !== active))];
        }
        return all;
    }
    /**
     * Formats a terminal snapshot into a structured string for LLM prompt context.
     * @public
     * @param {{processId: string, name: string, cwd: (undefined|string), lastCommand: string, lastExitCode: (undefined|number), isRunning: boolean, outputBuffer: string}} snapshot
     * @return {string}
     */
    formatTerminalContextValue(snapshot) {
        /** @type {!Array<string>} */
        const lines = [
            `Terminal Name: ${snapshot.name}`,
            `Process ID: ${snapshot.processId || 'unknown'}`,
        ];
        if (snapshot.cwd) {
            lines.push(`Working Directory: ${snapshot.cwd}`);
        }
        lines.push(`Status: ${snapshot.isRunning ? 'running' : 'idle'}`);
        if (snapshot.lastCommand) {
            lines.push(`Last Command: ${snapshot.lastCommand}`);
        }
        if (snapshot.lastExitCode !== undefined) {
            lines.push(`Last Exit Code: ${snapshot.lastExitCode}`);
        }
        if (snapshot.outputBuffer) {
            lines.push(`Terminal Output:\n${snapshot.outputBuffer}`);
        }
        else {
            lines.push('Terminal Output: (no output captured yet — run a command with shell integration or select text in the terminal)');
        }
        return lines.join('\n');
    }
    /**
     * Provides `\@terminal:` dynamic context items matching the user's query.
     * @public
     * @param {string} query
     * @return {!Promise<!Array<{value: string, label: (undefined|string), uri: (undefined|string)}>>}
     */
    async provideContextItems(query) {
        /** @type {!Array<!tsickle_vscode_1.Terminal>} */
        const terminals = this.getOpenTerminals();
        /** @type {(undefined|!tsickle_vscode_1.Terminal)} */
        const activeTerminal = this.windowApi.activeTerminal;
        /** @type {string} */
        const normalizedQuery = query.trim().toLowerCase();
        /** @type {!Array<{value: string, label: (undefined|string), uri: (undefined|string)}>} */
        const items = [];
        for (let i = 0; i < terminals.length; i++) {
            /** @type {!tsickle_vscode_1.Terminal} */
            const terminal = terminals[i];
            /** @type {{processId: string, name: string, cwd: (undefined|string), lastCommand: string, lastExitCode: (undefined|number), isRunning: boolean, outputBuffer: string}} */
            const snapshot = await this.getTerminalSnapshot(terminal);
            /** @type {boolean} */
            const isActive = terminal === activeTerminal;
            /** @type {string} */
            const statusSuffix = snapshot.lastCommand
                ? ` — ${snapshot.lastCommand}`
                : '';
            /** @type {string} */
            const label = `${snapshot.name}${isActive ? ' (Active)' : ''}${statusSuffix}`;
            if (normalizedQuery &&
                !label.toLowerCase().includes(normalizedQuery) &&
                !snapshot.outputBuffer.toLowerCase().includes(normalizedQuery) &&
                !snapshot.cwd?.toLowerCase().includes(normalizedQuery)) {
                continue;
            }
            // Keep `/vscode-terminal/<name>/<pid>` in the URI path (`///`) rather than
            // the authority (`//<name>/<pid>`), because the webview's `matchUriAuthority`
            // normalizer overwrites non-http schemes and authorities with `file://`
            // before forwarding pill clicks to `ExtensionApi.openFile`.
            items.push({
                label,
                value: this.formatTerminalContextValue(snapshot),
                uri: `vscode-terminal:///vscode-terminal/${encodeURIComponent(snapshot.name)}/${snapshot.processId || i}`,
            });
        }
        return items;
    }
    /**
     * Checks if a URI from a clicked `\@terminal` mention pill refers to a VS Code
     * terminal, and if so, reveals and focuses that terminal in the workbench.
     *
     * @public
     * @param {string} rawUri
     * @return {!Promise<boolean>} true if the URI was handled as a terminal reference.
     */
    async focusTerminalFromUri(rawUri) {
        if (!rawUri) {
            return false;
        }
        /** @type {(undefined|string)} */
        let decodedName;
        /** @type {(undefined|string)} */
        let targetId;
        /** @type {boolean} */
        let isExplicitTerminalUri = false;
        /** @type {(null|!RegExpMatchArray)} */
        const pathMatch = rawUri.match(/(?:^vscode-terminal:\/\/\/vscode-terminal\/|\/vscode-terminal\/)([^/?#]+)(?:\/([^/?#]+))?/);
        if (pathMatch) {
            isExplicitTerminalUri = true;
            try {
                decodedName = decodeURIComponent(pathMatch[1]);
            }
            catch {
                decodedName = pathMatch[1];
            }
            targetId = pathMatch[2];
        }
        else {
            /** @type {(null|!RegExpMatchArray)} */
            const legacySchemeMatch = rawUri.match(/^vscode-terminal:\/\/([^/?#]+)(?:\/([^/?#]+))?/);
            if (legacySchemeMatch) {
                isExplicitTerminalUri = true;
                try {
                    decodedName = decodeURIComponent(legacySchemeMatch[1]);
                }
                catch {
                    decodedName = legacySchemeMatch[1];
                }
                targetId = legacySchemeMatch[2];
            }
            else {
                // Legacy pills whose authority was stripped by `matchUriAuthority`
                // arrive as `file:///<pid>` (e.g. `file:///89328`).
                /** @type {(null|!RegExpMatchArray)} */
                const pidOnlyMatch = rawUri.match(/^(?:file:\/\/)?\/(\d+)$/);
                if (pidOnlyMatch) {
                    targetId = pidOnlyMatch[1];
                }
            }
        }
        if (!isExplicitTerminalUri && !targetId) {
            return false;
        }
        /** @type {!Array<!tsickle_vscode_1.Terminal>} */
        const terminals = this.getOpenTerminals();
        /** @type {(undefined|!tsickle_vscode_1.Terminal)} */
        let matched;
        if (targetId) {
            for (const terminal of terminals) {
                /** @type {{processId: string, name: string, cwd: (undefined|string), lastCommand: string, lastExitCode: (undefined|number), isRunning: boolean, outputBuffer: string}} */
                const snapshot = await this.getTerminalSnapshot(terminal);
                if (snapshot.processId && snapshot.processId === targetId) {
                    matched = terminal;
                    break;
                }
            }
        }
        if (!matched && decodedName) {
            matched = terminals.find((/**
             * @param {!tsickle_vscode_1.Terminal} t
             * @return {boolean}
             */
            (t) => t.name === decodedName));
        }
        if (matched) {
            matched.show(false);
            return true;
        }
        if (isExplicitTerminalUri) {
            this.windowApi.activeTerminal?.show(false);
            return true;
        }
        return false;
    }
    /**
     * @public
     * @return {void}
     */
    dispose() {
        for (const d of this.disposables) {
            d.dispose();
        }
        this.disposables.length = 0;
        this.states.clear();
    }
}
exports.TerminalStateTracker = TerminalStateTracker;
/* istanbul ignore if */
if (false) {
    /**
     * @const {!Map<!tsickle_vscode_1.Terminal, !TrackedTerminalState>}
     * @private
     */
    TerminalStateTracker.prototype.states;
    /**
     * @const {!Array<!tsickle_vscode_1.Disposable>}
     * @private
     */
    TerminalStateTracker.prototype.disposables;
    /**
     * @const {?}
     * @private
     */
    TerminalStateTracker.prototype.windowApi;
}
/** @type {{stripAnsiCodes: function(string): string}} */
exports.TEST_ONLY = { stripAnsiCodes };
