import { MAIN_CARD } from "../stores/CardStore.js";

export class TextInput extends HTMLElement {
    constructor() {
        super();
        this.model = null;
        this.notifyChange = MAIN_CARD.notifyChange
    }

    static get observedAttributes() {
        return ['text-box-id'];
    }

    setModel(model) {
        this.model = model;
        this.bold = model.getFontStyles().weight === 'bold';
        this.italic = model.getFontStyles().style === 'italic';
        this.color = model.getFontStyles().color;
        //this.parentRender = () => {} // Parent function for render
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue !== newValue) {
            this.render();
        }
    }

    disconnectCallback(){
        const id = this.getAttribute('text-box-id');
        const deleteBtn = document.getElementById('delete-btn-'+ id)
        deleteBtn.removeEventListener('click', () => {}) // HERE IS THE LOGIC FOR DELETING
    }

    deleteItself() {
        const id = this.getAttribute('text-box-id');
        const deleteBtn = this.querySelector(`#delete-btn-${id}`);
        deleteBtn.addEventListener('click', () => {
            MAIN_CARD.removeTextBox(id); // Remove the model
            MAIN_CARD.notifyChange()
        });
    }

    connectedCallback() {
        this.render();
        this.addEventListeners();
        this.deleteItself();
    }

    render() {
        const id = this.getAttribute('text-box-id');

        const deleteBtn = "delete-btn-" + id
        
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
            <input id="${"text-input-"+id}" class="text-input" type='text' value="${this.model.getText()}">
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
                            ${this.bold ? 'checked' : ''}>
                        <label for="${textBoxIDBold}">
                            <i class="fa-solid fa-bold"></i>
                        </label>
                        <input 
                            type="checkbox"
                            id="${textBoxIDItalic}"
                            ${this.italic ? 'checked' : ''}>
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
                            ${this.model.getVerticalAlign() === 'middle' ? 'checked' : ''}>
                        <label for="${textBoxVAlignCenter}">
                            <i class="fa-solid fa-left-right"></i>
                        </label>
                        <input 
                            type="radio"
                            id=${textBoxVAlignBottom}
                            name=${textBoxVAlignName}
                            ${this.model.getVerticalAlign() === 'bottom' ? 'checked' : ''}>
                        <label for="${textBoxVAlignBottom}">
                            <i class="fa-solid fa-down-long"></i>
                        </label>
                    </div>
                </div>
                <input type="color" value="${this.color}">
            </div>
        </div>
        `;
    }

    addEventListeners() {
        const id = this.getAttribute('text-box-id');

        // Bold checkbox
        const boldCheckbox = this.querySelector(`#texbox-toogle-bold${id}`);
        boldCheckbox.addEventListener('change', (event) => {
            this.bold = event.target.checked;
            this.model.setFontStyles(
                this.model.getFontStyles().family,
                this.bold ? 'bold' : 'normal',
                this.model.getFontStyles().color,
                this.model.getFontStyles().style
            );
            this.notifyChange()
        });

        // Italic checkbox
        const italicCheckbox = this.querySelector(`#texbox-toogle-italic${id}`);
        italicCheckbox.addEventListener('change', (event) => {
            this.italic = event.target.checked;
            this.model.setFontStyles(
                this.model.getFontStyles().family,
                this.model.getFontStyles().weight,
                this.model.getFontStyles().color,
                this.italic ? 'italic' : 'normal'
            );
            this.notifyChange()
        });

        // Horizontal Alignment radio buttons
        const hAlignLeftRadio = this.querySelector(`#texbox-toogle-h-left${id}`);
        const hAlignCenterRadio = this.querySelector(`#texbox-toogle-h-center${id}`);
        const hAlignRightRadio = this.querySelector(`#texbox-toogle-h-right${id}`);

        hAlignLeftRadio.addEventListener('change', () => {
            if (hAlignLeftRadio.checked) {
                this.model.setHorizontalAlign('left');
                this.notifyChange()
            }
        });

        hAlignCenterRadio.addEventListener('change', () => {
            if (hAlignCenterRadio.checked) {
                this.model.setHorizontalAlign('center');
                this.notifyChange()
            }
        });

        hAlignRightRadio.addEventListener('change', () => {
            if (hAlignRightRadio.checked) {
                this.model.setHorizontalAlign('right');
                this.notifyChange()
            }
        });

        // Vertical Alignment radio buttons
        const vAlignTopRadio = this.querySelector(`#texbox-toogle-v-top${id}`);
        const vAlignCenterRadio = this.querySelector(`#texbox-toogle-v-center${id}`);
        const vAlignBottomRadio = this.querySelector(`#texbox-toogle-v-bottom${id}`);

        vAlignTopRadio.addEventListener('change', () => {
            if (vAlignTopRadio.checked) {
                this.model.setVerticalAlign('top');
                this.notifyChange()
            }
        });

        vAlignCenterRadio.addEventListener('change', () => {
            if (vAlignCenterRadio.checked) {
                this.model.setVerticalAlign('middle');
                this.notifyChange()
            }
        });

        vAlignBottomRadio.addEventListener('change', () => {
            if (vAlignBottomRadio.checked) {
                this.model.setVerticalAlign('bottom');
                this.notifyChange()
            }
        });

        // Color picker
        const colorPicker = this.querySelector('input[type="color"]');
        colorPicker.addEventListener('input', (event) => {
            this.color = event.target.value;
            this.model.setFontStyles(
                this.model.getFontStyles().family,
                this.model.getFontStyles().weight,
                this.color,
                this.model.getFontStyles().style
            );
            this.notifyChange()
        });

        // Text input
        const textInput = this.querySelector('#text-input-' + id);
        textInput.addEventListener('focusout', (event) => {
            this.model.setText(event.target.value);
            this.notifyChange()
        });
    }
}

// Define the custom element
customElements.define('text-input', TextInput);
