import { Component } from '@angular/core';

declare interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
}

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css']
})
export class SideNavComponent {
  menuItems: RouteInfo[] = [
    { path: 'projects', title: 'Projects',  icon: 'pe-7s-graph', class: '' },
    { path: 'roles', title: 'Roles',  icon:'pe-7s-user', class: '' },
    { path: 'users', title: 'Users',  icon:'pe-7s-note2', class: '' },
    { path: 'teams', title: 'Teams',  icon:'pe-7s-news-paper', class: '' }
];

isMobileMenu(){
  return false
}
}
