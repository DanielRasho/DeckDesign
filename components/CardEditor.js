import { CARD_BACKGROUND_TYPES } from "../models/CardModel.js";
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

        this._models.textBoxes.forEach((model, index) => {
            const textBox = document.createElement('dragabble-text');
            textBox.classList.add("dragabble-text")
            textBox.setAttribute('dragabble-text-id', index);
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

        this.setBackground()
    }

    setBackground(){
        this.style.backgroundColor = 'transparent';
        this.style.backgroundImage = 'none';

        switch (this._models.cardBackground.type) {
            case CARD_BACKGROUND_TYPES.SOLID:
                this.style.backgroundColor = this._models.cardBackground.value;
                break;
            case CARD_BACKGROUND_TYPES.IMAGE:
                this.style.backgroundImage = `url(${this._models.cardBackground.value})`;
                break;
        }
    }
}

customElements.define('card-editor', CardEditor);