import { Component, html } from "/src/component.js";

// TODO move into Component static part
const ComponentBase = await Component.create("cv-tag", {
    url: "/src/app/components/tag/",
    template: html`<slot>&hellip;</slot>`,
    styleUrl: "./tag.css",
});

export class TagComponent extends ComponentBase {
    static #tags = new Map();

    constructor() {
        super();

        if (this.textContent) {
            const count = TagComponent.#tags.get(this.textContent) ?? 0;
            TagComponent.#tags.set(this.textContent, count + 1);
        }
    }

    static get tags() {
        return this.#tags;
    }
}
