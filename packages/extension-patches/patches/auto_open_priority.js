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

const TARGET_1 = `this.isAutoOpenEnabled()&&
a.skipOpen!==!0?d(await c(this.revealDocument(k,!1))):a.strictNav===!0&&a.skipOpen!==!0?d(await c(this.revealDocument(k,a.keepOpen!==!0))):this.openSideBySideDiffs&&this.renderer.type==="sideBySide"&&a.skipOpen!==!0&&d(await c(this.revealDocument(k,!0)));`;

const REPLACEMENT_1 = `this.isAutoOpenEnabled()?d(await c(this.revealDocument(k,!1))):a.strictNav===!0&&a.skipOpen!==!0?d(await c(this.revealDocument(k,a.keepOpen!==!0))):this.openSideBySideDiffs&&this.renderer.type==="sideBySide"&&a.skipOpen!==!0&&d(await c(this.revealDocument(k,!0)));`;

const TARGET_2 = `getOpenOptions(a,b=!1,c=!1){if(a===!0)return{shouldOpen:!1,preview:!0};a=this.isAutoOpenEnabled();return b?{shouldOpen:!0,preview:!c}:a?{shouldOpen:!0,
preview:!1}:{shouldOpen:!1,preview:!0}}`;

const REPLACEMENT_2 = `getOpenOptions(a,b=!1,c=!1){const d=this.isAutoOpenEnabled();if(d)return{shouldOpen:!0,preview:!1};if(b)return{shouldOpen:!0,preview:!c};if(a===!0)return{shouldOpen:!1,preview:!0};return{shouldOpen:!1,preview:!0}}`;

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
