export function createElement(tagName, options, ...children) {
    const element = document.createElement(tagName);
    if (typeof options === "string") {
        element.className = options;
    } else {
        Object.assign(element, options);
    }
    element.append(...children);
    return element;
}

export function element(tagName) {
    return function (options, ...children) {
        return createElement(tagName, options, ...children);
    };
}
