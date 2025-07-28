import { TemplateRef } from "@angular/core";

export interface ITableColumn {
    key: string; // El nombre de la propiedad en tu objeto de datos (ej: 'vUsuario')
    label: string; // El texto que se mostrará en la cabecera (ej: 'Usuario')
    sortable?: boolean; // Opcional: indica si la columna se puede ordenar
    cellTemplate?: TemplateRef<any>; // Opcional: para celdas con contenido personalizado (botones, badges, etc.)
}

// Define los eventos que la tabla emitirá
export interface ITableSort {
    column: string; // La columna por la que se ordena
    direction: 'asc' | 'desc'; // La dirección del ordenamiento
}