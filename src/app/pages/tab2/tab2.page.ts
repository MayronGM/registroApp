import { Component } from '@angular/core';
import { BaseDatoStorageService } from 'src/app/services/base-dato-storage.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  constructor(public baseDatoStorage: BaseDatoStorageService) {}



  enviarCorreo(){


    this.baseDatoStorage.cargarUsuarioStorage();
  }

  abrirRegistro( registro ){

    this.baseDatoStorage.abrirRegistro( registro );
  }

}
