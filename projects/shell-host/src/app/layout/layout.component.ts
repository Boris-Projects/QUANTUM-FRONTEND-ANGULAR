import { Component, inject } from '@angular/core';
import { SidebarComponent } from "./components/sidebar/sidebar.component";
import { NavbarComponent } from "./components/navbar/navbar.component";
import { RouterOutlet } from '@angular/router';
import { Observable, map, shareReplay } from 'rxjs';
import { CommonModule } from '@angular/common';


// Para la lógica responsiva
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
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
	private breakpointObserver = inject(BreakpointObserver);

	isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
		.pipe(
			map(result => result.matches),
			shareReplay()
		);
}
