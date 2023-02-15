import { Component, html } from "/src/component.js";
import { element } from "/src/element.js";
import { Counter } from "/src/app/util/counter.js";

const ComponentBase = await Component.create("cv-bibliography", {
    ...import.meta,
    template: html`<ul><slot></slot></ul>`,
    styleUrl: "./bibliography.css",
});

export class BibliographyComponent extends ComponentBase {
    static #counter = new Counter();

    constructor(content) {
        super();

        const shadowRoot = this.attachShadow({ mode: "open" });
        shadowRoot.appendChild(content);

        if (this.src) {
            this.#loadBibliography().then(references => {
                const list = shadowRoot.querySelector("ul");
                const start = BibliographyComponent.#counter.get(this.counter);
                list.style["counter-reset"] = `references ${start}`;
                list.append(...references);
            });
        }
    }

    get counter() {
        return this.getAttribute("counter") ?? undefined;
    }

    get key() {
        return this.getAttribute("key");
    }

    get src() {
        return this.getAttribute("src");
    }

    async #loadBibliography() {
        const response = await fetch(this.src);
        if (!response.ok) {
            console.error(`Failed to load bibliography from ${this.src}`);
            return [];
        }

        const data = await response.json();
        const publications = this.key?.split(".")?.reduce((o, k) => o[k], data) ?? data;

        const reference = element("cv-reference");
        const li = element("li");

        return publications.map(reference).map(reference => li(undefined, reference));
    }
}
