import { Component } from "/component.js";

const ComponentBase = await Component.create("cv-tag", {
    templateUrl: "./tag.html",
    styleUrl: "./tag.css",
    ...import.meta,
});

export class TagComponent extends ComponentBase {
    static #tags = new Map();

    constructor() {
        super();

        if (this.textContent) {
            const count = TagComponent.#tags.get(this.textContent) ?? 0;
            TagComponent.#tags.set(this.textContent, count + 1);
        }

        const shadowRoot = this.attachShadow({ mode: "closed" });
        shadowRoot.appendChild(this.content);
    }

    static get tags() {
        return this.#tags;
    }
}
