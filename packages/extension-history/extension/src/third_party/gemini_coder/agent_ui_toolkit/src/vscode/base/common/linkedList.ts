/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
/**
 * @fileoverview added by tsickle
 * Generated from: third_party/gemini_coder/agent_ui_toolkit/src/vscode/base/common/linkedList.ts
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
goog.module('google3.third_party.gemini_coder.agent_ui_toolkit.src.vscode.base.common.linkedList');
var module = module || { id: 'third_party/gemini_coder/agent_ui_toolkit/src/vscode/base/common/linkedList.closure.js' };
goog.require('google3.third_party.javascript.tslib.tslib');
/**
 * @template E
 */
class Node {
    /**
     * @public
     * @param {E} element
     */
    constructor(element) {
        this.element = element;
        this.next = Node.Undefined;
        this.prev = Node.Undefined;
    }
}
Node.Undefined = new Node(undefined);
/* istanbul ignore if */
if (false) {
    /**
     * @const {!Node<*>}
     * @public
     */
    Node.Undefined;
    /**
     * @type {E}
     * @public
     */
    Node.prototype.element;
    /**
     * @type {(!Node<*>|!Node)}
     * @public
     */
    Node.prototype.next;
    /**
     * @type {(!Node<*>|!Node)}
     * @public
     */
    Node.prototype.prev;
}
/**
 * @template E
 */
class LinkedList {
    constructor() {
        this._first = Node.Undefined;
        this._last = Node.Undefined;
        this._size = 0;
    }
    /**
     * @public
     * @return {number}
     */
    get size() {
        return this._size;
    }
    /**
     * @public
     * @return {boolean}
     */
    isEmpty() {
        return this._first === Node.Undefined;
    }
    /**
     * @public
     * @return {void}
     */
    clear() {
        /** @type {(!Node<*>|!Node<E>)} */
        let node = this._first;
        while (node !== Node.Undefined) {
            /** @type {(!Node<*>|!Node<E>)} */
            const next = node.next;
            node.prev = Node.Undefined;
            node.next = Node.Undefined;
            node = next;
        }
        this._first = Node.Undefined;
        this._last = Node.Undefined;
        this._size = 0;
    }
    /**
     * @public
     * @param {E} element
     * @return {function(): void}
     */
    unshift(element) {
        return this._insert(element, false);
    }
    /**
     * @public
     * @param {E} element
     * @return {function(): void}
     */
    push(element) {
        return this._insert(element, true);
    }
    /**
     * @private
     * @param {E} element
     * @param {boolean} atTheEnd
     * @return {function(): void}
     */
    _insert(element, atTheEnd) {
        /** @type {!Node<E>} */
        const newNode = new Node(element);
        if (this._first === Node.Undefined) {
            this._first = newNode;
            this._last = newNode;
        }
        else if (atTheEnd) {
            // push
            /** @type {(!Node<*>|!Node<E>)} */
            const oldLast = this._last;
            this._last = newNode;
            newNode.prev = oldLast;
            oldLast.next = newNode;
        }
        else {
            // unshift
            /** @type {(!Node<*>|!Node<E>)} */
            const oldFirst = this._first;
            this._first = newNode;
            newNode.next = oldFirst;
            oldFirst.prev = newNode;
        }
        this._size += 1;
        /** @type {boolean} */
        let didRemove = false;
        return (/**
         * @return {void}
         */
        () => {
            if (!didRemove) {
                didRemove = true;
                this._remove(newNode);
            }
        });
    }
    /**
     * @public
     * @return {(undefined|E)}
     */
    shift() {
        if (this._first === Node.Undefined) {
            return undefined;
        }
        else {
            /** @type {*} */
            const res = this._first.element;
            this._remove(this._first);
            return (/** @type {E} */ (res));
        }
    }
    /**
     * @public
     * @return {(undefined|E)}
     */
    pop() {
        if (this._last === Node.Undefined) {
            return undefined;
        }
        else {
            /** @type {*} */
            const res = this._last.element;
            this._remove(this._last);
            return (/** @type {E} */ (res));
        }
    }
    /**
     * @public
     * @return {(undefined|E)}
     */
    peek() {
        if (this._last === Node.Undefined) {
            return undefined;
        }
        else {
            /** @type {*} */
            const res = this._last.element;
            return (/** @type {E} */ (res));
        }
    }
    /**
     * @private
     * @param {(!Node<*>|!Node<E>)} node
     * @return {void}
     */
    _remove(node) {
        if (node.prev !== Node.Undefined && node.next !== Node.Undefined) {
            // middle
            /** @type {(!Node<*>|!Node<E>)} */
            const anchor = node.prev;
            anchor.next = node.next;
            node.next.prev = anchor;
        }
        else if (node.prev === Node.Undefined && node.next === Node.Undefined) {
            // only node
            this._first = Node.Undefined;
            this._last = Node.Undefined;
        }
        else if (node.next === Node.Undefined) {
            // last
            this._last = (/** @type {(!Node<*>|!Node<E>)} */ (this._last.prev));
            this._last.next = Node.Undefined;
        }
        else if (node.prev === Node.Undefined) {
            // first
            this._first = (/** @type {(!Node<*>|!Node<E>)} */ (this._first.next));
            this._first.prev = Node.Undefined;
        }
        // done
        this._size -= 1;
    }
    /**
     * @public
     * @return {!Iterator<E, ?, ?>}
     */
    *[Symbol.iterator]() {
        /** @type {(!Node<*>|!Node<E>)} */
        let node = this._first;
        while (node !== Node.Undefined) {
            yield (/** @type {E} */ (node.element));
            node = node.next;
        }
    }
}
exports.LinkedList = LinkedList;
/* istanbul ignore if */
if (false) {
    /**
     * @type {(!Node<*>|!Node<E>)}
     * @private
     */
    LinkedList.prototype._first;
    /**
     * @type {(!Node<*>|!Node<E>)}
     * @private
     */
    LinkedList.prototype._last;
    /**
     * @type {number}
     * @private
     */
    LinkedList.prototype._size;
}
