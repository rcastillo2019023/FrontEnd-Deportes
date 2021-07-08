import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/modelos/modelo.usuario';
import { UsuarioService } from "../../servicios/usuario.service"

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss'],
  providers: [UsuarioService]
})
export class UsuariosComponent implements OnInit {
  public usuarios;
  public idUsuarioModel: Usuario;
  constructor(private _usuarioService: UsuarioService) {
    this.idUsuarioModel = new Usuario("","","","","","");
   }

  ngOnInit(): void {
    this.obtenerUsuarios();
  }

  obtenerUsuarioId(idUsuario){
    this._usuarioService.obtenerUsuarioId(idUsuario).subscribe(
      response=>{
        this.idUsuarioModel = response.usuariosEncontrado;
        console.log(response);

      }
    )
  }

  editarUsuario(){
    this._usuarioService.editarUsaurio(this.idUsuarioModel).subscribe(
      response=>{
        console.log(response);
        this.obtenerUsuarios();
      }
    )
  }

  obtenerUsuarios(){
    this._usuarioService.obtenerUsuarios().subscribe(
      response =>{
        this.usuarios = response.usuariosEncontrados;
      },
      error =>{
        console.log(<any>error)
      }
    )
  }

  perfil(idUsuario){
    this._usuarioService.perfil(idUsuario).subscribe(
      response=>{
        this.idUsuarioModel = response.usuariosEncontrados;
        console.log(response)
      }
    )
  }

}
