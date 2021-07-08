import { Injectable } from '@angular/core';
import { Ligas } from '../modelos/modelo.ligas';
import { Observable } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http"

import { GLOBAL } from "./global.service"

@Injectable({
  providedIn: 'root'
})
export class LigasService {
  public url: String;
  public identidad;
  public headersV = new HttpHeaders().set('Content-Type', 'application/json');
  public token;

  constructor(public _http: HttpClient) {
    this.url = GLOBAL.url;
   }

   agregarLiga(ligas: Ligas): Observable<any>{
    let params = JSON.stringify(ligas);

    return this._http.post(this.url + '/agregarLiga/', params, { headers: this.headersV })
   }

   editarLiga(ligas: Ligas):Observable<any>{
    let params = JSON.stringify(ligas);
    let headersToken = this.headersV.set('Authorization', this.getToken())


    return this._http.put(this.url + '/editarLiga/' + ligas._id, params, {headers: headersToken})
  }

  eliminarLiga(id:String): Observable<any>{
    let headersToken = this.headersV.set('Authorization', this.getToken());

    return this._http.delete(this.url + '/eliminarLiga/' + id, {headers: headersToken})
  }

  obtenerLiga(): Observable<any>{
    return this._http.get(this.url + '/listarLigas/' + {headers: this.headersV})
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
