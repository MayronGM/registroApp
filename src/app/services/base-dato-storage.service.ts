import { Injectable } from '@angular/core';
import { UsuarioService } from './usuario.service';
import { Storage } from '@ionic/storage';
import { Asitencias, Usuarios, Docentes } from '../interfaces/interfaces';
import { Registro } from '../models/registro.model';
import { NavController } from '@ionic/angular';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { AlertService } from './alert.service';

import { File } from '@ionic-native/file/ngx';
import { EmailComposer } from '@ionic-native/email-composer/ngx';


@Injectable({
  providedIn: 'root'
})
export class BaseDatoStorageService {

  usuario: Usuarios[] = [];
  docente: Docentes[] = [];
  asistencias: Asitencias[] = [];
  bienvenido: string;
  emailEnviar: string = "";
  guardados: Registro[] = [];
  private _storage: Storage | null = null;
  private valido = false;


  constructor(
    private usuarioService: UsuarioService,
    private storage: Storage,
    private navController: NavController,
    private iab: InAppBrowser,
    private alertService: AlertService, 
    private file: File,
    private emailComposer: EmailComposer,

    ) {
    this.init();
    

  }
  async init(){
    const storage = await this.storage.create();
    this._storage = storage;
    this.guardarUsuariosStorage();
    this.guardarDocentesStorage();
    this.cargarStorage();
    

  }


  async cargarUsuarioStorage(){
    
    this.guardarUsuariosStorage();
    this.usuario = (await this.storage.get("users")) || [];

  }
  async cargarDocentesStorage(){
    this.docente = (await this.storage.get("docentes")) || [];

  }

  async ressetPasword(email: string){
    var valido: boolean = false;
    this.usuarioService.ressetPasword().subscribe( emailUsuario => {
      var passwordAlumno: string = '';
      emailUsuario.forEach(element => {
        if (element.email == email) {
          console.log(element.email);
          passwordAlumno = element.password;
          valido = true;
          }
      });
      if (valido) {
        
        this.alertService.presentToast("Email enviado al Correo");
        this.navController.navigateForward('/login');
        this.enviarPasswordEmail(passwordAlumno);
      //console.log(passwordAlumno);
      } else {
        this.alertService.presentToast("Email No Encontrado");
        
      }
    });
  }

  async mostrarUsuariosGet(email: string){

    this.usuarioService.getUsers().subscribe( respuesta => {

      respuesta.forEach(user => {
        /* console.log('Array ---> ',user)
        console.log('Correo ---> ',email) */
          if (email == user.email) {


            //this.bienvenido = user.nombre;
            this._storage.set('bienvenido', user.nombre);
            console.log('desde database.service-->',user.nombre)

          }
      });


    });
  }

  guardarUsuariosStorage(){
    this.usuarioService.getUsers().subscribe( async respuesta => {
      this.usuario = respuesta;
      await this._storage.set('users', this.usuario)


    });
  }
  guardarDocentesStorage(){
    this.usuarioService.getDocente().subscribe( async respuesta => {
      this.docente = respuesta;
      await this._storage.set('docentes', this.docente)


    });
  }



  async cargarStorage(){

    const storage =  await this.storage.create();
    this._storage = storage;

    this.guardados = (await this.storage.get('registros')) || [];
  }

  async guardarRegistro( format: string, text: string ){
    var existe: boolean = false;
    await this.cargarStorage();
    const nuevoRegistro = new Registro( format, text );
    /*--------------------------------------------------------------------------------*/
    if (JSON.stringify(nuevoRegistro.text).localeCompare("{\r\n    \"idAsignatura\": \"PGY4121\",\r\n    \"seccion\": \"002V\",\r\n    \"asignatura\": \"Programación de Aplicaciones")) {
      let emailDocente: string = "";
      var arrayReg: any [] = [];
      arrayReg.push(nuevoRegistro.text.split(','));
    
      arrayReg.forEach(element => {
        emailDocente = element[4];
        this.emailEnviar = emailDocente.substr(17).replace('}','')
        console.log(this.emailEnviar);
        
      });

      console.log("arrayReg -> ", JSON.stringify(arrayReg))
      console.log("emailEnviar -> ", this.emailEnviar)
      this.alertService.presentToast("Asistencia registrada corectamente");      
      
      this.navController.navigateForward('/menu/tabs/tab2');
      this.abrirRegistro( nuevoRegistro );
      
      this.enviareMailDocente(this.emailEnviar,JSON.stringify(arrayReg));
    }

    


    //console.log(nuevoRegistro.text)
    var idDocente: number = 0;
    var id: string = "";
    var idScan = nuevoRegistro.text.split(",")[0];    
    this.docente.forEach(element => {
        idDocente = element.id;      
    });    
    id = JSON.stringify(idDocente);      
    if (idScan.match(id) == null) {
      console.log("no existe docente");
    } else {
      console.log("docente existe");
      existe = true;
    }
    
    if (existe) {
      this.guardados.unshift( nuevoRegistro );
      this._storage.set('registros', this.guardados);
      this.alertService.presentToast("registro guardado exitosamente");

      //desde aqui enviar datos del usuario escaneado
      //usar id que trae el valor del api .





    } else {
      this.alertService.alertaInformacion("docente escaneado no existe");
      
    }
    this.abrirRegistro( nuevoRegistro );
    //this.registroAsistencia();
  }

