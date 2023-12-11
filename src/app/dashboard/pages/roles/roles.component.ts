import { Component, inject } from '@angular/core';
import { NavbarTitleService } from '../../services/shared/navbar-title.service';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.css']
})
export class RolesComponent {

  private navService = inject(NavbarTitleService);

  constructor(){
    this.navService.setNavbarTitle('Roles');
  }
}
