import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/modelos/modelo.usuario';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent implements OnInit {
  public identidad;
  public usuarios;
  public idUsuarioModel: Usuario;
  constructor(
    public _usuarioService: UsuarioService
  ) { 
    this.identidad = this._usuarioService.getIdentidad();
    this.idUsuarioModel = new Usuario("","","","","","");
  }

  ngOnInit(): void {
  }

  obtenerUsuarioId(idUsuario){
    this._usuarioService.obtenerUsuarioId(idUsuario).subscribe(
      response=>{
        this.idUsuarioModel = response.usuarioEncontrado;
        console.log(response);

      }
    )
  }
  editarUsuario(){
    this._usuarioService.editarCuenta(this.idUsuarioModel).subscribe(
      response=>{
        this.identidad = response.usuarioActualizado;
        localStorage.setItem("identidad", JSON.stringify(this.identidad));
        console.log(response);
        this.getIdentidad;
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Usuario editado correctamente',
          showConfirmButton: false,
          timer: 1500,
        });
      }
      
    )
  }
  eliminarUsuario(){
    this._usuarioService.eliminarCuenta().subscribe(
      response=>{
        console.log(response);
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


  getIdentidad() {
    var identidad2 = JSON.parse(localStorage.getItem('identidad'));
    if (identidad2 != 'undefined') {
      this.identidad = identidad2;
    } else {
      this.identidad = null;
    }
    return this.identidad;
  }

}
