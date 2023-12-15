import { Component, inject } from '@angular/core';
import { NavbarTitleService } from '../../services/shared/navbar-title.service';
import { UserService } from '../../services/users/user.service';
import { PageEvent } from '@angular/material/paginator';
import { Sort } from '@angular/material/sort';
import { DialogService } from 'src/app/shared/services/dialog/dialog.service';
import { LoadingService } from 'src/app/shared/services/loading.service';
import { User } from '../../interfaces/users/user.interface';
import { DisplayColumnsConsts } from '../../consts/consts';
import { UserComponent } from './user/user.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent {
  private _navService = inject(NavbarTitleService);
  private _userService = inject(UserService);
  private _loadingService = inject(LoadingService);
  private _dialogService = inject(DialogService);

  constructor() {
    this._navService.setNavbarTitle('Users');
    this._setFilterConfig(0,5)
    this._getUsersData();
  }

  //#region Filter Methods
  search(value: string) {
    this._setFilterConfig(0, 5, 'name', 'desc', value);
    this._getUsersData();
  }

  handlePageEvent(e: PageEvent) {
    this._setFilterConfig(e.pageIndex, 5);
    this._getUsersData();
  }

  applySort(sortState: Sort) {
    this._setFilterConfig(
      0,
      5,
      sortState.active,
      sortState.direction !== 'asc' ? 'desc' : 'asc'
    );
    this._getUsersData();
  }
  //#endregion

  openDialog(
    data: User = {
      name: '',
      lastName: '',
      email: '',
      fullName: '',
      employeeNumber: 0,
      isActive: true,
    }
  ) {
    this._dialogService.openDialog(UserComponent,data).subscribe({
      next: () => {
        this._getUsersData();
      }
    })
  }

  changeStatus(data: { id: string; status: boolean }) {
    this._userService.chanceStatus(data.id, data.status).subscribe({
      next: () => {
        this._getUsersData();
      },
    });
  }

  private _getUsersData() {
    this._loadingService.loadingOn();
    this._userService.getUserPaginatedList().subscribe({
      next: () => {
        this._loadingService.loadingOff();
      },
      error: (message) => {
        this._loadingService.loadingOff();
        console.log(message);
      },
    });
  }

  private _setFilterConfig(
    pageIndex: number,
    pageSize: number,
    sortActive: string = 'name',
    sortDirection: 'asc' | 'desc' = 'desc',
    filterBy: string = ''
  ) {
    this._userService.filterConfig.set({
      pageIndex: pageIndex,
      pageSize: pageSize,
      sortBy: sortActive,
      sortDirection: sortDirection,
      filterBy,
    });
  }

  get displayedColumns(): any[] {
    return DisplayColumnsConsts.UserColumns;
  }

  get usersList() {
    return this._userService.usersLists();
  }

  get totalRows() {
    return this._userService.totalRows();
  }
}
