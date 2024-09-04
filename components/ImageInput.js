import { MAIN_CARD } from "../stores/CardStore.js";

export class ImageInput extends HTMLElement {
    constructor() {
        super();
        this.model = null;
    }

    static get observedAttributes() {
        return ['image-box-id'];
    }

    setModel(model) {
        this.model = model;
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue !== newValue) {
            this.render();
        }
    }

    disconnectCallback() {
        const id = this.getAttribute('image-box-id');
        const deleteBtn = document.getElementById('delete-image-btn-' + id);
        deleteBtn.removeEventListener('click', this.deleteItself);
    }

    deleteItself() {
        const id = this.getAttribute('image-box-id');
        const deleteBtn = this.querySelector(`#delete-image-btn-${id}`);
        deleteBtn.addEventListener('click', () => {
            MAIN_CARD.removeImage(id); // Remove the model
            MAIN_CARD.notifyChange();
        });
    }

    connectedCallback() {
        this.render();
        this.addEventListeners();
        this.deleteItself();
    }

    render() {
        const id = this.getAttribute('image-box-id');
        const deleteBtn = "delete-image-btn-" + id;
        const imageInputID = 'image-input-' + id;

        const filename = this.model.filename

        this.innerHTML = /*html*/`
        <div>
            <input
                class="image-input"
                type="file"
                id="${imageInputID}"
                accept="image/png, image/jpeg, image/webp"
            >
            <label for="${imageInputID}">
                ${filename}
            </label>
            <button id=${deleteBtn} class="text-delete-btn">
                <i class="fa-regular fa-trash-can"></i>
            </button>
        </div>
        `;
    }

    addEventListeners() {
        const id = this.getAttribute('image-box-id');
        const imageInput = this.querySelector(`#image-input-${id}`);

        imageInput.addEventListener('change', (event) => {
            const file = event.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = () => {
                    // Update the model with the base64 image
                    this.model.image = reader.result;
                    this.model.filename = file.name
                    MAIN_CARD.notifyChange();
                };
                reader.readAsDataURL(file);
            }
        });
    }
}

// Define the custom element
customElements.define('image-input', ImageInput);
