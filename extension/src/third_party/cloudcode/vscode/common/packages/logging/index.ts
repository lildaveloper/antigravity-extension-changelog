/**
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @fileoverview added by tsickle
 * Generated from: third_party/cloudcode/vscode/common/packages/logging/index.ts
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
goog.module('google3.third_party.cloudcode.vscode.common.packages.logging.index');
var module = module || { id: 'third_party/cloudcode/vscode/common/packages/logging/index.closure.js' };
goog.require('google3.third_party.javascript.tslib.tslib');
const tsickle_logger_1 = goog.requireType("google3.third_party.cloudcode.vscode.common.packages.logging.logger");
const tsickle_output_logger_2 = goog.requireType("google3.third_party.cloudcode.vscode.common.packages.logging.output_logger");
/**
 * @fileoverview Exports for the logger
 */
const logger_1 = goog.require('google3.third_party.cloudcode.vscode.common.packages.logging.logger');
exports.error = logger_1.error;
exports.warn = logger_1.warn;
exports.info = logger_1.info;
exports.trace = logger_1.trace;
exports.debug = logger_1.debug;
exports.Logger = logger_1.Logger;
const output_logger_1 = goog.require('google3.third_party.cloudcode.vscode.common.packages.logging.output_logger');
exports.createOutputChannel = output_logger_1.createOutputChannel;
exports.combineOutput = output_logger_1.combineOutput;
exports.OutputChannelLogger = output_logger_1.OutputChannelLogger;
exports.LogOutputChannelLogger = output_logger_1.LogOutputChannelLogger;
/** @typedef {!tsickle_output_logger_2.LoggerMethods} */
exports.LoggerMethods; // re-export typedef
