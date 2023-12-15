import { Component, inject, signal, computed } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Role } from 'src/app/dashboard/interfaces/roles/role';
import { Team } from 'src/app/dashboard/interfaces/teams/team.interface';
import { User } from 'src/app/dashboard/interfaces/users/user.interface';
import { RolesService } from 'src/app/dashboard/services/roles/roles.service';
import { TeamsService } from 'src/app/dashboard/services/teams/teams.service';
import { UserFormFactoryService } from 'src/app/dashboard/services/users/user-form-factory.service';
import { UserService } from 'src/app/dashboard/services/users/user.service';
import { SnackbarService } from 'src/app/shared/services/snackbar/snackbar.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent {

  public isSaving: boolean = false;

  private _user: User = inject(MAT_DIALOG_DATA);
  private _id = signal<string>(this._user._id ?? '');
  private _userFormService = inject(UserFormFactoryService);
  private _userService = inject(UserService);
  private _snackbarService = inject(SnackbarService);

  public title = computed(() => (this._id() ? 'Edit Role' : 'Add Role'));
  public buttonText = computed(() => (this._id() ? 'Save' : 'Create'));
  public userForm = computed(() => this._userFormService.userForm());

  private _teamService = inject(TeamsService);
  public teamList = signal<Team[]>([]);

  private _roleService = inject(RolesService);
  public roleList = signal<Role[]>([]);


  constructor() {
    console.log(this._user);
    this._getRolesList();
    this._getTeams();
    if (this._id()) {
      this._userFormService.populateRoleForm(this._user);
    }
  }

  ngOnDestroy(): void {
    this._userFormService.resetValues();
   }

  save(): void{
    if(this.userForm().invalid){
      this.userForm().markAllAsTouched();
      return;
    }
    this.isSaving = true;
    if(this._id()) {
      this._updateUser();
    }
    else {
      this._createUser();
    }
   }

  private _createUser(): void {
    const newRole = {
      name: this.userForm().get('name')?.value,
      email: this.userForm().get('email')?.value,
      lastName: this.userForm().get('lastName')?.value,
      teamId: this.userForm().get('teamId')?.value,
      roleId: this.userForm().get('roleId')?.value
    };

    this._userService.createUser(newRole).subscribe({
      next: (response: User) => {
        this._snackbarService.openSnackBar('User created successfully');
        this._id.set(response._id!);
        this.isSaving = false;
      },
      error: (err) => {
        this._snackbarService.openSnackBar(err.error.message);
        this.isSaving = false;
      },
    });
  }

  private _updateUser(): void {
    const updatedRole = {
      name: this.userForm().get('name')?.value,
      email: this.userForm().get('email')?.value,
      lastName: this.userForm().get('lastName')?.value,
      teamId: this.userForm().get('teamId')?.value,
      roleId: this.userForm().get('roleId')?.value,
      isActive: this.userForm().get('isActive')?.value,
    };

    this._userService.updateUser(this._id(), updatedRole).subscribe({
      next: (response: User) => {
        this._snackbarService.openSnackBar('User saved successfully');
        this.isSaving = false;
      },
      error: (err) => {
        this._snackbarService.openSnackBar(err.error.message);
        this.isSaving = false;
      },
    });
  }

  private _getRolesList(): void {
    this._roleService.getAllRoles().subscribe({
      next: (response: Role[]) => {
        this.roleList.set(response);
      }
    })
  }

  private _getTeams(): void {
    this._teamService.getAllTeams().subscribe({
      next: (response: Team[]) => {
        this.teamList.set(response);
      }
    })
  }

}
