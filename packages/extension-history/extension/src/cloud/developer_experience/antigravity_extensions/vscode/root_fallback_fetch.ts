/**
 * @fileoverview `fetch` with a fallback to Node's own root certificates.
 *
 * VS Code replaces the extension host's global `fetch` with one that verifies servers against
 * its own certificate list: Node's bundled roots plus certificates read from the OS when
 * `http.systemCertificates` is on (on macOS via `security find-certificate -a -p`, i.e. the
 * login and System keychains, not Apple's root store). That list reaches the TLS layer as an
 * explicit `ca`, which replaces Node's defaults instead of extending them. When the OS store
 * holds a certificate that confuses chain building, for example a cross-signed copy of a root
 * CA whose own issuer is not in the list, verification fails with `UNABLE_TO_GET_ISSUER_CERT`
 * even though Node's defaults alone verify the same server (b/561536914: corp-managed Macs
 * carry such a copy of GTS Root R1 in the System keychain, and every fetch of a Google host
 * from the extension host fails while `curl` and the browser succeed).
 *
 * `fetchWithRootFallback` calls the global `fetch` first. If that fails with a certificate-trust
 * code, it repeats the request over `https` with `ca` set to Node's default certificates. VS
 * Code's `fetch`, `https` and `tls` patches all leave a caller-supplied `ca` alone, so this
 * path verifies against Node's defaults only. Verification itself still runs in full
 * (`rejectUnauthorized` stays on); only the set of trust anchors differs.
 * Generated from: cloud/developer_experience/antigravity_extensions/vscode/root_fallback_fetch.ts
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
goog.module('google3.cloud.developer_experience.antigravity_extensions.vscode.root_fallback_fetch');
var module = module || { id: 'cloud/developer_experience/antigravity_extensions/vscode/root_fallback_fetch.closure.js' };
goog.require('google3.third_party.javascript.tslib.tslib');
const tsickle_fs_1 = goog.requireType("google3.third_party.javascript.typings.node.node.fs");
const tsickle_http_2 = goog.requireType("google3.third_party.javascript.typings.node.node.http");
const tsickle_https_3 = goog.requireType("google3.third_party.javascript.typings.node.node.https");
const tsickle_stream_4 = goog.requireType("google3.third_party.javascript.typings.node.node.stream");
const tsickle_tls_5 = goog.requireType("google3.third_party.javascript.typings.node.node.tls");
const fs_1 = goog.require('google3.third_party.javascript.typings.node.node.fs');
const https = goog.require('google3.third_party.javascript.typings.node.node.https');
const stream_1 = goog.require('google3.third_party.javascript.typings.node.node.stream');
const tls_1 = goog.require('google3.third_party.javascript.typings.node.node.tls');
/**
 * OpenSSL / Node verification codes meaning the peer's certificate chain could not be anchored
 * to a trusted root, i.e. failures that a different set of trust anchors could resolve.
 * Deliberately excludes hostname mismatches (`ERR_TLS_CERT_ALTNAME_INVALID`) and expiry
 * (`CERT_HAS_EXPIRED`): no choice of trust anchors fixes those.
 * @type {!ReadonlySet<string>}
 */
exports.TLS_TRUST_ERROR_CODES = new Set([
    'UNABLE_TO_GET_ISSUER_CERT',
    'UNABLE_TO_GET_ISSUER_CERT_LOCALLY',
    'UNABLE_TO_VERIFY_LEAF_SIGNATURE',
    'SELF_SIGNED_CERT_IN_CHAIN',
    'DEPTH_ZERO_SELF_SIGNED_CERT',
    'CERT_UNTRUSTED',
]);
/**
 * Upper bound on `cause` links followed when inspecting an error.
 * @type {number}
 */
const MAX_ERROR_CAUSE_DEPTH = 10;
/**
 * Walks `error` and its `cause` chain and returns the first TLS trust failure code found, or
 * `undefined` when the failure is not a certificate trust problem.
 * @param {*} error
 * @return {(undefined|string)}
 */
