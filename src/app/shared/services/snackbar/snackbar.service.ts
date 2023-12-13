import { Injectable } from '@angular/core';
import { inject } from '@angular/core/testing';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {

  constructor(private _snackBar: MatSnackBar) { }

  openSnackBar(message: string): void {
    this._snackBar.open(message,'', {
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
      duration: 3500
    });
   }
}
