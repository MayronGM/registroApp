import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Usuarios, Asitencias, Docentes } from 'src/app/interfaces/interfaces';
import { Registro } from 'src/app/models/registro.model';



@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  private _storage: Storage | null = null;
  //usuario: Usuarios[] = [];
  docente: Docentes[] = [];
  //reg: Registro[] = [];
 // token: string = null;

  

  nombre: string = "";
  email: string = "";
  fechaHora: Date = new Date;
  asignatura: string = "";
  avatar: string = "";
  seccion: string = "";



  constructor(private storage: Storage) {
    this.init();
    this.registrosNuevos();

  }

  async init(){
    const storage = await this.storage.create();
    this._storage = storage;

  }


  async registrosNuevos(){

    //this.reg = (await this.storage.get("registros"));
    //this.usuario = (await this.storage.get("users"));
    //this.token = (await this.storage.get("token"));
    this.docente = (await this.storage.get("docentes"));
    //console.log(this.docente);

    this.docente.forEach(element => {
      this.nombre = element.docente;
      this.email = element.correo;
      this.asignatura = element.asignatura;
      this.avatar = element.avatar;
      this.seccion = element.seccion;

      
    });
    
    console.log(this.nombre,this.asignatura,this.seccion,this.email)


  }






}
