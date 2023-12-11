import { Component, inject, computed } from '@angular/core';
import { LoadingService } from './shared/services/loading.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  private _loadingService = inject(LoadingService);

  public isLoading = computed( () => this._loadingService.isLoading() );
}
