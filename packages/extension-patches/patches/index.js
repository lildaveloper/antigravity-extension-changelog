const autoOpenPriority = require('./auto_open_priority');

// Registry of active patches in order of execution
const ALL_PATCHES = [
  autoOpenPriority,
];

/**
 * Resolves a patch module by its unique ID.
 * @param {string} patchId
 * @return {object|null}
 */
function getPatchById(patchId) {
  return ALL_PATCHES.find((p) => p.ID === patchId) || null;
}

module.exports = {
  ALL_PATCHES,
  getPatchById,
};
