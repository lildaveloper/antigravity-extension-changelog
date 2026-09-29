/**
 * @fileoverview added by tsickle
 * Generated from: cloud/developer_experience/antigravity_extensions/vscode/webview_error_component.ts
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
goog.module('google3.cloud.developer_experience.antigravity_extensions.vscode.webview_error_component');
var module = module || { id: 'cloud/developer_experience/antigravity_extensions/vscode/webview_error_component.closure.js' };
goog.require('google3.third_party.javascript.tslib.tslib');
const tsickle_vscode_1 = goog.requireType("vscode");
/**
 * Minimal interface to check for onDidDispose on mock or real webviews.
 * @record
 * @extends {tsickle_vscode_1.Webview}
 */
function DisposableWebview() { }
/* istanbul ignore if */
if (false) {
    /**
     * @const {(undefined|function(function(): void): *)}
     * @public
     */
    DisposableWebview.prototype.onDidDispose;
}
/**
 * Official VS Code Codicon for error.
 * @type {string}
 */
const ERROR_FACE_ICON = `
  <svg width="28" height="28" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" fill="currentColor" aria-hidden="true">
    <path d="M8 1C4.14 1 1 4.14 1 8C1 11.86 4.14 15 8 15C11.86 15 15 11.86 15 8C15 4.14 11.86 1 8 1ZM8 14C4.691 14 2 11.309 2 8C2 4.691 4.691 2 8 2C11.309 2 14 4.691 14 8C14 11.309 11.309 14 8 14ZM10.854 5.854L8.708 8L10.854 10.146C11.049 10.341 11.049 10.658 10.854 10.853C10.756 10.951 10.628 10.999 10.5 10.999C10.372 10.999 10.244 10.95 10.146 10.853L8 8.707L5.854 10.853C5.756 10.951 5.628 10.999 5.5 10.999C5.372 10.999 5.244 10.95 5.146 10.853C4.951 10.658 4.951 10.341 5.146 10.146L7.292 8L5.146 5.854C4.951 5.659 4.951 5.342 5.146 5.147C5.341 4.952 5.658 4.952 5.853 5.147L7.999 7.293L10.145 5.147C10.34 4.952 10.657 4.952 10.852 5.147C11.047 5.342 11.047 5.659 10.852 5.854H10.854Z"/>
  </svg>
`;
/**
 * Common CSS styles for the in-surface error component.
 * @type {string}
 */
exports.ERROR_COMMON_CSS = `
  .error-container {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: none;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    padding: 24px;
    box-sizing: border-box;
    font-family: var(--vscode-font-family, sans-serif);
    user-select: none;
    z-index: 2;
  }
  .error-container.visible {
    display: flex;
  }
  .error-face {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 56px;
    height: 56px;
    border-radius: 14px;
    margin-bottom: 18px;
    color: var(--vscode-errorForeground, #f16c6c);
    background: color-mix(in srgb, var(--vscode-errorForeground, #f16c6c) 14%, transparent);
  }
  .error-title {
    font-size: 20px;
    font-weight: 600;
    color: var(--vscode-foreground, #ffffff);
    margin: 0 0 10px 0;
    letter-spacing: -0.2px;
  }
  .error-message {
    font-size: 13px;
    color: var(--vscode-descriptionForeground, #999999);
    line-height: 1.5;
    margin: 0 0 24px 0;
    max-width: 340px;
  }
  .error-details {
    font-size: 11px;
    font-family: var(--vscode-editor-font-family, monospace);
    color: var(--vscode-descriptionForeground, #999999);
    opacity: 0.85;
    word-break: break-word;
    line-height: 1.4;
    max-width: 90%;
    max-height: 120px;
    overflow-y: auto;
    background: var(--vscode-textCodeBlock-background, rgba(255,255,255,0.04));
    padding: 8px 12px;
    border-radius: 4px;
    border: 1px solid var(--vscode-widget-border, rgba(255,255,255,0.08));
    text-align: left;
    margin: 0 0 24px 0;
    display: none;
  }
  .error-details.visible {
    display: block;
  }
  .error-actions {
    display: flex;
    align-items: center;
    gap: 12px;
    flex-wrap: wrap;
    justify-content: center;
  }
  .error-btn {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 9px 20px;
    font-size: 13px;
    font-weight: 500;
    font-family: inherit;
    cursor: pointer;
    border-radius: 6px;
    border: none;
    outline: none;
    transition: background-color 0.15s ease, opacity 0.15s ease;
  }
  .error-btn:focus-visible {
    outline: 1px solid var(--vscode-focusBorder, #007fd4);
    outline-offset: 2px;
  }
  .error-btn.secondary {
    background: var(--vscode-button-secondaryBackground, rgba(255,255,255,0.10));
    color: var(--vscode-button-secondaryForeground, #ffffff);
  }
  .error-btn.secondary:hover {
    background: var(--vscode-button-secondaryHoverBackground, rgba(255,255,255,0.16));
  }
  .error-btn.primary {
    background: var(--vscode-button-background, #0e639c);
    color: var(--vscode-button-foreground, #ffffff);
  }
  .error-btn.primary:hover {
    background: var(--vscode-button-hoverBackground, #1177bb);
  }
  .error-btn.ghost {
    background: transparent;
    color: var(--vscode-button-secondaryForeground, var(--vscode-foreground, #cccccc));
  }
  .error-btn.ghost:hover {
    background: var(--vscode-toolbar-hoverBackground, rgba(255, 255, 255, 0.08));
    color: var(--vscode-foreground, #ffffff);
  }
  .error-btn[disabled] {
    opacity: 0.6;
    cursor: default;
  }
`;
/**
 * Returns the in-surface error HTML structure for the active iframe surface.
 * @return {string}
 */
