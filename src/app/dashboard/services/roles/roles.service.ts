import { HttpClient } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';
import { Observable, map, catchError, throwError } from 'rxjs';
import { FilterConfig } from 'src/app/shared/interfaces/filter-config';
import { environment } from 'src/environments/environment';
import { Role } from '../../interfaces/roles/role';
import { RoleResponse } from '../../interfaces/roles/roles-response';

@Injectable({
  providedIn: 'root'
})
export class RolesService {

  
  private _http = inject(HttpClient);
  private readonly baseUrl: string = environment.baseUrl;
  private _rolesList = signal<Role[]>([]);
  private _totalRows = signal<number>(0);

  public rolesLists = computed( () => this._rolesList());
  public totalRows = computed( () => this._totalRows());
  public filterConfig = signal<FilterConfig | null>(null)


  getAllRoles(): Observable<Role[]>{
    return this._http.get<Role[]>(`${this.baseUrl}/roles`);
  }

  getRolesList(): Observable<boolean> {
    return this._http.post<RoleResponse>(`${this.baseUrl}/roles/GetPaginatedRoles`, this.filterConfig()).pipe(
      map( ({totalRows, data}) => this._setRolesList(totalRows, data)),
      catchError( err => throwError( () => err.error.message ))
    );
  }

  private _setRolesList(totalRows: number,rolesListResponse: Role[]){
    this._rolesList.set(rolesListResponse);
    this._totalRows.set(totalRows);
    return true;
  }

  createRole(role: any): Observable<Role> {
    return this._http.post<Role>(`${this.baseUrl}/roles`, role);
  }
  
  updateRole(id: string, role: any): Observable<Role> {
    return this._http.put<Role>(`${this.baseUrl}/roles/${id}`, role);
  }

  chanceStatus(id: string, status: boolean){
    return this._http.delete<Role>(`${this.baseUrl}/roles/${id}`,{
      body: {status}
    });
  }
}
