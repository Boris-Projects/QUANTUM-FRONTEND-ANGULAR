import { Component } from '@angular/core';
import { SidebarComponent } from "./components/sidebar/sidebar.component";
import { NavbarComponent } from "./components/navbar/navbar.component";
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';


import { MATERIAL_MODULES } from '@ui-core';

@Component({
	selector: 'shell-host-layout',
	standalone: true,
	imports: [
		SidebarComponent
		,NavbarComponent
		,RouterOutlet
		,CommonModule
		,...MATERIAL_MODULES
	],
	templateUrl: './layout.component.html',
	styleUrl: './layout.component.scss'
})
export class LayoutComponent {
	
}
