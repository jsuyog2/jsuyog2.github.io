import { Component } from '@angular/core';
import services from '../../../../assets/data/services.json';
@Component({
  selector: 'app-section02',
  templateUrl: './section02.component.html',
  styleUrls: ['./section02.component.scss'],
})
export class Section02Component {
  services: any;
  ngOnInit() {
    this.services = services;
  }
}
