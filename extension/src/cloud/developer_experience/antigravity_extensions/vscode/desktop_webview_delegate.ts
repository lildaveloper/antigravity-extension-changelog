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
 * Official Antigravity loading screen vector logo with gradient mask and blurs.
 * @type {string}
 */
const ANTIGRAVITY_LOGO_SVG = `
  <svg class="logo-svg" xmlns="http://www.w3.org/2000/svg" viewBox="13 18 85 78" fill="none">
    <defs>
      <filter id="shared_blur_heavy" x="-50%" y="-50%" width="200%" height="200%" filterUnits="objectBoundingBox">
        <feGaussianBlur stdDeviation="15" />
      </filter>
      <filter id="shared_blur_light" x="-50%" y="-50%" width="200%" height="200%" filterUnits="objectBoundingBox">
        <feGaussianBlur stdDeviation="4" />
      </filter>
      <mask id="mask0_6001_463" maskUnits="userSpaceOnUse" x="13" y="18" width="85" height="78">
        <path d="M89.6992 93.695C94.3659 97.195 101.366 94.8617 94.9492 88.445C75.6992 69.7783 79.7825 18.445 55.8659 18.445C31.9492 18.445 36.0325 69.7783 16.7825 88.445C9.78251 95.445 17.3658 97.195 22.0325 93.695C40.1159 81.445 38.9492 59.8617 55.8659 59.8617C72.7825 59.8617 71.6159 81.445 89.6992 93.695Z" fill="white"/>
      </mask>
    </defs>
    <g mask="url(#mask0_6001_463)">
      <g filter="url(#shared_blur_light)"><ellipse cx="22.787" cy="26.81" rx="22.787" ry="26.81" transform="matrix(-0.112 0.993 -0.993 -0.112 66.247 -15.534)" fill="#FFE432"/></g>
      <g filter="url(#shared_blur_heavy)"><ellipse cx="96.491" cy="35.123" rx="29.501" ry="30.149" transform="rotate(76.924 96.491 35.123)" fill="#FC413D"/></g>
      <g filter="url(#shared_blur_heavy)"><ellipse cx="9.03" cy="41.665" rx="30.832" ry="39.942" transform="rotate(74.126 9.03 41.665)" fill="#00B95C"/></g>
      <g filter="url(#shared_blur_heavy)"><ellipse cx="9.03" cy="41.665" rx="30.832" ry="39.942" transform="rotate(74.126 9.03 41.665)" fill="#00B95C"/></g>
      <g filter="url(#shared_blur_heavy)"><ellipse cx="11.221" cy="42.892" rx="30.22" ry="33.27" transform="rotate(45.607 11.221 42.892)" fill="#00B95C"/></g>
      <g filter="url(#shared_blur_heavy)"><ellipse cx="75.755" cy="104.822" rx="29.018" ry="27.943" transform="rotate(76.924 75.755 104.822)" fill="#3186FF"/></g>
      <g filter="url(#shared_blur_heavy)"><ellipse cx="33.566" cy="35.404" rx="33.566" ry="35.404" transform="matrix(-0.409 0.912 -0.912 -0.409 101.25 -15.167)" fill="#FBBC04"/></g>
      <g filter="url(#shared_blur_heavy)"><path d="M2.568 149.695C-15.812 142.48 15.599 83.116 23.409 63.22C31.22 43.324 52.451 33.045 70.831 40.26C89.211 47.475 110.996 87.216 103.185 107.112C95.374 127.008 20.948 156.91 2.568 149.695Z" fill="#3186FF"/></g>
      <g filter="url(#shared_blur_heavy)"><path d="M113.934 75.808C109.013 81.551 96.172 78.622 85.253 69.267C74.334 59.911 69.47 47.671 74.391 41.928C79.312 36.185 92.153 39.114 103.072 48.469C113.991 57.825 118.855 70.065 113.934 75.808Z" fill="#749BFF"/></g>
      <g filter="url(#shared_blur_heavy)"><ellipse cx="92.611" cy="23.796" rx="44.241" ry="27.502" transform="rotate(34.076 92.611 23.796)" fill="#FC413D"/></g>
      <g filter="url(#shared_blur_heavy)"><ellipse cx="23.495" cy="29.589" rx="23.707" ry="13.787" transform="rotate(112.516 23.495 29.589)" fill="#FFEE48"/></g>
    </g>
  </svg>`;
/**
 * Common CSS styles for the initialization state matching Figma / Visual Studio.
 * @type {string}
 */
