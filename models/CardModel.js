export const CARD_BACKGROUND_TYPES = Object.freeze({
    SOLID : 'SOLID',
    IMAGE : 'IMAGE'   
})

export class CardBackground {
    constructor(type, value){
        this.type = type
        this.value = value
    }
}

export class CardModel {
    constructor(
        textBoxes = [], 
        images = [], 
        cardBackground = new CardBackground(CARD_BACKGROUND_TYPES.SOLID, '#FFFFFF')
    ) {
        this.textBoxes = textBoxes
        this.images = images
        this.cardBackground = cardBackground
    }
    
    addTextBox(textBox) {
        this.textBoxes.push(textBox)
        textBox.setZIndex(this.textBoxes.length)
    }

    removeTextBox(index) {
        this.textBoxes.splice(index, 1)
    }

    notifyChange() {
        const event = new CustomEvent('modelChange', { detail: this });
        window.dispatchEvent(event);
        console.log("SOMEONE MODIFIED ME");
    }
}