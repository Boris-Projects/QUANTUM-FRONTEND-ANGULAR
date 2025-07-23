import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MATERIAL_MODULES } from '@ui-core';

@Component({
	selector: 'shell-host-sidebar',
	standalone: true,
	imports: [
		...MATERIAL_MODULES,
		RouterModule
	],
	templateUrl: './sidebar.component.html',
	styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {

}
