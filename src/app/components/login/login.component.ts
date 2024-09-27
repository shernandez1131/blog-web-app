import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { LoginRequestDto } from '../../models/dto';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginRequest: LoginRequestDto = { email: '', password: '' };

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    this.authService.login(this.loginRequest).subscribe(
      (response) => {
        this.authService.setToken(response.token);
        this.authService.setUserId(response.userId);
        this.router.navigate(['/blogs']);
      },
      (error) => {
        console.error('Login error', error);
      }
    );
  }
}
