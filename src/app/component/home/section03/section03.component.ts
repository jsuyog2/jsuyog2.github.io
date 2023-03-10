import { Component } from '@angular/core';

import {
  ModalDismissReasons,
  NgbDatepickerModule,
  NgbModal,
} from '@ng-bootstrap/ng-bootstrap';
import projects from '../../../../assets/data/projects.json';
@Component({
  selector: 'app-section03',
  templateUrl: './section03.component.html',
  styleUrls: ['./section03.component.scss'],
})
export class Section03Component {
  projects: any;
  description_length = 100;
  projectId: number = 0;
  constructor(private modalService: NgbModal) {}
  ngOnInit() {
    this.projects = projects;
  }
  validURL(str: any) {
    var pattern = new RegExp(
      '^(https?:\\/\\/)?' + // protocol
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
        '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
        '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
        '(\\#[-a-z\\d_]*)?$',
      'i'
    ); // fragment locator
    return !!pattern.test(str);
  }
  showMore(event: any) {
    let target = event.target;
    let element = $(target).closest('div').find('p');
    if (element.css('display').includes('-webkit-box')) {
      element.css('display', 'block');
      $(target).html('Hide');
    } else if (element.css('display').includes('block')) {
      element.css('display', '-webkit-box');
      $(target).html('Show More');
    }
  }
  open(content: any, id: any) {
    this.projectId = id;
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
  }
}
