/**
 * @fileoverview added by tsickle
 * Generated from: cloud/developer_experience/antigravity_extensions/vscode/desktop_webview_delegate.ts
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
goog.module('google3.cloud.developer_experience.antigravity_extensions.vscode.desktop_webview_delegate');
var module = module || { id: 'cloud/developer_experience/antigravity_extensions/vscode/desktop_webview_delegate.closure.js' };
goog.require('google3.third_party.javascript.tslib.tslib');
const tsickle_delegate_interfaces_1 = goog.requireType("google3.devtools.cider.extensions.jetski.delegate_interfaces");
const tsickle_util_2 = goog.requireType("google3.devtools.cider.extensions.jetski.setup.util");
const tsickle_extensionApi_3 = goog.requireType("google3.third_party.gemini_coder.agent_ui_toolkit.src.features.iframe.extensionApi");
const tsickle_vscode_4 = goog.requireType("vscode");
const extensionApi_1 = goog.require('google3.third_party.gemini_coder.agent_ui_toolkit.src.features.iframe.extensionApi');
const vscode = goog.require('vscode'); // from //third_party/javascript/typings/vscode
// from //third_party/javascript/typings/vscode
/**
 * Standard VS Code Desktop implementation of WebviewDelegate.
 * Uses raw HTML strings and standard VS Code APIs.
 * @implements {tsickle_delegate_interfaces_1.WebviewDelegate}
 */
