import { MAIN_CARD } from "../stores/CardStore.js";
import { TextBoxModel } from "../models/TextBoxModel.js";
import { DragabbleElement } from "../models/DragabbleElement.js";
import { DEFAULT_FONT_STYLES } from "../models/TextBoxModel.js";

class DesignView extends HTMLElement {
    
    constructor() {
        super()
    }

    connectedCallback() {
        this.render()
        this.recreateTextInputs()
        this.addTextFieldListener()
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
            textInput.parentRender = () => this.recreateTextInputs();

            sectionTexts.append(textInput)
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
                            content
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
                            content
                        </div>
                    </li>
                </ul>
            </div>
            <div class='design-view_preview'>
                <div id='card-previewer' class='card-previewer'>
                </div>
                <div> 
                    <main-button 
                        text="Export" after-icon="fa-solid fa-arrow-right" 
                        button-id="export-btn">
                </div>
            </div>
        </div>
        `;
        
    }
}
customElements.define('design-view', DesignView);