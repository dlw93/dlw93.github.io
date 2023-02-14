import { Component } from "/src/component.js";

const ComponentBase = await Component.create("cv-section", {
    templateUrl: "./section.html",
    styleUrl: "./section.css",
    ...import.meta,
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

        const section = this.content.querySelector("section");
        section.prepend(heading);

        const shadowRoot = this.attachShadow({ mode: "closed" });
        shadowRoot.appendChild(this.content);
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
