class DesignView extends HTMLElement {
    
    constructor() {
        super()
        this.textInput = null;
        this.shadow = this.attachShadow({mode: 'open'})
    }

    connectedCallback() {
        this.render()
    }
    
    render() {
        this.shadow.innerHTML = /*html*/`
        <link rel="stylesheet" href="./styles/main.css">
        <link rel="stylesheet" href="./styles/designView.css">
        <div class='design-view'>
            <div class='design-view_controllers'>
                <ul>
                    <li>
                        <input 
                            type="radio" 
                            name="accordion" 
                            id="design-controls_general">
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
                        <div class="section-content">
                            content
                        </div>
                    </li>
                    <li>
                        <input 
                            type="radio" 
                            name="accordion" 
                            id="design-controls_images">
                        <label for="design-controls_images">
                            <span class="section-header">Text</span>
                            <span class="retro-font">02</span>
                        </label>
                        <div class="section-content">
                            content
                        </div>
                    </li>
                </ul>
            </div>
            <div class='design-view_preview'>
                <div> CARD </div>
            </div>
        </div>
        `;
        
    }
}
customElements.define('design-view', DesignView);
