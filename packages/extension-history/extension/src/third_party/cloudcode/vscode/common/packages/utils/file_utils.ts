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
 * Generated from: third_party/cloudcode/vscode/common/packages/utils/file_utils.ts
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
goog.module('google3.third_party.cloudcode.vscode.common.packages.utils.file_utils');
var module = module || { id: 'third_party/cloudcode/vscode/common/packages/utils/file_utils.closure.js' };
goog.require('google3.third_party.javascript.tslib.tslib');
const tsickle_fs_extra_1 = goog.requireType("google3.third_party.javascript.typings.fs_extra.index");
const tsickle_jszip_2 = goog.requireType("google3.third_party.javascript.typings.jszip.index");
const tsickle_lodash_3 = goog.requireType("google3.third_party.javascript.typings.lodash.index");
const tsickle_node_fetch_4 = goog.requireType("google3.third_party.javascript.typings.node_fetch.index");
const tsickle_os_5 = goog.requireType("google3.third_party.javascript.typings.node.node.os");
const tsickle_path_6 = goog.requireType("google3.third_party.javascript.typings.node.node.path");
const tsickle_process_7 = goog.requireType("google3.third_party.javascript.typings.node.node.process");
const tsickle_util_8 = goog.requireType("google3.third_party.javascript.typings.node.node.util");
const tsickle_logger_9 = goog.requireType("google3.third_party.cloudcode.vscode.common.packages.logging.logger");
const fs = goog.require('google3.third_party.javascript.typings.fs_extra.index');
const jszip = goog.require('google3.third_party.javascript.typings.jszip.index');
const lodash_1 = goog.require('google3.third_party.javascript.typings.lodash.index');
const node_fetch_1 = goog.require('google3.third_party.javascript.typings.node_fetch.index');
const os = goog.require('google3.third_party.javascript.typings.node.node.os');
const path = goog.require('google3.third_party.javascript.typings.node.node.path');
const path_1 = path;
const process = goog.require('google3.third_party.javascript.typings.node.node.process');
const util_1 = goog.require('google3.third_party.javascript.typings.node.node.util');
const logger_1 = goog.require('google3.third_party.cloudcode.vscode.common.packages.logging.logger');
/** @type {string} */
exports.CLOUDCODE_DIRNAME = 'cloud-code';
/** @type {string} */
const GOOGLE_VSCODE_EXTENSIONS_DIRNAME = 'google-vscode-extension';
/**
 * The key used for the lockfile during binary installation
 * @type {string}
 */
exports.CLOUDCODE_BINARY_FROM_ZIP_LOCK = 'CLOUDCODE_BINARY_FROM_ZIP_LOCK';
/** @enum {string} */
const AppDataSubFolders = {
    INSTALLER: "installer",
    TEMPLATE: "custom-templates",
    EKSCTL: "eksctl",
    CLOUDCODE_LS_BINARIES: "cloudcode_cli",
    GEMINI_LS_BINARIES: "gemini_cli",
    AUTH: "auth",
    API_METADATA: "api-metadata",
};
exports.AppDataSubFolders = AppDataSubFolders;
/**
 * @record
 */
