import { Component, html, css } from "/src/component.js";

const ComponentBase = await Component.create("cv-tag-list", {
    template: html`<slot>&hellip;</slot>`,
    style: css`
        :host {
            display: flex;
            flex-wrap: wrap;
            gap: 0.35rem;
        }`,
});

export class TagListComponent extends ComponentBase { }
