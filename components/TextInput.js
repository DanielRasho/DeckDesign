import { MAIN_CARD } from "../stores/CardStore.js";

export class TextInput extends HTMLElement {
    constructor() {
        super();
        this.model = null;
        this.notifyChange = MAIN_CARD.notifyChange;
    }

    static get observedAttributes() {
        return ['text-box-id'];
    }

    setModel(model) {
        this.model = model;
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue !== newValue) {
            this.render();
        }
    }

    disconnectCallback(){
        const id = this.getAttribute('text-box-id');
        const deleteBtn = document.getElementById('delete-btn-' + id);
        deleteBtn.removeEventListener('click', () => {}); // Logic for deleting
    }

    deleteItself() {
        const id = this.getAttribute('text-box-id');
        const deleteBtn = this.querySelector(`#delete-btn-${id}`);
        deleteBtn.addEventListener('click', () => {
            MAIN_CARD.removeTextBox(id); // Remove the model
            MAIN_CARD.notifyChange();
        });
    }

    connectedCallback() {
        this.render();
        this.addEventListeners();
        this.deleteItself();
    }

    render() {
        const id = this.getAttribute('text-box-id');

        const deleteBtn = "delete-btn-" + id;
        const textBoxID = 'texbox-toogle' + id;
        const textBoxIDBold = 'texbox-toogle-bold' + id;
        const textBoxIDItalic = 'texbox-toogle-italic' + id;

        const textBoxHAlignName = 'texbox-toogle-h-align' + id;
        const textBoxHAlignLeft = 'texbox-toogle-h-left' + id;
        const textBoxHAlignCenter = 'texbox-toogle-h-center' + id;
        const textBoxHAlignRight = 'texbox-toogle-h-right' + id;

        const textBoxVAlignName = 'texbox-toogle-v-align' + id;
        const textBoxVAlignTop = 'texbox-toogle-v-top' + id;
        const textBoxVAlignCenter = 'texbox-toogle-v-center' + id;
        const textBoxVAlignBottom = 'texbox-toogle-v-bottom' + id;

        this.innerHTML = /*html*/`
        <div>
            <input id="${"text-input-" + id}" class="text-input" type='text' value="${this.model.getText()}">
            <input 
                class="text-input-config-btn"
                type="checkbox"
                id="${textBoxID}">
            <label for="${textBoxID}">
                <i class="fa-solid fa-sliders"></i>
            </label>
            <button id=${deleteBtn} class="text-delete-btn">
                <i class="fa-regular fa-trash-can"></i>
            </button>
            <div class="text-input-controllers">
                <div class="text-input-styles">
                    <div>
                        <input 
                            type="checkbox"
                            id="${textBoxIDBold}"
                            ${this.model.getFontStyles().weight === 'bold' ? 'checked' : ''}>
                        <label for="${textBoxIDBold}">
                            <i class="fa-solid fa-bold"></i>
                        </label>
                        <input 
                            type="checkbox"
                            id="${textBoxIDItalic}"
                            ${this.model.getFontStyles().style === 'italic' ? 'checked' : ''}>
                        <label for="${textBoxIDItalic}">
                            <i class="fa-solid fa-italic"></i>
                        </label>
                    </div>
                    <div>
                        <input 
                            type="radio"
                            name=${textBoxHAlignName}
                            id=${textBoxHAlignLeft}
                            ${this.model.getHorizontalAlign() === 'left' ? 'checked' : ''}>
                        <label for="${textBoxHAlignLeft}">
                            <i class="fa-solid fa-align-left"></i>
                        </label>
                        <input 
                            type="radio"
                            name=${textBoxHAlignName}
                            id=${textBoxHAlignCenter}
                            ${this.model.getHorizontalAlign() === 'center' ? 'checked' : ''}>
                        <label for="${textBoxHAlignCenter}">
                            <i class="fa-solid fa-align-center"></i>
                        </label>
                        <input 
                            type="radio"
                            name=${textBoxHAlignName}
                            id=${textBoxHAlignRight}
                            ${this.model.getHorizontalAlign() === 'right' ? 'checked' : ''}>
                        <label for="${textBoxHAlignRight}">
                            <i class="fa-solid fa-align-right"></i>
                        </label>
                    </div>
                    <div>
                        <input 
                            type="radio"
                            name=${textBoxVAlignName}
                            id=${textBoxVAlignTop}
                            ${this.model.getVerticalAlign() === 'top' ? 'checked' : ''}>
                        <label for="${textBoxVAlignTop}">
                            <i class="fa-solid fa-up-long"></i>
                        </label>
                        <input 
                            type="radio"
                            id=${textBoxVAlignCenter}
                            name=${textBoxVAlignName}
                            ${this.model.getVerticalAlign() === 'center' ? 'checked' : ''}>
                        <label for="${textBoxVAlignCenter}">
                            <i class="fa-solid fa-left-right"></i>
                        </label>
                        <input 
                            type="radio"
                            id=${textBoxVAlignBottom}
                            name=${textBoxVAlignName}
                            ${this.model.getVerticalAlign() === 'end' ? 'checked' : ''}>
                        <label for="${textBoxVAlignBottom}">
                            <i class="fa-solid fa-down-long"></i>
                        </label>
                    </div>
                </div>
                <input id="${"font-color-picker-" + id}" type="color" value="${this.model.getFontStyles().color}">
                <input id="${"font-size-picker-" + id}" 
                    class="size-picker" 
                    type="number" 
                    value="${this.model.getFontStyles().size}"
                    min="6">
            </div>
        </div>
        `;
    }

    addEventListeners() {
        const id = this.getAttribute('text-box-id');

        // Bold checkbox
        const boldCheckbox = this.querySelector(`#texbox-toogle-bold${id}`);
        boldCheckbox.addEventListener('change', (event) => {
            const isBold = event.target.checked;
            this.model.setFontStyles(
                this.model.getFontStyles().family,
                isBold ? 'bold' : 'normal',
                this.model.getFontStyles().color,
                this.model.getFontStyles().style,
                this.model.getFontStyles().size
            );
            this.notifyChange();
        });

        // Italic checkbox
        const italicCheckbox = this.querySelector(`#texbox-toogle-italic${id}`);
        italicCheckbox.addEventListener('change', (event) => {
            const isItalic = event.target.checked;
            this.model.setFontStyles(
                this.model.getFontStyles().family,
                this.model.getFontStyles().weight,
                this.model.getFontStyles().color,
                isItalic ? 'italic' : 'normal',
                this.model.getFontStyles().size
            );
            this.notifyChange();
        });

        // Horizontal Alignment radio buttons
        const hAlignLeftRadio = this.querySelector(`#texbox-toogle-h-left${id}`);
        const hAlignCenterRadio = this.querySelector(`#texbox-toogle-h-center${id}`);
        const hAlignRightRadio = this.querySelector(`#texbox-toogle-h-right${id}`);

        hAlignLeftRadio.addEventListener('change', () => {
            if (hAlignLeftRadio.checked) {
                this.model.setHorizontalAlign('left');
                this.notifyChange();
            }
        });

        hAlignCenterRadio.addEventListener('change', () => {
            if (hAlignCenterRadio.checked) {
                this.model.setHorizontalAlign('center');
                this.notifyChange();
            }
        });

        hAlignRightRadio.addEventListener('change', () => {
            if (hAlignRightRadio.checked) {
                this.model.setHorizontalAlign('right');
                this.notifyChange();
            }
        });

        // Vertical Alignment radio buttons
        const vAlignTopRadio = this.querySelector(`#texbox-toogle-v-top${id}`);
        const vAlignCenterRadio = this.querySelector(`#texbox-toogle-v-center${id}`);
        const vAlignBottomRadio = this.querySelector(`#texbox-toogle-v-bottom${id}`);

        vAlignTopRadio.addEventListener('change', () => {
            if (vAlignTopRadio.checked) {
                this.model.setVerticalAlign('top');
                this.notifyChange();
            }
        });

        vAlignCenterRadio.addEventListener('change', () => {
            if (vAlignCenterRadio.checked) {
                this.model.setVerticalAlign('center');
                this.notifyChange();
            }
        });

        vAlignBottomRadio.addEventListener('change', () => {
            if (vAlignBottomRadio.checked) {
                this.model.setVerticalAlign('end');
                this.notifyChange();
            }
        });

        // Color picker
        const colorPicker = document.getElementById("font-color-picker-" + id);
        colorPicker.addEventListener('input', (event) => {
            const color = event.target.value;
            this.model.setFontStyles(
                this.model.getFontStyles().family,
                this.model.getFontStyles().weight,
                color,
                this.model.getFontStyles().style,
                this.model.getFontStyles().size
            );
            this.notifyChange();
        });

        // Font size picker
        const sizePicker = document.getElementById("font-size-picker-" + id);
        sizePicker.addEventListener('focusout', (event) => {
            const size = parseInt(event.target.value);
            this.model.setFontStyles(
                this.model.getFontStyles().family,
                this.model.getFontStyles().weight,
                this.model.getFontStyles().color,
                this.model.getFontStyles().style,
                size
            );
            this.notifyChange();
        });

        // Input field
        const inputField = document.getElementById("text-input-" + id);
        inputField.addEventListener('focusout', (event) => {
            const text = event.target.value;
            this.model.setText(text);
            this.notifyChange();
        });
    }
}

customElements.define('text-input', TextInput);