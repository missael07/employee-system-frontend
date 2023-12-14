import { Component, inject } from '@angular/core';
import { NavbarTitleService } from '../../services/shared/navbar-title.service';
import { RolesService } from '../../services/roles/roles.service';
import { LoadingService } from 'src/app/shared/services/loading.service';
import { DialogService } from 'src/app/shared/services/dialog/dialog.service';
import { PageEvent } from '@angular/material/paginator';
import { Sort } from '@angular/material/sort';
import { Role } from '../../interfaces/roles/role';
import { RoleComponent } from './role/role.component';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.css']
})
export class RolesComponent {

  private navService = inject(NavbarTitleService);
  private _roleService = inject(RolesService);
  private _loadingService = inject(LoadingService);
  private _dialogService = inject(DialogService);

  constructor(){
    this.navService.setNavbarTitle('Roles');
    this._setFilterConfig(0,5);
    this._getRolesData();
  }

  //#region Filter Methods
  search(value: string) {
    this._setFilterConfig(0,5,'name','desc', value)
    this._getRolesData();
  }

  handlePageEvent(e: PageEvent) {
    this._setFilterConfig(e.pageIndex,5)
    this._getRolesData();
  }

  applySort(sortState: Sort){
    this._setFilterConfig(0,5, sortState.active, sortState.direction !== 'asc' ? 'desc' : 'asc')
    this._getRolesData();
  }
  //#endregion

  addNewRole(data: Role = { roleName: '', isActive: true} ) {
    this._dialogService.openDialog(RoleComponent,data).subscribe({
      next: () => {
        this._getRolesData();
      }
    })
  }

  changeStatus(data: {id: string, status: boolean}) {
    this._roleService.chanceStatus(data.id, data.status).subscribe({
      next: () => {
        this._getRolesData();
      }
    })
 }

  private _getRolesData() {
    this._loadingService.loadingOn();
    this._roleService.getRolesList().subscribe({
      next: () => {
          this._loadingService.loadingOff();
        },
        error: (message) => {
        this._loadingService.loadingOff();
        console.log(message);
      },
    });
  }

  private _setFilterConfig(pageIndex: number, pageSize: number, sortActive: string = 'name', sortDirection: 'asc' | 'desc' = 'desc', filterBy: string = '') {
    this._roleService.filterConfig.set({
      pageIndex: pageIndex,
      pageSize: pageSize,
      sortBy: sortActive,
      sortDirection: sortDirection,
      filterBy
    })
  }

  get displayedColumns() {
    return [
      {
        name: 'roleName',
        label: 'Name',
        type: 'link',
      },
      {
        name: 'isActive',
        label: 'Is Active',
        type: 'question',
      },
      {
        name: 'options',
        label: '',
        type: 'actions',
      },
    ]
  };

  get rolesList() {
    return this._roleService.rolesLists();
  }

  get totalRows() {
    return this._roleService.totalRows();
  }

}
