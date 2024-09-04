
export class mainButton extends HTMLElement {
    
    constructor(){
        super()
        this.callback = () => {}
    }

    static get observedAttributes() {
        return ['before-icon', 'text', 'after-icon', 'button-id'];
    }

    connectedCallback(){
        this.render()
        const buttonID = this.getAttribute('button-id') || '';
        let button = document.getElementById(buttonID)
        button.addEventListener('click', this.callback())
    }
    
    attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue !== newValue) {
            this.render();
        }
    }

    render() {
        
        const beforeIcon = this.getAttribute('before-icon') || '';
        const text = this.getAttribute('text') || '';
        const afterIcon = this.getAttribute('after-icon') || '';
        const buttonID = this.getAttribute('button-id') || '';

        this.innerHTML = /*html*/`
        <button id="${buttonID}" class="primary-button">
            ${ !!beforeIcon ? `<i class="${beforeIcon}"></i>` : ''}
            ${text}
            ${ !!afterIcon ? `<i class="${afterIcon}"></i>` : ''}
        </button>
        `
    }

    setCallback(callback) {
        this.callback = callback
    }
}

customElements.define('main-button', mainButton);