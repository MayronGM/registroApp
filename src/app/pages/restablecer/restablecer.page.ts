import { Component, Input, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AlertService } from 'src/app/services/alert.service';
import { BaseDatoStorageService } from 'src/app/services/base-dato-storage.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-restablecer',
  templateUrl: './restablecer.page.html',
  styleUrls: ['./restablecer.page.scss'],
})
export class RestablecerPage implements OnInit {
  
  usuario = {
    email: '',
    password: ''
  }


  constructor(
    private alert: AlertService,
    private usuarioService: UsuarioService,
    private baseDatoStorageService: BaseDatoStorageService,
    private navController: NavController,) { }

  ngOnInit() {
  }

  async restablecerPassword(){
    await this.baseDatoStorageService.ressetPasword(this.usuario.email);
    this.usuario.email = '';
   
  }







}
