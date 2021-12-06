import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { retry } from 'rxjs/operators';
import { Usuarios } from '../interfaces/interfaces';


@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  usuarios: Usuarios[];

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin' : '*'
    })
  };

  //apiUrl = 'http://localhost:3000';
  apiUrl = 'https://my-json-server.typicode.com/MayronGM/bdasistencia';
  
  

  

  constructor(private http: HttpClient) {
    this.getUserEmail();
  }


  getUserEmail(){
    this.getUsers().subscribe( respuesta => {

      this.usuarios = respuesta;

    });
  }



  getUser(userId):Observable<any>{
    return this.http.get(this.apiUrl + '/users/' + userId).pipe(
      retry(3)
    );

  }

  
  ressetPasword():Observable<any>{

    return this.http.get(this.apiUrl + '/users/').pipe(
      retry(3)
    );

  }

  getUsers():Observable<any>{

    return this.http.get(this.apiUrl + '/users/').pipe(
      retry(3)
    );

  }
  getDocente():Observable<any>{

    return this.http.get(this.apiUrl + '/docente/').pipe(
      retry(3)
    );

  }


  crearUsuario(users):Observable<any>{

    return this.http.post(this.apiUrl + '/users/' , users, this.httpOptions).pipe(
      retry(3)
    );

  }

  actualizarUsuario(userId,users):Observable<any>{

    return this.http.put(this.apiUrl + '/users/' + userId, users, this.httpOptions).pipe(
      retry(3)
    );

  }

  login(email: string, password: string){
    return  new Promise( resolve => {
      this.http.get(` ${ this.apiUrl }/users?email=${email}&password=${password}`).subscribe(respuestas => {
        if (Object.entries(respuestas).length === 0) {
          resolve(false);
        }else{
          resolve(true);
        }

      });
    });
  }

  restablecerPassword(email: string, password: string){
    const usuarioNuevo = {
      id: 0,
      nombre: '',
      email: '',
      password: password,
      horario: '',
      sede: '',
      telefono: '',
      seccion: '',
    }

    this.usuarios.forEach(usuario => {
      if (usuario.email == email) {
        console.log("Existe")
        usuarioNuevo.id = usuario.id;
        usuarioNuevo.nombre = usuario.nombre;
        usuarioNuevo.email = usuario.email;
        usuarioNuevo.horario = usuario.horario;
        usuarioNuevo.sede = usuario.sede;
        usuarioNuevo.telefono = usuario.telefono;
        usuarioNuevo.seccion = usuario.seccion;
      }
    });


    return  new Promise( resolve => {
      this.http.put(this.apiUrl + '/users/' + usuarioNuevo.id, usuarioNuevo, this.httpOptions).subscribe(respuestas => {

        if (Object.entries(respuestas).length === 0) {
          resolve(false);
        }else{
          resolve(true);

          console.log( usuarioNuevo.id, usuarioNuevo.nombre, email, password, usuarioNuevo.horario, usuarioNuevo.sede, usuarioNuevo.telefono, usuarioNuevo.seccion );


        }


      });
    });
  }








}


