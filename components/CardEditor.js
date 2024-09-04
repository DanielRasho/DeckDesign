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
            textBox.setAttribute('font-size', model.getFontStyles().size);
            textBox.setAttribute('text-align', model.getHorizontalAlign());
            textBox.setAttribute('vertical-align', model.getVerticalAlign());
            textBox.setAttribute('text', model.getText());

            this.appendChild(textBox);
        });

        // Render draggable images
        this._models.images.forEach((model, index) => {
            const imageBox = document.createElement('dragabble-image');
            imageBox.classList.add("dragabble-image");
            imageBox.setAttribute('dragabble-image-id', index);
            imageBox.setAttribute('x', model.getPosition().x);
            imageBox.setAttribute('y', model.getPosition().y);
            imageBox.setAttribute('width', model.getSize().width + "px");
            imageBox.setAttribute('height', model.getSize().height + "px");
            imageBox.setAttribute('zindex', model.getZIndex());
            imageBox.setAttribute('image', model.image); // Assuming the model holds the image data

            this.appendChild(imageBox);
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