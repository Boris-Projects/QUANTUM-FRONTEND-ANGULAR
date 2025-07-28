import { CommonModule } from '@angular/common';
import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MATERIAL_MODULES } from '@ui-core';
import { MenuItemComponent } from './components/menu-item/menu-item.component';
import { IMenuItem } from './interfaces/IMenu.interface';
import { SubmenuItemComponent } from './components/submenu-item/submenu-item.component';

@Component({
	selector: 'shell-host-sidebar',
	standalone: true,
	imports: [
		...MATERIAL_MODULES,
		RouterModule,
		CommonModule,
		MenuItemComponent,
		SubmenuItemComponent
	],
	templateUrl: './sidebar.component.html',
	styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {

	@ViewChild('submenuPanel') submenuPanel!: ElementRef;

	isSubmenuOpen = false;
	selectedMenu: IMenuItem | null = null;

	// --- ARRAY ACTUALIZADO ---
    menuItems: IMenuItem[] = [
        {
			icon: 'dashboard'
			,title: 'DS'
			,tooltip: 'Dashboard'
			,color: '#a808ed'
			,route: '/dashboard'
		},
        { 
			icon: 'groups_3'
			,title: 'RH'
			,tooltip: 'Recursos Humanos'
			,color: '#4ac3c2'
			,children: [
				{
                    label: 'Colaboradores'
					,icon: 'groups_3'
                   	,route: '/seguridad'
                    // children: [
                    //     { label: 'Usuarios', route: '/seguridad/usuarios', icon: 'person' },
                    //     { label: 'Perfiles', route: '/seguridad/perfiles', icon: 'group' }
                    // ]
                },
				{
                    label: 'Organigrama'
					,icon: 'groups_3'
                    ,route: '/seguridad'
                    ,children: [
                        {
							label: 'Usuarios', route: '/seguridad/usuarios', icon: 'person'
							// ,children: [
							// 	{ label: 'Usuarios', route: '/seguridad/usuarios', icon: 'person' },
							// 	{ label: 'Perfiles', route: '/seguridad/perfiles', icon: 'group' }
							// ]
						},
                        { label: 'Perfiles', route: '/seguridad/perfiles', icon: 'group' }
                    ]
                }
			]
		},
        {
			icon: 'local_shipping'
			,title: 'LO'
			,tooltip: 'Logística'
			,color: '#6744ff'
			,children: [
				{
                    label: 'Proveedores',
                    route: '/seguridad',
                    children: [
                        { label: 'Usuarios', route: '/seguridad/usuarios', icon: 'person' },
                        { label: 'Perfiles', route: '/seguridad/perfiles', icon: 'group' }
                    ]
                },
			]
		},
        {
			icon: 'credit_score'
			,title: 'FI'
			,tooltip: 'Finanzas'
			,color: '#ff9044'
			,children: []
		},
		{
			icon: 'settings'
			,title: 'CO'
			,tooltip: 'Configuración'
			,color: '#44a2ff'
			,children: [
				{
                    label: 'Seguridad'
					,icon: 'security'
                    // ,route: '/seguridad'
                    ,children: [
                        { label: 'Usuarios', route: '/seguridad/usuario', icon: 'person' },
                        { label: 'Perfiles', route: '/seguridad/usuario', icon: 'group' }
                    ]
                },
				{
                    label: 'Maestras'
					,icon: 'cast_for_education'
                    ,route: '/maestras'
                    ,children: [
                        { label: 'Usuarios', route: '/seguridad/usuario', icon: 'person' },
                        { label: 'Perfiles', route: '/seguridad/usuario', icon: 'group' }
                    ]
                },
			]
		},
    ];


	toggleSubmenu(item: IMenuItem) {
        // Si se hace clic en un item sin hijos, no hacemos nada aquí
        if (!item.children || item.children.length === 0) {
            this.isSubmenuOpen = false;
            this.selectedMenu = null;
            return;
        }

        // Lógica para abrir/cerrar el panel
        if (this.selectedMenu === item && this.isSubmenuOpen) {
            this.isSubmenuOpen = false;
            this.selectedMenu = null;
        } else {
            this.selectedMenu = item;
            this.isSubmenuOpen = true;
        }
    }

    // 5. Simplifica el HostListener
    @HostListener('document:click', ['$event'])
    onDocumentClick(event: MouseEvent): void {
        if (!this.isSubmenuOpen) {
            return;
        }

        // Cierra el panel si el clic es fuera de él
        const clickedInsidePanel = this.submenuPanel.nativeElement.contains(event.target);
        
        // También verifica que no se haya hecho clic en uno de los botones del menú principal
        const clickedOnMenuItem = (event.target as HTMLElement).closest('shell-host-menu-item');

        if (!clickedInsidePanel && !clickedOnMenuItem) {
            this.isSubmenuOpen = false;
            this.selectedMenu = null;
        }
    }
}
