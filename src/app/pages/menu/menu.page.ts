import { Component, OnInit } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage';



@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {

  indiceSeleccionado: number = 0;
  private _storage: Storage | null = null;

  paginas = [
    {
      titulo: 'QR Scanner',
      url: '/menu/tabs/tab1',
      icono: 'home'
    },
    {
      titulo: 'Asistencia',
      url: '/menu/tabs/tab2',
      icono: 'book'
    },
    {
      titulo: 'Docente',
      url: '/menu/tabs/tab3',
      icono: 'school'
    },
    {
      titulo: 'Alumnos',
      url: '/menu/tabs/tab4',
      icono: 'people-circle'
    }
  ]

  constructor(private storage: Storage,public alertController: AlertController,
    public navController: NavController) {
  }

  ngOnInit() {

  }

  ionViewWillEnter(){
    this.init();
  }

  cambiarIndiceSeleccionado(i){
    this.indiceSeleccionado = i;
  }

  async init(){
    const storage = await this.storage.create();
    this._storage = storage;
  }

  async salir(){
    const alert = await this.alertController.create({
      header: 'Salir',
      message: '¿Seguro que deseas salir de la aplicación?',
      buttons: [
        {
          text: 'No',
          handler: () => {

          }
        }, {
          text: 'Si',
          handler: () => {
            this.storage.remove("valido");
            this.storage.remove("token");
            this.storage.remove("asistencia");
            this.navController.navigateRoot('/login');
          }
        }
      ]
    });

    await alert.present();
  }

}
