import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  public formLogin!: FormGroup;
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initLoginForm();
  }

  initLoginForm(): void {
    this.formLogin = this.fb.group({
      email: [null, Validators.required],
      password: [null, Validators.required],
    });
  }

  login(): void {
    this.authService.login(this.formLogin.value).subscribe(
      (data) => {
        if (data[0]) {
          const user = data[0];
          localStorage.setItem('currentUser', JSON.stringify(data[0]));
          this.authService.isUserLogin$.next(true);
          if (user.role === 'USER') {
            this.router.navigate(['/cabinet']);
          } else if (user.role === 'ADMIN') {
            this.router.navigate(['/admin']);
          }
        }
      },
      (e) => console.log(e)
    );
  }
}
