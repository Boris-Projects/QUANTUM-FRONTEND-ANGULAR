import { loadRemoteModule } from '@angular-architects/native-federation';
import { Routes } from '@angular/router';
import { AUTH_ROUTES } from './modules/auth/auth.routes';
import { LayoutComponent } from './layout/layout.component';
import { DashboardComponent } from './modules/main/dashboard/dashboard.component';

export const routes: Routes = [
    {
        path: '',
        children: AUTH_ROUTES
    },
     {
        // Rutas que usarán el LayoutComponent
        path: '',
        component: LayoutComponent,
        // canActivate: [AuthGuard], // Si ya tienes tu AuthGuard implementado aquí
        children: [
            {
                path: 'dashboard',
                component: DashboardComponent, // Usa el DashboardComponent de la nueva ubicación
                // canActivate: [AuthGuard] // Si necesitas proteger esta ruta individualmente
            },
            {
                path: 'seguridad',
                loadChildren: () =>
                    loadRemoteModule('seguridadModule', './Seguridad').then(m => m.SEGURIDAD_ROUTES),
                // canActivate: [AuthGuard]
            },
            {
                path: 'maestra',
                loadChildren: () =>
                    loadRemoteModule('maestraModule', './Maestra').then(m => m.MAESTRAS_ROUTES),
                // canActivate: [AuthGuard]
            },
            { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
        ]
    },
    // {
    //     path: 'seguridad',
    //     loadChildren: () =>
    //         loadRemoteModule('seguridadModule', './Seguridad').then(m => m.SEGURIDAD_ROUTES),
    // },
    // {
    //     path: 'maestra',
    //     loadChildren: () =>
    //         loadRemoteModule('maestraModule', './Maestra').then(m => m.MAESTRAS_ROUTES),
    // },
    { path: '', redirectTo: '', pathMatch: 'full' },
    { path: '**', redirectTo: '' }
];