function findTlsTrustErrorCode(error) {
    /** @type {!Set<*>} */
    const seen = new Set();
    /** @type {*} */
    let current = error;
    for (let depth = 0; depth <= MAX_ERROR_CAUSE_DEPTH &&
        typeof current === 'object' &&
        current !== null &&
        !seen.has(current); depth++) {
        seen.add(current);
        /** @type {*} */
        const code = ((/** @type {{code: *}} */ (current))).code;
        if (typeof code === 'string' && exports.TLS_TRUST_ERROR_CODES.has(code)) {
            return code;
        }
        current = ((/** @type {{cause: *}} */ (current))).cause;
    }
    return undefined;
}
exports.findTlsTrustErrorCode = findTlsTrustErrorCode;
/**
 * Injection points for tests; production code uses `defaultDeps`.
 * @record
 */
function RootFallbackFetchDeps() { }
exports.RootFallbackFetchDeps = RootFallbackFetchDeps;
/* istanbul ignore if */
if (false) {
    /**
     * @const {function((string|!Request|!URL), (undefined|!RequestInit)=): !Promise<!Response>}
     * @public
     */
    RootFallbackFetchDeps.prototype.fetch;
    /**
     * @const {?}
     * @public
     */
    RootFallbackFetchDeps.prototype.request;
    /**
     * @const {function(): !ReadonlyArray<string>}
     * @public
     */
    RootFallbackFetchDeps.prototype.rootCertificates;
}
/** @type {(undefined|!ReadonlyArray<string>)} */
let extraCertificatesCache;
/**
 * Certificates from the file named by `NODE_EXTRA_CA_CERTS`, which Node itself appends to its
 * default trust anchors at startup. Read once; an unreadable or absent file contributes
 * nothing, matching Node's own behaviour of warning and continuing.
 * @return {!ReadonlyArray<string>}
 */
function extraCertificates() {
    if (extraCertificatesCache === undefined) {
        /** @type {(undefined|string)} */
        const file = process.env['NODE_EXTRA_CA_CERTS'];
        /** @type {!Array<string>} */
        let certs = [];
        if (file) {
            try {
                certs = (0, fs_1.readFileSync)(file, 'utf8')
                    .split(/(?=-----BEGIN CERTIFICATE-----)/g)
                    .map((/**
                 * @param {string} pem
                 * @return {string}
                 */
                (pem) => pem.trim()))
                    .filter((/**
                 * @param {string} pem
                 * @return {boolean}
                 */
                (pem) => pem.startsWith('-----BEGIN CERTIFICATE-----')));
            }
            catch {
                certs = [];
            }
        }
        extraCertificatesCache = certs;
    }
    return extraCertificatesCache;
}
/**
 * Node's default trust anchors: the bundled Mozilla roots plus `NODE_EXTRA_CA_CERTS`. This is
 * the set an unpatched Node `fetch` would use, and the set that verified the release host on
 * the affected Macs once VS Code's additions were taken out of the picture.
 * @return {!ReadonlyArray<string>}
 */
function nodeDefaultCertificates() {
    return Array.from(new Set(tls_1.rootCertificates.concat(extraCertificates())));
}
exports.nodeDefaultCertificates = nodeDefaultCertificates;
/** @type {!RootFallbackFetchDeps} */
const defaultDeps = {
    // Resolved per call so that VS Code's patched global and test spies on `globalThis.fetch`
    // both take effect.
    fetch: (/**
     * @param {(string|!Request|!URL)} input
     * @param {(undefined|!RequestInit)} init
     * @return {!Promise<!Response>}
     */
    (input, init) => fetch(input, init)),
    request: https.request,
    rootCertificates: nodeDefaultCertificates,
};
/** @type {!RootFallbackFetchDeps} */
let activeDeps = defaultDeps;
/**
 * Hosts (`host:port`) for which VS Code's certificate list failed and Node's defaults worked.
 * @type {!Set<string>}
 */
const fallbackHosts = new Set();
/**
 * Replaces the injection points (pass `undefined` to restore) and forgets remembered hosts.
 * @param {(undefined|!RootFallbackFetchDeps)} deps
 * @return {void}
 */
