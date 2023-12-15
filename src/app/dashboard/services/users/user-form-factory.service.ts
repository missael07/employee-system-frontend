import { Injectable, computed, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../../interfaces/users/user.interface';

@Injectable({
  providedIn: 'root'
})
export class UserFormFactoryService {

  private _formBuilder = inject(FormBuilder);

  private _userForm = signal<FormGroup>(this._formBuilder.group({
    name: ['', Validators.required],
    email: ['', Validators.required],
    lastName: ['', Validators.required],
    teamId: ['',],
    roleId: ['', Validators.required],
    isActive: [true]
  }));

  public userForm = computed( () => this._userForm());

  populateRoleForm(data: User){
    this._userForm().patchValue({
      name: data.name,
      lastName: data.lastName,
      email: data.email,
      teamId: data.teamId?._id,
      roleId: data.roleId?._id,
      isActive: data.isActive
    });
  }

  resetValues(){
    this._userForm().patchValue({
      name: '',
      lastName: '',
      teamId: '',
      roleId: '',
      email: '',
      isActive: true
    });
    this._userForm().markAsUntouched();
  }
}
