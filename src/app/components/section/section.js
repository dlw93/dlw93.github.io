import { Component, html } from "/src/lib/component.js";

const ComponentBase = await Component.create("cv-section", {
    template: html`<section><slot></slot></section>`,
    styleUrl: new URL("./section.css", import.meta.url),
});

export class SectionComponent extends ComponentBase {
    /**
     * @type {number}
     */
    #depth = (this.parentElement.closest(SectionComponent.selector)?.depth ?? 0) + 1;

    constructor() {
        super();

        const [, ...words] = this.title.split(" ").flatMap(word => {
            const span = document.createElement("span");
            span.textContent = word;
            return [document.createTextNode(" "), span];
        });

        const heading = document.createElement(`h${this.level}`);
        heading.append(...words);

        const section = this.shadowRoot.querySelector("section");
        section.prepend(heading);
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
}
