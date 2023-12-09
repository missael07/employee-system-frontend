import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NavbarTitleService {

  title = signal<string>('');
  
  setNavbarTitle(title: string){
    this.title.set(title);
  }
}
