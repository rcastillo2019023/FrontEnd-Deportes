import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EquiposComponent } from './componentes/equipos/equipos.component';
import { LigasComponent } from './componentes/ligas/ligas.component';
import { LoginComponent } from './componentes/login/login.component';
import { PaginaPrincipalComponent } from './componentes/pagina-principal/pagina-principal.component';
import { PerfilComponent } from './componentes/perfil/perfil.component';
import { RegistroComponent } from './componentes/registro/registro.component';
import { UsuariosComponent } from './componentes/usuarios/usuarios.component';


const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'registro', component: RegistroComponent },
  { path: 'usuarios', component: UsuariosComponent},
  { path: 'paginaPrincipal', component: PaginaPrincipalComponent},
  { path: 'ligas', component: LigasComponent},
  { path: 'perfil', component: PerfilComponent},
  { path: 'equipos', component: EquiposComponent},


  /* Esto hasta abajo; Toda ruta no encontrada la redirigirá a esta */
  { path: '**', component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
