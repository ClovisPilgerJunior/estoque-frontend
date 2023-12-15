import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { Credentials } from 'src/app/models/credentials';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  constructor(
    private toast: ToastrService,
    private service: AuthService,
    private router: Router) { }

  creds: Credentials = {
    name: '',
    password: ''
  }

  name = new FormControl(null, Validators.required);
  password = new FormControl(null, Validators.minLength(3));

  login() {
    this.service.authenticate(this.creds).subscribe({
      next: response => {
        const responseBody = response.body.toString();
        const cleanedBody = responseBody.replace(/[{}":]|token/g, '');

        this.service.successfulLogin(cleanedBody);
        this.toast.success('Login realizado com sucesso', 'Login', { timeOut: 3000, positionClass: 'toast-bottom-right' });
        this.router.navigate(['']);
      },
      error: err => {
        // Em casso de erro de autenticação lança esse callback
        this.toast.error('Usuário e/ou senha inválidos', 'Sistema');
      }
    });
  }




  fieldsValidate(): boolean {
    return this.name.valid && this.password.valid;
  }

}
