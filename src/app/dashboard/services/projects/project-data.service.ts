import { Injectable, computed, inject, signal } from '@angular/core';
import { ProjectService } from './project.service';
import { Project } from '../../interfaces/projects/project.interface';
import { LoadingService } from 'src/app/shared/services/loading.service';

@Injectable({
  providedIn: 'root'
})
export class ProjectDataService {

  // private _projectService = inject(ProjectService);
  // private _loadingService = inject(LoadingService);

  // private _projectsList = signal<Project[]>([]);

  // public projectLists = computed( () => this._projectsList());
  // constructor() { }

  // getProjectsList() {
  //   this._loadingService.loadingOn();
  //   this._projectService.getProjectsList().subscribe({
  //     next: (response: Project[]) => {
  //       console.log(response);
  //       this._loadingService.loadingOff();
  //       this._projectsList.set(response);
  //     },
  //     error: (err) => {
  //       console.log(err);
  //       this._loadingService.loadingOff();
  //     }
  //   })
  // }

  // private setProjectsList(){

  // }
}
