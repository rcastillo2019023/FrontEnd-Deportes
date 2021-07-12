import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './componentes/login/login.component';
import { RegistroComponent } from './componentes/registro/registro.component';
import { NavbarComponent } from './componentes/navbar/navbar.component';
import { UsuariosComponent } from './componentes/usuarios/usuarios.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { PaginaPrincipalComponent } from './componentes/pagina-principal/pagina-principal.component';
import { LigasComponent } from './componentes/ligas/ligas.component';
import { PerfilComponent } from './componentes/perfil/perfil.component';
import { EquiposComponent } from './componentes/equipos/equipos.component';
import { ChartsModule } from '@rinminase/ng-charts';
import { LigasAdminComponent } from './componentes/ligas-admin/ligas-admin.component';

@NgModule({
  declarations: [ 
    AppComponent,
    LoginComponent,
    RegistroComponent,
    NavbarComponent,
    UsuariosComponent,
    PaginaPrincipalComponent,
    LigasComponent,
    PerfilComponent,
    EquiposComponent,
    LigasAdminComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ChartsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
