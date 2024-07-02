import { ButtonModel } from "./generic-button.model"

export interface TableModel {
    columns: Column[];
    values: any[];
    actions?: ButtonModel;
    caption?: string;
    subtitle?: string;
    button?: ButtonModel;
    showCant?: boolean;
    showFilter?: boolean;
    footerHeader?: Column[];
    footerValue?: any[];
    filter?: FilterTable[];
    textCenter?: boolean;
    message?:string;
    cellCond?: (value: any, header: string) => string
    cellCheck?: (value: any) => boolean;
    clickCheck?:(id: number) =>void;
    rowChecked?:(value: any)=>boolean;
    loading?:(value: any)=>boolean;
}

export interface Column {
    field: string;
    header: string;
    type: ColumnType;
    pFrozenColumn?: boolean;
}

export type ColumnType  = 
| 'number'
| 'string'
| 'Date'
| 'Hour'

export interface FilterTable {
    control: string;
    type: FilterType;
    options: any[];
    icon?: string;
    placeholder?: string;
}

export type FilterType  = 
| 'selection'
| 'date'