function getErrorContentHtml() {
    return `
    <div id="error-state" class="error-container" role="alert" aria-live="assertive">
      <div class="error-face">${ERROR_FACE_ICON}</div>
      <div class="error-title">Couldn't load this view</div>
      <div class="error-message">An unexpected error occurred while loading this view. Please reload or report an issue.</div>
      <div class="error-actions">
        <button id="error-reload-btn" class="error-btn primary" type="button">Try again</button>
        <button id="error-report-btn" class="error-btn ghost" type="button">Report issue</button>
      </div>
    </div>
  `;
}
exports.getErrorContentHtml = getErrorContentHtml;
/**
 * Returns the in-surface error HTML structure for the initial loading surface.
 * @return {string}
 */
function getLoadingErrorContentHtml() {
    return `
    <div id="loading-error" class="error-container" role="alert" aria-live="assertive" style="visibility: hidden;">
      <div class="error-face">${ERROR_FACE_ICON}</div>
      <div class="error-title">Couldn't load this view</div>
      <div class="error-message">An unexpected error occurred while loading this view. Please reload or report an issue.</div>
      <span id="error-message-text" class="error-details"></span>
      <div class="error-actions">
        <button id="retry-button" class="error-btn primary" type="button">Try again</button>
        <button id="report-button" class="error-btn ghost" type="button">Report issue</button>
      </div>
    </div>
  `;
}
exports.getLoadingErrorContentHtml = getLoadingErrorContentHtml;
/**
 * Returns the client-side JavaScript watcher that monitors backend iframe connectivity,
 * flips to the in-surface error component when unreachable, and binds action buttons.
 * @param {string} fullUrlString
 * @param {string} iframeSource
 * @return {string}
 */
