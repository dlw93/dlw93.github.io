import { Component, html } from "/src/component.js";
import { element } from "/src/element.js";
import { CounterRegistry } from "/src/app/util/counter-registry.js";

const ComponentBase = await Component.create("cv-bibliography", {
    ...import.meta,
    template: html`<ol><slot></slot></ol>`,
    styleUrl: "./bibliography.css",
});

export class BibliographyComponent extends ComponentBase {
    static #counterRegistry = new CounterRegistry();

    constructor(content) {
        super();

        const shadowRoot = this.attachShadow({ mode: "open" });
        shadowRoot.appendChild(content);

        if (this.src) {
            this.#loadBibliography().then(references => {
                const list = shadowRoot.querySelector("ol");
                const counter = BibliographyComponent.#counterRegistry.get(this.counter);
                list.style["counter-reset"] = `references ${counter(0)}`;
                list.append(...references);
                counter(references.length);
            });
        }
    }

    get counter() {
        return this.getAttribute("counter") ?? undefined;
    }

    get keyPath() {
        return this.getAttribute("keyPath");
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
        const publications = this.keyPath?.split(".")?.reduce((o, k) => o[k], data) ?? data;

        const reference = element("cv-reference");
        const li = element("li");

        return publications.map(reference).map(reference => li(undefined, reference));
    }
}
