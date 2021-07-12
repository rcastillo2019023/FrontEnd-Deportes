import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/servicios/usuario.service';

@Component({
  selector: 'app-pagina-principal',
  templateUrl: './pagina-principal.component.html',
  styleUrls: ['./pagina-principal.component.scss']
})
export class PaginaPrincipalComponent implements OnInit {
  public identidad;
  
  constructor(public _usuarioService: UsuarioService) { 
    this.identidad = this._usuarioService.getIdentidad();
  }

  ngOnInit(): void {
  }

}