const LOADING_COMMON_CSS = `
  .logo-container {
    position: relative;
    width: 140px;
    height: 140px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 24px;
  }
  .ambient-glow {
    position: absolute;
    width: 140px;
    height: 140px;
    border-radius: 50%;
    background: radial-gradient(circle, #FC413D 0%, #3186FF 45%, #00B95C 75%, transparent 100%);
    filter: blur(32px);
    opacity: 0.38;
    pointer-events: none;
  }
  .logo-svg {
    position: relative;
    width: 78px;
    height: 72px;
    z-index: 1;
  }
  .product-title {
    font-size: 22px;
    font-weight: 600;
    color: var(--vscode-foreground, #ffffff);
    margin: 0 0 4px 0;
    letter-spacing: -0.3px;
  }
  .product-subtitle {
    font-size: 13px;
    color: var(--vscode-descriptionForeground, #999999);
    opacity: 0.75;
    margin: 0 0 32px 0;
  }
  .progress-track {
    width: 240px;
    max-width: 80%;
    height: 3px;
    background: rgba(127, 127, 127, 0.2);
    border-radius: 2px;
    overflow: hidden;
    position: relative;
    margin-bottom: 12px;
  }
  .progress-bar {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 40%;
    background: var(--vscode-progressBar-background, #007acc);
    border-radius: 2px;
    animation: progress-indeterminate 1.6s cubic-bezier(0.4, 0, 0.2, 1) infinite;
  }
  @keyframes progress-indeterminate {
    0% {
      left: -40%;
      width: 40%;
    }
    50% {
      left: 30%;
      width: 60%;
    }
    100% {
      left: 100%;
      width: 40%;
    }
  }
  .loading-details {
    font-size: 13px;
    color: var(--vscode-descriptionForeground, #888888);
    opacity: 0.75;
    line-height: 1.4;
    max-width: 260px;
    text-align: center;
    transition: opacity 0.2s ease;
  }
`;
/**
 * Returns the common HTML layout for the initialization state matching Figma / Visual Studio.
 * @param {string} defaultDetailsText
 * @return {string}
 */
function getLoadingContentHtml(defaultDetailsText) {
    return `
    <div class="logo-container">
      <div class="ambient-glow"></div>
      ${ANTIGRAVITY_LOGO_SVG}
    </div>
    <div class="product-title">Google Antigravity</div>
    <div class="product-subtitle">for VS Code</div>
    <div class="progress-track">
      <div class="progress-bar"></div>
    </div>
    <div id="loading-details" class="loading-details">${defaultDetailsText}</div>
  `;
}
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
          .container {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            text-align: center;
            user-select: none;
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
          ${LOADING_COMMON_CSS}
        </style>
      </head>
      <body>
        <div id="loading-indicator" class="container">
          ${getLoadingContentHtml('Checking your setup...')}
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
            transition: opacity 0.3s ease-out;
            user-select: none;
          }
          .loading-container.hidden {
            opacity: 0;
            pointer-events: none;
          }
          ${LOADING_COMMON_CSS}
        </style>
      </head>
      <body>
        <div id="loading-indicator" class="loading-container" style="top:0;height:100%;">
          ${getLoadingContentHtml('Loading Antigravity...')}
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

          function markConnected() {
            if (isConnected) return;
            isConnected = true;
          }

          iframe.addEventListener('load', markConnected);
          window.addEventListener('message', (event) => {
            if (event.source === iframe.contentWindow) {
              markConnected();
            }
          });

          // In VS Code Web / Remote, webview origin (https://*.vscode-cdn.net) is blocked
          // by Chrome's Private Network Access (PNA) policy from fetching loopback (127.0.0.1)
          // endpoints via window.fetch(). We check the iframe's connection status directly to
          // avoid CORS/PNA loopback errors while preserving the retry and status indicator loop.
          function checkAndReveal() {
            if (isConnected || iframe.style.opacity === '1') {
              return;
            }
            attempts++;
            const details = document.getElementById('loading-details');
            if (details) {
              details.textContent =
                attempts < 20
                  ? 'Connecting to Remote Antigravity tunnel (' + attempts + ')...'
                  : 'Could not connect to remote port. Please check VS Code Ports tab.';
            }
            if (attempts < 20) {
              iframe.src = '${fullUrlString}';
              setTimeout(checkAndReveal, 1000);
            }
          }
          setTimeout(checkAndReveal, 600);

          // Safety fallback: ensure the iframe is revealed even if bridge initialization encounters an issue.
          setTimeout(() => {
            if (iframe.style.opacity === '1') return;
            iframe.style.opacity = '1';
            const loader = document.getElementById('loading-indicator');
            if (loader) {
              loader.classList.add('hidden');
              setTimeout(() => loader.remove(), 300);
            }
          }, 10000);
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
    // Only patch the specific Antigravity webview instance to avoid corrupting
    // third-party extension webviews (such as GitLens) sharing the global prototype.
    // tslint:disable-next-line:no-any
    /** @type {?} */
    const extendedWebview = (/** @type {?} */ (webview));
    if (extendedWebview._patchedForBigInt) {
        return;
    }
    if (typeof webview.postMessage !== 'function') {
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
            if (ArrayBuffer.isView(message) || message instanceof ArrayBuffer) {
                return originalPostMessage(message);
            }
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
