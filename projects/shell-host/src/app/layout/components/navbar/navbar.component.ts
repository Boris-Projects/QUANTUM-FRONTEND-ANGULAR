import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MATERIAL_MODULES } from '@ui-core';
import { MatMenuTrigger } from '@angular/material/menu';

@Component({
	selector: 'shell-host-navbar',
	standalone: true,
	imports: [
		CommonModule
		, ...MATERIAL_MODULES
	],
	templateUrl: './navbar.component.html',
	styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
	private menuCloseTimeout: any;

	openMegaMenu(trigger: MatMenuTrigger) {
		clearTimeout(this.menuCloseTimeout);
		trigger.openMenu();
	}

	closeMegaMenu(trigger: MatMenuTrigger) {
		this.menuCloseTimeout = setTimeout(() => {
			trigger.closeMenu();
		}, 50);
	}
}
