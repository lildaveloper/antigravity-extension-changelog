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

const TARGET_1 = `try{K=b(await c(l.workspace.openTextDocument(H)))}catch(M){b();if(H.toString()===w.toString())throw M;K=b(await c(l.workspace.openTextDocument(w)))}`;

const REPLACEMENT_1 = `try{K=b(await c(l.workspace.openTextDocument(H)))}catch(M){b();if(H.toString()!==w.toString()){try{K=b(await c(l.workspace.openTextDocument(w)))}catch{b()}}if(!K){try{b(await c(l.commands.executeCommand("vscode.open",w,{preview:!0})));return{}}catch{b();throw M;}}}`;

const REPLACEMENTS = [
  [TARGET_1, REPLACEMENT_1],
];

module.exports = {
  ID,
  NAME,
  DESCRIPTION,
  REPLACEMENTS,
};
