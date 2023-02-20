export class Component {
    static #parser = new DOMParser();

    static async #loadResource(url) {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Failed to fetch ${url}`);
        }
        return response.text();
    }

    /**
     * @param {string} selector
     * @param {{template?: Node, templateUrl?: string, style?: CSSStyleSheet, styleUrl?: string}?}
     */
    static async create(selector, { template, templateUrl, style, styleUrl } = {}) {
        const content = new DocumentFragment();
        const adoptedStyleSheets = [];

        if (templateUrl) {
            const templateText = await this.#loadResource(templateUrl);
            template = this.#parser.parseFromString(templateText, "text/html").body.firstChild;
        }

        if (template) {
            content.appendChild(template);
        }

        if (styleUrl) {
            const styleText = await this.#loadResource(styleUrl);
            style = new CSSStyleSheet().replace(styleText);
        }

        if (style) {
            adoptedStyleSheets.push(await style);
        }

        return class extends HTMLElement {
            constructor() {
                super();

                const shadowRoot = this.attachShadow({ mode: "open" });
                shadowRoot.adoptedStyleSheets = adoptedStyleSheets;
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

export function html(strings, ...values) {
    const text = strings.reduce((text, string, i) => `${text}${values[i - 1]}${string}`);
    return new DOMParser().parseFromString(text, "text/html").body.firstChild;
}

export function css(strings, ...values) {
    const text = strings.reduce((text, string, i) => `${text}${values[i - 1]}${string}`);
    return new CSSStyleSheet().replace(text);
}
