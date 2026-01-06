import { Component,inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth';

@Component({
  selector: 'app-login',
  imports: [],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class LoginComponent {
  private authService = inject(AuthService);
  private router = inject(Router);
  onLogin(){
    this.authService.login();
    this.router.navigate(['/notes']);
  }
}
