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
 * Generated from: third_party/cloudcode/vscode/common/packages/metrics/install_session_id.ts
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
goog.module('google3.third_party.cloudcode.vscode.common.packages.metrics.install_session_id');
var module = module || { id: 'third_party/cloudcode/vscode/common/packages/metrics/install_session_id.closure.js' };
goog.require('google3.third_party.javascript.tslib.tslib');
const tsickle_fs_extra_1 = goog.requireType("google3.third_party.javascript.typings.fs_extra.index");
const tsickle_path_2 = goog.requireType("google3.third_party.javascript.typings.node.node.path");
const tsickle_uuid_3 = goog.requireType("google3.third_party.javascript.typings.uuid.index");
const tsickle_utils_4 = goog.requireType("google3.third_party.cloudcode.vscode.common.packages.metrics.utils");
const tsickle_file_utils_5 = goog.requireType("google3.third_party.cloudcode.vscode.common.packages.utils.file_utils");
const fse = goog.require('google3.third_party.javascript.typings.fs_extra.index');
const path_1 = goog.require('google3.third_party.javascript.typings.node.node.path');
const uuid = goog.require('google3.third_party.javascript.typings.uuid.index');
const utils_1 = goog.require('google3.third_party.cloudcode.vscode.common.packages.metrics.utils');
const file_utils_1 = goog.require('google3.third_party.cloudcode.vscode.common.packages.utils.file_utils');
/**
 * Encapsulates Install and Session IDs. When resetting, we want to make sure
 * that we update both atomically so that it's impossible to relate two Install
 * IDs using a Session ID and vice-versa.
 *
 * Visible for testing.
 */
class InstallSessionId {
    /**
     * @public
     * @param {!tsickle_file_utils_5.FileUtils=} fileUtils
     * @param {?=} fs
     */
    constructor(fileUtils = new file_utils_1.FileUtils(), fs = fse) {
        this.fileUtils = fileUtils;
        this.fs = fs;
        this.installId = '';
        this.sessionId = '';
        this.errText = '';
    }
    /**
     * @public
     * @return {!Promise<!Array<?>>}
     */
    async get() {
        if (this.installId) {
            return [this.installId, this.sessionId];
        }
        try {
            /** @type {string} */
            const fname = await (0, utils_1.defaultInstallIdFile)(this.fileUtils);
            for (let i = 0; i < 10; i++) {
                try {
                    this.installId = await this.fs.readFile(fname, { encoding: 'utf8' }).then((/**
                     * @param {string} s
                     * @return {string}
                     */
                    s => s.trim()));
                    this.sessionId = uuid.v4();
                    if (!this.installId) {
                        this.errText = 'empty_file';
                    }
                    return [this.installId, this.sessionId];
                }
                catch (err) {
                    if ((0, utils_1.getErrorCode)(err) !== 'ENOENT') {
                        throw err;
                    }
                }
                // The file hasn't been created yet. Create one in a temporary location
                // so we can atomically drop it in.
                await this.fs.mkdirp((0, path_1.dirname)(fname));
                /** @type {string} */
                const candidateInstall = uuid.v4();
                /** @type {string} */
                const tmpFile = `${fname}.${candidateInstall}.deleteme`;
                await this.fs.writeFile(tmpFile, candidateInstall, { encoding: 'utf8' });
                try {
                    await this.fs.link(tmpFile, fname);
                }
                catch (err) {
                    if ((0, utils_1.getErrorCode)(err) !== 'EEXIST') {
                        throw err;
                    }
                }
                finally {
                    await this.fs.unlink(tmpFile);
                }
            }
            // Eventually give up. If we messed up some retry logic here we don't want
            // to spin forever.
            this.errText = 'out_of_retries';
            return ['', ''];
        }
        catch (err) {
            // If there is an error, just report empty ID. No need to fail because of
            // this. We'll just try again next time.
            this.errText = `${(0, utils_1.getSysCall)(err)}/${(0, utils_1.getErrorCode)(err)}`;
            return ['', ''];
        }
    }
    /**
     * @public
     * @return {!Promise<void>}
     */
    async reset() {
        this.installId = '';
        this.sessionId = '';
        /** @type {string} */
        const fname = await (0, utils_1.defaultInstallIdFile)(this.fileUtils);
        try {
            // NOTE(pongad): We use unlinkSync so that reset() is atomic.
            // If we use the async form of unlink, it's possible that get() would be
            // called and read old content back into 'install' before we can remove.
            this.fs.unlinkSync(fname);
        }
        catch (err) {
            if ((0, utils_1.getErrorCode)(err) !== 'ENOENT') {
                throw err;
            }
        }
    }
}
exports.InstallSessionId = InstallSessionId;
/* istanbul ignore if */
if (false) {
    /**
     * @type {string}
     * @private
     */
    InstallSessionId.prototype.installId;
    /**
     * @type {string}
     * @private
     */
    InstallSessionId.prototype.sessionId;
    /**
     * @type {string}
     * @public
     */
    InstallSessionId.prototype.errText;
    /**
     * @const {!tsickle_file_utils_5.FileUtils}
     * @private
     */
    InstallSessionId.prototype.fileUtils;
    /**
     * @const {?}
     * @private
     */
    InstallSessionId.prototype.fs;
}
