import { Component} from '@angular/core';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { Storage } from '@ionic/storage';
import { BaseDatoStorageService } from 'src/app/services/base-dato-storage.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  token:  string = '';
  bienvenido: string = '';
  private _storage: Storage | null = null;


  swiperOpts = {
    allowSlidePrev: false,
    allowSlideNext: false
  };

  constructor(
    private barcodeScanner: BarcodeScanner,
    private baseDatoStorage: BaseDatoStorageService,
    private storage: Storage ) {

      this.cargarStorage();

    }

  scan(){
    console.log("Click a Scan");

    this.barcodeScanner.scan().then(barcodeData => {
        console.log('Barcode data', barcodeData);

        if( !barcodeData.cancelled ){
          this.baseDatoStorage.guardarRegistro( barcodeData.format, barcodeData.text );
        }

      }).catch(err => {
          console.log(err);
           //this.baseDatoStorage.guardarRegistro( 'QRCode','docente{"id": 890, "seccion": "V005", "asignatura": "Programacion Web", "docente": "David Larrondo", "correo": "dav.larrondo@profesor.duoc.cl", "avatar": "../assets/avatars/docent-2.png"} ');
           this.baseDatoStorage.guardarRegistro( 'QRCode','docente{"id": 1, "seccion": "V002", "asignatura": "Aplicación Móvil", "docente": "Nancy Bernal", "correo": "nan.bernal@profesor.duoc.cl", "avatar": "../assets/avatars/docent-1.png"} ');
          // this.baseDatoStorage.guardarRegistro( 'QRCode', 'user{id: 2 , nombre: "Mayron Guevara",email: "may.guevara@duoc.cl",password: "1234",horario: "Diurno",sede: "Viña del Mar",telefono: "+569 5478 3698",seccion: "D007"}');
      });

  }

  async cargarStorage(){

    const storage =  await this.storage.create();
    this._storage = storage;
    this.token = (await this.storage.get('token')) || [];

    this.baseDatoStorage.mostrarUsuariosGet(this.token);


    this.bienvenido = (await this.storage.get('bienvenido'));
    console.log('Bienvenida -----> ',this.bienvenido)

  }

  async ionViewWillEnter(){
    this.bienvenido = (await this.storage.get('bienvenido'));
  }






}
