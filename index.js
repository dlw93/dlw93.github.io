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

class SectionTitleElement extends HTMLElement {
    static #template = document.getElementById("cv-section-title");
    static #style = this.#template.content.querySelector("style");

    constructor() {
        super();

        const [, ...spans] = this.textContent?.split(" ")?.flatMap(word => {
            const span = document.createElement("span");
            span.textContent = word;
            return [document.createTextNode(" "), span];
        });

        const header = document.createElement(`h${this.level}`);
        header.append(...spans);

        const shadowRoot = this.attachShadow({ mode: "closed" });
        shadowRoot.append(SectionTitleElement.#style, header);
    }

    get level() {
        return this.getAttribute("level") ?? "1";
    }

    static get id() {
        return this.#template.id;
    }
}

registerTemplate("cv-tag");
registerTemplate("cv-tag-list");
registerComponent(SectionTitleElement);
