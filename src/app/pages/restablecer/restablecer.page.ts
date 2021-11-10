import { Component, Input, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AlertService } from 'src/app/services/alert.service';
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
    private navController: NavController,) { }

  ngOnInit() {
  }

  async restablecerPassword(){
    const valido = true;
    if ( valido ) {
      this.alert.loadInicio("Cargando");
      await this.usuarioService.restablecerPassword( this.usuario.email , this.usuario.password);

      this.navController.navigateRoot( '/login', { animated: true } );
    } else {
      this.alert.alertaInformacion('Usuario No Existe');
    }
  }







}
