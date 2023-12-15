import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal, computed } from '@angular/core';
import { Observable, map, catchError, throwError } from 'rxjs';
import { FilterConfig } from 'src/app/shared/interfaces/filter-config';
import { environment } from 'src/environments/environment';
import { UserResponse } from '../../interfaces/users/user-response';
import { User } from '../../interfaces/users/user.interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  
  private _http = inject(HttpClient);
  private readonly baseUrl: string = environment.baseUrl;
  private _usersList = signal<User[]>([]);
  private _totalRows = signal<number>(0);

  public usersLists = computed( () => this._usersList());
  public totalRows = computed( () => this._totalRows());
  public filterConfig = signal<FilterConfig | null>(null)

  getUserPaginatedList(): Observable<boolean> {
    return this._http.post<UserResponse>(`${this.baseUrl}/users/GetPaginatedUsers`, this.filterConfig()).pipe(
      map( ({totalRows, data}) => this._setUsersList(totalRows, data)),
      catchError( err => throwError( () => err.error.message ))
    );
  }

  private _setUsersList(totalRows: number, usersListResponse: User[]){
    this._usersList.set(usersListResponse);
    this._totalRows.set(totalRows);
    return true;
  }

  createUser(user: any): Observable<User> {
    return this._http.post<User>(`${this.baseUrl}/users`, user);
  }
  
  updateUser(id: string, user: any): Observable<User> {
    return this._http.put<User>(`${this.baseUrl}/users/${id}`, user);
  }

  chanceStatus(id: string, status: boolean){
    return this._http.delete<User>(`${this.baseUrl}/users/${id}`,{
      body: {status}
    });
  }
}
