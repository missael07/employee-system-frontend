import { ComponentType } from '@angular/cdk/portal';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(private dialog: MatDialog) { }

  openDialog<T>(component: ComponentType<T>, data: object) {
    const dialogRef = this.dialog.open(component, {
      data,
      disableClose: true,
      autoFocus: false,
    });

    return dialogRef.afterClosed();
  }
}
