import { Component, OnInit, Input } from '@angular/core';
import { Asitencias } from 'src/app/interfaces/interfaces';


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
  @Input() sede: string;


  constructor() {

  }

  ngOnInit() {}





}
