import { Component, OnInit, Output } from '@angular/core';
import { Usuarios } from 'src/app/interfaces/interfaces';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page implements OnInit {

  usuarios: Usuarios[] = [] ;
  nombre: string = "";

  constructor(private usuarioService: UsuarioService) {
    this.init();

  }

  ngOnInit() {
  }

  async init(){
    await this.usuarioService.getUsers().subscribe( resp => {
      this.usuarios = resp;
      //console.log("------------→ ",this.usuarios);
      this.nombre = this.usuarios[1].nombre;
      //console.log("------------→ ",this.nombre);
      return this.usuarios;

    });




  }

}
