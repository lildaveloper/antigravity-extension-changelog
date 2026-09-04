/**
 * @fileoverview Provides the cider module for extensions.
 * During compilation and build of extension bundle,
 * this shim defines cider module for the Closure compiler.
 *
 * On the runtime, require() function is defined by VSCode extension host code,
 * and will provision the actual implementation of the Cider API.
 */
goog.module('google3.devtools.cider.extensions.cider');

// We need to export it this way because in the extension code
// only the text in the form 'import * as name from ...' is translated into
// require function, which we define in VSCode extension host,
// but also this modifies TypeScript calls like 'name.module'
// into javascript calls 'name.name.module',
// so the shim provides expected structure.
//
// We load it lazily so that when running with standalone VS Code, we have the
// oportunity to stub the cider API before it is first used.
let lazyCider = undefined;
exports = {
  get cider() {
    if (!lazyCider) {
      lazyCider = (()=>{throw Object.assign(new Error("Package \"cider\" not in deps"),{code:'MODULE_NOT_FOUND'});})();
    }
    return lazyCider;
  }
};
