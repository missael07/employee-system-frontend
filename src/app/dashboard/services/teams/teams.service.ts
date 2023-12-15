import { HttpClient } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';
import { Observable, catchError, map, throwError } from 'rxjs';
import { FilterConfig } from 'src/app/shared/interfaces/filter-config';
import { environment } from 'src/environments/environment';
import { Team } from '../../interfaces/teams/team.interface';
import { TeamResponse } from '../../interfaces/teams/team-response';

@Injectable({
  providedIn: 'root'
})
export class TeamsService {

  private _http = inject(HttpClient);
  private readonly baseUrl: string = environment.baseUrl;
  private _teamsList = signal<Team[]>([]);
  private _totalRows = signal<number>(0);

  public teamsLists = computed( () => this._teamsList());
  public totalRows = computed( () => this._totalRows());
  public filterConfig = signal<FilterConfig | null>(null)

  getAllTeams(){
    return this._http.get<Team[]>(`${this.baseUrl}/teams`);
  }

  getTeamsList(): Observable<boolean> {
    return this._http.post<TeamResponse>(`${this.baseUrl}/teams/GetPaginatedTeams`, this.filterConfig()).pipe(
      map( ({totalRows, data}) => this._setTeamsList(totalRows, data)),
      catchError( err => throwError( () => err.error.message ))
    );
  }
  private _setTeamsList(totalRows: number,teamsListResponse: Team[]){
    this._teamsList.set(teamsListResponse);
    this._totalRows.set(totalRows);
    return true;
  }

  createTeam(team: any): Observable<Team> {
    return this._http.post<Team>(`${this.baseUrl}/teams`, team);
  }
  
  updateTeam(id: string, team: any): Observable<Team> {
    return this._http.put<Team>(`${this.baseUrl}/teams/${id}`, team);
  }

  chanceStatus(id: string, status: boolean){
    return this._http.delete<Team>(`${this.baseUrl}/teams/${id}`,{
      body: {status}
    });
  }
}
