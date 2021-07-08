import { Injectable } from '@angular/core';
import { Equipos } from '../modelos/modelo.equipos';
import { Observable } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http"

import { GLOBAL } from "./global.service"

@Injectable({
  providedIn: 'root'
})
export class EquiposService {
  public url: String;
  public identidad;
  public headersV = new HttpHeaders().set('Content-Type', 'application/json');
  public token;

  constructor(public _http: HttpClient) {
    this.url = GLOBAL.url;
   }

   agregarEquipo(equipos: Equipos): Observable<any>{
    let params = JSON.stringify(equipos);

    return this._http.post(this.url + '/agregarEquipos', params, { headers: this.headersV })
   }

   editarEquipo(equipos: Equipos):Observable<any>{
    let params = JSON.stringify(equipos);
    let headersToken = this.headersV.set('Authorization', this.getToken())


    return this._http.put(this.url + '/editarEquipo/' + equipos._id, params, {headers: headersToken})
  }

   eliminarEquipo(id:String): Observable<any>{
    let headersToken = this.headersV.set('Authorization', this.getToken());

    return this._http.delete(this.url + '/eliminarEquipo/' + id, {headers: headersToken})
  }

   obtenerEquipos(): Observable<any>{
    return this._http.get(this.url + '/listarEquiposPorLiga/' + {headers: this.headersV})
   }



  getToken(){
    var token2 = localStorage.getItem('token');
    if(token2 != 'undefined'){
      this.token = token2;
    }else{
      this.token = null;
    }

    return this.token;
  }

}
