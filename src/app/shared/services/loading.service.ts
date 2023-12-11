import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  public isLoading = signal<boolean | undefined>(true);

  loadingOn(){
    this.isLoading.set(true);
  }

  loadingOff() {
    if(this.isLoading())
    {
      this.isLoading.set(false);
    }
  }
}
