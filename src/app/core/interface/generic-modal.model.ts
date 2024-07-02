import { ButtonModel } from "./generic-button.model";

export interface ModalModel {
    header?: string;
    imagen?: string
    text?: string;
    buttons?: ButtonModel[];
}

