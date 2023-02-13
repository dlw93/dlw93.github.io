/**
 * @param {typeof HTMLElement} constructor 
 * @returns {void}
 */
function registerComponent(constructor) {
    if ("id" in constructor && typeof constructor.id === "string") {
        customElements.define(constructor.id, constructor);
    }
}

/**
 * A utility function to register a custom element specified by a `<template>`-tag with no further logic
 * 
 * @param {string} id 
 */
function registerTemplate(id) {
    class CVElement extends HTMLElement {
        /**
         * @type {HTMLTemplateElement}
         */
        static #template = document.getElementById(id);

        constructor() {
            super();

            const shadowRoot = this.attachShadow({ mode: "closed" });
            shadowRoot.appendChild(CVElement.#template.content.cloneNode(true));
        }
    }

    customElements.define(id, CVElement);
}

class SectionElement extends HTMLElement {
    /**
     * @type {HTMLTemplateElement}
     */
    static #template = document.getElementById("cv-section");

    /**
     * @type {number}
     */
    #depth = (this.parentElement.closest(SectionElement.id)?.depth ?? 0) + 1;

    constructor() {
        super();

        const [, ...words] = this.title.split(" ").flatMap(word => {
            const span = document.createElement("span");
            span.textContent = word;
            return [document.createTextNode(" "), span];
        });

        const heading = document.createElement(`h${this.level}`);
        heading.append(...words);

        const content = SectionElement.#template.content.cloneNode(true);
        const section = content.querySelector("section");
        section.prepend(heading);

        const shadowRoot = this.attachShadow({ mode: "closed" });
        shadowRoot.appendChild(content);
    }

    get title() {
        return this.getAttribute("title") ?? "";
    }

    get depth() {
        return this.#depth;
    }

    get level() {
        return 1 <= this.#depth ? this.#depth <= 6 ? this.#depth : 6 : 1;
    }

    static get id() {
        return this.#template.id;
    }
}

registerTemplate("cv-tag");
registerTemplate("cv-tag-list");
registerComponent(SectionElement);