function setRootFallbackDepsForTesting(deps) {
    activeDeps = deps ?? defaultDeps;
    fallbackHosts.clear();
    extraCertificatesCache = undefined;
}
exports.setRootFallbackDepsForTesting = setRootFallbackDepsForTesting;
/**
 * Hosts currently routed straight to the fallback; exposed for tests and diagnostics.
 * @return {!ReadonlySet<string>}
 */
function rootFallbackHosts() {
    return fallbackHosts;
}
exports.rootFallbackHosts = rootFallbackHosts;
/**
 * @param {string} url
 * @return {(undefined|string)}
 */
function hostKeyOf(url) {
    try {
        /** @type {!URL} */
        const parsed = new URL(url);
        if (parsed.protocol !== 'https:') {
            return undefined;
        }
        return `${parsed.hostname}:${parsed.port || '443'}`;
    }
    catch {
        return undefined;
    }
}
/**
 * @param {*} error
 * @return {string}
 */
function describeFallbackError(error) {
    /** @type {string} */
    const message = error instanceof Error ? (/** @type {!Error} */ (error)).message : String(error);
    /** @type {*} */
    const code = ((/** @type {(null|{code: *})} */ (error)))?.code;
    return typeof code === 'string' ? `${message} (${code})` : message;
}
/**
 * Options for `fetchWithRootFallback`.
 * @record
 */
function RootFallbackFetchOptions() { }
exports.RootFallbackFetchOptions = RootFallbackFetchOptions;
/* istanbul ignore if */
if (false) {
    /**
     * Receives one line per fallback decision, for the install log.
     * @const {(undefined|function(string): void)}
     * @public
     */
    RootFallbackFetchOptions.prototype.log;
}
/**
 * `fetch(url, init)`, falling back to Node's default root certificates when the global `fetch`
 * fails with a certificate-trust error. Once the fallback has verified a host, later requests
 * to that host go straight to it for the rest of the session, so a large download does not
 * repeat the failing handshake. Non-trust failures, and trust failures that the fallback does
 * not resolve either, reject with the original error so the existing diagnostics still apply.
 * Only body-less requests (GET / HEAD) are supported, which is all the installer needs.
 * @param {string} url
 * @param {!RequestInit=} init
 * @param {!RootFallbackFetchOptions=} options
 * @return {!Promise<!Response>}
 */
async function fetchWithRootFallback(url, init = {}, options = {}) {
    /** @type {!RootFallbackFetchDeps} */
    const deps = activeDeps;
    /** @type {(undefined|string)} */
    const hostKey = hostKeyOf(url);
    if (hostKey !== undefined && fallbackHosts.has(hostKey)) {
        return await httpsFetch(url, init, deps);
    }
    try {
        return await deps.fetch(url, init);
    }
    catch (err) {
        /** @type {(undefined|string)} */
        const code = hostKey === undefined ? undefined : findTlsTrustErrorCode(err);
        if (code === undefined || hostKey === undefined) {
            throw err;
        }
        options.log?.(`[INSTALL] VS Code's certificate list could not verify ${hostKey} (${code}); retrying with Node's root certificates only.`);
        /** @type {!Response} */
        let response;
        try {
            response = await httpsFetch(url, init, deps);
        }
        catch (fallbackErr) {
            options.log?.(`[INSTALL] Retry with Node's root certificates also failed: ${describeFallbackError(fallbackErr)}.`);
            throw err;
        }
        fallbackHosts.add(hostKey);
        options.log?.(`[INSTALL] Verified ${hostKey} with Node's root certificates; using them for this host for the rest of the session. ` +
            `A certificate that VS Code adds from the OS store (http.systemCertificates) breaks chain building for this host; ` +
            `setting "http.fetchAdditionalSupport" to false in VS Code avoids this for all extensions.`);
        return response;
    }
}
exports.fetchWithRootFallback = fetchWithRootFallback;
/**
 * Redirect statuses followed by `httpsFetch`, mirroring `fetch`'s default `redirect: 'follow'`.
 * @type {!ReadonlySet<number>}
 */
