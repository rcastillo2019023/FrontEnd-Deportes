import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/modelos/modelo.usuario';
import Swal from 'sweetalert2';
import { UsuarioService } from "../../servicios/usuario.service"

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss'],
  providers: [UsuarioService]
})
export class UsuariosComponent implements OnInit {
  public usuarios;
  public identidadUsuario;
  public idUsuarioModel: Usuario;
  constructor(private _usuarioService: UsuarioService) {
    this.idUsuarioModel = new Usuario("","","","","","");
   }

  ngOnInit(): void {
    this.obtenerUsuarios();
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

  obtenerUsuarioId(idUsuario){
    this._usuarioService.obtenerUsuarioId(idUsuario).subscribe(
      response=>{
        this.idUsuarioModel = response.usuarioEncontrado;
        console.log(response);

      }
    )
  }

  obtenerEntidadUsuario(idUsuario){
    this._usuarioService.obtenerUsuarioId(idUsuario).subscribe(
      response=>{
        this.identidadUsuario = response.LigaEncontrado._id;
        localStorage.setItem("identidadUsuario", JSON.stringify(this.identidadUsuario));
        this.idUsuarioModel = response.LigaEncontrado;
        console.log(response);

      }
    )
  }

  //administrador------------------------------------------------------------------
  editarUsuario(){
    this._usuarioService.editarUsuario(this.idUsuarioModel).subscribe(
      response=>{
        console.log(response);
        this.obtenerUsuarios();
      }
      
    )
  }


  registrarAdministrador(){
    this._usuarioService.registroAdmin(this.idUsuarioModel).subscribe(
      response=>{
        console.log(response);
        this.obtenerUsuarios();
      }
      
    )
  }

  eliminarUsuario(idUsuario){
    this._usuarioService.eliminarUsuario(idUsuario).subscribe(
      response=>{
        console.log(response);
        this.obtenerUsuarios();
      },
      (error) => {
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'No se pudo eliminar el usuario porque tiene una liga activa',
          showConfirmButton: false,
          timer: 1500,
        
        });
      }
    )
  }

  
  
 //usuario norma -------------------------------------------------------------------------------------------
  perfil(idUsuario){
    this._usuarioService.perfil(idUsuario).subscribe(
      response=>{
        this.idUsuarioModel = response.usuariosEncontrados;
        console.log(response)
      }
    )
  }

}
