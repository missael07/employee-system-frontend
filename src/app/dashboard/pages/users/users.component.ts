import { Component, inject } from '@angular/core';
import { NavbarTitleService } from '../../services/shared/navbar-title.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent {

  navService = inject(NavbarTitleService);

  constructor(){
    this.navService.setNavbarTitle('Users');
  }
}
