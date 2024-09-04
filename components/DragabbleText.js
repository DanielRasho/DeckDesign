class DraggableText extends HTMLElement {
    constructor() {
        super();
    }

    static get observedAttributes() {
        return ['x', 'y', 'width', 'height', 'zindex', 'font-family', 'font-weight', 'color', 'font-style', 'text-align', 'vertical-align', 'text'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        this.render();
    }

    connectedCallback() {
        this.render();
    }

    render() {

        // Fetch attributes
        const x = this.getAttribute('x') || '0';
        const y = this.getAttribute('y') || '0';
        const width = this.getAttribute('width') || '100';
        const height = this.getAttribute('height') || '100';
        const zindex = this.getAttribute('zindex') || '1';
        const fontFamily = this.getAttribute('font-family') || 'Arial';
        const fontWeight = this.getAttribute('font-weight') || 'normal';
        const color = this.getAttribute('color') || '#000000';
        const fontStyle = this.getAttribute('font-style') || 'normal';
        const textAlign = this.getAttribute('text-align') || 'center';
        const verticalAlign = this.getAttribute('vertical-align') || 'top';
        const text = this.getAttribute('text') || '';
    
        this.innerHTML = `
            <style>
                .text-box {
                    position: absolute;
                    left: ${x}px;
                    top: ${y}px;
                    width: ${width}px;
                    height: ${height}px;
                    z-index: ${zindex};
                    font-family: ${fontFamily};
                    font-weight: ${fontWeight};
                    color: ${color};
                    font-style: ${fontStyle};
                    text-align: ${textAlign};
                    vertical-align: ${verticalAlign};
                }
            </style>
            <div class="text-box">${text}</div>
        `;
    }
}

customElements.define('dragabble-text', DraggableText);