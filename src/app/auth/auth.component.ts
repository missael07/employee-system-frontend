import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent {

  hide = true;
  private fb          = inject( FormBuilder );
  private authService = inject( AuthService );
  private router      = inject( Router );


  public loginForm: FormGroup = this.fb.group({
    email:    ['missaelp@padillaSoftware.com', [ Validators.required, Validators.email ]],
    password: ['PadillaSoftware.2023', [ Validators.required, Validators.minLength(6) ]],
  });

  login() {
    const { email, password } = this.loginForm.value;

    this.authService.login(email, password)
      .subscribe({
        next: () => this.router.navigateByUrl('/dashboard'),
        error: (message) => {
          console.log(message)
        }
      })

  }
}
