import { Component, computed, inject } from '@angular/core';
import { LoadingService } from 'src/app/shared/services/loading.service';

@Component({
  templateUrl: './dashboard-layout.component.html',
  styleUrls: ['./dashboard-layout.component.css']
})
export class DashboardLayoutComponent {

  private _loadingService = inject(LoadingService);

  public isLoading = computed( () => this._loadingService.isLoading() );

  ngOninit(){
    this._loadingService.loadingOn();
    this._loadingService.loadingOff();
  }

}
