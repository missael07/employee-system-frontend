import { Component, computed, inject, signal } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Role } from 'src/app/dashboard/interfaces/roles/role';
import { RoleFormFactoryService } from 'src/app/dashboard/services/roles/role-form-factory.service';
import { RolesService } from 'src/app/dashboard/services/roles/roles.service';
import { SnackbarService } from 'src/app/shared/services/snackbar/snackbar.service';

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.css'],
})
export class RoleComponent {
  public isSaving: boolean = false;

  private _role: Role = inject(MAT_DIALOG_DATA);
  private _id = signal<string>(this._role._id ?? '');
  private _roleFormService = inject(RoleFormFactoryService);
  private _roleService = inject(RolesService);
  private _snackbarService = inject(SnackbarService);

  public title = computed(() => (this._id() ? 'Edit Role' : 'Add Role'));
  public buttonText = computed(() => (this._id() ? 'Save' : 'Create'));
  public roleForm = computed(() => this._roleFormService.roleForm());

  constructor() {
    if (this._id()) {
      this._roleFormService.populateRoleForm(this._role);
    }
  }

  ngOnDestroy(): void {
    this._roleFormService.resetValues();
   }

  save(): void{
    if(this.roleForm().invalid){
      this.roleForm().markAllAsTouched();
      return;
    }
    this.isSaving = true;
    if(this._id()) {
      this._updateRole();
    }
    else {
      this._createRole();
    }
   }

  private _createRole(): void {
    const newRole = {
      roleName: this.roleForm().get('roleName')?.value
    };

    this._roleService.createRole(newRole).subscribe({
      next: (response: Role) => {
        this._snackbarService.openSnackBar('Role created successfully');
        this._id.set(response._id!);
        this.isSaving = false;
      },
      error: (err) => {
        this._snackbarService.openSnackBar(err.error.message);
        this.isSaving = false;
      },
    });
  }

  private _updateRole(): void {
    const updatedRole = {
      roleName: this.roleForm().get('roleName')?.value,
      isActive: this.roleForm().get('isActive')?.value,
    };

    this._roleService.updateRole(this._id(), updatedRole).subscribe({
      next: (response: Role) => {
        this._snackbarService.openSnackBar('Role saved successfully');
        this.isSaving = false;
      },
      error: (err) => {
        this._snackbarService.openSnackBar(err.error.message);
        this.isSaving = false;
      },
    });
  }
}
