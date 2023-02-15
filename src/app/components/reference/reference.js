import { Component, html } from "/src/component.js";

const ComponentBase = await Component.create("cv-reference", {
    ...import.meta,
    styleUrl: "./reference.css",
    template: html`
        <span class="reference">
            <span id="author"></span>
            <a id="title"></a>
            <span id="journal"></span>
            <span id="date"></span>
            <span id="pages"></span>
        </span>`,
});

export class ReferenceComponent extends ComponentBase {
    constructor(content) {
        super();

        const ids = ["author", "title", "journal", "date", "pages"];
        const elements = Object.fromEntries(ids.map(id => [id, content.getElementById(id)]));

        for (const id in elements) {
            Object.defineProperty(this, id, {
                get: () => elements[id].textContent,
                set: (value) => elements[id].textContent = value,
            });
        }

        Object.defineProperty(this, "url", {
            get: () => elements.title.href,
            set: (value) => elements.title.href = value,
        });

        const shadowRoot = this.attachShadow({ mode: "closed" });
        shadowRoot.appendChild(content);
    }
}
