import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { Credentials } from 'src/app/models/credentials';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {

  loginForm: FormGroup;

  constructor(
    private toast: ToastrService,
    private service: AuthService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {

    this.loginForm = this.formBuilder.group({
      name: ['', Validators.required],
      password: ['', Validators.minLength(3)]
    })

  }

  onLogin() {
    const credentials: Credentials = this.loginForm.value;
    this.service.authenticate(credentials).subscribe({
      next: (response) => {
        const responseBody = response.body.toString();
        const cleanedBody = responseBody.replace(/[{}":]|token/g, '');

        this.service.successfulLogin(cleanedBody);
        this.toast.success('Login realizado com sucesso', 'Login', {
          timeOut: 3000,
          positionClass: 'toast-bottom-right',
        });
        this.router.navigate(['']);
      },
      error: (err) => {
        // Em caso de erro de autenticação lança esse callback
        if (err.status === 0 || err.status === 504) {
          this.toast.warning(
            'Conexão recusada com o servidor. Verifique a sua conexão com a internet ou sistema está desligado',
            'Sistema'
          );
        } else {
          console.log(err);
          const errorMessage = this.extractErrorMessage(err);
          this.toast.error(errorMessage, 'Sistema');
        }
      },
    });
  }

  private extractErrorMessage(err: any): string {
    try {
      const errorObj = JSON.parse(err.error);
      return errorObj.message || 'Erro desconhecido';
    } catch (parseError) {
      console.error('Erro ao fazer parsing do erro JSON:', parseError);
      return 'Erro desconhecido';
    }
  }

}
