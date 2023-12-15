import { Component, ElementRef, computed, inject } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';
import { NavbarTitleService } from 'src/app/dashboard/services/shared/navbar-title.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {

  private _navBarTitleService = inject(NavbarTitleService);
  private _authService = inject(AuthService);

  title = computed(() => this._navBarTitleService.title());

  onLogout() {
    this._authService.logout();
  }
 
}
