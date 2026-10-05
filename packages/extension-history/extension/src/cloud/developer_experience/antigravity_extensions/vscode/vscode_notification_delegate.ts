/**
 * @fileoverview added by tsickle
 * Generated from: cloud/developer_experience/antigravity_extensions/vscode/vscode_notification_delegate.ts
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
goog.module('google3.cloud.developer_experience.antigravity_extensions.vscode.vscode_notification_delegate');
var module = module || { id: 'cloud/developer_experience/antigravity_extensions/vscode/vscode_notification_delegate.closure.js' };
goog.require('google3.third_party.javascript.tslib.tslib');
const tsickle_iframe_messages_pb_1 = goog.requireType("google3.third_party.gemini_coder.proto.iframe_messages_pb");
const tsickle_child_process_2 = goog.requireType("google3.third_party.javascript.typings.node.node.child_process");
const tsickle_fs_3 = goog.requireType("google3.third_party.javascript.typings.node.node.fs");
const tsickle_delegate_interfaces_4 = goog.requireType("google3.devtools.cider.extensions.jetski.delegate_interfaces");
const tsickle_path_5 = goog.requireType("google3.third_party.javascript.typings.node.node.path");
const tsickle_url_6 = goog.requireType("google3.third_party.javascript.typings.node.node.url");
const tsickle_vscode_7 = goog.requireType("vscode");
const child_process_1 = goog.require('google3.third_party.javascript.typings.node.node.child_process');
const fs = goog.require('google3.third_party.javascript.typings.node.node.fs');
const path = goog.require('google3.third_party.javascript.typings.node.node.path');
const url_1 = goog.require('google3.third_party.javascript.typings.node.node.url');
const vscode = goog.require('vscode'); // from //third_party/javascript/typings/vscode
// from //third_party/javascript/typings/vscode
/**
 * Label of the primary toast button that navigates to the conversation.
 * @type {string}
 */
const OPEN_CHAT_ACTION = 'Open Chat';
/**
 * Label of the secondary toast button that dismisses the notification.
 * @type {string}
 */
const DISMISS_ACTION = 'Dismiss';
/**
 * AppUserModelID of VS Code (`win32AppUserModelId` in its `product.json`),
 * which the VS Code installer registers on its Start menu shortcut. Windows
 * toasts are posted as this app.
 * @type {string}
 */
const WINDOWS_VSCODE_APP_USER_MODEL_ID = 'Microsoft.VisualStudioCode';
/**
 * VS Code implementation of BrowserNotificationDelegate that surfaces agent
 * completion and interactive question notifications (e.g. during `/grill-me`
 * sessions) using:
 * 1. An in-IDE VS Code notification toast with an `Open Chat` button when the
 *    VS Code window is focused, or when no OS notification banner can be shown.
 * 2. A native OS notification banner when the VS Code window is unfocused
 *    (`notify-send` on Linux, WinRT `ToastNotificationManager` on
 *    Windows).
 * @implements {tsickle_delegate_interfaces_4.BrowserNotificationDelegate}
 */
