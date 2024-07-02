export interface ButtonModel {
    buttons: Button[];
    value?: any,
    style?: ButtonStyle;
}

export type ButtonStyle =
    | 'btn-primary'
    | 'btn-icon'
    | 'btn-check'

export interface Button {
    id?: string;
    label?: string;
    icon?: string;
    disabled?: boolean;
    style: ButtonStyle;
    loading?: () => boolean;
    function: (value: any) => void;
    disabledButton?: (value?: any) => boolean;
}