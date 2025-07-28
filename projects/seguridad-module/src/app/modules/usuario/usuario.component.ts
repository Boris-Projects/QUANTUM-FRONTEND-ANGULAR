import { CommonModule } from '@angular/common';
import { Component, TemplateRef, ViewChild } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormBuilder } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';
import { MATERIAL_MODULES } from '@ui-core';
import { ITableColumn, ITableSort } from '../../common/components/interfaces/ITableGeneral.interface';
import { TableGeneralComponent } from '../../common/components/table-general/table-general.component';

// Define la interfaz para el objeto Usuario
export interface IUsuario {
	iIdUsuario: number;
	vUsuario: string;
	bActivo: boolean;
	iIdTipoUsuario: number;
	iIdPerDet: number;
	iIdPersona: number;
	bChangePassword?: boolean;
}

@Component({
	selector: 'seguridad-module-usuario',
	standalone: true,
	imports: [
		CommonModule,
        ReactiveFormsModule,
        TableGeneralComponent, // Tu tabla reutilizable
        ...MATERIAL_MODULES  // Importa todos tus módulos de Material
	],
	templateUrl: './usuario.component.html',
	styleUrl: './usuario.component.scss'
})
export class UsuarioComponent {
	// Referencia a la plantilla para la columna de acciones
    @ViewChild('actionsTemplate', { static: true })
    actionsTemplate!: TemplateRef<any>;

    public userColumns: ITableColumn[] = [];
    public userData: IUsuario[] = [];
    public totalItems: number = 0;
    public filterForm: FormGroup;

	private currentPage?: PageEvent;
    private currentSort?: ITableSort;

    // Aquí pegarías la data que me pasaste
    private fullUserData: IUsuario[] = [
      {"iIdUsuario":21,"vUsuario":"bestradas","bActivo":true,"iIdTipoUsuario":1,"iIdPerDet":21,"iIdPersona":21,"bChangePassword":true},
      {"iIdUsuario":22,"vUsuario":"v.estrada","bActivo":true,"iIdTipoUsuario":1,"iIdPerDet":22,"iIdPersona":22,"bChangePassword":true},
      {"iIdUsuario":23,"vUsuario":"test","bActivo":true,"iIdTipoUsuario":1,"iIdPerDet":23,"iIdPersona":23,"bChangePassword":true},
      {"iIdUsuario":24,"vUsuario":"admin","bActivo":true,"iIdTipoUsuario":1,"iIdPerDet":24,"iIdPersona":24,"bChangePassword":false},
      {"iIdUsuario":25,"vUsuario":"test","bActivo":true,"iIdTipoUsuario":1,"iIdPerDet":25,"iIdPersona":25,"bChangePassword":false},
      // ... y el resto de los 200+ registros
    ];

    constructor(private fb: FormBuilder) {
        this.filterForm = this.fb.group({
            search: [''],
            status: [null]
        });
    }

    ngOnInit(): void {
        this.userColumns = [
            { key: 'iIdUsuario', label: 'ID', sortable: true },
            { key: 'vUsuario', label: 'Nombre de Usuario', sortable: true },
            { 
				key: 'bActivo',
				label: 'Estado', 
				// cellTemplate: this.statusTemplate // Usaremos una plantilla para el estado
            },
            { key: 'acciones', label: 'Acciones', cellTemplate: this.actionsTemplate } // Columna personalizada
        ];

        this.loadUsers();
    }

    // Simula la llamada a la API con filtros, paginación y ordenamiento
    loadUsers(): void {
        // 1. Obtiene el estado actual de los filtros, orden y paginación
        const filters = this.filterForm.value;
        const sort = this.currentSort;
        const page = this.currentPage;

        console.log('Cargando usuarios con:', { filters, sort, page });

        // --- Simulación del Backend ---

        // 2. Filtrado: Comienza con la lista completa de datos
        let filteredData = this.fullUserData.filter(user => {
            const searchFilter = filters.search?.toLowerCase() || '';
            const statusFilter = filters.status;

            // Comprueba si el nombre de usuario incluye el texto de búsqueda
            const matchesSearch = user.vUsuario.toLowerCase().includes(searchFilter);
            
            // Comprueba si el estado coincide (o si el filtro es "Todos")
            const matchesStatus = statusFilter === null || user.bActivo === statusFilter;

            return matchesSearch && matchesStatus;
        });

        // 3. Ordenamiento: Si hay un orden definido, lo aplica
        if (sort && sort.direction) {
            filteredData.sort((a, b) => {
                const isAsc = sort.direction === 'asc';
                const valueA = a[sort.column as keyof IUsuario];
                const valueB = b[sort.column as keyof IUsuario];

                if (typeof valueA === 'string' && typeof valueB === 'string') {
                    return valueA.localeCompare(valueB) * (isAsc ? 1 : -1);
                }
                if (typeof valueA === 'number' && typeof valueB === 'number') {
                    return (valueA < valueB ? -1 : 1) * (isAsc ? 1 : -1);
                }
                return 0;
            });
        }
        
        // 4. Paginación: Corta el array para la página actual
        
        // Antes de paginar, actualizamos el total de items con la longitud del array filtrado
        this.totalItems = filteredData.length;

        // Define valores por defecto para la paginación si aún no se ha interactuado con ella
        const pageIndex = page?.pageIndex || 0;
        const pageSize = page?.pageSize || 10;
        
        const startIndex = pageIndex * pageSize;
        const endIndex = startIndex + pageSize;

        // Asigna los datos paginados a la propiedad que usa la tabla
        this.userData = filteredData.slice(startIndex, endIndex);
    }
    
    editUser(user: IUsuario): void {
        console.log('Editando usuario:', user);
        // Aquí iría la lógica para abrir un modal o navegar a una página de edición
    }
    
    deleteUser(user: IUsuario): void {
        console.log('Eliminando usuario:', user);
        // Aquí iría la lógica de confirmación y llamada a la API para eliminar
    }

	// NUEVO MANEJADOR PARA EL ORDENAMIENTO
    onSort(sort: ITableSort): void {
        this.currentSort = sort;
        this.loadUsers(); // Vuelve a cargar los datos con el nuevo orden
    }

    // NUEVO MANEJADOR PARA LA PAGINACIÓN
    onPage(page: PageEvent): void {
        this.currentPage = page;
        this.loadUsers(); // Vuelve a cargar los datos para la nueva página
    }
}