function FileUtilsContext() { }
exports.FileUtilsContext = FileUtilsContext;
/* istanbul ignore if */
if (false) {
    /**
     * @type {string}
     * @public
     */
    FileUtilsContext.prototype.DIRNAME;
    /**
     * @type {string}
     * @public
     */
    FileUtilsContext.prototype.BINARY_FROM_ZIP_LOCK;
    /**
     * @type {!AppDataSubFolders}
     * @public
     */
    FileUtilsContext.prototype.LS_BINARIES;
}
/** @type {number} */
exports.bytesPerMB = 1024 * 1024;
/** @type {string} */
exports.CHILD_NOT_FOUND_ERROR_FORMAT = '%s not found within %s! %s';
class FileUtils {
    /**
     * @public
     * @param {!FileUtilsContext=} context
     * @param {?=} fsModule : instance of fs package
     * @param {?=} processModule
     * @param {?=} osModule
     * @param {function((string|!tsickle_node_fetch_4.Request|!URLLike), (undefined|!tsickle_node_fetch_4.RequestInit)=): !Promise<!tsickle_node_fetch_4.Response>=} fetchModule
     */
    constructor(context = {
        DIRNAME: exports.CLOUDCODE_DIRNAME,
        BINARY_FROM_ZIP_LOCK: exports.CLOUDCODE_BINARY_FROM_ZIP_LOCK,
        LS_BINARIES: AppDataSubFolders.CLOUDCODE_LS_BINARIES,
    }, fsModule = fs, processModule = process, osModule = os, fetchModule = node_fetch_1.default) {
        this.context = context;
        this.fsModule = fsModule;
        this.processModule = processModule;
        this.osModule = osModule;
        this.fetchModule = fetchModule;
    }
    /**
     * platform refers to a binaries subpath on the currently running platform
     *
     * Follows Go-style platform naming
     * @protected
     * @return {string}
     */
    get platform() {
        if (this.processModule.platform === 'win32') {
            return 'windows_amd64';
        }
        if (this.processModule.platform === 'darwin') {
            return this.osModule.arch() === 'arm64' ? 'darwin_arm64' : 'darwin_amd64';
        }
        return this.osModule.arch() === 'arm64' ? 'linux_arm64' : 'linux_amd64';
    }
    /**
     * @public
     * @param {string} zipFilePath
     * @param {string} destDir
     * @param {?=} zip
     * @return {!Promise<void>}
     */
    async extractZipFile(zipFilePath, destDir, zip = new jszip()) {
        const zipBuf = await this.readFileBuffer(zipFilePath);
        // Cast the Node.js Buffer to Uint8Array to satisfy JSZip's InputFileFormat
        await zip.loadAsync((/** @type {!Uint8Array} */ (zipBuf)));
        /** @type {!Array<!Promise<string>>} */
        const filePromises = [];
        for (const [pathInZip__tsickle_destructured_1, fileInZip__tsickle_destructured_2] of (/** @type {!Array<!Array<?>>} */ (Object.entries(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        zip.files)))) {
            const pathInZip = /** @type {string} */ (pathInZip__tsickle_destructured_1);
            const fileInZip = /** @type {?} */ (fileInZip__tsickle_destructured_2);
            /** @type {string} */
            const outputPath = path.join(destDir, pathInZip);
            if (fileInZip.dir) {
                await this.ensureDir(outputPath);
                continue;
            }
            // Create an array of promises for all files for faster extraction
            // (especially Windows)
            await this.ensureDir(path.dirname(outputPath));
            filePromises.push(new Promise((/**
             * @param {function((string|!PromiseLike<string>)): void} resolve
             * @param {function(?=): void} reject
             * @return {void}
             */
            (resolve, reject) => {
                /** @type {(undefined|number)} */
                const mode = (this.platform === 'windows_amd64' ? fileInZip.dosPermissions : Number(fileInZip.unixPermissions)) || undefined;
                zip.files[pathInZip]
                    .nodeStream()
                    .pipe(this.fsModule.createWriteStream(outputPath, { mode }))
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    .on('error', (/**
                 * @param {?} e
                 * @return {void}
                 */
                (e) => reject(e)))
                    .on('close', (/**
                 * @return {void}
                 */
                () => resolve(outputPath)));
            })));
        }
        await Promise.all(filePromises);
    }
    /**
     * @public
     * @param {string} zipFilePath
     * @param {string} destDir
     * @param {string} zipSubPath
     * @param {?=} zip
     * @return {!Promise<void>}
     */
    async extractFileInZip(zipFilePath, destDir, zipSubPath, zip = new jszip()) {
        const zipBuf = await this.readFileBuffer(zipFilePath);
        // Cast the Node.js Buffer to Uint8Array to satisfy JSZip's InputFileFormat
        await zip.loadAsync((/** @type {!Uint8Array} */ (zipBuf)));
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        /** @type {?} */
        const fileInZip = await zip.file(zipSubPath);
        if (!fileInZip) {
            throw new Error(`Could not extract ${zipSubPath} from ${zipFilePath}).`);
        }
        /** @type {string} */
        const destFile = path.join(destDir, path.basename(fileInZip.name));
        /** @type {(undefined|number)} */
        const mode = (this.platform === 'windows_amd64' ? fileInZip.dosPermissions : Number(fileInZip.unixPermissions)) || undefined;
        await new Promise((/**
         * @param {function((string|!PromiseLike<string>)): void} resolve
         * @param {function(?=): void} reject
         * @return {void}
         */
        (resolve, reject) => {
            fileInZip.nodeStream()
                .pipe(this.fsModule.createWriteStream(destFile, { mode }))
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                .on('error', (/**
             * @param {?} e
             * @return {void}
             */
            (e) => reject(e)))
                .on('close', (/**
             * @return {void}
             */
            () => resolve(destFile)));
        }));
    }
    /**
     * @public
     * @param {string} path
     * @return {!Promise<!Date>}
     */
    async ctime(path) {
        const stats = await this.getFileStats(path);
        return stats.ctime;
    }
    /**
     * @public
     * @param {string} path
     * @return {!Promise<boolean>}
     */
    exists(path) {
        return this.fsModule.pathExists(path);
    }
    /**
     * Returns true if path exists.
     * @public
     * @param {string} path
     * @return {boolean}
     */
    existsSync(path) {
        return this.fsModule.existsSync(path);
    }
    /**
     * Asserts that a child is present in a given directory path. Returns the
     * child or throws error if the child is not found.
     * @public
     * @param {string} directoryPath
     * @param {string} childName
     * @param {string=} message Optional message to append to error log
     * @return {!Promise<string>}
     */
    async assertDirectoryContainsChild(directoryPath, childName, message = '') {
        /** @type {!Array<string>} */
        const directoryChildren = await this.getDirectoryChildren(directoryPath);
        (0, logger_1.info)(`${directoryPath} contents: ${directoryChildren}`);
        if (directoryChildren.includes(childName)) {
            return path.join(directoryPath, childName);
        }
        else {
            throw new Error((0, util_1.format)(exports.CHILD_NOT_FOUND_ERROR_FORMAT, directoryPath, childName, message));
        }
    }
    /**
     * Performs chmod on path with mode mode.
     * @public
     * @param {string} path
     * @param {string} mode
     * @return {void}
     */
    chmod(path, mode) {
        if (this.processModule.platform !== 'win32') {
            this.fsModule.chmodSync(path, mode);
        }
    }
    /**
     * @public
     * @param {string} oldPath
     * @param {string} newPath
     * @return {!Promise<void>}
     */
    async rename(oldPath, newPath) {
        return this.fsModule.rename(oldPath, newPath);
    }
    /**
     * Returns the contents of a given file asynchronously.
     * @public
     * @param {string} path
     * @return {!Promise<string>}
     */
    async readFile(path) {
        return new Promise((/**
         * @param {function((string|!PromiseLike<string>)): void} resolve
         * @param {function(?=): void} reject
         * @return {void}
         */
        (resolve, reject) => {
            this.fsModule.readFile(path, (/**
             * @param {(null|?)} err
             * @param {?} data
             * @return {void}
             */
            (err, data) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(data.toString());
                }
            }));
        }));
    }
    /**
     * Returns the contents of a given file asynchronously.
     * @public
     * @param {string} path
     * @return {!Promise<?>}
     */
    async readFileBuffer(path) {
        return new Promise((/**
         * @param {function((?|!PromiseLike<?>)): void} resolve
         * @param {function(?=): void} reject
         * @return {void}
         */
        (resolve, reject) => {
            this.fsModule.readFile(path, (/**
             * @param {(null|?)} err
             * @param {?} data
             * @return {void}
             */
            (err, data) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(data);
                }
            }));
        }));
    }
    /**
     * @public
     * @param {string} path
     * @param {(string|!ArrayBuffer|?)} content
     * @return {!Promise<void>}
     */
    async writeFileBuffer(path, content) {
        /** @type {!DataView} */
        let data;
        if (typeof content === 'string') {
            /** @type {!TextEncoder} */
            const encoder = new TextEncoder();
            data = new DataView(encoder.encode(content).buffer);
        }
        else if (content instanceof ArrayBuffer) {
            data = new DataView(content);
        }
        else {
            data = new DataView(content.buffer);
        }
        return await this.fsModule.writeFile(path, data);
    }
    /**
     * Returns the contents of a given file asynchronously.
     * @public
     * @param {string} path
     * @return {string}
     */
    readFileSync(path) {
        return this.fsModule.readFileSync(path).toString();
    }
    /**
     * Returns the contents of a given file as an array of lines of text
     * @public
     * @param {string} path
     * @return {!Promise<!Array<string>>}
     */
    async readFileLines(path) {
        return this.readFile(path).then((/**
         * @param {string} contents
         * @return {!Array<string>}
         */
        (contents) => {
            return contents.split(os.EOL);
        }));
    }
    /**
     * Returns the contents of a given JSON file asynchronously.
     * @public
     * @template T
     * @param {string} path
     * @return {!Promise<!Array<T>>}
     */
    async readFileAsJson(path) {
        /** @type {!RegExp} */
        const stripForwardSlashComment = new RegExp('//(.*)', 'g');
        /** @type {!RegExp} */
        const stripForwardSlashStarComment = new RegExp('[/][*](.*)[*][/]', 'gm');
        if (fs.existsSync(path)) {
            /** @type {string} */
            let contents = fs.readFileSync(path, 'utf8');
            // Remove comments if present.
            contents = contents.replace(stripForwardSlashComment, '').replace(stripForwardSlashStarComment, '');
            try {
                return (/** @type {!Array<T>} */ (JSON.parse(contents)));
            }
            catch (err) {
                /** @type {string} */
                const msg = `failed to parse JSON file ${path}: ${err}`;
                (0, logger_1.error)(msg);
                throw new Error(msg);
            }
        }
        return [];
    }
    /**
     * Reads a directory synchronously.
     * @public
     * @param {string} path
     * @return {!Array<string>}
     */
    readDir(path) {
        return this.fsModule.readdirSync(path);
    }
    /**
     * Writes the contents to a given file asynchronously.
     * Uses an atomic write (temporary file + rename) to avoid race conditions
     * where concurrent readers (e.g. VS Code file watchers) cause in-place
     * overwrites to retain trailing un-truncated bytes from older, longer payloads.
     * See b/538115298#comment3.
     * @public
     * @param {string} filePath
     * @param {string} contents
     * @return {!Promise<void>}
     */
    async writeFile(filePath, contents) {
        // Write to a unique temporary file in the same directory, then atomically rename it to target path.
        // Creating the temp file in the target directory guarantees atomic rename on the same filesystem (preventing cross-device EXDEV errors).
        /** @type {string} */
        const tempPath = path.join(path.dirname(filePath), `${path.basename(filePath)}.${Date.now()}.${Math.random().toString(36).substring(2, 8)}.tmp`);
        await new Promise((/**
         * @param {function((void|!PromiseLike<void>)): void} resolve
         * @param {function(?=): void} reject
         * @return {void}
         */
        (resolve, reject) => {
            this.fsModule.writeFile(tempPath, contents, (/**
             * @param {(null|?)} err
             * @return {void}
             */
            (err) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve();
                }
            }));
        }));
        try {
            await this.fsModule.rename(tempPath, filePath);
        }
        catch (err) {
            // If atomic rename fails, clean up the temporary file so it isn't orphaned on disk.
            await this.fsModule.unlink(tempPath).catch((/**
             * @return {void}
             */
            () => { }));
            throw err;
        }
    }
    /**
     * Deletes a given file asynchronously.
     * @public
     * @param {string} path
     * @return {!Promise<void>}
     */
    async deleteFile(path) {
        return this.fsModule.unlink(path);
    }
    /**
     * @public
     * @param {string} src
     * @param {string} dst
     * @param {(undefined|!tsickle_fs_extra_1.MoveOptions)=} opt
     * @return {void}
     */
    moveSync(src, dst, opt) {
        this.fsModule.moveSync(src, dst, opt);
    }
    /**
     * @public
     * @param {string} srcFolder
     * @param {string} destinationFolder
     * @return {!Promise<void>}
     */
    async copy(srcFolder, destinationFolder) {
        return this.fsModule.copy(srcFolder, destinationFolder);
    }
    /**
     * @public
     * @param {string} path
     * @return {!Promise<void>}
     */
    async remove(path) {
        return this.fsModule.remove(path);
    }
    /**
     * Returns the extension folder in user app data folder.
     * @public
     * @param {(undefined|!AppDataSubFolders)=} subFolder
     * @param {boolean=} vscodeSubfolder whether to nest the subfolder inside a folder called
     *     'vscode'
     * @return {!Promise<string>}
     */
    async getExtensionAppDataFolder(subFolder, vscodeSubfolder = false) {
        /** @type {(undefined|!Array<?>)} */
        const envDir = this.getEnvironmentDirectory();
        /** @type {?} */
        let folderName;
        if (subFolder) {
            folderName = vscodeSubfolder ? (0, path_1.join)('vscode', subFolder) : subFolder;
        }
        if (envDir && this.processModule.env[envDir[0]]) {
            /** @type {!Array<string>} */
            const dirs = [(/** @type {string} */ (this.processModule.env[envDir[0]]))].concat(envDir[1]);
            /** @type {string} */
            const dir = (0, path_1.join)(...dirs);
            if (await this.exists(dir)) {
                return folderName ? (0, path_1.join)(dir, this.context.DIRNAME, folderName) : (0, path_1.join)(dir, this.context.DIRNAME);
            }
        }
        /** @type {(undefined|string)} */
        const home = this.processModule.env['HOME'];
        if (home) {
            return folderName ? (0, path_1.join)(home, '.cache', this.context.DIRNAME, folderName) : (0, path_1.join)(home, '.cache', this.context.DIRNAME);
        }
        return (0, path_1.join)(this.osModule.tmpdir(), `${this.context.DIRNAME}-${folderName || 'ROOT'}`);
    }
    /**
     * @public
     * @return {!Promise<string>}
     */
    async getExtensionAuthFolder() {
        /** @type {(undefined|!Array<?>)} */
        const envDir = this.getEnvironmentDirectory();
        /** @type {string} */
        const folderName = 'auth';
        if (envDir && this.processModule.env[envDir[0]]) {
            /** @type {!Array<string>} */
            const dirs = [(/** @type {string} */ (this.processModule.env[envDir[0]]))].concat(envDir[1]);
            /** @type {string} */
            const dir = (0, path_1.join)(...dirs);
            try {
                if (await this.exists(dir)) {
                    return (0, path_1.join)(dir, GOOGLE_VSCODE_EXTENSIONS_DIRNAME, folderName);
                }
            }
            catch {
                // Some access issue with this.exists triggered an error. We should
                // still return the directory so we can remove it and retry.
                (0, logger_1.warn)(`An issue was encountered while attempting to check existence of ${dir}`);
                return (0, path_1.join)(dir, GOOGLE_VSCODE_EXTENSIONS_DIRNAME, folderName);
            }
        }
        /** @type {(undefined|string)} */
        const home = this.processModule.env['HOME'];
        if (home) {
            return (0, path_1.join)(home, '.cache', GOOGLE_VSCODE_EXTENSIONS_DIRNAME, folderName);
        }
        return (0, path_1.join)(this.osModule.tmpdir(), `${GOOGLE_VSCODE_EXTENSIONS_DIRNAME}-${folderName}`);
    }
    /**
     * @public
     * @return {!Promise<string>}
     */
    async getExtensionAuthFolderOld() {
        return this.getExtensionAppDataFolder(AppDataSubFolders.AUTH, true);
    }
    /**
     * Downloads a file from the internet
     * @public
     * @param {string} url Download url
     * @param {string} fileDestination Destination file name
     * @param {(undefined|!Object<string,string>)=} headers
     * @return {!Promise<void>}
     */
    async downloadFile(url, fileDestination, headers) {
        /** @type {!tsickle_node_fetch_4.Response} */
        const response = await this.fetchModule(url, { headers });
        if (!response.ok) {
            throw new Error(`Failed to download ${url}`);
        }
        await new Promise((/**
         * @param {function((void|!PromiseLike<void>)): void} resolve
         * @param {function(?=): void} reject
         * @return {void}
         */
        (resolve, reject) => {
            const destination = this.fsModule.createWriteStream(fileDestination);
            if (response.body) {
                response.body.pipe(destination);
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                response.body.on('error', (/**
                 * @param {?} err
                 * @return {void}
                 */
                (err) => reject(err)));
            }
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            destination.on('error', (/**
             * @param {?} err
             * @return {void}
             */
            (err) => reject(err)));
            destination.on('close', (/**
             * @return {void}
             */
            () => resolve()));
        }));
    }
    /**
     * Returns the list of top level sub directories names in the given directory
     * @public
     * @param {string} directoryPath
     * @return {!Promise<!Array<string>>}
     */
    async getSubdirectoryNames(directoryPath) {
        /** @type {!Array<?>} */
        const result = [];
        /** @type {!Array<string>} */
        const children = await this.getDirectoryChildren(directoryPath);
        for (const child of children) {
            if (await this.isDirectory((0, path_1.join)(directoryPath, child))) {
                result.push(child);
            }
        }
        return result;
    }
    /**
     * Returns all the directory children
     * @public
     * @param {string} directoryPath
     * @return {!Promise<!Array<string>>}
     */
    async getDirectoryChildren(directoryPath) {
        return new Promise((/**
         * @param {function((!Array<string>|!PromiseLike<!Array<string>>)): void} resolve
         * @param {function(?=): void} reject
         * @return {void}
         */
        (resolve, reject) => {
            this.fsModule.readdir(directoryPath, (/**
             * @param {(null|?)} err
             * @param {!Array<string>} files
             * @return {void}
             */
            (err, files) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(files);
                }
            }));
        }));
    }
    /**
     * Returns all the files in the given directory and all it's subdirectories.
     * @public
     * @param {string} directoryPath
     * @return {!Promise<!Array<string>>}
     */
    async getAllFiles(directoryPath) {
        /** @type {!Array<string>} */
        let files = [];
        /** @type {!Array<string>} */
        const children = await this.getDirectoryChildren(directoryPath);
        for (const child of children) {
            if (await this.isDirectory((0, path_1.join)(directoryPath, child))) {
                /** @type {!Array<string>} */
                const childFiles = await this.getAllFiles((0, path_1.join)(directoryPath, child));
                files = files.concat(childFiles);
            }
            else {
                files.push((0, path_1.join)(directoryPath, child));
            }
        }
        return files;
    }
    /**
     * Returns true if the path is directory
     * @public
     * @param {string} path
     * @return {!Promise<boolean>}
     */
    async isDirectory(path) {
        return new Promise((/**
         * @param {function((boolean|!PromiseLike<boolean>)): void} resolve
         * @param {function(?=): void} reject
         * @return {void}
         */
        (resolve, reject) => {
            this.fsModule.lstat(path, (/**
             * @param {(null|?)} err
             * @param {?} stats
             * @return {void}
             */
            (err, stats) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(stats.isDirectory());
                }
            }));
        }));
    }
    /**
     * Returns true if the directory is empty
     * @public
     * @param {string} path
     * @return {!Promise<boolean>}
     */
    async isDirectoryEmpty(path) {
        return new Promise((/**
         * @param {function((boolean|!PromiseLike<boolean>)): void} resolve
         * @param {function(?=): void} reject
         * @return {void}
         */
        (resolve, reject) => {
            this.fsModule.readdir(path, (/**
             * @param {(null|?)} err
             * @param {!Array<string>} files
             * @return {void}
             */
            (err, files) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(!files || !files.length || files.length === 0);
                }
            }));
        }));
    }
    /**
     * Checks if the extension has access to the path passed.
     * @public
     * @param {string} path
     * @return {!Promise<boolean>}
     */
    hasAccess(path) {
        return new Promise((/**
         * @param {function((boolean|!PromiseLike<boolean>)): void} resolve
         * @return {void}
         */
        (resolve) => {
            this.fsModule.access(path, this.fsModule.constants.R_OK, (/**
             * @param {(null|?)} err
             * @return {void}
             */
            (err) => {
                resolve(err ? false : true);
            }));
        }));
    }
    /**
     * Creates directory
     * @public
     * @param {string} dir
     * @return {!Promise<void>}
     */
    async createDirectory(dir) {
        return this.fsModule.mkdirp(dir);
    }
    /**
     * @public
     * @param {string} prefix
     * @return {!Promise<string>}
     */
    async temporaryDirectory(prefix) {
        return this.fsModule.mkdtemp(prefix);
    }
    /**
     * Ensures that the directory exists. If the directory structure does not
     * exist, it is created.
     * @public
     * @param {string} dir
     * @return {!Promise<void>}
     */
    async ensureDir(dir) {
        return this.fsModule.ensureDir(dir);
    }
    /**
     * Returns `baseDirectory` and `newDirectory` joined, with a number appended
     * if there are already directories in the base of the name `newDirectory`.
     * @public
     * @param {string} baseDirectory Where `newDirectory` will be placed.
     * @param {string} newDirectory The desired name of the new directory.
     * @return {!Promise<string>}
     */
    async getDeDupedNewDirectoryName(baseDirectory, newDirectory) {
        /** @type {string} */
        let appDirSuggestion = (0, path_1.join)(baseDirectory, (0, lodash_1.kebabCase)(newDirectory + '-' + 1));
        if (!(await this.exists(baseDirectory))) {
            return appDirSuggestion;
        }
        /** @type {!Array<string>} */
        const subDirs = (await this.getSubdirectoryNames(baseDirectory)).map((/**
         * @param {string} name
         * @return {string}
         */
        name => name.toLowerCase()));
        for (let i = 1; i <= subDirs.length + 1; i++) {
            /** @type {string} */
            const appDirName = newDirectory + '-' + i;
            appDirSuggestion = (0, path_1.join)(baseDirectory, (0, lodash_1.kebabCase)(appDirName));
            if (subDirs.indexOf(appDirName.toLowerCase()) === -1) {
                return appDirSuggestion;
            }
        }
        return '';
    }
    /**
     * Checks if a given file path is included within a given directory path.
     * @public
     * @param {string} filePath The absolute or relative path to the file.
     * @param {string} directoryPath The absolute or relative path to the directory.
     * @return {boolean} A promise that resolves to true if the file is inside the directory, false otherwise.
     */
    static fileIsIncludedIntoDirectory(filePath, directoryPath) {
        /** @type {string} */
        const relativePath = path.relative(directoryPath, filePath);
        return !relativePath.startsWith('..') && !path.isAbsolute(relativePath);
    }
    /**
     * Returns stats of file located at path.
     * @public
     * @param {string} path
     * @return {!Promise<?>}
     */
    getFileStats(path) {
        return this.fsModule.stat(path);
    }
    /**
     * Returns the disk usage of the given path in Megabytes.
     * @public
     * @param {string} path
     * @return {!Promise<number>}
     */
    async getDiskUsage(path) {
        /** @type {boolean} */
        const isDir = await this.isDirectory(path);
        if (isDir) {
            /** @type {!Array<string>} */
            const childPaths = await this.getDirectoryChildren(path);
            /** @type {!Array<number>} */
            const sizes = await Promise.all(childPaths.map((/**
             * @param {string} childPath
             * @return {!Promise<number>}
             */
            async (childPath) => this.getDiskUsage((0, path_1.join)(path, childPath)))));
            return sizes.reduce((/**
             * @param {number} a
             * @param {number} b
             * @return {number}
             */
            (a, b) => a + b), 0);
        }
        else {
            return (await this.getFileStats(path)).size / exports.bytesPerMB;
        }
    }
    /**
     * Returns environment directory path [envirment, [base path]] where
     * application data is stored based on operating system.
     * @private
     * @return {(undefined|!Array<?>)}
     */
    getEnvironmentDirectory() {
        /** @type {(undefined|!Array<?>)} */
        let envDir = undefined;
        switch (this.processModule.platform) {
            case 'linux':
                envDir = undefined;
                break;
            case 'win32':
                envDir = ['LOCALAPPDATA', []];
                break;
            case 'darwin':
                envDir = ['HOME', ['Library', 'Application Support']];
                break;
            default:
        }
        return envDir;
    }
}
exports.FileUtils = FileUtils;
/* istanbul ignore if */
if (false) {
    /**
     * @type {!FileUtilsContext}
     * @protected
     */
    FileUtils.prototype.context;
    /**
     * @const {?}
     * @protected
     */
    FileUtils.prototype.fsModule;
    /**
     * @const {?}
     * @protected
     */
    FileUtils.prototype.processModule;
    /**
     * @const {?}
     * @private
     */
    FileUtils.prototype.osModule;
    /**
     * @const {function((string|!tsickle_node_fetch_4.Request|!URLLike), (undefined|!tsickle_node_fetch_4.RequestInit)=): !Promise<!tsickle_node_fetch_4.Response>}
     * @private
     */
    FileUtils.prototype.fetchModule;
}
