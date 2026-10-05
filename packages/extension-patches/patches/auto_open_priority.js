/**
 * Patch: Prioritize autoOpenFiles over skipOpen
 * ID: auto_open_priority
 *
 * Fixes the issue where antigravity.autoOpenFiles is ignored because agent events
 * pass skipOpen: true, causing modified files to remain hidden in the background.
 */

const ID = 'auto_open_priority';
const NAME = 'Prioritize autoOpenFiles over skipOpen';
const DESCRIPTION = 'Ensures files automatically open when modified if antigravity.autoOpenFiles is true.';

const TARGET_1 = `                /** @type {boolean} */
                const autoOpenAll = this.isAutoOpenEnabled();
                if (autoOpenAll && message.skipOpen !== true) {
                    await this.revealDocument(normalizedUri, false);
                }`;

const REPLACEMENT_1 = `                const { shouldOpen, preview } = this.getOpenOptions(message.skipOpen, message.strictNav, message.keepOpen);
                if (shouldOpen) {
                    await this.revealDocument(normalizedUri, preview);
                }`;

const TARGET_2 = `    getOpenOptions(skipOpen, strictNav = false, keepOpen = false) {
        if (skipOpen === true) {
            return { shouldOpen: false, preview: true };
        }
        /** @type {boolean} */
        const autoOpenAll = this.isAutoOpenEnabled();
        if (strictNav) {
            return { shouldOpen: true, preview: !keepOpen };
        }
        if (autoOpenAll) {
            return { shouldOpen: true, preview: false };
        }
        return { shouldOpen: false, preview: true };
    }`;

const REPLACEMENT_2 = `    getOpenOptions(skipOpen, strictNav = false, keepOpen = false) {
        /** @type {boolean} */
        const autoOpenAll = this.isAutoOpenEnabled();
        if (autoOpenAll) {
            return { shouldOpen: true, preview: false };
        }
        if (strictNav) {
            return { shouldOpen: true, preview: !keepOpen };
        }
        if (skipOpen === true) {
            return { shouldOpen: false, preview: true };
        }
        return { shouldOpen: false, preview: true };
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
