/**
 * Patch: Enable Standalone Terminal for Background Tasks
 * ID: terminal_view
 *
 * Fixes the issue where clicking running background task cards in chat fails to
 * display the terminal stream because jetski.terminalView is not registered as a
 * bottom panel view container in standard VS Code.
 */

const ID = 'terminal_view';
const NAME = 'Enable Standalone Terminal for Background Tasks';
const DESCRIPTION = 'Renders interactive terminal output for background tasks in an editor tab when the Cider panel is unavailable.';

const TARGET_1 = `            await this.terminalPanelProvider.showTerminal(request);
            await vscode.commands.executeCommand('jetski.terminalView.focus');`;

const REPLACEMENT_1 = `            await this.terminalPanelProvider.showTerminal(request);
            if (this.terminalPanelProvider.view) {
                await vscode.commands.executeCommand('jetski.terminalView.focus');
            }`;

const TARGET_2 = `        if (this.view) {
            // If the view is visible, reveal it (which might not be necessary if we already focused it via command,
            // but good to ensure it's visible).
            this.view.show(true);
            await this.renderWebview();
        }`;

const REPLACEMENT_2 = `        if (this.view) {
            // If the view is visible, reveal it (which might not be necessary if we already focused it via command,
            // but good to ensure it's visible).
            this.view.show(true);
            await this.renderWebview();
        } else {
            if (!this.panel) {
                this.panel = vscode.window.createWebviewPanel(
                    'jetski.terminalPanel',
                    'Antigravity Terminal',
                    vscode.ViewColumn.Beside,
                    {
                        enableScripts: true,
                        retainContextWhenHidden: true,
                        localResourceRoots: [this.context.extensionUri],
                    }
                );
                this.panel.onDidDispose(() => {
                    this.panel = undefined;
                });
            }
            this.panel.reveal(vscode.ViewColumn.Beside);
            const extraParams = \`&conversationId=\${encodeURIComponent(request.conversationId)}&stepIndex=\${request.stepIndex}\`;
            await this.renderer.renderJetskiIframe(this.panel, {
                targetRoute: 'terminal-standalone',
                extraParams,
                type: 'terminal',
                location: 'editor',
            });
        }`;

const REPLACEMENTS = [
  [TARGET_1, REPLACEMENT_1],
  [TARGET_2, REPLACEMENT_2],
];

module.exports = {
  ID,
  NAME,
  DESCRIPTION,
  REPLACEMENTS,
};
