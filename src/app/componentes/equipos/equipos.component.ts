import { Component, OnInit } from '@angular/core';
import { Equipo } from 'src/app/modelos/modelo.equipo';
import { jsPDF } from "jspdf";
import { Marcador } from 'src/app/modelos/modelo.marcador';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-equipos',
  templateUrl: './equipos.component.html',
  styleUrls: ['./equipos.component.scss']
})
export class EquiposComponent implements OnInit {
  public equipo;
  public idEquipoModel: Equipo;
  public idMarcadorModel: Marcador;
  public identidadEquipo1;
  public identidadEquipo2;

  
  chartOptions = {
    responsive: true,
  };
  chartLabels = [];
  chartData = [];
  chartColors = [{
    backgroundColor: ['red',"#616161", '#0F0', 'rgba(41, 182, 246,0.75)', "#9C27B0","#5D4037","#FFEB3B","#009688","#E91E63","#7C4DFF"],
    borderColor: ["black","black","black","black","black","black","black","black","black","black","black",]
  }];
  chartLegend = true;
  chartPlugins = [];

  constructor(
    private _usuarioService: UsuarioService
  ) { 
    this.idEquipoModel = new Equipo("","","",0,0,0,0,0,"");
    this.idMarcadorModel = new Marcador("",0,0,0,"","");
  }

  ngOnInit(): void {
    this.obtenerEquipos()
  }

  obtenerEquipos(){
    this._usuarioService.obtenerEquipos().subscribe(
      response =>{
        console.log(response)
        this.equipo = response.equipoEncontrado;
        this.equipo.forEach(datos => {
          this.chartData.push(datos.puntos);
          this.chartLabels.push(datos.nombre);
        });
      },
      error =>{
        console.log(<any>error)
      }
    )
  }

  obtenerEquipoId(idEquipo){
    this._usuarioService.obtenerEquipoId(idEquipo).subscribe(
      response=>{
        this.idEquipoModel = response.equipoEncontrado;
        console.log(response);

      }
    )
  }

  obteneridentidadEquipo1(idEquipo1){
    this._usuarioService.obtenerEquipoId(idEquipo1).subscribe(
      response=>{
        this.identidadEquipo1 = response.equipoEncontrado._id;
        localStorage.setItem("identidadEquipo1", JSON.stringify(this.identidadEquipo1));

      }
    )
  }

  marcador(idEquipo1, idEquipo2){
    this._usuarioService.marcador(idEquipo1, idEquipo2).subscribe(
      response=>{
        this.idEquipoModel = response.equipoEncontrado;
        console.log(response);

      }
    )
  }
  editarEquipo(){
    this._usuarioService.editarEquipo(this.idEquipoModel).subscribe(
      response=>{
        console.log(response);
        this.obtenerEquipos();
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
  agregarEquipo(){
    this._usuarioService.agregarEquipo(this.idEquipoModel).subscribe(
      response=>{
        console.log(response);
        this.obtenerEquipos();
      },
      (error) => {
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'ya existe una equipo con el mismo nombre o has exidido el limite de equipos',
          showConfirmButton: false,
          timer: 1500,
        });
      }  
    )
  }

  generarPDF(){
   const doc = new jsPDF();

   doc.html(document.getElementById("genpdf"));
   doc.save("ResultadosLiga.pdf");
    
  }

  eliminarEquipo(idEquipo){
    this._usuarioService.eliminarEquipo(idEquipo).subscribe(
      response=>{
        console.log(response);
        this.obtenerEquipos();
      },
      (error) => {
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'No se pudo eliminar el equipo',
          showConfirmButton: false,
          timer: 1500,
        
        });
      }
    )
  }
}
