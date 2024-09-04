class HomeView extends HTMLElement {
    connectedCallback() {
        this.innerHTML = /*html*/`
        <h1>Welcome to Home</h1>
        `;
    }
}
customElements.define('home-view', HomeView);