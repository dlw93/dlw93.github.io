import { Component, html } from "/src/lib/component.js";
import { element } from "/src/lib/element.js";
import { CounterRegistry } from "../../util/counter-registry.js";

const ComponentBase = await Component.create("cv-bibliography", {
    template: html`<ol><slot></slot></ol>`,
    styleUrl: new URL("./bibliography.css", import.meta.url),
});

export class BibliographyComponent extends ComponentBase {
    static #counterRegistry = new CounterRegistry();

    constructor() {
        super();

        if (this.src) {
            this.#loadBibliography().then(references => {
                const list = this.shadowRoot.querySelector("ol");
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
