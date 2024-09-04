import { MAIN_CARD } from "../stores/CardStore.js";
import { TextBoxModel } from "../models/TextBoxModel.js";
import { ImageBoxModel } from "../models/ImageBoxModel.js";
import { DragabbleElement } from "../models/DragabbleElement.js";
import { DEFAULT_FONT_STYLES } from "../models/TextBoxModel.js";

class DesignView extends HTMLElement {
    
    constructor() {
        super()
    }

    connectedCallback() {
        this.render()
        this.recreateTextInputs()
        this.recreateImageInputs()
        this.addTextFieldListener()
        this.addImageFieldListener()
        this.addEventListeners()
        window.addEventListener('modelChange', (event) => {
            this.recreateTextInputs()
            this.recreateImageInputs()
        });
    }

    recreateTextInputs(){
        let textBoxes = MAIN_CARD.textBoxes
        const sectionTexts = document.getElementById('section-texts-list')
        sectionTexts.innerHTML = '' // Clear data
        
        textBoxes.forEach((textBoxModel, index) => {
            const textInput = document.createElement('text-input')
            
            textInput.setModel(textBoxModel)
            textInput.setAttribute('text-box-id', index)

            // HERE PASS THE RENDER FUNCTION
            // textInput.parentRender = () => this.recreateTextInputs();

            sectionTexts.append(textInput)
        })

    }

    recreateImageInputs(){
        let imageBoxes = MAIN_CARD.images
        const sectionTexts = document.getElementById('section-images-list')
        sectionTexts.innerHTML = '' // Clear data
        
        imageBoxes.forEach((imageBoxModel, index) => {
            const imageInput = document.createElement('image-input')
            
            imageInput.setModel(imageBoxModel)
            imageInput.setAttribute('image-box-id', index)

            // HERE PASS THE RENDER FUNCTION
            // textInput.parentRender = () => this.recreateTextInputs();

            sectionTexts.append(imageInput)
        })

    }

    addTextFieldListener(){
        const addTextFieldButton = document.getElementById('add-text-field-btn')
        addTextFieldButton.addEventListener('click', () => {
            MAIN_CARD.addTextBox(new TextBoxModel(
                new DragabbleElement(
                    'card-previewer',
                    10, 10,
                    60, 30,
                    2,
                ),
                "",
                DEFAULT_FONT_STYLES
            ))
            this.recreateTextInputs()
        })
    }

    addImageFieldListener(){
        const addImageFieldButton = document.getElementById('add-image-field-btn')
        addImageFieldButton.addEventListener('click', () => {
            MAIN_CARD.addImage(new ImageBoxModel(
                new DragabbleElement(
                    'card-previewer',
                    10, 10,
                    60, 30,
                    2,
                ),
                "",
                ""
            ))
            this.recreateImageInputs()
        })
    }
    
    render() {
        this.innerHTML = /*html*/`
        <div class='design-view'>
            <div class='design-view_controllers'>
                <ul>
                    <li>
                        <input 
                            type="radio" 
                            name="accordion" 
                            id="design-controls_general" 
                            checked>
                        <label for="design-controls_general">
                            <span class="section-header">General</span>
                            <span class="retro-font">01</span>
                        </label>
                        <div class="section-content">
                            <input
                                type="radio"
                                name="general-background"
                                id="general-background-color"
                                ${MAIN_CARD.cardBackground.type === 'SOLID' ? 'checked' : ''}
                            >
                            <label for="general-background-color">
                                Color
                            </label>
                            <input
                                type="radio"
                                name="general-background"
                                id="general-background-image"
                                ${MAIN_CARD.cardBackground.type === 'IMAGE' ? 'checked' : ''}
                            >
                            <label for="general-background-image"> 
                                Image
                            </label>
                            <input 
                                id="general-background-color-picker" 
                                type="color"
                                value="${MAIN_CARD.cardBackground.value}"
                            >
                            <input 
                                id="general-background-file-picker" 
                                type="file" 
                                accept="image/png, image/jpeg, image/webp"
                                value="${MAIN_CARD.cardBackground.value}"
                            >
                        </div>
                    </li>
                    <li>
                        <input 
                            type="radio"
                            name="accordion" 
                            id="design-controls_text">
                        <label for="design-controls_text">
                            <span class="section-header">Text</span>
                            <span class="retro-font">02</span>
                        </label>
                        <div id="section-texts" class="section-content">
                            <div id="section-texts-list">
                            </div>
                            <secondary-button 
                                text="New field" 
                                after-icon="fa-solid fa-plus" 
                                button-id="add-text-field-btn">
                        </div>
                    </li>
                    <li>
                        <input 
                            type="radio" 
                            name="accordion" 
                            id="design-controls_images">
                        <label for="design-controls_images">
                            <span class="section-header">Images</span>
                            <span class="retro-font">03</span>
                        </label>
                        <div class="section-content">
                            <div id="section-images-list">
                            </div>
                            <secondary-button 
                                text="New field" 
                                after-icon="fa-solid fa-plus" 
                                button-id="add-image-field-btn">
                        </div>
                    </li>
                </ul>
            </div>
            <div class='design-view_preview'>
                <card-editor class="card-editor">
                </card-editor>
                <div> 
                    <main-button 
                        text="Source Code" after-icon="fa-brands fa-github" 
                        button-id="source-code-btn">
                </div>
            </div>
        </div>
        `;
        
    }

    addEventListeners() {
        // Assuming MAIN_CARD is already defined somewhere in your script.
        const colorRadio = document.getElementById('general-background-color');
        const imageRadio = document.getElementById('general-background-image');
        const colorPicker = document.getElementById('general-background-color-picker');
        const filePicker = document.getElementById('general-background-file-picker');

        // Event listener for changing the background type to color
        colorRadio.addEventListener('change', function () {
            if (colorRadio.checked) {
                MAIN_CARD.cardBackground.type = 'SOLID';
                MAIN_CARD.cardBackground.value = colorPicker.value; // Set to current color picker value
                MAIN_CARD.notifyChange()
            }
        });

        // Event listener for changing the background type to image
        imageRadio.addEventListener('change', function () {
            if (imageRadio.checked) {
                MAIN_CARD.cardBackground.type = 'IMAGE';
                MAIN_CARD.cardBackground.value = ''; // Clear value since no image is selected yet
                MAIN_CARD.notifyChange()
            }
        });

        // Event listener for color picker changes
        colorPicker.addEventListener('input', function () {
            if (colorRadio.checked) {
                MAIN_CARD.cardBackground.value = colorPicker.value;
                MAIN_CARD.notifyChange()
            }
        });

        // Event listener for file picker changes
        filePicker.addEventListener('change', function () {
            if (imageRadio.checked && filePicker.files.length > 0) {
                const file = filePicker.files[0];
                const reader = new FileReader();
                
                reader.onload = function (e) {
                    MAIN_CARD.cardBackground.value = e.target.result; // Set base64 encoded image data
                    MAIN_CARD.notifyChange()
                };

                reader.readAsDataURL(file);
            }
        });

        const importantButton = document.getElementById('source-code-btn')
        importantButton.addEventListener('click', () => {
            window.open("https://github.com/DanielRasho/DeckDesign", '_blank');
        })
    }
}
customElements.define('design-view', DesignView);