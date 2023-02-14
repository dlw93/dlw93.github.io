import { Component } from "/src/component.js";

const ComponentBase = await Component.create("cv-tag-list", {
    templateUrl: "./tag-list.html",
    styleUrl: "./tag-list.css",
    ...import.meta,
});

export class TagListComponent extends ComponentBase {
    constructor() {
        super();

        const shadowRoot = this.attachShadow({ mode: "closed" });
        shadowRoot.appendChild(this.content);
    }
}
