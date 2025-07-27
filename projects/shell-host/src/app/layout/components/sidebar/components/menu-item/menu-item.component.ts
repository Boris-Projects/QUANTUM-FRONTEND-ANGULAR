import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MATERIAL_MODULES } from '@ui-core';

interface MenuItem {
    icon: string;
    tooltip: string; // Cambiado de 'tooltip' a 'title' para mayor claridad
    title: string;
    route?: string;
    children?: SubMenuItem[];
}


interface SubMenuItem {
    label: string;
    route: string;
    icon?: string;
    children?: SubMenuItem[];
}

@Component({
	selector: 'shell-host-menu-item',
	standalone: true,
	imports: [
		CommonModule, RouterModule, ...MATERIAL_MODULES
	],
	templateUrl: './menu-item.component.html',
	styleUrl: './menu-item.component.scss'
})
export class MenuItemComponent {
	@Input() item!: MenuItem;
	@Input() isActive: boolean = false;
	@Output() itemClick = new EventEmitter<MenuItem>();

	onItemClicked(): void {
		this.itemClick.emit(this.item);
	}
}
