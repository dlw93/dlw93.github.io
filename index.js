class TagElement extends HTMLElement {
    static #template = document.getElementById("cv-tag").content;

    #shadowRoot;

    constructor() {
        super();

        this.#shadowRoot = this.attachShadow({ mode: "closed" });
        this.#shadowRoot.appendChild(TagElement.#template.cloneNode(true));
    }
}

customElements.define("cv-tag", TagElement);
