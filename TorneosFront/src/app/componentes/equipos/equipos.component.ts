import { Component, OnInit } from '@angular/core';
import {Equipos} from 'src/app/modelos/modelo.equipos';
import {EquiposService} from "../../servicios/equipos.service"

@Component({
  selector: 'app-equipos',
  templateUrl: './equipos.component.html',
  styleUrls: ['./equipos.component.scss'],
  providers: [EquiposService]
})
export class EquiposComponent implements OnInit {
  public equipos;
  public idEquiposModel: Equipos;

  constructor(private _equiposService: EquiposService) {
    this.idEquiposModel = new Equipos("","","",0,0,0,0,"")
   }

  ngOnInit(): void {
    this.obtenerEquipos();
  }

  agregarEquipo(){
    this._equiposService.agregarEquipo(this.idEquiposModel).subscribe(
      response=>{
        console.log(response);
        this.obtenerEquipos();
      }
    )
  }

  editarEquipo(){
    this._equiposService.editarEquipo(this.idEquiposModel).subscribe(
      response=>{
        console.log(response);
        this.obtenerEquipos();
      }
    )
  }

  eliminarEquipo(idEquipo){
    this._equiposService.eliminarEquipo(idEquipo).subscribe(
      response=>{
        console.log(response);
        this.obtenerEquipos();
      }
    )
  }

  obtenerEquipos(){
    this._equiposService.obtenerEquipos().subscribe(
      response =>{
        this.equipos = response.equiposEncontrados;
      },
      error =>{
        console.log(<any>error)
      }
    )
  }

}
