/**
 * Patch: Enable Preview for Binary Files and Images
 * ID: binary_file_preview
 *
 * Fixes the issue where clicking viewed images, media, or other binary files in chat
 * throws "cannot open ... File seems to be binary and cannot be opened as text"
 * by falling back to VS Code's universal editor command (vscode.open).
 */

const ID = 'binary_file_preview';
const NAME = 'Enable Preview for Binary Files and Images';
const DESCRIPTION = 'Falls back to VS Code\'s universal editor command when openTextDocument fails on binary files (e.g. images, media, PDFs).';

const TARGET_1 = `                let doc;
                try {
                    doc = await vscode.workspace.openTextDocument(targetUri);
                }
                catch (openErr) {
                    if (targetUri.toString() === uri.toString()) {
                        throw openErr;
                    }
                    doc = await vscode.workspace.openTextDocument(uri);
                }`;

const REPLACEMENT_1 = `                let doc;
                try {
                    doc = await vscode.workspace.openTextDocument(targetUri);
                }
                catch (openErr) {
                    if (targetUri.toString() !== uri.toString()) {
                        try {
                            doc = await vscode.workspace.openTextDocument(uri);
                        }
                        catch {
                            // Ignore and proceed to vscode.open fallback
                        }
                    }
                    if (!doc) {
                        try {
                            await vscode.commands.executeCommand('vscode.open', uri, { preview: true });
                            return {};
                        }
                        catch {
                            throw openErr;
                        }
                    }
                }`;

const REPLACEMENTS = [
  [TARGET_1, REPLACEMENT_1],
];

module.exports = {
  ID,
  NAME,
  DESCRIPTION,
  REPLACEMENTS,
};
