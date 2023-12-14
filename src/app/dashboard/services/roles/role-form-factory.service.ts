import { Injectable, computed, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Role } from '../../interfaces/roles/role';

@Injectable({
  providedIn: 'root'
})
export class RoleFormFactoryService {

  private _formBuilder = inject(FormBuilder);
  private _roleForm = signal<FormGroup>(this._formBuilder.group({
    roleName: ['', Validators.required],
    isActive: [true]
  }));

  public roleForm = computed( () => this._roleForm());

  populateRoleForm(data: Role){
    this._roleForm().patchValue({
      roleName: data.roleName,
      isActive: data.isActive
    });
  }

  resetValues(){
    this._roleForm().patchValue({
      roleName: '',
      isActive: true
    });
    this._roleForm().markAsUntouched();
  }
}