  enviareMailDocente(emailDocente: string, arrayReg: any){
    console.log('desde ---> enviareMailDocente ',emailDocente,arrayReg)
    const email = {
      to: emailDocente,
      //cc: 'erika@mustermann.de',
      //bcc: ['john@doe.com', 'jane@doe.com'],
      attachments: [
        emailDocente,
        arrayReg
      ],
      subject: 'Solicitud de Asistencia',
      body: 'CORREO DOCENTE '+emailDocente+' solcitada desde Asistencia APP\n'+arrayReg+' desde Codigo Escaneado ',
      isHtml: true
    };    
    // Send a text message using default options
    this.emailComposer.open(email);
  }

  abrirRegistro(registro : Registro){
    this.navController.navigateForward('/menu/tabs/tab2');
    switch ( registro.type ){

      case 'http':
        this.iab.create( registro.text, '_system');
      break;

      case 'user':
        this.navController.navigateForward( `/menu/tabs/${registro.created.getMilliseconds()}`);
      break;

      case 'doce':
        this.navController.navigateForward( `/menu/tabs/${registro.created.getMilliseconds()}`);
      break;

    }
  }

  enviarCorreo(){
    const arrayRegistro = [];
    this.guardados.forEach(registro => {
      const reg = `${registro.type},${registro.format},${registro.created},${registro.text.replace(',',' ')}\n`;
      arrayRegistro.push(reg);
    });
    
    this.generarArchivo(arrayRegistro.join(''));    
    
  }

  generarArchivo(archivo:any){
    this.file.checkFile( this.file.dataDirectory, 'listaCorreo.csv').then( existe => {
      console.log('Directorio Existe', existe)
      return this.emailSend( archivo );
    }).catch(err =>{
      console.log('Directorio No Existe');
      return this.file.createFile( this.file.dataDirectory, 'listaCorreo.csv', false )
        .then( creado => this.emailSend( archivo ))
        .catch(err2 => console.log( 'No se pudo crear el archivo', err2 ));
    });   
  }

  async emailSend(archivo: string){
    await this.file.writeExistingFile( this.file.dataDirectory, 'listaCorreo.csv', archivo );
    console.log('Archivo Creado');
    console.log( this.file.dataDirectory + 'listaCorreo.csv' );
    const lista = `${ this.file.dataDirectory }listaCorreo.csv`;
    const email = {
      to: 'mayron.sasuke@gmail.com',
      
      attachments: [
        lista
      ],
      subject: 'Nomina de Asistencia Alumnos',
      body: 'Respaldo de asistencia Alumnos, desde RegistrAPP ',
      isHtml: true
    };    
  
    this.emailComposer.open(email);
  }
  enviarPasswordEmail(password: string){
    const email = {
      to: 'mayron.sasuke@gmail.com',
      
      attachments: [
        password
      ],
      subject: 'Pasword Entregada',
      body: 'Se Envia Pasword Solicitada '+password+' Desde Base Dato',
      isHtml: true
    };    
  
    this.emailComposer.open(email);
  }
  /*
  async registroAsistencia(){

    const arrTemp = [];
    this.guardados.forEach(element => {
      if (element.type == 'user') {
        arrTemp.unshift(  element.text.substr( 4 ) );
      }

      this._storage.set('asistencia',arrTemp[0])

    });

    this.asistencias = (await this.storage.get("asistencia")) || arrTemp[0];





    let idAsistencia =  Number(this.asistencias.slice(5,7));
    for(let i of this.usuario){

      if (idAsistencia === i.id) {
        this.valido = true;
        this.alertService.presentToast("Asistencia Registrada");
      }


    }


  }
  */


}





