import { Component, ViewChild, computed, inject } from '@angular/core';
import { NavbarTitleService } from '../../services/shared/navbar-title.service';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Project } from '../../interfaces/projects/project.interface';
import { ProjectService } from '../../services/projects/project.service';
import { LoadingService } from 'src/app/shared/services/loading.service';
import { DialogService } from 'src/app/shared/services/dialog/dialog.service';
import { ProjectComponent } from './project/project.component';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css'],
})
export class ProjectsComponent {
  navService = inject(NavbarTitleService);
  private _projectService = inject(ProjectService);
  private _loadingService = inject(LoadingService);
  private _dialogService = inject(DialogService);

  // displayedColumns: string[] = ['name', 'isActive','createdDate', 'options'];

  constructor() {
    this.navService.setNavbarTitle('Projects');
    this._setFilterConfig(0,5);
    this._getProjectData();
  }

  search(searchValue: string) {
    this._setFilterConfig(0,5,'createdAt','desc', searchValue)
    this._getProjectData();
  }

  handlePageEvent(e: PageEvent) {
    this._setFilterConfig(e.pageIndex,5)
    this._getProjectData();
  }

  applySort(sortState: Sort){
    this._setFilterConfig(0,5, sortState.active, sortState.direction !== 'asc' ? 'desc' : 'asc')
    this._getProjectData();
  }

  openDialog(data: Project = {name: '', isActive: true}){
    this._dialogService.openDialog(ProjectComponent,data).subscribe({
      next: () => {
        this._getProjectData();
      }
    })
  }

 changeStatus(data: {id: string, status: boolean}) {
    this._projectService.chanceStatus(data.id, data.status).subscribe({
      next: () => {
        this._getProjectData();
      }
    })
 }

  private _setFilterConfig(pageIndex: number, pageSize: number, sortActive: string = 'createdAt', sortDirection: 'asc' | 'desc' = 'desc', filterBy: string = '') {
    this._projectService.filterConfig.set({
      pageIndex: pageIndex,
      pageSize: pageSize,
      sortBy: sortActive,
      sortDirection: sortDirection,
      filterBy
    })
  }

  private _getProjectData() {
    this._loadingService.loadingOn();
    this._projectService.getProjectsList().subscribe({
      next: () => {
          this._loadingService.loadingOff();
      },
      error: (message) => console.log(message),
    });
  }

  get projectList() {
    return this._projectService.projectLists();
  }

  get totalRows() {
    return this._projectService.totalRows();
  }

  get displayedColumns() {
    return [
      {
        name: 'name',
        label: 'Name',
        type: 'link',
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
}
