import { Component, inject } from '@angular/core';
import { NavbarTitleService } from '../../services/navbar-title.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent {

  navService = inject(NavbarTitleService);

  constructor(){
    this.navService.setNavbarTitle('Projects');
  }
}
