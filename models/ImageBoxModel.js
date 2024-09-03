
export class ImageBoxModel {
    constructor(dragabbleElement, image) {
        this.dragabbleElement = dragabbleElement
        this.image = image
    }

    // Accessor methods for DragabbleElement
    getPosition() {
        return {
            x: this.dragabbleElement.x,
            y: this.dragabbleElement.y
        };
    }

    setPosition(x, y) {
        this.dragabbleElement.x = x;
        this.dragabbleElement.y = y;
    }

    getSize() {
        return {
            width: this.dragabbleElement.width,
            height: this.dragabbleElement.height
        };
    }

    setSize(width, height) {
        this.dragabbleElement.width = width;
        this.dragabbleElement.height = height;
    }

    getZIndex() {
        return this.dragabbleElement.zIndex;
    }

    setZIndex(zIndex) {
        this.dragabbleElement.zIndex = zIndex;
    }
}