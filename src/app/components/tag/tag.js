import { Component, html } from "/src/lib/component.js";

const ComponentBase = await Component.create("cv-tag", {
    template: html`<slot>&hellip;</slot>`,
    styleUrl: new URL("./tag.css", import.meta.url),
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
