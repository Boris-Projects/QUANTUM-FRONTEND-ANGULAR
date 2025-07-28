import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MATERIAL_MODULES } from '@ui-core';
import { IMenuItem } from '../../interfaces/IMenu.interface';


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
	@Input() item!: IMenuItem;
	@Input() isActive: boolean = false;
	@Output() itemClick = new EventEmitter<IMenuItem>();

	onItemClicked(): void {
		this.itemClick.emit(this.item);
	}
}
