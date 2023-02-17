export class Component {
    static #parser = new DOMParser();

    /**
     * @param {string} selector
     * @param {{url?: string, templateUrl?: string, styleUrl?: string}?} options
     */
    static async create(selector, { url, template, templateUrl, style, styleUrl } = {}) {
        const content = new DocumentFragment()

        if (style) {
            const styleElement = document.createElement("style");
            styleElement.textContent = style;

            content.appendChild(styleElement);
        } else if (styleUrl) {
            const linkElement = document.createElement("link");
            linkElement.type = "text/css";
            linkElement.rel = "stylesheet";
            linkElement.href = new URL(styleUrl, new URL(url, window.location.origin)).href;

            content.appendChild(linkElement);
        }

        if (template) {
            content.appendChild(template);
        } else if (templateUrl) {
            const templateResponse = await fetch(new URL(templateUrl, new URL(url, window.location.origin)).href);
            if (!templateResponse.ok) {
                throw new Error(`Failed to fetch ${templateResponse.url}`);
            }
            const templateText = await templateResponse.text();
            const body = this.#parser.parseFromString(templateText, "text/html").body.firstChild;

            content.appendChild(body);
        }

        return class extends HTMLElement {
            constructor() {
                super();

                const shadowRoot = this.attachShadow({ mode: "open" });
                shadowRoot.appendChild(content.cloneNode(true));
            }

            static get selector() {
                return selector;
            }

            static async register() {
                if (!customElements.get(this.selector)) {
                    customElements.define(this.selector, this);
                }
                await customElements.whenDefined(this.selector);
            }
        };
    }
}

export const html = (function () {
    const parser = new DOMParser();
    return function (strings, ...values) {
        const text = strings.reduce((text, string, i) => `${text}${values[i - 1]}${string}`);
        return parser.parseFromString(text, "text/html").body.firstChild;
    }
})();

export const css = (function () {
    return function (strings, ...values) {
        const style = strings.reduce((text, string, i) => `${text}${values[i - 1]}${string}`);
        // tbd.
        return style;
    }
})();
