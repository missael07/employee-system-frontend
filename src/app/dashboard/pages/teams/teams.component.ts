import { Component, inject } from '@angular/core';
import { NavbarTitleService } from '../../services/shared/navbar-title.service';
import { LoadingService } from 'src/app/shared/services/loading.service';
import { TeamsService } from '../../services/teams/teams.service';
import { DialogService } from 'src/app/shared/services/dialog/dialog.service';
import { Team } from '../../interfaces/teams/team.interface';
import { TeamComponent } from './team/team.component';
import { PageEvent } from '@angular/material/paginator';
import { Sort } from '@angular/material/sort';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.css'],
})
export class TeamsComponent {


  private _navService = inject(NavbarTitleService);
  private _loadingService = inject(LoadingService);
  private _teamService = inject(TeamsService);
  private _dialogService = inject(DialogService);

  constructor() {
    this._navService.setNavbarTitle('Teams');
    this._setFilterConfig(0,5);
    this._getTeamsData();
  }

  //#region Filter Methods
  search(value: string) {
    this._setFilterConfig(0,5,'createdAt','desc', value)
    this._getTeamsData();
  }

  handlePageEvent(e: PageEvent) {
    this._setFilterConfig(e.pageIndex,5)
    this._getTeamsData();
  }

  applySort(sortState: Sort){
    this._setFilterConfig(0,5, sortState.active, sortState.direction !== 'asc' ? 'desc' : 'asc')
    this._getTeamsData();
  }
  //#endregion

  addNewTeam(data: Team = { teamName: '', isActive: true} ) {
    this._dialogService.openDialog(TeamComponent,data).subscribe({
      next: () => {
        this._getTeamsData();
      }
    })
  }

  changeStatus(data: {id: string, status: boolean}) {
    console.log(data);
    this._teamService.chanceStatus(data.id, data.status).subscribe({
      next: () => {
        this._getTeamsData();
      }
    })
 }

  private _setFilterConfig(pageIndex: number, pageSize: number, sortActive: string = 'createdAt', sortDirection: 'asc' | 'desc' = 'desc', filterBy: string = '') {
    this._teamService.filterConfig.set({
      pageIndex: pageIndex,
      pageSize: pageSize,
      sortBy: sortActive,
      sortDirection: sortDirection,
      filterBy
    })
  }

  private _getTeamsData() {
    this._loadingService.loadingOn();
    this._teamService.getTeamsList().subscribe({
      next: () => {
          this._loadingService.loadingOff();
      },
      error: (message) => console.log(message),
    });
  }

  get displayedColumns() {
    return [
      {
        name: 'teamName',
        label: 'Name',
        type: 'link',
      },
      {
        name: 'projectId',
        label: 'Project',
        parentProperty: 'name',
        type: 'parentProperty'
      },
      {
        name: 'createdAt',
        label: 'Created Date',
        type: 'date'
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

  get teamList() {
    return this._teamService.teamsLists();
  }

  get totalRows() {
    return this._teamService.totalRows();
  }
}
