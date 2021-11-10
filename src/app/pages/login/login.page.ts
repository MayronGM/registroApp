import { Component, OnInit } from '@angular/core';
import { Usuarios } from 'src/app/interfaces/interfaces';
import { Storage } from '@ionic/storage';
import { BaseDatoStorageService } from 'src/app/services/base-dato-storage.service';
import { NavController } from '@ionic/angular';
import { AlertService } from 'src/app/services/alert.service';
import { NgForm } from '@angular/forms';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  token: string = null;

  usuario: Usuarios[] = [];
  loginUser = {
    email: '',
    password: ''
  };

  constructor(
    private storage: Storage,
    private baseDatoStorage: BaseDatoStorageService,
    private usuarioService: UsuarioService,
    private alert: AlertService,
    private navController: NavController,
    ) {}

  ngOnInit() {
    this.baseDatoStorage.cargarUsuarioStorage();
    this.cargarStorage();
    this.validaToken();
  }

  ionViewWillEnter(){
  }


  async cargarStorage(){
    this.usuario = (await this.storage.get("users")) || [];
  }


  async login( fLogin: NgForm ){
    if ( fLogin.invalid ) { return this.alert.alertaInformacion('Campos Vacios'); }

    const valido = await this.usuarioService.login( this.loginUser.email, this.loginUser.password );

    if ( valido ) {

      this.alert.loadInicio("Cargando");
      this.guardarToken(this.loginUser.email);
      this.storage.set('valido', valido)
      this.navController.navigateRoot( '/menu/tabs/tab1', { animated: true } );
    } else {
      this.navController.navigateRoot('/login')
      this.alert.alertaInformacion('Usuario y contraseña no son correctos.');
      this.token = null;
      this.storage.remove('token');
    }
  }


  async guardarToken(token: string){
    this.token = token;
    await this.storage.set('token', token);
  }

  async validaToken(){
    let valido: boolean = false;
    return await this.storage.set('valido', valido)
  }





}
