/**
 * @fileoverview added by tsickle
 * Generated from: devtools/cider/extensions/jetski/diff_zones/hunk_storage.ts
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
goog.module('google3.devtools.cider.extensions.jetski.diff_zones.hunk_storage');
var module = module || { id: 'devtools/cider/extensions/jetski/diff_zones/hunk_storage.closure.js' };
goog.require('google3.third_party.javascript.tslib.tslib');
const tsickle_hash_1 = goog.requireType("google3.devtools.cider.extensionutils.vscode.hash");
const tsickle_vscode_2 = goog.requireType("vscode");
const tsickle_utils_3 = goog.requireType("google3.devtools.cider.extensions.jetski.diff_zones.utils");
const hash_1 = goog.require('google3.devtools.cider.extensionutils.vscode.hash');
// from //devtools/cider/extensions:vscode
const utils_1 = goog.require('google3.devtools.cider.extensions.jetski.diff_zones.utils');
/**
 * Key for storing resolved hunks in workspace state.
 * @type {string}
 */
exports.RESOLVED_HUNKS_KEY = 'jetski.resolvedHunks';
/**
 * Key for storing content snapshots (file hashes at DiffZone disposal time).
 * @type {string}
 */
exports.CONTENT_SNAPSHOTS_KEY = 'jetski.contentSnapshots';
/** @type {number} */
const MAX_ENTRIES = 5000;
/** @type {number} */
const MAX_SNAPSHOT_ENTRIES = 1000;
/**
 * Key for storing the modified text an inline review was built with, when it
 * differs from the turn's reported text (see `recordReviewedContents`).
 * @type {string}
 */
exports.REVIEWED_CONTENTS_KEY = 'jetski.reviewedContents';
/** @type {number} */
const MAX_REVIEWED_CONTENTS_ENTRIES = 200;
/** @type {number} */
const TTL_MS = 7 * 24 * 60 * 60 * 1000;
// 7 days
/**
 * Constants for testing.
 * @type {{MAX_ENTRIES: number, TTL_MS: number}}
 */
exports.TEST_ONLY = {
    MAX_ENTRIES,
    TTL_MS,
};
/**
 * Actions for resolving a hunk.
 * @enum {string}
 */
const HunkResolutionAction = {
    ACCEPT: "accept",
    REJECT: "reject",
};
exports.HunkResolutionAction = HunkResolutionAction;
/**
 * Record of a resolved hunk.
 * @record
 */
function ResolvedHunkRecord() { }
exports.ResolvedHunkRecord = ResolvedHunkRecord;
/* istanbul ignore if */
if (false) {
    /**
     * @type {!HunkResolutionAction}
     * @public
     */
    ResolvedHunkRecord.prototype.action;
    /**
     * @type {number}
     * @public
     */
    ResolvedHunkRecord.prototype.timestamp;
}
/**
 * Storage for resolved hunks.
 * @record
 */
function ResolvedHunksStorage() { }
exports.ResolvedHunksStorage = ResolvedHunksStorage;
/**
 * Context for a hunk, used to generate a unique key.
 * @record
 */
function HunkContext() { }
exports.HunkContext = HunkContext;
/* istanbul ignore if */
if (false) {
    /**
     * @type {(undefined|string)}
     * @public
     */
    HunkContext.prototype.conversationId;
    /**
     * @type {(undefined|number)}
     * @public
     */
    HunkContext.prototype.turnIndex;
    /**
     * @type {(undefined|string)}
     * @public
     */
    HunkContext.prototype.fileUri;
}
/**
 * Snapshot of file content at DiffZone disposal time.
 * @record
 */
function ContentSnapshot() { }
/* istanbul ignore if */
if (false) {
    /**
     * @type {string}
     * @public
     */
    ContentSnapshot.prototype.contentHash;
    /**
     * @type {number}
     * @public
     */
    ContentSnapshot.prototype.timestamp;
}
/**
 * Storage for content snapshots.
 * @record
 */
function ContentSnapshotsStorage() { }
/**
 * Modified text an inline review was built with.
 * @record
 */
