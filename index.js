const tagName = (name) => `cv-${name}`;

function register(Constructor) {
    if ("templateId" in Constructor && typeof Constructor.templateId === "string") {
        customElements.define(Constructor.templateId, Constructor);
    }
}

class TagElement extends HTMLElement {
    static #templateId = tagName("tag");
    static #template = document.getElementById(this.#templateId).content;

    #shadowRoot;

    constructor() {
        super();

        this.#shadowRoot = this.attachShadow({ mode: "closed" });
        this.#shadowRoot.appendChild(TagElement.#template.cloneNode(true));
    }

    static get templateId() {
        return TagElement.#templateId;
    }
}

class TagListElement extends HTMLElement {
    static #templateId = tagName("tag-list");
    static #template = document.getElementById(this.#templateId).content;

    #shadowRoot;

    constructor() {
        super();

        this.#shadowRoot = this.attachShadow({ mode: "closed" });
        this.#shadowRoot.appendChild(TagListElement.#template.cloneNode(true));
    }

    static get templateId() {
        return this.#templateId;
    }
}

register(TagElement);
register(TagListElement);
