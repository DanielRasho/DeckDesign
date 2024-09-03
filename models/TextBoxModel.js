export class FontStyles {
    constructor ( family, weight, color, style ) {
        this.family = family
        this.weight = weight
        this.color = color
        this.style = style
    }
}

export class TextBoxModel {
    constructor( dragabbleElement, fontStyles, vAlign, hAlign) {
        this.dragabbleElement = dragabbleElement
        this.fontStyles = fontStyles
        this.vAlign = vAlign
        this.hAlign = hAlign
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

    // Accessor methods for FontStyles
    getFontStyles() {
        return {
            family: this.fontStyles.family,
            weight: this.fontStyles.weight,
            color: this.fontStyles.color,
            style: this.fontStyles.style
        };
    }

    setFontStyles(family, weight, color, style) {
        this.fontStyles.family = family;
        this.fontStyles.weight = weight;
        this.fontStyles.color = color;
        this.fontStyles.style = style;
    }

    // Accessor methods for alignment
    getVerticalAlign() {
        return this.vAlign;
    }

    setVerticalAlign(vAlign) {
        this.vAlign = vAlign;
    }

    getHorizontalAlign() {
        return this.hAlign;
    }

    setHorizontalAlign(hAlign) {
        this.hAlign = hAlign;
    }
}