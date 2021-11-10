import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Usuarios, Asitencias } from 'src/app/interfaces/interfaces';
import { Registro } from 'src/app/models/registro.model';



@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  private _storage: Storage | null = null;
  usuario: Usuarios[] = [];
  reg: Registro[] = [];
  token: string = null;

  asistencias: Asitencias = {
    id: 0 ,
    nombre: "",
    email: "",
    password: "",
    horario: "",
    sede: "",
    telefono: "",
    seccion: ""
  }

  nombre: string = "";
  email: string = "";
  fechaHora: Date = new Date;
  sede: string = "";



  constructor(private storage: Storage) {
    this.init();
    this.registrosNuevos();
    this.registrosNuevos();




  }

  async init(){
    const storage = await this.storage.create();
    this._storage = storage;

  }


  async registrosNuevos(){

    this.reg = (await this.storage.get("registros"));
    this.usuario = (await this.storage.get("users"));
    this.token = (await this.storage.get("token"));

    this.usuario.forEach(user => {

      if (user.email == this.token) {



        this.asistencias = {
          id: user.id,
          nombre: user.nombre,
          email: user.email,
          password: user.password,
          horario: user.horario,
          sede: user.sede,
          telefono: user.telefono,
          seccion: user.seccion
        }

        this.nombre =  this.asistencias.nombre;
        this.email =  this.asistencias.email;
        this.sede = this.asistencias.sede;

      }

    });




  }






}