class DesktopWebviewDelegate {
    /**
     * @public
     * @param {!tsickle_vscode_4.ExtensionContext} context
     */
    constructor(context) {
        this.context = context;
    }
    /**
     * @public
     * @param {!tsickle_vscode_4.Webview} webview
     * @param {string=} location
     * @return {void}
     */
    renderLoading(webview, location = 'sideBar') {
        patchWebviewPostMessage(webview);
        /** @type {!tsickle_vscode_4.Uri} */
        const loadingBridgeJsUrl = webview.asWebviewUri(vscode.Uri.joinPath(this.context.extensionUri, 'loading_bridge.js'));
        // TODO: b/532694940 - Change to reuse soy templates from
        // cider_webview_delegate.ts after implementing webpack based on size.
        webview.html = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta http-equiv="Content-Security-Policy" content="default-src 'none'; script-src ${webview.cspSource}; style-src ${webview.cspSource} 'unsafe-inline'; connect-src 'self' ${webview.cspSource} https: http://localhost:* http://127.0.0.1:* ws://localhost:* ws://127.0.0.1:*;">
        <style>
          html, body {
            --vscode-agy-background: var(--vscode-${location}-background, var(--vscode-editor-background, #1e1e1e));
            --vscode-agy-foreground: var(--vscode-${location}-foreground, var(--vscode-editor-foreground, #cccccc));
          }
          body {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            margin: 0;
            font-family: var(--vscode-font-family, sans-serif);
            color: var(--vscode-agy-foreground, #ccc);
            background-color: var(--vscode-agy-background, #1e1e1e);
          }
          .spinner {
            border: 4px solid rgba(255, 255, 255, 0.1);
            width: 36px;
            height: 36px;
            border-radius: 50%;
            border-left-color: var(--vscode-progressBar-background, #007acc);
            animation: spin 1s linear infinite;
          }
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
          .container {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            text-align: center;
          }
          .retry-btn {
            padding: 8px 24px;
            font-size: 13px;
            font-weight: 500;
            font-family: inherit;
            cursor: pointer;
            background-color: var(--vscode-button-background, #0e639c);
            color: var(--vscode-button-foreground, #ffffff);
            border: none;
            border-radius: 4px;
            outline: none;
            transition: background-color 0.15s ease;
          }
          .retry-btn:hover {
            background-color: var(--vscode-button-hoverBackground, #1177bb);
          }
        </style>
      </head>
      <body>
        <div id="loading-indicator" class="container">
          <div class="spinner" style="margin: 0 auto;"></div>
          <div id="loading-details" style="margin-top: 16px; font-size: 13px;">Initializing Antigravity...</div>
        </div>
        <div id="loading-error" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; display: flex; visibility: hidden; flex-direction: column; align-items: center; justify-content: center; gap: 14px; text-align: center; padding: 24px; box-sizing: border-box;">
          <div style="font-size: 15px; font-weight: 600; color: var(--vscode-foreground, #ccc);">Unable to start Antigravity</div>
          <div style="font-size: 13px; color: var(--vscode-descriptionForeground, #999); line-height: 1.4; max-width: 340px;">Could not connect to the update server. Please check your network connection and try again.</div>
          <span id="error-message-text" style="font-size: 11px; font-family: var(--vscode-editor-font-family, monospace); opacity: 0.75; word-break: break-word; line-height: 1.4; max-width: 90%; max-height: 120px; overflow-y: auto; background: var(--vscode-textCodeBlock-background, rgba(255,255,255,0.04)); padding: 8px 12px; border-radius: 4px; border: 1px solid var(--vscode-widget-border, rgba(255,255,255,0.08)); text-align: left;"></span>
          <button id="retry-button" class="retry-btn">Retry</button>
        </div>
        <div id="host-input-container" style="display: none;">
          <span id="host-input-message"></span>
          <input id="host-input" type="text" />
          <button id="host-submit-button">Submit</button>
          <div id="list-of-hosts"></div>
        </div>
        <script src="${loadingBridgeJsUrl}"></script>
      </body>
      </html>
    `;
    }
    /**
     * @public
     * @param {!tsickle_vscode_4.Webview} webview
     * @param {string} serverUrl
     * @param {!tsickle_delegate_interfaces_1.RenderIframeOptions} options
     * @return {void}
     */
    renderIframe(webview, serverUrl, options) {
        patchWebviewPostMessage(webview);
        const { extraParams = '', targetRoute = '' } = options;
        /** @type {string} */
        const hostTheme = getHostThemeString();
        /** @type {!URL} */
        const baseRouteUrl = targetRoute
            ? new URL(targetRoute, serverUrl)
            : new URL(serverUrl);
        /** @type {!URLSearchParams} */
        const searchParams = new URLSearchParams(baseRouteUrl.search);
        searchParams.set('extensionView', 'true');
        searchParams.set('extensionVariant', 'vs-code');
        searchParams.set('useWebSocket', 'true');
        searchParams.set('hostTheme', hostTheme);
        searchParams.set('enableMicrophone', 'false');
        // Pass `platform` ('web' or 'electron') based on `vscode.env.uiKind` to align with
        // upstream VS Code's webview convention (see `src/vs/workbench/contrib/webview/browser/pre/main.js`).
        // This allows the webview to distinguish between desktop Electron environments (which support
        // `document.execCommand('paste')` and have native menus) and browser-hosted environments like
        // GitHub Codespaces and vscode.dev (where standard browsers forbid `execCommand('paste')` and
        // rely on native browser paste events).
        searchParams.set('platform', vscode.env.uiKind === vscode.UIKind?.Web ? 'web' : 'electron');
        if (extraParams) {
            /** @type {!URLSearchParams} */
            const parsedExtra = new URLSearchParams(extraParams.startsWith('&') ? extraParams.slice(1) : extraParams);
            parsedExtra.forEach((/**
             * @param {string} value
             * @param {string} key
             * @return {void}
             */
            (value, key) => {
                searchParams.set(key, value);
            }));
        }
        /** @type {(undefined|!ReadonlyArray<!tsickle_vscode_4.WorkspaceFolder>)} */
        const workspaceFolders = vscode.workspace.workspaceFolders;
        /** @type {(undefined|!tsickle_vscode_4.WorkspaceFolder)} */
        const workspaceFolder = workspaceFolders && workspaceFolders.length > 0
            ? workspaceFolders[0]
            : undefined;
        if (workspaceFolder) {
            searchParams.set('workspaceUri', workspaceFolder.uri.toString());
        }
        baseRouteUrl.search = searchParams.toString();
        /** @type {string} */
        const fullUrlString = baseRouteUrl.toString();
        console.log(`[Jetski] Loading iframe URL: ${fullUrlString}`);
        // Reads code editor font settings from VS Code workspace configuration.
        // Returns font key-value map for initial HTML rendering and dynamic postMessage updates.
        /** @type {function(): ?} */
        const getEditorFontMap = (/**
         * @return {?}
         */
        () => {
            /** @type {!tsickle_vscode_4.WorkspaceConfiguration} */
            const editorConfig = vscode.workspace.getConfiguration('editor');
            /** @type {string} */
            const editorFontFamily = (editorConfig.get('fontFamily') || '').trim();
            /** @type {?} */
            const fonts = {};
            if (editorFontFamily) {
                fonts['--vscode-editor-font-family'] = editorFontFamily;
            }
            return fonts;
        });
        /** @type {function(): string} */
        const getFontStyleVars = (/**
         * @return {string}
         */
        () => {
            /** @type {?} */
            const fontMap = getEditorFontMap();
            return Object.entries(fontMap)
                .map((/**
             * @param {!Array<?>} __0
             * @return {string}
             */
            ([key__tsickle_destructured_1, val__tsickle_destructured_2]) => {
                let key = /** @type {string} */ (key__tsickle_destructured_1);
                let val = /** @type {string} */ (val__tsickle_destructured_2);
                return (`${key}: ${val};`);
            }))
                .join(' ');
        });
        /** @type {!tsickle_vscode_4.Uri} */
        const bridgeJsUrl = webview.asWebviewUri(vscode.Uri.joinPath(this.context.extensionUri, 'bridge.js'));
        /** @type {function(): void} */
        const renderWebviewHtml = (/**
         * @return {void}
         */
        () => {
            webview.html = `
      <!DOCTYPE html>
      <html style="${getFontStyleVars()}" data-host="antigravity">
      <head>
        <meta charset="utf-8">
        <meta http-equiv="Content-Security-Policy" content="default-src 'none'; frame-src ${serverUrl} https: http:; script-src ${webview.cspSource} 'unsafe-inline'; style-src ${webview.cspSource} 'unsafe-inline'; connect-src 'self' ${webview.cspSource} https: http://localhost:* http://127.0.0.1:* ws://localhost:* ws://127.0.0.1:*;">
        <style>
          html, body {
            --vscode-agy-background: var(--vscode-${options.location}-background, var(--vscode-editor-background, #1e1e1e));
            --vscode-agy-foreground: var(--vscode-${options.location}-foreground, var(--vscode-editor-foreground, #cccccc));
            margin: 0;
            padding: 0;
            width: 100%;
            height: 100%;
            overflow: hidden;
            background-color: var(--vscode-agy-background, #1e1e1e);
            color: var(--vscode-agy-foreground, #cccccc);
          }
          iframe {
            width: 100%;
            height: 100%;
            border: none;
            opacity: 0;
            transition: opacity 0.4s ease-in-out;
          }
          .loading-container {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            font-family: var(--vscode-font-family, sans-serif);
            pointer-events: none;
            z-index: 1;
          }
          .spinner {
            width: 24px;
            height: 24px;
            border: 2.5px solid var(--vscode-progressBar-background, #0e639c);
            border-top: 2.5px solid transparent;
            border-radius: 50%;
            animation: spin 0.8s linear infinite;
          }
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        </style>
      </head>
      <body>
        <div id="loading-indicator" class="loading-container" style="top:0;height:100%;">
          <div class="spinner"></div>
          <div id="loading-details" style="margin-top: 16px; font-size: 12px; opacity: 0.8;">Loading Antigravity...</div>
        </div>
        <div id="compatibility-modal" style="display: none; position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.6); align-items: center; justify-content: center; z-index: 100;">
          <div style="background: var(--vscode-sideBar-background, #252526); padding: 24px; border-radius: 6px;">
            <div id="compatibility-message" style="margin-bottom: 20px; font-size: 12px;"></div>
            <button id="compatibility-update-btn" style="padding: 6px 12px; cursor: pointer;">Update</button>
          </div>
        </div>
        <iframe id="jetski-frame" src="${fullUrlString}" style="top:0;height:100%;position:absolute;width:100%;border:none;opacity:0;transition:opacity 0.4s ease-in-out;" allow="clipboard-read; clipboard-write" sandbox="allow-scripts allow-same-origin allow-popups allow-forms allow-popups-to-escape-sandbox"></iframe>
        <script>
          let attempts = 0;
          let isConnected = false;
          const iframe = document.getElementById('jetski-frame');

          function revealIframe() {
            if (isConnected) return;
            isConnected = true;
            const loader = document.getElementById('loading-indicator');
            iframe.style.opacity = '1';
            if (loader) loader.style.display = 'none';
          }

          iframe.addEventListener('load', revealIframe);
          window.addEventListener('message', (event) => {
            if (event.source === iframe.contentWindow) {
              revealIframe();
            }
          });

          // In VS Code Web / Remote, webview origin (https://*.vscode-cdn.net) is blocked
          // by Chrome's Private Network Access (PNA) policy from fetching loopback (127.0.0.1)
          // endpoints via window.fetch(). We check the iframe's connection status directly to
          // avoid CORS/PNA loopback errors while preserving the retry and status indicator loop.
          function checkAndReveal() {
            const details = document.getElementById('loading-details');
            if (isConnected || iframe.style.opacity === '1') {
              revealIframe();
              return;
            }
            attempts++;
            if (attempts < 20) {
              if (details) details.textContent = 'Connecting to Remote Antigravity tunnel (' + attempts + ')...';
              iframe.src = '${fullUrlString}';
              setTimeout(checkAndReveal, 1000);
            } else {
              if (details) details.textContent = 'Could not connect to remote port. Please check VS Code Ports tab.';
            }
          }
          setTimeout(checkAndReveal, 600);
        </script>
        <script>
          (function() {
            if (typeof acquireVsCodeApi === 'function') {
              const origAcquire = acquireVsCodeApi;
              let cachedApi = null;
              acquireVsCodeApi = function() {
                if (cachedApi) return cachedApi;
                const api = origAcquire();
                const origPost = api.postMessage.bind(api);
                api.postMessage = function(msg) {
                  try {
                    const cleanMsg = JSON.parse(
                      JSON.stringify(msg, (key, value) => {
                        if (typeof value === 'bigint') {
                          return value.toString();
                        }
                        return value;
                      }),
                    );
                    return origPost(cleanMsg);
                  } catch (e) {
                    return origPost(msg);
                  }
                };
                cachedApi = api;
                return api;
              };
            }
          })();
        </script>
        <script src="${bridgeJsUrl}"></script>
      </body>
      </html>
    `;
        });
        renderWebviewHtml();
        // Listens for live configuration changes to editor settings (e.g. editor.fontFamily)
        // in settings.json and sends dynamic postMessage updates to avoid full webview reload.
        if (typeof vscode.workspace.onDidChangeConfiguration === 'function') {
            /** @type {!tsickle_vscode_4.Disposable} */
            const configSubscription = vscode.workspace.onDidChangeConfiguration((/**
             * @param {!tsickle_vscode_4.ConfigurationChangeEvent} e
             * @return {void}
             */
            (e) => {
                if (e.affectsConfiguration('editor')) {
                    webview.postMessage({
                        source: extensionApi_1.ANTIGRAVITY_EXTENSION_SOURCE,
                        type: 'updateFontSettings',
                        fonts: getEditorFontMap(),
                    });
                }
            }));
            // tslint:disable-next-line:no-any
            /** @type {?} */
            const onDidDispose = ((/** @type {?} */ (webview)))['onDidDispose'];
            if (typeof onDidDispose === 'function') {
                onDidDispose.call(webview, (/**
                 * @return {void}
                 */
                () => {
                    configSubscription.dispose();
                }));
            }
            else if (this.context?.subscriptions) {
                this.context.subscriptions.push(configSubscription);
            }
        }
    }
    /**
     * @public
     * @param {string} serverUrl
     * @return {string}
     */
    validateServerUrl(serverUrl) {
        try {
            /** @type {!URL} */
            const url = new URL(serverUrl);
            if (url.protocol !== 'http:' && url.protocol !== 'https:') {
                throw new Error('Protocol must be HTTP or HTTPS');
            }
            return serverUrl.endsWith('/') ? serverUrl : `${serverUrl}/`;
        }
        catch (e) {
            throw new Error(`Invalid server URL: ${serverUrl}`);
        }
    }
    /**
     * @public
     * @param {(undefined|!tsickle_vscode_4.WebviewView|!tsickle_vscode_4.WebviewPanel)} view
     * @param {!Promise<!tsickle_util_2.ServerInfo>} _serverInfo
     * @return {!Promise<void>}
     */
    async updateTitle(view, _serverInfo) {
        if (!view)
            return;
        view.title = 'Antigravity';
        if ('description' in view) {
            (/** @type {!tsickle_vscode_4.WebviewView} */ (view)).description = undefined;
        }
    }
}
exports.DesktopWebviewDelegate = DesktopWebviewDelegate;
/* istanbul ignore if */
if (false) {
    /**
     * @const {!tsickle_vscode_4.ExtensionContext}
     * @private
     */
    DesktopWebviewDelegate.prototype.context;
}
/**
 * @return {string}
 */
function getHostThemeString() {
    /** @type {!tsickle_vscode_4.ColorThemeKind} */
    const kind = vscode.window.activeColorTheme.kind;
    return kind === vscode.ColorThemeKind.Dark ||
        kind === vscode.ColorThemeKind.HighContrast
        ? 'dark'
        : 'light';
}
/**
 * @param {!tsickle_vscode_4.Webview} webview
 * @return {void}
 */
function patchWebviewPostMessage(webview) {
    /** @type {?} */
    const proto = Object.getPrototypeOf(webview);
    if (!proto) {
        patchInstance(webview);
        return;
    }
    // tslint:disable-next-line:no-any
    /** @type {?} */
    const extendedProto = (/** @type {?} */ (proto));
    if (extendedProto._patchedForBigInt) {
        return;
    }
    extendedProto._patchedForBigInt = true;
    /** @type {?} */
    const originalPostMessage = proto.postMessage;
    if (typeof originalPostMessage === 'function') {
        proto.postMessage = (/**
         * @this {!tsickle_vscode_4.Webview}
         * @param {?} message
         * @param {...?} args
         * @return {?}
         */
        function (
        // tslint:disable-next-line:no-any
        message, 
        // tslint:disable-next-line:no-any
        ...args) {
            if (message && typeof message === 'object') {
                try {
                    message = JSON.parse(JSON.stringify(message, (/**
                     * @param {string} key
                     * @param {?} value
                     * @return {?}
                     */
                    (key, value) => {
                        return typeof value === 'bigint' ? (/** @type {bigint} */ (value)).toString() : value;
                    })));
                }
                catch (e) {
                    // Ignore
                }
            }
            // tslint:disable-next-line:no-any
            return originalPostMessage.call(this, message, ...args);
        });
    }
    else {
        patchInstance(webview);
    }
}
/**
 * @param {!tsickle_vscode_4.Webview} webview
 * @return {void}
 */
function patchInstance(webview) {
    // tslint:disable-next-line:no-any
    /** @type {?} */
    const extendedWebview = (/** @type {?} */ (webview));
    if (extendedWebview._patchedForBigInt) {
        return;
    }
    extendedWebview._patchedForBigInt = true;
    /** @type {?} */
    const originalPostMessage = webview.postMessage.bind(webview);
    // tslint:disable-next-line:no-any
    webview.postMessage = (/**
     * @param {?} message
     * @return {!Thenable<boolean>}
     */
    (message) => {
        if (message && typeof message === 'object') {
            try {
                message = JSON.parse(JSON.stringify(message, (/**
                 * @param {string} key
                 * @param {?} value
                 * @return {?}
                 */
                (key, value) => {
                    return typeof value === 'bigint' ? (/** @type {bigint} */ (value)).toString() : value;
                })));
            }
            catch (e) {
                // Ignore
            }
        }
        return originalPostMessage(message);
    });
}
