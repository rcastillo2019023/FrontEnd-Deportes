import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from '../../modelos/modelo.usuario';
import { UsuarioService } from "../../servicios/usuario.service"

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss'],
  providers: [UsuarioService]
})
export class RegistroComponent implements OnInit {
  public usuarioModel: Usuario;


  constructor(private _usuarioService: UsuarioService,
    private _router: Router) {
    this.usuarioModel = new Usuario("","","","","","")
  }

  ngOnInit(): void {

  }

  registrar(){
    this._usuarioService.registro(this.usuarioModel).subscribe(
      response=>{
        console.log(response);
        this._router.navigate(['/login'])
      },
      error=>{
        console.log(<any>error);
      }
    )
  }

}
