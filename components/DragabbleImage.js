import { MAIN_CARD } from "../stores/CardStore.js";

class DraggableImage extends HTMLElement {
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
        return ['dragabble-image-id', 'x', 'y', 'width', 'height', 'zindex', 'image'];
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

        const id = this.getAttribute('dragabble-image-id') || 0;
        MAIN_CARD.images[id].setPosition(newLeft, newTop);
    }

    onResize = (e) => {
        if (!this.isResizing) return;

        let newWidth = this.initialWidth + (e.clientX - this.startX);
        let newHeight = this.initialHeight + (e.clientY - this.startY);

        // Constrain resizing within the container
        const container = this.parentElement;
        const containerRect = container.getBoundingClientRect();

        if (newWidth + this.offsetLeft > containerRect.width) {
            newWidth = containerRect.width - this.offsetLeft;
        }
        if (newHeight + this.offsetTop > containerRect.height) {
            newHeight = containerRect.height - this.offsetTop;
        }

        this.style.width = `${Math.max(newWidth, 30)}px`; // Minimum width
        this.style.height = `${Math.max(newHeight, 30)}px`; // Minimum height
        
        const id = this.getAttribute('dragabble-image-id') || 0;
        MAIN_CARD.images[id].setSize(newWidth, newHeight);
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
        const imageUrl = this.getAttribute('image') || '';

        this.style.position = 'absolute';
        this.style.left = `${x}px`;
        this.style.top = `${y}px`;
        this.style.width = `${width}px`;
        this.style.height = `${height}px`;
        this.style.zIndex = zindex;
        this.style.cursor = 'grab';
        this.style.boxSizing = 'border-box';

        const img = document.createElement('img');
        img.src = imageUrl;
        img.style.width = '100%';
        img.style.height = '100%';
        img.style.objectFit = 'cover';

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
        this.appendChild(img);
        this.appendChild(resizer);
    }
}

customElements.define('dragabble-image', DraggableImage);