function ReviewedContents() { }
/* istanbul ignore if */
if (false) {
    /**
     * @type {string}
     * @public
     */
    ReviewedContents.prototype.contents;
    /**
     * @type {number}
     * @public
     */
    ReviewedContents.prototype.timestamp;
}
/**
 * Storage for reviewed contents, keyed like content snapshots.
 * @record
 */
function ReviewedContentsStorage() { }
/**
 * Computes a hash for a hunk based on its insertions, deletions, and surrounding context.
 * @param {!ReadonlyArray<string>} insertions
 * @param {!ReadonlyArray<string>} deletions
 * @param {(undefined|string)=} context
 * @return {string}
 */
function computeHunkHash(insertions, deletions, context) {
    /** @type {string} */
    const content = `${insertions.join('\n')}|||${deletions.join('\n')}|||${context ?? ''}`;
    return (0, hash_1.hash)(content).toString(36);
}
exports.computeHunkHash = computeHunkHash;
/**
 * Returns the file URI segments to use for storage keys: the normalized URI
 * first (the canonical form used for all writes), followed by the raw URI if
 * it differs. The raw form keeps entries stored before keys were normalized
 * (e.g. `file:///c:/x` vs `file:///c%3A/x`) discoverable.
 * @param {(undefined|string)} fileUri
 * @return {!Array<string>}
 */
function getFileUriCandidates(fileUri) {
    if (!fileUri) {
        return [fileUri ?? 'unknown'];
    }
    /** @type {string} */
    const normalized = (0, utils_1.normalizeUri)(fileUri);
    return normalized === fileUri ? [fileUri] : [normalized, fileUri];
}
/**
 * Returns the context keys (canonical first, then legacy) for a hunk context.
 * @param {!HunkContext} hunkContext
 * @return {!Array<string>}
 */
function getSnapshotKeyCandidates(hunkContext) {
    // TODO(vishalkumaar): Remove default values. They might hide bugs.
    return getFileUriCandidates(hunkContext.fileUri).map((/**
     * @param {string} fileUri
     * @return {string}
     */
    (fileUri) => `${hunkContext.conversationId ?? 'default'}_${hunkContext.turnIndex ?? -1}_${fileUri}`));
}
/**
 * Returns the hunk keys (canonical first, then legacy) for a hunk.
 * @param {!HunkContext} hunkContext
 * @param {string} hunkHash
 * @return {!Array<string>}
 */
function getHunkKeyCandidates(hunkContext, hunkHash) {
    return getSnapshotKeyCandidates(hunkContext).map((/**
     * @param {string} contextKey
     * @return {string}
     */
    (contextKey) => `${contextKey}_${hunkHash}`));
}
/**
 * @param {!HunkContext} hunkContext
 * @param {string} hunkHash
 * @return {string}
 */
function getHunkKey(hunkContext, hunkHash) {
    return getHunkKeyCandidates(hunkContext, hunkHash)[0];
}
/**
 * @param {!HunkContext} hunkContext
 * @return {string}
 */
function getSnapshotKey(hunkContext) {
    return getSnapshotKeyCandidates(hunkContext)[0];
}
/**
 * Handles persistent storage of resolved hunks.
 */
