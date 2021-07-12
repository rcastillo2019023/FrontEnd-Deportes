import { Injectable } from '@angular/core';
import { Usuario } from '../modelos/modelo.usuario';
import { Observable } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http"

import { GLOBAL } from "./global.service"
import { Liga } from '../modelos/modelo.liga';
import { Equipo } from '../modelos/modelo.equipo';


@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  public url: String;
  public identidad;
  public identidadLiga;
  public headersV = new HttpHeaders().set('Content-Type', 'application/json');
  public token;

  constructor(public _http: HttpClient) {
    this.url = GLOBAL.url;
   }

//--------------------------------------------------------------------------------------------------------------//  
//Ligas
obtenerLigas():Observable<any>{
  let headersToken = this.headersV.set('Authorization', this.getToken())

  return this._http.get(this.url + '/listarLigas', {headers: headersToken})
}

obtenerLigaId(id:String): Observable<any>{
  return this._http.get(this.url + '/obtenerLigaId/'+ id, {headers: this.headersV})
}

editarLiga(liga: Liga):Observable<any>{
  let params = JSON.stringify(liga);
  let headersToken = this.headersV.set('Authorization', this.getToken())

  return this._http.put(this.url + '/editarLiga/' + liga._id, params, {headers: headersToken})
}

agregarLiga(liga: Liga): Observable<any>{
  let params = JSON.stringify(liga);
  let headersToken = this.headersV.set('Authorization', this.getToken())

  return this._http.post(this.url + '/agregarLiga', params, { headers: headersToken })
 }

 eliminarLiga(id: Liga):Observable<any>{
  let headersToken = this.headersV.set('Authorization', this.getToken())

  return this._http.delete(this.url + '/eliminarLiga/' + id, {headers: headersToken})
}
   
//----------------------------------------------------------------------------------------------------------------
  //Funciones de usuarios a su cuenta

  perfil(id:String): Observable<any>{
    return this._http.get(this.url + '/perfil/'+ id, {headers: this.headersV})
  }
  eliminarCuenta():Observable<any>{
    let headersToken = this.headersV.set('Authorization', this.getToken())
  
  
    return this._http.delete(this.url + '/eliminarCuenta/'  ,{headers: headersToken})
  }
   editarCuenta(usuario: Usuario): Observable<any>{
    let params = JSON.stringify(usuario);
    let headersToken = this.headersV.set('Authorization', this.getToken())

     return this._http.put(this.url + '/editarCuenta/', params, {headers: headersToken})
   }


   obtenerUsuarioId(id:String): Observable<any>{
    return this._http.get(this.url + '/obtenerUsuarioId/'+ id, {headers: this.headersV})
  }
  //------------------------------------------------------------------------------------------------------
  //Funciones del equipo 
  obtenerEquipos():Observable<any>{
    let headersToken = this.headersV.set('Authorization', this.getIdentidad())
  
    return this._http.get(this.url + '/listarEquipos/'+ this.getIdentidadLiga())
  }
  
  agregarEquipo(equipo: Equipo): Observable<any>{
    let params = JSON.stringify(equipo);
    let headersToken = this.headersV.set('Authorization', this.getToken())
  
    return this._http.post(this.url + '/agregarEquipos/'+ this.getIdentidadLiga() , params , { headers: headersToken })
   }
   obtenerEquipoId(id:String): Observable<any>{
    return this._http.get(this.url + '/obtenerEquipoId/'+ id, {headers: this.headersV})
  }
  
  editarEquipo(equipo: Equipo):Observable<any>{
    let params = JSON.stringify(equipo);
    let headersToken = this.headersV.set('Authorization', this.getToken())
  
    return this._http.put(this.url + '/editarEquipo/' + equipo._id +'/'+ this.getIdentidadLiga() , params, {headers: headersToken})
  }

  eliminarEquipo(id: Liga):Observable<any>{
    let headersToken = this.headersV.set('Authorization', this.getToken())
  
    return this._http.delete(this.url + '/eliminarEquipo/' + id +'/'+ this.getIdentidadLiga() , {headers: headersToken})
  }

  marcador(id1: Equipo, id2: Equipo):Observable<any>{
    let headersToken = this.headersV.set('Authorization', this.getToken())
  
    return this._http.delete(this.url + '/eliminarLiga/' + id1+id2, {headers: headersToken})
  }
  //------------------------------------------------------------------------------------------------------
  //Funciones del administrador

  eliminarUsuario(id: Usuario):Observable<any>{
    let headersToken = this.headersV.set('Authorization', this.getToken())


    return this._http.delete(this.url + '/eliminarUsuario/' + id, {headers: headersToken})
  }

   editarUsuario(usuario: Usuario):Observable<any>{
    let params = JSON.stringify(usuario);
    let headersToken = this.headersV.set('Authorization', this.getToken())


    return this._http.put(this.url + '/editarUsuario/' + usuario._id, params, {headers: headersToken})
  }

  registroAdmin(usuario: Usuario): Observable<any>{
    let params = JSON.stringify(usuario);
    
    let headersToken = this.headersV.set('Authorization', this.getToken())

    return this._http.post(this.url + '/registerAdmin', params, { headers: headersToken })
   }
   
   obtenerUsuarios(): Observable<any>{
    return this._http.get(this.url + '/obtenerUsuarios', {headers: this.headersV})
   }
   //-----------------------------------------------------------------------------------------------------
   //Funciones generales

   login(usuario, getToken = null): Observable<any>{
     if(getToken != null){
       usuario.getToken = getToken;
     }
     let params = JSON.stringify(usuario)

    return this._http.post(this.url + '/login', params, {headers: this.headersV})
   }

   registro(usuario: Usuario): Observable<any>{
    let params = JSON.stringify(usuario);

    return this._http.post(this.url + '/register', params, { headers: this.headersV })
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
  getIdentidadLiga() {
    var identidadLiga2 = JSON.parse(localStorage.getItem('identidadLiga'));
    if (identidadLiga2 != 'undefined') {
      this.identidadLiga = identidadLiga2;
    } else {
      this.identidadLiga = null;
    }
    return this.identidadLiga;
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
