import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { UsuarioComponent } from './modules/usuario/usuario.component';
import { PerfilComponent } from './modules/perfil/perfil.component';
import { OpcionComponent } from './modules/opcion/opcion.component';

// export const routes: Routes = [];

export const SEGURIDAD_ROUTES: Routes = [
    { path: 'usuario', component: UsuarioComponent },
    { path: 'perfil', component: PerfilComponent },
    { path: 'opcion', component: OpcionComponent },
    { path: '', component: AppComponent },
];