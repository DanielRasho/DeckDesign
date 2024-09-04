class ExportView extends HTMLElement {
    
    constructor() {
        super()
    }

    connectedCallback() {
        this.render()
    }
    
    render() {
        this.innerHTML = `<h1>Export Your Card</h1>`;
    }
}
customElements.define('export-view', ExportView);