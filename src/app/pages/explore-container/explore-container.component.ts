import { Component, OnInit, Input } from '@angular/core';
import { BaseDatoStorageService } from 'src/app/services/base-dato-storage.service';


@Component({
  selector: 'app-explore-container',
  templateUrl: './explore-container.component.html',
  styleUrls: ['./explore-container.component.scss'],
})
export class ExploreContainerComponent implements OnInit {
  @Input() name: string;
  @Input() nombre: string;
  @Input() email: string;
  @Input() fechaHora: Date;
  @Input() asignatura: string;
  @Input() avatar: string;
  @Input() seccion: string;


  constructor(private baseDatoStorage: BaseDatoStorageService) {

  }

  ngOnInit() {}

  enviarCorreo(){
    console.log("enviarCorreo..")
    this.baseDatoStorage.enviarCorreo();
  }



}
