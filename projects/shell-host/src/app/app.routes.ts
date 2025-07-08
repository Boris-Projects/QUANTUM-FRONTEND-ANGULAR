import { loadRemoteModule } from '@angular-architects/native-federation';
import { Routes } from '@angular/router';
import { AUTH_ROUTES } from './modules/auth/auth.routes';

export const routes: Routes = [
    {
        path: '',
        children: AUTH_ROUTES
    },
    {
        path: 'seguridad',
        loadChildren: () =>
            loadRemoteModule('seguridadModule', './Seguridad').then(m => m.SEGURIDAD_ROUTES),
    },
    {
        path: 'maestra',
        loadChildren: () =>
            loadRemoteModule('maestraModule', './Maestra').then(m => m.MAESTRAS_ROUTES),
    },
    { path: '', redirectTo: '', pathMatch: 'full' },
    { path: '**', redirectTo: '' }
];