function getErrorWatcherScript(fullUrlString, iframeSource) {
    return `
    <script>
      (function() {
        const IFRAME_URL = '${fullUrlString}';
        const IFRAME_SOURCE = '${iframeSource}';
        const MAX_ATTEMPTS = 6;
        const ATTEMPT_INTERVAL_MS = 700;
        const INITIAL_DELAY_MS = 400;
        let attempts = 0;
        let isConnected = false;
        let isExplicitError = false;
        let watchTimer = null;
        const iframe = document.getElementById('jetski-frame');
        const loader = document.getElementById('loading-indicator');
        const errorState = document.getElementById('error-state');
        const reloadBtn = document.getElementById('error-reload-btn');
        const reportBtn = document.getElementById('error-report-btn');

        let host = null;
        try {
          host = typeof acquireVsCodeApi === 'function' ? acquireVsCodeApi() : null;
        } catch (e) {
          host = null;
        }

        function hideLoader() {
          if (!loader) return;
          loader.classList.add('hidden');
          setTimeout(() => { if (loader) loader.style.display = 'none'; }, 300);
        }

        function showLoader() {
          if (!loader) return;
          loader.style.display = 'flex';
          void loader.offsetWidth;
          loader.classList.remove('hidden');
        }

        function revealIframe() {
          iframe.style.opacity = '1';
          iframe.style.pointerEvents = '';
          hideLoader();
          if (errorState) errorState.classList.remove('visible');
        }

        function showError() {
          if (!errorState) return;
          iframe.style.opacity = '0';
          iframe.style.pointerEvents = 'none';
          hideLoader();
          errorState.classList.add('visible');
        }

        function markConnected() {
          if (isConnected || isExplicitError) return;
          isConnected = true;
          if (watchTimer) { clearTimeout(watchTimer); watchTimer = null; }
          revealIframe();
        }

        window.addEventListener('message', (event) => {
          if (
            !isExplicitError &&
            event.source === iframe.contentWindow &&
            event.data &&
            event.data.source === IFRAME_SOURCE
          ) {
            markConnected();
          }
        });

        function checkAndReveal() {
          if (isConnected || isExplicitError) return;
          attempts++;
          const details = document.getElementById('loading-details');
          if (details && (!errorState || !errorState.classList.contains('visible'))) {
            details.textContent = attempts >= Math.floor(MAX_ATTEMPTS / 2)
              ? 'Still connecting to Antigravity...'
              : 'Connecting to Antigravity...';
          }
          console.debug('[Antigravity] Connection attempt ' + attempts + '/' + MAX_ATTEMPTS);
          if (attempts < MAX_ATTEMPTS) {
            if (attempts === Math.floor(MAX_ATTEMPTS / 2)) {
              iframe.src = IFRAME_URL;
            }
            watchTimer = setTimeout(checkAndReveal, ATTEMPT_INTERVAL_MS);
          } else {
            showError();
          }
        }
        watchTimer = setTimeout(checkAndReveal, INITIAL_DELAY_MS);

        function restartWatcher() {
          isExplicitError = false;
          if (isConnected) { revealIframe(); return; }
          attempts = 0;
          if (errorState) errorState.classList.remove('visible');
          showLoader();
          iframe.src = IFRAME_URL;
          if (watchTimer) clearTimeout(watchTimer);
          watchTimer = setTimeout(checkAndReveal, INITIAL_DELAY_MS);
        }

        if (reloadBtn) {
          reloadBtn.addEventListener('click', () => {
            if (host) {
              host.postMessage({ source: 'antigravity-error', type: 'reload' });
            }
            restartWatcher();
          });
        }

        if (reportBtn) {
          reportBtn.addEventListener('click', () => {
            if (host) {
              host.postMessage({ source: 'antigravity-error', type: 'reportIssue' });
            }
          });
        }

        window.addEventListener('message', (event) => {
          const data = event && event.data;
          if (!data || data.source !== 'antigravity-error') return;
          if (data.type === 'showError') {
            isConnected = false;
            isExplicitError = true;
            if (watchTimer) { clearTimeout(watchTimer); watchTimer = null; }
            if (iframe) { iframe.src = 'about:blank'; }
            showError();
          } else if (data.type === 'recover') {
            restartWatcher();
          }
        });
      })();
    </script>
  `;
}
exports.getErrorWatcherScript = getErrorWatcherScript;
/** @type {!WeakMap<!tsickle_vscode_1.Webview, !tsickle_vscode_1.Disposable>} */
const activeWebviewListeners = new WeakMap();
/**
 * @record
 */
function ErrorControlMessage() { }
/* istanbul ignore if */
if (false) {
    /**
     * @const {string}
     * @public
     */
    ErrorControlMessage.prototype.source;
    /**
     * @const {string}
     * @public
     */
    ErrorControlMessage.prototype.type;
}
/**
 * @param {*} message
 * @return {boolean}
 */
function isErrorControlMessage(message) {
    if (typeof message !== 'object' || message === null) {
        return false;
    }
    /** @type {?} */
    const candidate = (/** @type {?} */ (message));
    return (candidate['source'] === 'antigravity-error' &&
        (candidate['type'] === 'reload' || candidate['type'] === 'reportIssue'));
}
/**
 * Registers message listeners on the webview for error control messages ('reload' and 'reportIssue').
 * @param {!tsickle_vscode_1.Webview} webview
 * @param {{onReload: (undefined|function(): void), onReportIssue: (undefined|function(): void)}} options
 * @param {(undefined|!tsickle_vscode_1.ExtensionContext)=} context
 * @return {void}
 */
function registerErrorControlListener(webview, options, context) {
    activeWebviewListeners.get(webview)?.dispose();
    if ((!options.onReload && !options.onReportIssue) ||
        typeof webview.onDidReceiveMessage !== 'function') {
        return;
    }
    /** @type {!tsickle_vscode_1.Disposable} */
    const errorControlSub = webview.onDidReceiveMessage((/**
     * @param {*} message
     * @return {void}
     */
    (message) => {
        if (!isErrorControlMessage(message)) {
            return;
        }
        if ((/** @type {!ErrorControlMessage} */ (message)).type === 'reload') {
            options.onReload?.();
        }
        else if ((/** @type {string} */ ((/** @type {!ErrorControlMessage} */ (message)).type)) === 'reportIssue') {
            options.onReportIssue?.();
        }
    }));
    activeWebviewListeners.set(webview, errorControlSub);
    /** @type {!DisposableWebview} */
    const disposableWebview = webview;
    if (typeof disposableWebview.onDidDispose === 'function') {
        disposableWebview.onDidDispose((/**
         * @return {void}
         */
        () => {
            errorControlSub.dispose();
        }));
    }
    else if (context?.subscriptions) {
        context.subscriptions.push(errorControlSub);
    }
}
exports.registerErrorControlListener = registerErrorControlListener;
