import { fornecedor } from 'src/app/models/Fornecedor';
import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ProdutoCapaService } from 'src/app/services/produto-capa.service';
import { FornecedorService } from 'src/app/services/fornecedor.service';
import { ProdutoCapa } from 'src/app/models/ProdutoCapa';

@Component({
  selector: 'app-produto-capa-cadastrar',
  templateUrl: './produto-capa-cadastrar.component.html',
  styleUrls: ['./produto-capa-cadastrar.component.scss']
})
export class ProdutoCapaCadastrarComponent {

  produtoCapa: ProdutoCapa = {
    description: '',
    tipoProduto: '',
    medidaUnidade: '',
    fornecedor: null,
    minimo: null,
    maximo: null,
    resuprimento: '',
    ativo: true
  }


  fornecedor: fornecedor[] = []

  findAllFornecedor(): void {
    this.fornecedorService.findAll().subscribe(response => {
      // Filtrar a lista de fornecedores para remover os inativos
      this.fornecedor = response.filter(fornecedor => fornecedor.ativo === true);
      console.log(this.fornecedor);
    });
  }


  medidas = [
    { valor: 0, nome: 'UNIDADE' },
    { valor: 1, nome: 'PACOTE' },
    { valor: 2, nome: 'KILO' },
    { valor: 3, nome: 'PEÇA' },
    { valor: 4, nome: 'METRO' },
    { valor: 5, nome: 'GRAMAS' },
    { valor: 6, nome: 'CAIXA' },
    { valor: 7, nome: 'SACO' },
    { valor: 8, nome: 'PAR' },
    { valor: 9, nome: 'MILHEIRO' },
    { valor: 10, nome: 'MILIGRAMAS' },
  ];

  produtos = [
    { valor: 0, nome: 'MATERIA_PRIMA' },
    { valor: 1, nome: 'PRODUTO_PRONTO' },
    { valor: 2, nome: 'DIVERSOS' },
  ];

  constructor(
    private produtoCapaService: ProdutoCapaService,
    private fornecedorService: FornecedorService,
    private toast: ToastrService,
    private router: Router
  ) {

   this.findAllFornecedor()
   console.log(this.findAllFornecedor())
  }

    description: FormControl = new FormControl(null, [Validators.required])
    fornecedorSelect: FormControl = new FormControl(null, [Validators.required])
    minimo = new FormControl(this.produtoCapa.minimo, [Validators.required]);
    maximo = new FormControl(this.produtoCapa.maximo, [Validators.required]);

    updateMaximo() {
      if (this.maximo.value < this.minimo.value) {
        this.maximo.setValue(this.minimo.value);
      }
    }

  ngOnInit(): void {


  }




  create(): void {
    this.produtoCapaService.create(this.produtoCapa).subscribe({
      next: response => {
        this.toast.success('Produto capa cadastrado com sucesso');
        console.log(response)
        this.router.navigate(['produtoCapa'])
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
        console.log(ex)
      }
    })
  }


  fieldValidate(): boolean {
    return this.description.valid && this.minimo.valid
           && this.maximo.valid
  }


}
