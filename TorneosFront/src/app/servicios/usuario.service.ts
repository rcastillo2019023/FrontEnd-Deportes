import { Injectable } from '@angular/core';
import { Usuario } from '../modelos/modelo.usuario';
import { Observable } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http"

import { GLOBAL } from "./global.service"


@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  public url: String;
  public identidad;
  public headersV = new HttpHeaders().set('Content-Type', 'application/json');
  public token;

  constructor(public _http: HttpClient) {
    this.url = GLOBAL.url;
   }

   obtenerUsuarioId(id:String): Observable<any>{
    return this._http.get(this.url + '/obtenerUsuarioId/'+ id, {headers: this.headersV})
  }

   editarUsaurio(usuario: Usuario):Observable<any>{
    let params = JSON.stringify(usuario);
    let headersToken = this.headersV.set('Authorization', this.getToken())


    return this._http.put(this.url + '/editarUsuario/' + usuario._id, params, {headers: headersToken})
  }
   registro(usuario: Usuario): Observable<any>{
    let params = JSON.stringify(usuario);

    return this._http.post(this.url + '/register', params, { headers: this.headersV })
   }

   obtenerUsuarios(): Observable<any>{
    return this._http.get(this.url + '/obtenerUsuarios', {headers: this.headersV})
   }

   perfil(id:String): Observable<any>{
    return this._http.get(this.url + '/perfil/'+ id, {headers: this.headersV})
  }

   editarUsuario(usuario: Usuario, id): Observable<any>{
    let params = JSON.stringify(usuario);
    let headersToken = this.headersV.set('Authorization', this.getToken())

     return this._http.put(this.url + '/editarUsuario/', params, {headers: headersToken})
   }

   login(usuario, getToken = null): Observable<any>{
     if(getToken != null){
       usuario.getToken = getToken;
     }
     let params = JSON.stringify(usuario)

    return this._http.post(this.url + '/login', params, {headers: this.headersV})
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