class HunkStorage {
    /**
     * @public
     * @param {!tsickle_vscode_2.ExtensionContext} context
     */
    constructor(context) {
        this.context = context;
        this.savePromise = Promise.resolve();
        this.pendingSave = false;
        this.resolutionCount = 0;
        this.loadStorage();
        this.loadSnapshotStorage();
        this.cleanup().catch((/**
         * @param {?} e
         * @return {void}
         */
        (e) => {
            console.error('Failed to cleanup HunkStorage', e);
        }));
    }
    /**
     * @private
     * @return {void}
     */
    loadStorage() {
        try {
            this.storage = this.context.workspaceState.get(exports.RESOLVED_HUNKS_KEY, {});
        }
        catch (e) {
            console.error('Failed to load resolved hunks storage', e);
            this.storage = {};
        }
    }
    /**
     * @private
     * @return {!ResolvedHunksStorage}
     */
    getStorage() {
        if (!this.storage) {
            this.loadStorage();
        }
        return (/** @type {!ResolvedHunksStorage} */ (this.storage));
    }
    /**
     * @private
     * @return {!Promise<void>}
     */
    persist() {
        // If a save is already pending, return the existing promise to batch saves
        // and prevent I/O thrashing on rapid consecutive calls (e.g., during bulk resolution).
        if (this.pendingSave) {
            return this.savePromise;
        }
        this.pendingSave = true;
        this.savePromise = this.savePromise.then((/**
         * @return {!Promise<void>}
         */
        async () => {
            this.pendingSave = false;
            await this.context.workspaceState.update(exports.RESOLVED_HUNKS_KEY, this.getStorage());
        }));
        return this.savePromise;
    }
    /**
     * Records the resolution of a hunk.
     * @public
     * @param {!HunkContext} hunkContext The context of the hunk.
     * @param {string} hunkHash The hash of the hunk content.
     * @param {!HunkResolutionAction} action The resolution action.
     * @return {!Promise<void>} A promise that resolves when the resolution is persisted.
     */
    recordResolution(hunkContext, hunkHash, action) {
        /** @type {!ResolvedHunksStorage} */
        const storage = this.getStorage();
        /** @type {string} */
        const key = getHunkKey(hunkContext, hunkHash);
        storage[key] = { action, timestamp: Date.now() };
        // Periodic cleanup to enforce storage bounds without running on every insertion.
        this.resolutionCount++;
        if (this.resolutionCount >= 100) {
            this.resolutionCount = 0;
            this.cleanup().catch((/**
             * @param {?} e
             * @return {void}
             */
            (e) => {
                console.error('Failed to cleanup HunkStorage during recordResolution', e);
            }));
        }
        return this.persist();
    }
    /**
     * Forgets a hunk's resolution, e.g. after Ctrl+Z makes it pending again.
     * @public
     * @param {!HunkContext} hunkContext
     * @param {string} hunkHash
     * @return {!Promise<void>}
     */
    clearResolution(hunkContext, hunkHash) {
        delete this.getStorage()[getHunkKey(hunkContext, hunkHash)];
        return this.persist();
    }
    /**
     * Gets the recorded resolution for a hunk.
     * @public
     * @param {!HunkContext} hunkContext The context of the hunk.
     * @param {string} hunkHash The hash of the hunk content.
     * @return {(undefined|!HunkResolutionAction)} The recorded action or undefined if not found.
     */
    getResolution(hunkContext, hunkHash) {
        /** @type {!ResolvedHunksStorage} */
        const storage = this.getStorage();
        for (const key of getHunkKeyCandidates(hunkContext, hunkHash)) {
            /** @type {!HunkResolutionAction} */
            const action = storage[key]?.action;
            if (action !== undefined) {
                return action;
            }
        }
        return undefined;
    }
    /**
     * Checks whether any resolutions exist for a given hunk context (i.e., for a
     * specific file within a specific conversation turn). This can be used to
     * detect that the user has already interacted with these hunks, enabling
     * callers to skip destructive operations like DiffZone creation.
     *
     * @public
     * @param {!HunkContext} hunkContext The context to check (conversationId, turnIndex, fileUri).
     * @return {boolean} true if at least one resolution is stored for this context.
     */
    hasAnyResolutions(hunkContext) {
        /** @type {!ResolvedHunksStorage} */
        const storage = this.getStorage();
        /** @type {(undefined|string)} */
        const fileUri = hunkContext.fileUri;
        if (hunkContext.turnIndex != null) {
            /** @type {!Array<string>} */
            const prefixes = getSnapshotKeyCandidates(hunkContext).map((/**
             * @param {string} contextKey
             * @return {string}
             */
            (contextKey) => `${contextKey}_`));
            for (const key in storage) {
                if (Object.prototype.hasOwnProperty.call(storage, key) &&
                    prefixes.some((/**
                     * @param {string} prefix
                     * @return {boolean}
                     */
                    (prefix) => key.startsWith(prefix)))) {
                    return true;
                }
            }
            return false;
        }
        if (!fileUri) {
            return false;
        }
        // When turnIndex is undefined (e.g. navigation from the review sidebar),
        // check if any turn in the conversation has stored resolutions for the file.
        /** @type {(undefined|string)} */
        const conversationPrefix = hunkContext.conversationId
            ? `${hunkContext.conversationId}_`
            : undefined;
        /** @type {!Array<string>} */
        const fileSegments = getFileUriCandidates(fileUri).map((/**
         * @param {string} candidate
         * @return {string}
         */
        (candidate) => `_${candidate}_`));
        for (const key in storage) {
            if (Object.prototype.hasOwnProperty.call(storage, key)) {
                if (conversationPrefix && !key.startsWith(conversationPrefix)) {
                    continue;
                }
                if (fileSegments.some((/**
                 * @param {string} segment
                 * @return {boolean}
                 */
                (segment) => key.includes(segment)))) {
                    return true;
                }
            }
        }
        return false;
    }
    /**
     * Records a content snapshot for a conversation/turn/file context.
     * Called when a DiffZone is disposed without explicit user resolution
     * (e.g., on conversation switch) to track the file's content at that moment.
     *
     * @public
     * @param {!HunkContext} hunkContext The context (conversationId, turnIndex, fileUri).
     * @param {string} contentHash Hash of the file content at disposal time.
     * @return {!Promise<void>} A promise that resolves when the snapshot is persisted.
     */
    recordSnapshot(hunkContext, contentHash) {
        /** @type {!ContentSnapshotsStorage} */
        const storage = this.getSnapshotStorage();
        /** @type {string} */
        const key = getSnapshotKey(hunkContext);
        storage[key] = { contentHash, timestamp: Date.now() };
        return this.persistSnapshots();
    }
    /**
     * Gets the stored content hash for a conversation/turn/file context.
     *
     * @public
     * @param {!HunkContext} hunkContext The context to check.
     * @return {(undefined|string)} The content hash, or undefined if no snapshot exists.
     */
    getSnapshot(hunkContext) {
        /** @type {!ContentSnapshotsStorage} */
        const storage = this.getSnapshotStorage();
        for (const key of getSnapshotKeyCandidates(hunkContext)) {
            /** @type {string} */
            const contentHash = storage[key]?.contentHash;
            if (contentHash !== undefined) {
                return contentHash;
            }
        }
        return undefined;
    }
    /**
     * Clears the content snapshot for a conversation/turn/file context.
     *
     * @public
     * @param {!HunkContext} hunkContext The context to clear.
     * @return {!Promise<void>} A promise that resolves when persistence completes.
     */
    clearSnapshot(hunkContext) {
        /** @type {!ContentSnapshotsStorage} */
        const storage = this.getSnapshotStorage();
        for (const key of getSnapshotKeyCandidates(hunkContext)) {
            delete storage[key];
        }
        return this.persistSnapshots();
    }
    /**
     * Records the modified text an inline review was built with, for a
     * conversation/turn/file context.
     *
     * Only needed when it differs from the text the turn reports (e.g. a
     * formatter ran and the review used the file on disk instead): hunk
     * decisions are keyed by hashes of the reviewed hunks, so a later lookup
     * must diff the same text to find them.
     *
     * @public
     * @param {!HunkContext} hunkContext The context (conversationId, turnIndex, fileUri).
     * @param {string} contents The modified text the review was built with.
     * @return {!Promise<void>} A promise that resolves when the contents are persisted.
     */
    recordReviewedContents(hunkContext, contents) {
        /** @type {!ReviewedContentsStorage} */
        const storage = this.getReviewedContentsStorage();
        storage[getSnapshotKey(hunkContext)] = { contents, timestamp: Date.now() };
        return this.persistReviewedContents();
    }
    /**
     * Gets the modified text recorded by `recordReviewedContents`, if any.
     *
     * @public
     * @param {!HunkContext} hunkContext The context to check.
     * @return {(undefined|string)} The reviewed contents, or undefined if none were recorded.
     */
    getReviewedContents(hunkContext) {
        /** @type {!ReviewedContentsStorage} */
        const storage = this.getReviewedContentsStorage();
        for (const key of getSnapshotKeyCandidates(hunkContext)) {
            /** @type {string} */
            const contents = storage[key]?.contents;
            if (contents !== undefined) {
                return contents;
            }
        }
        return undefined;
    }
    /**
     * Computes a hash of content for snapshot comparison.
     *
     * @public
     * @param {string} content The normalized content to hash.
     * @return {string} The hash string.
     */
    computeContentHash(content) {
        return (0, hash_1.hash)(content).toString(36);
    }
    /**
     * Generates a unique key for a hunk based on its context and hash.
     * @public
     * @param {!HunkContext} hunkContext The context of the hunk.
     * @param {string} hunkHash The hash of the hunk content.
     * @return {string} The unique key string.
     */
    getHunkKey(hunkContext, hunkHash) {
        return getHunkKey(hunkContext, hunkHash);
    }
    /**
     * Computes a hash for a hunk based on its insertions, deletions, and surrounding context.
     * @public
     * @param {!ReadonlyArray<string>} insertions The inserted lines.
     * @param {!ReadonlyArray<string>} deletions The deleted lines.
     * @param {(undefined|string)=} context Optional surrounding context to disambiguate identical hunks.
     * @return {string} The computed hash string.
     */
    computeHash(insertions, deletions, context) {
        return computeHunkHash(insertions, deletions, context);
    }
    /**
     * Clears all stored hunk resolutions.
     * @public
     * @return {!Promise<void>}
     */
    async clear() {
        this.storage = {};
        await this.context.workspaceState.update(exports.RESOLVED_HUNKS_KEY, undefined);
    }
    /**
     * @private
     * @return {!Promise<void>}
     */
    async cleanup() {
        /** @type {!ResolvedHunksStorage} */
        const storage = this.getStorage();
        /** @type {number} */
        const now = Date.now();
        /** @type {boolean} */
        let changed = false;
        // 1. TTL Cleanup
        for (const key in storage) {
            if (Object.prototype.hasOwnProperty.call(storage, key)) {
                if (now - storage[key].timestamp > TTL_MS) {
                    delete storage[key];
                    changed = true;
                }
            }
        }
        // 2. Size Bound Cleanup
        /** @type {!Array<!Array<?>>} */
        const entries = Object.entries(storage);
        if (entries.length > MAX_ENTRIES) {
            // Sort by timestamp ascending (oldest first)
            entries.sort((/**
             * @param {!Array<?>} a
             * @param {!Array<?>} b
             * @return {number}
             */
            (a, b) => a[1].timestamp - b[1].timestamp));
            /** @type {number} */
            const toDelete = entries.length - MAX_ENTRIES;
            for (let i = 0; i < toDelete; i++) {
                delete storage[entries[i][0]];
            }
            changed = true;
        }
        if (changed) {
            await this.persist();
        }
        // 3. Content Snapshot Cleanup
        /** @type {!ContentSnapshotsStorage} */
        const snapshots = this.getSnapshotStorage();
        /** @type {boolean} */
        let snapshotsChanged = false;
        for (const key in snapshots) {
            if (Object.prototype.hasOwnProperty.call(snapshots, key)) {
                if (now - snapshots[key].timestamp > TTL_MS) {
                    delete snapshots[key];
                    snapshotsChanged = true;
                }
            }
        }
        /** @type {!Array<!Array<?>>} */
        const snapshotEntries = Object.entries(snapshots);
        if (snapshotEntries.length > MAX_SNAPSHOT_ENTRIES) {
            snapshotEntries.sort((/**
             * @param {!Array<?>} a
             * @param {!Array<?>} b
             * @return {number}
             */
            (a, b) => a[1].timestamp - b[1].timestamp));
            /** @type {number} */
            const toDelete = snapshotEntries.length - MAX_SNAPSHOT_ENTRIES;
            for (let i = 0; i < toDelete; i++) {
                delete snapshots[snapshotEntries[i][0]];
            }
            snapshotsChanged = true;
        }
        if (snapshotsChanged) {
            await this.persistSnapshots();
        }
        // 4. Reviewed Contents Cleanup
        /** @type {!ReviewedContentsStorage} */
        const reviewed = this.getReviewedContentsStorage();
        /** @type {boolean} */
        let reviewedChanged = false;
        for (const key in reviewed) {
            if (Object.prototype.hasOwnProperty.call(reviewed, key)) {
                if (now - reviewed[key].timestamp > TTL_MS) {
                    delete reviewed[key];
                    reviewedChanged = true;
                }
            }
        }
        /** @type {!Array<!Array<?>>} */
        const reviewedEntries = Object.entries(reviewed);
        if (reviewedEntries.length > MAX_REVIEWED_CONTENTS_ENTRIES) {
            reviewedEntries.sort((/**
             * @param {!Array<?>} a
             * @param {!Array<?>} b
             * @return {number}
             */
            (a, b) => a[1].timestamp - b[1].timestamp));
            /** @type {number} */
            const toDelete = reviewedEntries.length - MAX_REVIEWED_CONTENTS_ENTRIES;
            for (let i = 0; i < toDelete; i++) {
                delete reviewed[reviewedEntries[i][0]];
            }
            reviewedChanged = true;
        }
        if (reviewedChanged) {
            await this.persistReviewedContents();
        }
    }
    /**
     * @private
     * @return {void}
     */
    loadSnapshotStorage() {
        try {
            this.snapshotStorage =
                this.context.workspaceState.get(exports.CONTENT_SNAPSHOTS_KEY, {});
        }
        catch (e) {
            console.error('Failed to load content snapshots storage', e);
            this.snapshotStorage = {};
        }
    }
    /**
     * @private
     * @return {!ContentSnapshotsStorage}
     */
    getSnapshotStorage() {
        if (!this.snapshotStorage) {
            this.loadSnapshotStorage();
        }
        return (/** @type {!ContentSnapshotsStorage} */ (this.snapshotStorage));
    }
    /**
     * @private
     * @return {!ReviewedContentsStorage}
     */
    getReviewedContentsStorage() {
        if (!this.reviewedContentsStorage) {
            try {
                this.reviewedContentsStorage =
                    this.context.workspaceState.get(exports.REVIEWED_CONTENTS_KEY, {});
            }
            catch (e) {
                console.error('Failed to load reviewed contents storage', e);
                this.reviewedContentsStorage = {};
            }
        }
        return this.reviewedContentsStorage;
    }
    /**
     * @private
     * @return {!Promise<void>}
     */
    async persistReviewedContents() {
        await this.context.workspaceState.update(exports.REVIEWED_CONTENTS_KEY, this.getReviewedContentsStorage());
    }
    /**
     * @private
     * @return {!Promise<void>}
     */
    async persistSnapshots() {
        await this.context.workspaceState.update(exports.CONTENT_SNAPSHOTS_KEY, this.getSnapshotStorage());
    }
}
exports.HunkStorage = HunkStorage;
/* istanbul ignore if */
if (false) {
    /**
     * @type {(undefined|!ResolvedHunksStorage)}
     * @private
     */
    HunkStorage.prototype.storage;
    /**
     * @type {(undefined|!ContentSnapshotsStorage)}
     * @private
     */
    HunkStorage.prototype.snapshotStorage;
    /**
     * @type {(undefined|!ReviewedContentsStorage)}
     * @private
     */
    HunkStorage.prototype.reviewedContentsStorage;
    /**
     * @type {!Promise<void>}
     * @private
     */
    HunkStorage.prototype.savePromise;
    /**
     * @type {boolean}
     * @private
     */
    HunkStorage.prototype.pendingSave;
    /**
     * @type {number}
     * @private
     */
    HunkStorage.prototype.resolutionCount;
    /**
     * @const {!tsickle_vscode_2.ExtensionContext}
     * @private
     */
    HunkStorage.prototype.context;
}
