import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MATERIAL_MODULES } from '@ui-core';
import { ISubMenuItem } from '../../interfaces/IMenu.interface';

@Component({
	selector: 'shell-host-submenu-item',
	standalone: true,
	imports: [
		...MATERIAL_MODULES,
		RouterModule,
		CommonModule,
		SubmenuItemComponent
	],
	templateUrl: './submenu-item.component.html',
	styleUrl: './submenu-item.component.scss'
})
export class SubmenuItemComponent {
	@Input() items: ISubMenuItem[] = [];
}
