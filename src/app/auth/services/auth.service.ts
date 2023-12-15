import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';
import { Observable, map, catchError, throwError, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LoginResponse } from '../interface/login-response.interface';
import { LoggedUser } from '../interface/login.interface';
import { AuthStatus } from '../enum/auth-state.enum';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly _baseUrl: string = environment.baseUrl;
  private _http = inject( HttpClient );
  private _currentUser = signal<LoggedUser|null>(null);
  private _authStatus = signal<AuthStatus>( AuthStatus.checking );
  private _router = inject(Router);

  //! Al mundo exterior
  public currentUser = computed( () => this._currentUser() );
  public authStatus = computed( () => this._authStatus() );

  constructor() {
    this.checkAuthStatus().subscribe();
  }

  private setAuthentication(user: LoggedUser, token:string): boolean {
    this._currentUser.set( user );
    this._authStatus.set( AuthStatus.authenticated );
    localStorage.setItem('token', token);
    localStorage.setItem('Role', user.roleName);

    return true;
  }

  login( email: string, password: string ): Observable<boolean> {
    const url  = `${ this._baseUrl }/auth/login`;
    const body = { email, password };

    return this._http.post<LoginResponse>( url, body )
      .pipe(
        map( ({ user, token }) => this.setAuthentication( user, token )),
        catchError( err => throwError( () => err.error.message ))
      );
  }
  
  checkAuthStatus(): Observable<boolean> {

    const url   = `${ this._baseUrl }/auth/regenarate-token`;
    const token = localStorage.getItem('token');

    if ( !token ) {
      this.logout();
      return of(false); //of(false);
    }

    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${ token }`);

    this._authStatus.set( AuthStatus.authenticated );

      return of(true);

      // return this.http.get<RegenerateTokenResponse>(url, { headers })
      //   .pipe(
      //     map( ({ user, token }) => this.setAuthentication( user, token )),
      //     catchError(() => {
      //       this._authStatus.set( AuthStatus.notAuthenticated );
      //       return of(false);
      //     })
      //   );
  }

  logout() {
    localStorage.removeItem('token');
    this._currentUser.set(null);
    this._authStatus.set( AuthStatus.notAuthenticated );
    this._router.navigateByUrl('/auth/login')

  }

}
