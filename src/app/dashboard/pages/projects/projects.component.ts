import { Component, ViewChild, computed, inject } from '@angular/core';
import { NavbarTitleService } from '../../services/shared/navbar-title.service';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Project } from '../../interfaces/projects/project.interface';
import { ProjectService } from '../../services/projects/project.service';
import { LoadingService } from 'src/app/shared/services/loading.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css'],
})
export class ProjectsComponent {
  navService = inject(NavbarTitleService);
  private _projectService = inject(ProjectService);
  private _loadingService = inject(LoadingService);
  public isLoading = computed(() => this._loadingService.isLoading());

  displayedColumns: string[] = ['name', 'isActive', 'options'];
  dataSource!: MatTableDataSource<Project>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor() {
    this.navService.setNavbarTitle('Projects');
    this._setFilterConfig(0,10);
    this._getProjectData();
  }

  search(searchValue: string) {
    this._setFilterConfig(0,10,'name','desc', searchValue)
    this._getProjectData();
  }

  handlePageEvent(e: PageEvent) {
    this._setFilterConfig(e.pageIndex,10)
    this._getProjectData();
  }

  applySort(sortState: Sort){
    this._setFilterConfig(0,10, sortState.active, sortState.direction !== 'asc' ? 'desc' : 'asc')
    this._getProjectData();
  }

  openDialog(){

  }

  private _setFilterConfig(pageIndex: number, pageSize: number, sortActive: string = 'name', sortDirection: 'asc' | 'desc' = 'desc', filterBy: string = '') {
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
        setTimeout(() => {
          this._loadingService.loadingOff();
        }, 3500);
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
}
