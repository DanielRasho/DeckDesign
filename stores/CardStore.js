import { CardModel } from "../models/CardModel.js"
import { DEFAULT_FONT_STYLES, TextBoxModel } from "../models/TextBoxModel.js"
import { DragabbleElement } from "../models/DragabbleElement.js"

export const MAIN_CARD = new CardModel()

MAIN_CARD.addTextBox(new TextBoxModel(
    new DragabbleElement(
        'card-previewer',
        10, 10,
        60, 30,
        2,
    ),
    "HELLO",
    {...DEFAULT_FONT_STYLES}
))