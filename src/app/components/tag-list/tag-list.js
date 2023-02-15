import { Component, html } from "/src/component.js";

const ComponentBase = await Component.create("cv-tag-list", {
    template: html`<slot>&hellip;</slot>`,
    styleUrl: "./tag-list.css",
    ...import.meta,
});

export class TagListComponent extends ComponentBase {
    constructor(content) {
        super();

        const shadowRoot = this.attachShadow({ mode: "closed" });
        shadowRoot.appendChild(content);
    }
}
