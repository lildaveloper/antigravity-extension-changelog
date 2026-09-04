/**
 * @fileoverview added by tsickle
 * Generated from: research/colab/frontend/common/nbformat/v4/cell.ts
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
goog.module('google3.research.colab.frontend.common.nbformat.v4.cell');
var module = module || { id: 'research/colab/frontend/common/nbformat/v4/cell.closure.js' };
goog.require('google3.third_party.javascript.tslib.tslib');
const tsickle_cell_1 = goog.requireType("google3.research.colab.frontend.common.nbformat.colab.cell");
const tsickle_output_2 = goog.requireType("google3.research.colab.frontend.common.nbformat.v4.output");
/** @typedef {!google3$research$colab$frontend$common$nbformat$v4$cell.Cell} */
exports.Cell;
/**
 * V4 raw cell format.
 * @record
 * @extends {google3$research$colab$frontend$common$nbformat$v4$cell.Cell}
 */
function RawCell() { }
exports.RawCell = RawCell;
/* istanbul ignore if */
if (false) {
    /**
     * @export
     * @type {!Metadata}
     */
    RawCell.prototype.metadata;
}
/**
 * V4 text cell format.
 * @record
 * @extends {google3$research$colab$frontend$common$nbformat$v4$cell.Cell}
 */
function MarkdownCell() { }
exports.MarkdownCell = MarkdownCell;
/* istanbul ignore if */
if (false) {
    /**
     * @export
     * @type {!Metadata}
     */
    MarkdownCell.prototype.metadata;
}
/**
 * V4 code cell format.
 * @record
 * @extends {google3$research$colab$frontend$common$nbformat$v4$cell.Cell}
 */
function CodeCell() { }
exports.CodeCell = CodeCell;
/* istanbul ignore if */
if (false) {
    /**
     * @export
     * @type {!Array<(!tsickle_output_2.Error|!tsickle_output_2.DisplayData|!tsickle_output_2.ExecuteResult|!tsickle_output_2.Stream)>}
     */
    CodeCell.prototype.outputs;
    /**
     * @export
     * @type {(null|number)}
     */
    CodeCell.prototype.execution_count;
    /**
     * @export
     * @type {!CodeCellMetadata}
     */
    CodeCell.prototype.metadata;
}
/**
 * @record
 */
function NbGrader() { }
/* istanbul ignore if */
if (false) {
    /**
     * @export
     * @type {(undefined|string)}
     */
    NbGrader.prototype.checksum;
    /**
     * @export
     * @type {(undefined|string)}
     */
    NbGrader.prototype.grade_id;
}
/**
 * V4 Cell Metadata
 * @record
 */
function Metadata() { }
exports.Metadata = Metadata;
/* istanbul ignore if */
if (false) {
    /**
     * @export
     * @type {(undefined|string)}
     */
    Metadata.prototype.name;
    /**
     * @export
     * @type {(undefined|!Array<string>)}
     */
    Metadata.prototype.tags;
    /**
     * @export
     * @type {(undefined|string)}
     */
    Metadata.prototype.id;
    /**
     * @export
     * @type {(undefined|!tsickle_cell_1.Metadata)}
     */
    Metadata.prototype.colab;
    /**
     * @export
     * @type {(undefined|!tsickle_cell_1.ImportedFrom)}
     */
    Metadata.prototype.imported_from;
    /**
     * @export
     * @type {(undefined|!tsickle_cell_1.CellType)}
     */
    Metadata.prototype.colab_type;
    /**
     * @export
     * @type {(undefined|!NbGrader)}
     */
    Metadata.prototype.nbgrader;
    /**
     * @export
     * Whether the cell is editable (as opposed to readonly).
     * https://nbformat.readthedocs.io/en/latest/format_description.html#cell-metadata
     * @type {(undefined|boolean)}
     */
    Metadata.prototype.editable;
}
/**
 * @record
 * @extends {Metadata}
 */
function CodeCellMetadata() { }
exports.CodeCellMetadata = CodeCellMetadata;
/* istanbul ignore if */
if (false) {
    /**
     * @export
     * @type {(undefined|!tsickle_cell_1.ExecutionInfo)}
     */
    CodeCellMetadata.prototype.executionInfo;
    /**
     * @export
     * @type {(undefined|string)}
     */
    CodeCellMetadata.prototype.outputId;
    /**
     * Whether the output of the cell is collapsed.
     * https://ipython.org/ipython-doc/3/notebook/nbformat.html#code-cells
     * @export
     * @type {(undefined|boolean)}
     */
    CodeCellMetadata.prototype.collapsed;
    /**
     * @export
     * @type {(undefined|!tsickle_cell_1.ViewType)}
     */
    CodeCellMetadata.prototype.cellView;
}
/**
 * V4 Cell types.
 * @enum {string}
 */
const CellType = {
    RAW: "raw",
    MARKDOWN: "markdown",
    CODE: "code",
};
exports.CellType = CellType;
