export class TextInput extends HTMLElement {
    constructor() {
        super();
        this._value = '';
    }

    connectedCallback() {
        this.render();
        this.querySelector('input').addEventListener('input', (e) => {
            this._value = e.target.value;
        });
    }
    
    render() {
        this.innerHTML = /*html*/`
        <input type='text' value="${this._value}">
        `;
    }

    get value() {
        return this._value;
    }

    set value(val) {
        this._value = val;
        if (this.isConnected) {
            this.querySelector('input').value = val;
        }
    }
}

// Define the custom element
customElements.define('text-input', TextInput);