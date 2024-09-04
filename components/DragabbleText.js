import { MAIN_CARD } from "../stores/CardStore.js";

class DraggableText extends HTMLElement {
    constructor() {
        super();
        this.isDragging = false;
        this.isResizing = false;
        this.startX = 0;
        this.startY = 0;
        this.initialLeft = 0;
        this.initialTop = 0;
        this.initialWidth = 0;
        this.initialHeight = 0;
    }

    static get observedAttributes() {
        return [
            'dragabble-text-id',
            'x', 'y', 'width', 'height', 'zindex', 
            'font-family', 'font-weight', 'color', 
            'font-style', 'text-align', 'vertical-align', 
            'text'
        ];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        this.render();
    }

    connectedCallback() {
        this.render();
        this.addEventListeners();
    }

    addEventListeners() {
        this.addEventListener('mousedown', (e) => {
            if (e.target.classList.contains('resizer')) {
                this.isResizing = true;
                this.startX = e.clientX;
                this.startY = e.clientY;
                this.initialWidth = parseInt(this.style.width, 10) || 100;
                this.initialHeight = parseInt(this.style.height, 10) || 100;
                document.addEventListener('mousemove', this.onResize);
                document.addEventListener('mouseup', this.onResizeEnd);
            } else {
                this.isDragging = true;
                this.startX = e.clientX;
                this.startY = e.clientY;
                this.initialLeft = parseInt(this.style.left, 10) || 0;
                this.initialTop = parseInt(this.style.top, 10) || 0;
                document.addEventListener('mousemove', this.onDrag);
                document.addEventListener('mouseup', this.onDragEnd);
            }
        });
    }

    onDrag = (e) => {
        if (!this.isDragging) return;

        const container = this.parentElement;
        const containerRect = container.getBoundingClientRect();

        let newLeft = this.initialLeft + e.clientX - this.startX;
        let newTop = this.initialTop + e.clientY - this.startY;

        // Constrain movement within the container
        if (newLeft < 0) newLeft = 0;
        if (newTop < 0) newTop = 0;
        if (newLeft + this.offsetWidth > containerRect.width) {
            newLeft = containerRect.width - this.offsetWidth;
        }
        if (newTop + this.offsetHeight > containerRect.height) {
            newTop = containerRect.height - this.offsetHeight;
        }

        this.style.left = `${newLeft}px`;
        this.style.top = `${newTop}px`;
        
        const id = this.getAttribute('dragabble-text-id') || 0;
        MAIN_CARD.textBoxes[id].setPosition(newLeft, newTop);
    }

    onResize = (e) => {
        if (!this.isResizing) return;

        const newWidth = this.initialWidth + (e.clientX - this.startX);
        const newHeight = this.initialHeight + (e.clientY - this.startY);

        this.style.width = `${Math.max(newWidth, 30)}px`; // Minimum width
        this.style.height = `${Math.max(newHeight, 30)}px`; // Minimum height
        
        const id = this.getAttribute('dragabble-text-id') || 0;
        MAIN_CARD.textBoxes[id].setSize(newWidth, newHeight);
    }

    onDragEnd = () => {
        this.isDragging = false;
        document.removeEventListener('mousemove', this.onDrag);
        document.removeEventListener('mouseup', this.onDragEnd);
    }

    onResizeEnd = () => {
        this.isResizing = false;
        document.removeEventListener('mousemove', this.onResize);
        document.removeEventListener('mouseup', this.onResizeEnd);
    }

    render() {
        const x = this.getAttribute('x') || '0';
        const y = this.getAttribute('y') || '0';
        const width = this.getAttribute('width') || '100';
        const height = this.getAttribute('height') || '100';
        const zindex = this.getAttribute('zindex') || '1';
        const fontFamily = this.getAttribute('font-family') || 'Arial';
        const fontWeight = this.getAttribute('font-weight') || 'normal';
        const color = this.getAttribute('color') || '#000000';
        const fontStyle = this.getAttribute('font-style') || 'normal';
        const fontSize = this.getAttribute('font-size') || '16';
        const textAlign = this.getAttribute('text-align') || 'center';
        const verticalAlign = this.getAttribute('vertical-align') || 'top';
        const text = this.getAttribute('text') || '';

        this.style.position = 'absolute';
        this.style.left = `${x}px`;
        this.style.top = `${y}px`;
        this.style.width = `${width}px`;
        this.style.height = `${height}px`;
        this.style.fontSize = `${fontSize}px`;
        this.style.zIndex = zindex;
        this.style.cursor = 'grab';
        this.style.boxSizing = 'border-box';
        this.style['justify-content'] = verticalAlign;

        const textBox = document.createElement('div');
        textBox.style.width = '100%';
        textBox.style.display = 'flex';
        textBox.style.alignItems = verticalAlign;
        textBox.style.justifyContent = textAlign;
        textBox.textContent = text;
        textBox.style.fontFamily = fontFamily;
        textBox.style.fontWeight = fontWeight;
        textBox.style.color = color;
        textBox.style.fontStyle = fontStyle;
        textBox.style.textAlign = textAlign;

        // Add resizer handles
        const resizer = document.createElement('div');
        resizer.className = 'resizer';
        resizer.style.position = 'absolute';
        resizer.style.width = '10px';
        resizer.style.height = '10px';
        resizer.style.right = '0';
        resizer.style.bottom = '0';
        resizer.style.cursor = 'nwse-resize';

        this.innerHTML = ''; // Clear existing content
        this.appendChild(textBox);
        this.appendChild(resizer);
    }
}

customElements.define('dragabble-text', DraggableText);