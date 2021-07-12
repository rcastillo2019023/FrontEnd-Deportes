import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/modelos/modelo.usuario';
import { Liga } from 'src/app/modelos/modelo.liga';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ligas',
  templateUrl: './ligas.component.html',
  styleUrls: ['./ligas.component.scss'],
  providers: [UsuarioService]

})
export class LigasComponent implements OnInit {
  public usuarios;
  public liga;
  public idUsuarioModel: Usuario;
  public idLigaModel: Liga;
  public identidadLiga;

  constructor(
    private _usuarioService: UsuarioService
  ) { 
    this.idLigaModel = new Liga("","","","");
  }

  ngOnInit(): void {
    this.obtenerLigas();
  }

  obtenerLigas(){
    this._usuarioService.obtenerLigas().subscribe(
      response =>{
        console.log(response)
        this.liga = response.ligaEncontrada;
      },
      error =>{
        console.log(<any>error)
      }
    )
  }

  obtenerLigaId(idLiga){
    this._usuarioService.obtenerLigaId(idLiga).subscribe(
      response=>{
        this.identidadLiga = response.LigaEncontrado._id;
        localStorage.setItem("identidadLiga", JSON.stringify(this.identidadLiga));
        this.idLigaModel = response.LigaEncontrado;
        console.log(response);

      }
    )
  }

  editarLiga(){
    this._usuarioService.editarLiga(this.idLigaModel).subscribe(
      response=>{
        console.log(response);
        this.obtenerLigas();
      },
      (error) => {
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'no se pudo editar la liga ',
          showConfirmButton: false,
          timer: 1500,
        });
      }
    )
  }

  agregarLiga(){
    this._usuarioService.agregarLiga(this.idLigaModel).subscribe(
      response=>{
        console.log(response);
        this.obtenerLigas();
      },
      (error) => {
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'ya existe una liga con el mismo nombre ',
          showConfirmButton: false,
          timer: 1500,
        });
      }  
    )
  }

  eliminarLiga(idLiga){
    this._usuarioService.eliminarLiga(idLiga).subscribe(
      response=>{
        console.log(response);
        this.obtenerLigas();
      },
      (error) => {
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'No se pudo eliminar la liga',
          showConfirmButton: false,
          timer: 1500,
        });
      }
    )
  }
}
