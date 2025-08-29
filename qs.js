/*!
 * qs.js v1.0.1
 * Copyright (c) 2025 Andika Hermansyah
 * Licensed under the MIT License - https://github.com/AndikaTanpaH/QS
 */


/*
 * Simple Query Selector
 * If you need always array return, set returnAsArray = true 
 */
function qs(selector, returnAsArray = false) {
    if (typeof selector === "string") {
        const foundElements = document.querySelectorAll(selector);

        if (foundElements.length === 0) {
            return returnAsArray ? [] : null;
        }

        if (foundElements.length === 1) {
            return returnAsArray ? [foundElements[0]] : foundElements[0];
        }

        return Array.from(foundElements);
    }

    if (
        selector instanceof HTMLElement ||
        selector === window ||
        selector === document
    ) {
        return returnAsArray ? [selector] : selector;
    }

    if (
        NodeList.prototype.isPrototypeOf(selector) ||
        Array.isArray(selector)
    ) {
        return Array.from(selector);
    }

    return returnAsArray ? [] : null;
}

// Adding to prototype: HTMLElement, Document, Window
[HTMLElement.prototype, Document.prototype, Window.prototype, DocumentFragment.prototype].forEach(proto => {
    // qs for element scope
    if (!proto.qs) {
        proto.qs = function (selector, returnAsArray = false) {
            if (typeof selector === "string" && selector.trim().startsWith(">")) {
                selector = ":scope " + selector;
            }

            const found = this.querySelectorAll(selector);

            if (found.length === 0) {
                return returnAsArray ? [] : null;
            }

            if (found.length === 1) {
                return returnAsArray ? [found[0]] : found[0];
            }

            return Array.from(found);
        };
    }

    // event listener helper: .on(event, selector?, handler)
    if (!proto.on) {
        proto.on = function (eventName, selectorOrHandler, maybeHandler) {
            if (typeof selectorOrHandler === "function") {
                this.addEventListener(eventName, selectorOrHandler);
            } else if (
                typeof selectorOrHandler === "string" &&
                typeof maybeHandler === "function"
            ) {
                this.addEventListener(eventName, function (event) {
                    if (!(event.target instanceof Element)) return;
                    const delegateTarget = event.target.closest(selectorOrHandler);
                    if (delegateTarget && this.contains(delegateTarget)) {
                        maybeHandler.call(delegateTarget, event);
                    }
                });
            }
        };
    }
});
