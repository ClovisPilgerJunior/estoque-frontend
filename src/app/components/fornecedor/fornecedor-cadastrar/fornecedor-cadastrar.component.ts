import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, map } from 'rxjs';
import { Fornecedor } from 'src/app/models/Fornecedor';
import { FornecedorService } from 'src/app/services/fornecedor.service';

@Component({
  selector: 'app-fornecedor-cadastro',
  templateUrl: './fornecedor-cadastrar.component.html',
  styleUrls: ['./fornecedor-cadastrar.component.scss']
})
export class FornecedorCadastroComponent implements OnInit {

  fornecedor: Fornecedor = {
    empresa: '',
    nome: '',
    tipoEmpresa: '',
    email: '',
    telefone: '',
    endereco: '',
    ativo: true
  }

  constructor(
    private fornecedorService: FornecedorService,
    private toast: ToastrService,
    private router: Router
  ) {
  }

    empresa: FormControl = new FormControl(null, [Validators.required])
    nome: FormControl = new FormControl(null, [Validators.required])
    tipoEmpresa: FormControl = new FormControl(null, [Validators.required])
    email: FormControl = new FormControl(null, [Validators.required])
    telefone: FormControl = new FormControl(null, [Validators.required])

  ngOnInit(): void {

  }

  create(): void {
    this.fornecedorService.create(this.fornecedor).subscribe({
      next: response => {
        this.toast.success('Fornecedor cadastrado com sucesso');
        this.router.navigate(['fornecedor'])
      },
      error: ex => {
        if (ex.error && ex.error.errors && ex.error.errors.length > 0) {
          const primeiroErro = ex.error.errors[0];
          if (primeiroErro.message) {
            this.toast.error(primeiroErro.message);
          }
        } else {
          this.toast.error(ex.error.message);
        }
      }
    })
  }


  fieldValidate(): boolean {
    return this.empresa.valid &&
      this.nome.valid &&
      this.tipoEmpresa.valid &&
      this.email &&
      this.telefone.valid
  }
}
