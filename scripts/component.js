export default class Component {
    static #PARSER = new DOMParser();

    static async load(name, template) {
        const path = template;
        const response = await fetch(path);
        const text = await response.text();
        Component.create(name, text);
    }

    static create(name, template) {
        const doc = Component.#PARSER.parseFromString(template, "text/html");
        const templateNode = doc.querySelector("template");
        const fragment = templateNode.content;
        const attributes = Object.keys(templateNode.dataset);

        const ctor = class extends HTMLElement {
            static get observedAttributes() {
                return attributes;
            }

            #map = new Map();

            constructor() {
                super();

                const root = this.attachShadow({ mode: "open" });
                root.appendChild(fragment.cloneNode(true));

                for (let attr of attributes) {
                    const elements = root.querySelectorAll(`[data-${attr}]`);
                    this.#map.set(attr, elements);
                    elements.forEach(element => element.innerText = templateNode.dataset[attr] ?? ""); //  set default values
                }
            }

            attributeChangedCallback(name, oldValue, newValue) {
                const propName = name.replace(/-([a-z])/g, (_, c) => c.toUpperCase());
                this.#map.get(propName).forEach(element => element.innerText = newValue);
            }
        };

        // reflect properties to attributes
        for (let name of attributes) {
            const attrName = name.replace(/([A-Z])/g, (_, c) => `-${c.toLowerCase()}`);
            Object.defineProperty(ctor.prototype, name, {
                get() {
                    return this.getAttribute(attrName);
                },
                set(value) {
                    this.setAttribute(attrName, value);
                },
            });
        }

        customElements.define(name, ctor);
    }
}
