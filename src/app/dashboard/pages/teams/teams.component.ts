import { Component, inject } from '@angular/core';
import { NavbarTitleService } from '../../services/shared/navbar-title.service';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.css']
})
export class TeamsComponent {

  navService = inject(NavbarTitleService);

  constructor(){
    this.navService.setNavbarTitle('Teams');
  }

  
}
