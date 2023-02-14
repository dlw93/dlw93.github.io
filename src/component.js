export class Component {
    static #parser = new DOMParser();

    /**
     * @param {string} selector
     * @param {{url?: string, templateUrl?: string, styleUrl?: string}?} options
     */
    static async create(selector, { url, templateUrl, styleUrl } = {}) {
        const templateElement = document.createElement("template");
        templateElement.id = selector;

        if (styleUrl) {
            const link = document.createElement("link");
            link.type = "text/css";
            link.rel = "stylesheet";
            link.href = new URL(styleUrl, url).href;

            templateElement.content.appendChild(link);
        }

        if (templateUrl) {
            const templateResponse = await fetch(new URL(templateUrl, url).href);
            if (!templateResponse.ok) {
                throw new Error(`Failed to fetch ${url}`);
            }
            const templateText = await templateResponse.text();
            const body = this.#parser.parseFromString(templateText, "text/html").body.firstChild;

            templateElement.content.appendChild(body);
        }

        return class extends HTMLElement {
            static get selector() {
                return selector;
            }

            static async register() {
                if (!customElements.get(this.selector)) {
                    customElements.define(this.selector, class extends this {
                        constructor() {
                            super(templateElement.content.cloneNode(true));
                        }
                    });
                }
                await customElements.whenDefined(this.selector);
            }
        };
    }
}
