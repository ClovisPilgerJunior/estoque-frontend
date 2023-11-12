import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Fornecedor } from 'src/app/models/Fornecedor';
import { FornecedorService } from 'src/app/services/fornecedor.service';

@Component({
  selector: 'app-fornecedor-atualizar',
  templateUrl: './fornecedor-atualizar.component.html',
  styleUrls: ['./fornecedor-atualizar.component.scss']
})
export class FornecedorAtualizarComponent {

  fornecedor: Fornecedor = {
    empresa: '',
    nome: '',
    tipoEmpresa: '',
    email: '',
    telefone: '',
    endereco: '',
    ativo: true
  }

  empresa: FormControl = new FormControl(null, [Validators.required])
  nome: FormControl = new FormControl(null, [Validators.required])
  tipoEmpresa: FormControl = new FormControl(null, [Validators.required])
  email: FormControl = new FormControl(null, [Validators.required])
  telefone: FormControl = new FormControl(null, [Validators.required])
  endereco: FormControl = new FormControl(null, [Validators.required])

  constructor(
    private fornecedorService: FornecedorService,
    private toast: ToastrService,
    private route: ActivatedRoute,
    private router: Router
  ){}

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id')
    this.fornecedor.id = idParam ? parseInt(idParam, 10) : null;
    this.findById();
  }

  findById(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    this.fornecedor.id = idParam ? parseInt(idParam, 10) : null; // Converte para número ou define como null se for nulo ou indefinido

    if (this.fornecedor.id) {
      this.fornecedorService.findById(this.fornecedor.id).subscribe({
        next: response => {
          this.fornecedor = response;

          if (this.fornecedor.tipoEmpresa === 'CLIENTE') {
            this.fornecedor.tipoEmpresa = '1'; // ou o valor correto
          } else if (this.fornecedor.tipoEmpresa === 'FORNECEDOR') {
            this.fornecedor.tipoEmpresa = '0'; // ou o valor correto
          }
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
      });
    }
  }


  update(): void {
    this.fornecedorService.update(this.fornecedor).subscribe({
      next: response => {
        this.toast.success('Fornecedor atualizado com sucesso', 'Fornecedor');
        this.router.navigate(['fornecedor'])
      },
      error: ex => {
        console.log(ex)
        this.toast.error(ex.error.message);
      }
    })
  }

  fieldValidate(): boolean {
    return this.empresa.valid &&
      this.nome.valid &&
      this.tipoEmpresa.valid &&
      this.email &&
      this.telefone.valid &&
      this.endereco.valid
  }

}
