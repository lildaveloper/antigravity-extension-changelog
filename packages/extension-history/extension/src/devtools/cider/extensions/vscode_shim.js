/**
 * @fileoverview Provides the vscode module for extensions.
 * During compilation and build of extension bundle,
 * this shim defines vscode module for the Closure compiler.
 *
 * On the runtime, require() function is defined by VSCode extension host code,
 * and will provision the actual implementation of the vscode API.
 */
goog.module('vscode');

exports =        $_req_$0();