const REDIRECT_STATUSES = new Set([
    301, 302, 303, 307, 308,
]);
/** @type {number} */
const MAX_REDIRECTS = 5;
/**
 * Statuses for which the `Response` constructor forbids a body.
 * @type {!ReadonlySet<number>}
 */
const NULL_BODY_STATUSES = new Set([204, 205, 304]);
/**
 * @param {(undefined|!Array<!Array<?>>|!Headers|?)} headers
 * @return {?}
 */
function toHeaderRecord(headers) {
    /** @type {?} */
    const record = {};
    if (headers) {
        new Headers(headers).forEach((/**
         * @param {string} value
         * @param {string} name
         * @return {void}
         */
        (value, name) => {
            record[name] = value;
        }));
    }
    return record;
}
/**
 * @param {?} message
 * @return {!Headers}
 */
function toResponseHeaders(message) {
    /** @type {!Headers} */
    const headers = new Headers();
    for (const [name__tsickle_destructured_1, value__tsickle_destructured_2] of Object.entries(message.headers)) {
        const name = /** @type {string} */ (name__tsickle_destructured_1);
        const value = /** @type {(undefined|string|!Array<string>)} */ (value__tsickle_destructured_2);
        if (value === undefined) {
            continue;
        }
        headers.set(name, Array.isArray(value) ? (/** @type {!Array<string>} */ (value)).join(', ') : value);
    }
    return headers;
}
/**
 * Performs `init`'s request over `https` with `ca` set to Node's default certificates and wraps
 * the result in a `Response`, so callers written against `fetch` can consume it as is.
 * @param {string} url
 * @param {!RequestInit} init
 * @param {!RootFallbackFetchDeps} deps
 * @param {number=} redirectsFollowed
 * @return {!Promise<!Response>}
 */
async function httpsFetch(url, init, deps, redirectsFollowed = 0) {
    if (init.body !== undefined && init.body !== null) {
        throw new Error('fetchWithRootFallback supports body-less requests only');
    }
    /** @type {!URL} */
    const target = new URL(url);
    if (target.protocol !== 'https:') {
        throw new Error(`Root-certificate fallback supports https URLs only: ${url}`);
    }
    /** @type {string} */
    const method = (init.method ?? 'GET').toUpperCase();
    const message = await new Promise((/**
     * @param {function((?|!PromiseLike<?>)): void} resolve
     * @param {function(?=): void} reject
     * @return {void}
     */
    (resolve, reject) => {
        const request = deps.request(target, {
            method,
            headers: toHeaderRecord(init.headers),
            ca: Array.from(deps.rootCertificates()),
            servername: target.hostname,
            signal: init.signal ?? undefined,
        }, resolve);
        request.once('error', reject);
        request.end();
    }));
    /** @type {number} */
    const status = message.statusCode ?? 0;
    /** @type {(undefined|string)} */
    const location = message.headers.location;
    if (REDIRECT_STATUSES.has(status) &&
        location &&
        redirectsFollowed < MAX_REDIRECTS) {
        message.resume();
        return await httpsFetch(new URL(location, target).toString(), init, deps, redirectsFollowed + 1);
    }
    /** @type {boolean} */
    const omitBody = method === 'HEAD' || NULL_BODY_STATUSES.has(status);
    if (omitBody) {
        message.resume();
    }
    /** @type {(null|string|!ArrayBuffer|!ArrayBufferView|!Blob|!FormData|!ReadableStream<?>|!URLSearchParams)} */
    const body = omitBody
        ? null
        : ((/** @type {(string|!ArrayBuffer|!ArrayBufferView|!Blob|!FormData|!ReadableStream<?>|!URLSearchParams)} */ ((/** @type {*} */ (stream_1.Readable.toWeb(message))))));
    return new Response(body, {
        status,
        statusText: message.statusMessage ?? '',
        headers: toResponseHeaders(message),
    });
}