class VscodeNotificationDelegate {
    /**
     * @public
     * @param {(undefined|string)=} extensionPath Optional filesystem path to the installed extension
     *     directory, used to resolve `img/logo.png` for OS notification icons.
     * @param {string=} extensionId The VS Code extension identifier (`publisher.name`) used
     *     to construct `vscode://<extensionId>/open-conversation` deep links.
     */
    constructor(extensionPath, extensionId = 'google.google-antigravity') {
        this.extensionPath = extensionPath;
        this.extensionId = extensionId;
        /**
         * Do not suppress notifications when the VS Code window is focused, because
         * the user may be editing code in another editor tab with the Antigravity
         * chat sidebar collapsed or hidden. Notifications for the active conversation
         * are still suppressed while the chat is visible (see `ExtensionApiImpl`).
         */
        this.suppressWhenWindowFocused = false;
    }
    /**
     * Returns the current notification permission state for the VS Code extension
     * host. Always returns `'granted'` on desktop VS Code so
     * `WebNotificationService` forwards notifications to the extension host
     * without showing an in-webview browser permission prompt.
     * @public
     * @return {!Promise<string>}
     */
    async getNotificationPermissionState() {
        return 'granted';
    }
    /**
     * Handles notification permission requests from the webview. Always resolves
     * to `'granted'` since desktop VS Code notifications do not require browser
     * origin permissions.
     * @public
     * @return {!Promise<string>}
     */
    async requestNotificationPermission() {
        return 'granted';
    }
    /**
     * Resolves the filesystem path to the bundled `img/logo.png` if present.
     * @private
     * @return {(undefined|string)}
     */
    getLogoPath() {
        if (!this.extensionPath) {
            return undefined;
        }
        /** @type {string} */
        const candidate = path.join(this.extensionPath, 'img', 'logo.png');
        return fs.existsSync(candidate) ? candidate : undefined;
    }
    /**
     * Constructs the `vscode://<extensionId>/open-conversation` deep-link URI
     * used by OS notification click handlers to focus VS Code and navigate to the
     * target conversation.
     *
     * @private
     * @param {(undefined|string)=} cascadeId Optional conversation ID to navigate to.
     * @param {(undefined|string)=} targetPath Optional target route path to navigate to.
     * @return {string}
     */
    buildLaunchUri(cascadeId, targetPath) {
        /** @type {string} */
        const uriScheme = vscode.env?.uriScheme || 'vscode';
        /** @type {!URLSearchParams} */
        const query = new URLSearchParams();
        if (cascadeId) {
            query.set('cascadeId', cascadeId);
        }
        if (targetPath) {
            query.set('path', targetPath);
        }
        /** @type {string} */
        const queryString = query.toString();
        return `${uriScheme}://${this.extensionId}/open-conversation${queryString ? `?${queryString}` : ''}`;
    }
    /**
     * Opens the conversation the next time the VS Code window gains focus, which
     * is how clicking an OS notification banner is detected on platforms that do
     * not report clicks back to the caller.
     *
     * Only one listener is pending at a time: a newer notification replaces the
     * previous listener so that only the most recent conversation opens.
     *
     * \@visibleForTesting
     * @public
     * @param {(undefined|string)=} cascadeId
     * @param {(undefined|string)=} targetPath
     * @return {(undefined|!tsickle_vscode_7.Disposable)} A disposable that stops listening for focus changes.
     */
    openConversationOnNextFocus(cascadeId, targetPath) {
        this.pendingFocusListener?.dispose();
        this.pendingFocusListener = undefined;
        if (!vscode.window.onDidChangeWindowState) {
            return undefined;
        }
        /** @type {!tsickle_vscode_7.Disposable} */
        const listener = vscode.window.onDidChangeWindowState((/**
         * @param {!tsickle_vscode_7.WindowState} state
         * @return {void}
         */
        (state) => {
            if (state.focused) {
                this.disposeFocusListener(listener);
                void vscode.commands.executeCommand('antigravity.openConversation', cascadeId || undefined, targetPath || undefined);
            }
        }));
        this.pendingFocusListener = listener;
        return listener;
    }
    /**
     * Disposes `listener` and clears it as the pending focus listener if a newer
     * notification has not already replaced it.
     * @private
     * @param {(undefined|!tsickle_vscode_7.Disposable)} listener
     * @return {void}
     */
    disposeFocusListener(listener) {
        listener?.dispose();
        if (this.pendingFocusListener === listener) {
            this.pendingFocusListener = undefined;
        }
    }
    /**
     * Dispatches a native Linux Freedesktop D-Bus notification via `notify-send`
     * with `--wait`, `--icon=<logoPath>`, `--hint=string:image-path:<logoPath>`,
     * and `--hint=string:desktop-entry:code`.
     *
     * Why both `--hint=string:image-path:<logoPath>` and `desktop-entry:code` are
     * passed:
     * - In GNOME Shell (`notificationDaemon.js`), `desktop-entry:code` associates
     *   the notification source with `code.desktop` so clicking the banner calls
     *   `code.desktop.activate()` directly in the compositor without triggering
     *   Focus Stealing Prevention (`"Visual Studio Code is ready"`).
     * - Because `source.app` is non-null when `desktop-entry:code` is set, GNOME
     *   Shell ignores `--icon` (`app_icon`), but explicitly reads
     *   `hints['image-path']` (`_imageForNotificationData`) to set the banner's
     *   `notification.gicon` to our Antigravity logo (`img/logo.png`).
     *
     * @private
     * @param {string} title Notification heading.
     * @param {string} body Notification message body.
     * @param {(undefined|string)} cascadeId Optional conversation ID to navigate to.
     * @param {(undefined|string)} targetPath Optional target route path to navigate to.
     * @param {function(): void} onFailure Called if the banner could not be shown.
     * @return {void}
     */
    showLinuxNotification(title, body, cascadeId, targetPath, onFailure) {
        /** @type {(undefined|!tsickle_vscode_7.Disposable)} */
        const focusListener = this.openConversationOnNextFocus(cascadeId, targetPath);
        /** @type {!Array<string>} */
        const args = [
            '--wait',
            '--app-name=Antigravity',
            '--hint=string:desktop-entry:code',
        ];
        /** @type {(undefined|string)} */
        const logoPath = this.getLogoPath();
        if (logoPath) {
            args.push(`--icon=${logoPath}`);
            args.push(`--hint=string:image-path:${logoPath}`);
        }
        args.push(title);
        if (body) {
            args.push(body);
        }
        (0, child_process_1.execFile)('notify-send', args, { timeout: 60000 }, (/**
         * @param {(null|?)} error
         * @return {void}
         */
        (error) => {
            if (error) {
                // Stop listening right away to avoid hijacking the next window focus.
                this.disposeFocusListener(focusListener);
                // `killed` means that the timeout ended `notify-send --wait` while the
                // banner was still shown. Any other error means that no banner was
                // shown (e.g. `notify-send` is not installed).
                if (!error.killed) {
                    onFailure();
                }
                return;
            }
            // Clean up the focus listener shortly after the notification closes
            // (allow 1s in case focus transition finishes right after close).
            setTimeout((/**
             * @return {void}
             */
            () => {
                this.disposeFocusListener(focusListener);
            }), 1000);
        }));
    }
    /**
     * Dispatches a native Windows 10/11 Action Center toast via WinRT
     * `Windows.UI.Notifications.ToastNotificationManager` with the Antigravity
     * `img/logo.png` icon (`appLogoOverride` on `ToastGeneric`),
     * `activationType="protocol"`, and `launch="<launchUri>"` so clicking the
     * toast activates VS Code and opens the conversation.
     *
     * @private
     * @param {string} title Notification heading.
     * @param {string} body Notification message body.
     * @param {string} launchUri Deep-link URI to open when the toast is clicked.
     * @param {function(): void} onFailure Called if the toast could not be shown.
     * @return {void}
     */
    showWindowsNotification(title, body, launchUri, onFailure) {
        /** @type {(undefined|string)} */
        const logoPath = this.getLogoPath();
        /** @type {string} */
        const psBody = [
            '$ErrorActionPreference = "Stop"',
            // Managed Windows machines (e.g. gWindows with WDAC / AppLocker) run
            // unsigned PowerShell commands in ConstrainedLanguage mode, which blocks
            // WinRT method calls on ToastNotificationManager. Exit immediately so the
            // caller falls back to the in-IDE toast without waiting on Get-StartApps.
            'if ($ExecutionContext.SessionState.LanguageMode -ne "FullLanguage") { exit 1 }',
            // Windows silently drops toasts from an AppUserModelID without a Start
            // menu shortcut (e.g. zip or portable VS Code installs). Prefer the
            // canonical VS Code AppID, or any registered Visual Studio Code Start
            // menu entry (such as Insiders or path-based AUMIDs), and fail if none
            // exists so the caller shows the in-IDE toast instead.
            '$Apps = @(Get-StartApps)',
            '$App = $Apps | Where-Object {$_.AppID -eq $env:AGY_NOTIFY_APP_ID} | Select-Object -First 1',
            'if (-not $App) { $App = $Apps | Where-Object {$_.Name -like "*Visual Studio Code*"} | Select-Object -First 1 }',
            'if (-not $App -or -not $App.AppID) { exit 1 }',
            '[Windows.UI.Notifications.ToastNotificationManager, Windows.UI.Notifications, ContentType = WindowsRuntime] | Out-Null',
            '[Windows.UI.Notifications.ToastNotification, Windows.UI.Notifications, ContentType = WindowsRuntime] | Out-Null',
            '[Windows.Data.Xml.Dom.XmlDocument, Windows.Data.Xml.Dom.XmlDocument, ContentType = WindowsRuntime] | Out-Null',
            '$TemplateType = if ($env:AGY_NOTIFY_ICON) { [Windows.UI.Notifications.ToastTemplateType]::ToastImageAndText02 } else { [Windows.UI.Notifications.ToastTemplateType]::ToastText02 }',
            '$Template = [Windows.UI.Notifications.ToastNotificationManager]::GetTemplateContent($TemplateType)',
            '$RawXml = [xml] $Template.GetXml()',
            '$RawXml.toast.SetAttribute("activationType", "protocol")',
            '$RawXml.toast.SetAttribute("launch", $env:AGY_NOTIFY_URI)',
            'if ($env:AGY_NOTIFY_ICON) { $RawXml.toast.visual.binding.SetAttribute("template", "ToastGeneric"); ($RawXml.toast.visual.binding.image | Where-Object {$_.id -eq "1"}).SetAttribute("src", $env:AGY_NOTIFY_ICON); ($RawXml.toast.visual.binding.image | Where-Object {$_.id -eq "1"}).SetAttribute("placement", "appLogoOverride") }',
            "($RawXml.toast.visual.binding.text | Where-Object {$_.id -eq '1'}).AppendChild($RawXml.CreateTextNode($env:AGY_NOTIFY_TITLE)) | Out-Null",
            "($RawXml.toast.visual.binding.text | Where-Object {$_.id -eq '2'}).AppendChild($RawXml.CreateTextNode($env:AGY_NOTIFY_BODY)) | Out-Null",
            '$SerializedXml = New-Object Windows.Data.Xml.Dom.XmlDocument',
            '$SerializedXml.LoadXml($RawXml.OuterXml)',
            '$Toast = [Windows.UI.Notifications.ToastNotification]::new($SerializedXml)',
            '[Windows.UI.Notifications.ToastNotificationManager]::CreateToastNotifier($App.AppID).Show($Toast)',
        ].join('; ');
        /** @type {string} */
        const psScript = `try { ${psBody} } catch { exit 1 }`;
        const winEnv = { ...process.env };
        delete winEnv['ELECTRON_RUN_AS_NODE'];
        winEnv['AGY_NOTIFY_APP_ID'] = WINDOWS_VSCODE_APP_USER_MODEL_ID;
        winEnv['AGY_NOTIFY_TITLE'] = `Antigravity — ${title}`;
        winEnv['AGY_NOTIFY_BODY'] = body || title;
        winEnv['AGY_NOTIFY_URI'] = launchUri;
        if (logoPath) {
            winEnv['AGY_NOTIFY_ICON'] = (0, url_1.pathToFileURL)(logoPath).href;
        }
        (0, child_process_1.execFile)('powershell.exe', [
            '-NoProfile',
            '-NonInteractive',
            '-WindowStyle',
            'Hidden',
            '-Command',
            psScript,
        ], {
            timeout: 10000,
            windowsHide: true,
            env: winEnv,
        }, (/**
         * @param {(null|?)} error
         * @return {void}
         */
        (error) => {
            // PowerShell exits right after showing the toast, so any error
            // (including the timeout) means that it was not shown.
            if (error) {
                onFailure();
            }
        }));
    }
    /**
     * Dispatches a native OS desktop notification banner, delegating to the
     * platform-specific handler.
     *
     * @private
     * @param {string} title Notification heading.
     * @param {string} body Notification message body.
     * @param {(undefined|string)} cascadeId Optional conversation ID to navigate to when clicked.
     * @param {(undefined|string)} targetPath Optional target route path to navigate to when clicked.
     * @param {function(): void} onFailure Called if no banner can be shown, including on platforms
     *     without a handler.
     * @return {void}
     */
    showSystemNotification(title, body, cascadeId, targetPath, onFailure) {
        try {
            switch (process.platform) {
                case 'linux':
                    this.showLinuxNotification(title, body, cascadeId, targetPath, onFailure);
                    break;
                case 'win32':
                    this.showWindowsNotification(title, body, this.buildLaunchUri(cascadeId, targetPath), onFailure);
                    break;
                case 'darwin':
                    // macOS attributes a banner to the app that posts it, and an
                    // extension cannot make VS Code post one: webviews are not granted
                    // the notifications permission, and VS Code's native notifications
                    // have no extension API. Banners posted via `osascript` (even
                    // `tell application "Visual Studio Code"`) are attributed to Script
                    // Editor: they show its icon and open it when clicked. So macOS uses
                    // the in-IDE toast, which VS Code keeps visible until the window is
                    // focused again.
                    onFailure();
                    break;
                default:
                    onFailure();
                    break;
            }
        }
        catch {
            // Best-effort native OS notification; fall back if it fails to launch.
            onFailure();
        }
    }
    /**
     * Notifies the user when the agent completes a task, requests command
     * approval, or prompts the user with a question (such as during a
     * `/grill-me` session).
     *
     * When VS Code is unfocused, shows only a native OS notification banner:
     * clicking it focuses VS Code and opens the conversation, so an in-IDE toast
     * would be redundant. Otherwise, or if no banner can be shown, shows a VS Code
     * notification toast whose `Open Chat` button navigates directly to the
     * conversation — unless the conversation is already visible in the chat panel,
     * in which case an in-IDE toast would still be redundant once the user looks
     * at VS Code.
     *
     * Does not wait for the user to interact with the notification.
     *
     * @public
     * @param {?} request The notification payload containing the title, body,
     *     conversation `cascadeId`, and navigation `path`.
     * @param {(undefined|!tsickle_delegate_interfaces_4.ShowBrowserNotificationOptions)=} options Context about whether the conversation is currently visible.
     * @return {!Promise<void>}
     */
    async showBrowserNotification(request, options) {
        if (!request.payload) {
            return;
        }
        const { title, body, cascadeId, path: targetPath } = request.payload;
        /** @type {string} */
        const heading = title || 'Antigravity';
        /** @type {string} */
        const message = body ? `${heading} ${body}` : heading;
        /** @type {function(): void} */
        const showToastIfConversationHidden = (/**
         * @return {void}
         */
        () => {
            if (!options?.isConversationVisible) {
                this.showOpenChatToast(message, cascadeId, targetPath);
            }
        });
        if (vscode.window.state?.focused) {
            showToastIfConversationHidden();
            return;
        }
        this.showSystemNotification(heading, body, cascadeId, targetPath, showToastIfConversationHidden);
    }
    /**
     * Displays a VS Code notification toast with an `Open Chat` button that
     * navigates to the conversation, and a `Dismiss` button.
     *
     * @private
     * @param {string} message The toast message.
     * @param {(undefined|string)=} cascadeId Optional conversation ID to navigate to.
     * @param {(undefined|string)=} targetPath Optional target route path to navigate to.
     * @return {void}
     */
    showOpenChatToast(message, cascadeId, targetPath) {
        void vscode.window
            .showInformationMessage(message, OPEN_CHAT_ACTION, DISMISS_ACTION)
            .then((/**
         * @param {(undefined|string)} selection
         * @return {void}
         */
        (selection) => {
            if (selection === OPEN_CHAT_ACTION) {
                void vscode.commands.executeCommand('antigravity.openConversation', cascadeId || undefined, targetPath || undefined);
            }
        }));
    }
    /**
     * Displays a VS Code notification toast for direct extension focus requests
     * (`showNotification` RPC when the window is unfocused), with a primary
     * button that focuses the Antigravity chat panel.
     *
     * @public
     * @param {?} request The notification title, message, and optional action label.
     * @return {!Promise<{handled: boolean, primaryActionClicked: boolean}>}
     */
    async showFocusingNotification(request) {
        /** @type {string} */
        const message = request.title
            ? `${request.title}: ${request.message}`
            : request.message;
        /** @type {string} */
        const actionLabel = request.primaryActionLabel || OPEN_CHAT_ACTION;
        /** @type {(undefined|string)} */
        const selection = await vscode.window.showInformationMessage(message, actionLabel, DISMISS_ACTION);
        /** @type {boolean} */
        const primaryActionClicked = selection === actionLabel;
        if (primaryActionClicked) {
            await vscode.commands.executeCommand('antigravity.panel.focus');
        }
        return { handled: true, primaryActionClicked };
    }
}
exports.VscodeNotificationDelegate = VscodeNotificationDelegate;
/* istanbul ignore if */
if (false) {
    /**
     * Do not suppress notifications when the VS Code window is focused, because
     * the user may be editing code in another editor tab with the Antigravity
     * chat sidebar collapsed or hidden. Notifications for the active conversation
     * are still suppressed while the chat is visible (see `ExtensionApiImpl`).
     * @const {boolean}
     * @public
     */
    VscodeNotificationDelegate.prototype.suppressWhenWindowFocused;
    /**
     * Focus listener for the most recent OS notification banner, if any.
     * @type {(undefined|!tsickle_vscode_7.Disposable)}
     * @private
     */
    VscodeNotificationDelegate.prototype.pendingFocusListener;
    /**
     * @const {(undefined|string)}
     * @private
     */
    VscodeNotificationDelegate.prototype.extensionPath;
    /**
     * @const {string}
     * @private
     */
    VscodeNotificationDelegate.prototype.extensionId;
}
