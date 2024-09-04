import { MAIN_CARD } from "../stores/CardStore.js";

class CardEditor extends HTMLElement {
    constructor() {
        super();
        this._models = MAIN_CARD;
    }

    set models(models) {
        this._models = models;
        this.render();
    }

    connectedCallback() {
        this.render()
        window.addEventListener('modelChange', (event) => {
            this.render()
        });
    }

    render() {
        if (!this._models) return;

        this.innerHTML = '';

        this._models.textBoxes.forEach(model => {
            const textBox = document.createElement('dragabble-text');
            textBox.setAttribute('x', model.getPosition().x);
            textBox.setAttribute('y', model.getPosition().y);
            textBox.setAttribute('width', model.getSize().width);
            textBox.setAttribute('height', model.getSize().height);
            textBox.setAttribute('zindex', model.getZIndex());
            textBox.setAttribute('font-family', model.getFontStyles().family);
            textBox.setAttribute('font-weight', model.getFontStyles().weight);
            textBox.setAttribute('color', model.getFontStyles().color);
            textBox.setAttribute('font-style', model.getFontStyles().style);
            textBox.setAttribute('text-align', model.getHorizontalAlign());
            textBox.setAttribute('vertical-align', model.getVerticalAlign());
            textBox.setAttribute('text', model.getText());

            this.appendChild(textBox);
        });
    }
}

customElements.define('card-editor', CardEditor);