import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingComponent } from './components/loading/loading.component';
import { MaterialModule } from '../material/material.module';
import { ErrorLabelDirective } from './directives/errorLabel.directive';



@NgModule({
  declarations: [
    LoadingComponent,
    ErrorLabelDirective
  ],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports: [
    LoadingComponent,
    ErrorLabelDirective
  ]
})
export class SharedModule { }
