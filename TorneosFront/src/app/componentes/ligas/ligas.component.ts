import { Component, OnInit } from '@angular/core';
import { Ligas } from 'src/app/modelos/modelo.ligas';
import { LigasService } from 'src/app/servicios/ligas.service';

@Component({
  selector: 'app-ligas',
  templateUrl: './ligas.component.html',
  styleUrls: ['./ligas.component.scss'],
  providers: [ LigasService ]
})
export class LigasComponent implements OnInit {
  public ligas;
  public idLigasModel: Ligas;

  constructor(private _ligasService: LigasService) {
    this.idLigasModel = new Ligas("","","","")
   }

  ngOnInit(): void {
    this.obtenerLiga();
  }

  agregarLiga(){
    this._ligasService.agregarLiga(this.idLigasModel).subscribe(
      response=>{
        console.log(response);
        this.obtenerLiga();
      }
    )
  }

  obtenerLiga(){
    this._ligasService.obtenerLiga().subscribe(
      response => {
        this.ligas = response.ligasEncontradas;
      },
      error => {
        console.log(<any>error);
      }
    )
  }

  editarLiga(){
    this._ligasService.editarLiga(this.idLigasModel).subscribe(
      response=>{
        console.log(response);
        this.obtenerLiga();
      }
    )
  }

  eliminarLiga(idLiga){
    this._ligasService.eliminarLiga(idLiga).subscribe(
      response=>{
        console.log(response);
        this.obtenerLiga();
      }
    )
  }

}
