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
        textBoxes = new Map(), 
        images = new Map(), 
        CardBackground = new CardBackground(CARD_BACKGROUND_TYPES.SOLID, '#FFFFFF')
    ) {
        this.textBoxes = textBoxes
        this.images = images
        this.CardBackground = CardBackground
    }
    
    addTextBox(textBox){
        this.textBoxes.push(textBox)
    }
}