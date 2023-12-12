import { HttpClient } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';
import { Observable, catchError, map, throwError } from 'rxjs';
import { Project } from '../../interfaces/projects/project.interface';
import { environment } from 'src/environments/environment';
import { LoadingService } from 'src/app/shared/services/loading.service';
import { ProjectResponse } from '../../interfaces/projects/project-response';
import { FilterConfig } from 'src/app/shared/interfaces/filter-config';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  private _http = inject(HttpClient);
  private readonly baseUrl: string = environment.baseUrl;
  private _projectsList = signal<Project[]>([]);
  private _totalRows = signal<number>(0);

  public projectLists = computed( () => this._projectsList());
  public totalRows = computed( () => this._totalRows());
  public filterConfig = signal<FilterConfig | null>(null)

  private _setProjectsList(totalRows: number,projectsListResponse: Project[]){
    this._projectsList.set(projectsListResponse);
    this._totalRows.set(totalRows);
    return true;
  }

  getProjectsList(): Observable<boolean> {
    return this._http.post<ProjectResponse>(`${this.baseUrl}/projects/GetPaginatedProjects`, this.filterConfig()).pipe(
      map( ({totalRows, data}) => this._setProjectsList(totalRows, data)),
      catchError( err => throwError( () => err.error.message ))
    );
  }

  createProject(project: any): Observable<Project> {
    return this._http.post<Project>(`${this.baseUrl}/projects`, project);
  }
  
  updateProject(id: string, project: any): Observable<Project> {
    return this._http.put<Project>(`${this.baseUrl}/projects/${id}`, project);
  }

  chanceStatus(id: string, status: boolean){
    return this._http.delete<Project>(`${this.baseUrl}/projects/${id}`,{
      body: {status}
    });
  }
}
