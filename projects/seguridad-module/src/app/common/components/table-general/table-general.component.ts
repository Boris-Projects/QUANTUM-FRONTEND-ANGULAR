import { Component, EventEmitter, Input, Output, TemplateRef } from '@angular/core';
import { ITableColumn, ITableSort } from '../interfaces/ITableGeneral.interface';
import { MATERIAL_MODULES } from '@ui-core';
import { CommonModule } from '@angular/common';

import { MatTableDataSource } from '@angular/material/table';
import { Sort } from '@angular/material/sort';
import { PageEvent } from '@angular/material/paginator';

@Component({
	selector: 'seguridad-module-table-general',
	standalone: true,
	imports: [
		...MATERIAL_MODULES,
		CommonModule,
	],
	templateUrl: './table-general.component.html',
	styleUrl: './table-general.component.scss'
})
export class TableGeneralComponent<T> {
	@Input() columns: ITableColumn[] = [];
	@Input() set data(data: T[]) {
		this.dataSource.data = data;
	}
	
	@Input() totalItems: number = 0;

	// Evento que notifica al componente padre cuando el usuario ordena
	@Output() onSortChange = new EventEmitter<ITableSort>();
	// Evento para la paginación
	@Output() onPageChange = new EventEmitter<PageEvent>();

	dataSource = new MatTableDataSource<T>();
	displayedColumns: string[] = [];

	ngOnInit() {
		this.displayedColumns = this.columns.map(c => c.key);
	}

	// Captura el evento de ordenamiento y lo emite
	handleSortChange(sort: Sort) {
		this.onSortChange.emit({
			column: sort.active,
			direction: sort.direction as 'asc' | 'desc'
		});
	}

	// Captura el evento de paginación y lo emite
	handlePageEvent(event: PageEvent) {
		this.onPageChange.emit(event);
	}

	// Helper para encontrar la plantilla de celda correcta
	getCellTemplate(key: string): TemplateRef<any> | null {
		const column = this.columns.find(c => c.key === key);
		return column?.cellTemplate || null;
	}
}
