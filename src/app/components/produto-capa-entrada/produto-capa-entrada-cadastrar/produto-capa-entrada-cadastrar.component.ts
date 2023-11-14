import { formatDate } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ProdutoEntrada } from 'src/app/models/ProdutoEntrada';
import { ProdutoEntradaService } from 'src/app/services/produto-entrada.service';

@Component({
  selector: 'app-produto-capa-entrada-cadastrar',
  templateUrl: './produto-capa-entrada-cadastrar.component.html',
  styleUrls: ['./produto-capa-entrada-cadastrar.component.scss']
})
export class ProdutoEntradaEntradaCadastrarComponent {

produtoEntrada: FormGroup;

  constructor(
    private produtoEntradaService: ProdutoEntradaService,
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<ProdutoEntradaEntradaCadastrarComponent>,
    private toast: ToastrService,
    private router: Router
  ) {

    this.produtoEntrada = this.formBuilder.group({
    numeroNota: '',
    dataPedido: '',
    dataEntrega: '',
    precoCompra: '',
    quantidade: '',
    observacao: '',
    produtoCapa: ''
    })
  }

  ngOnInit(): void {

  }

  create(): void {

    const formData = this.produtoEntrada.value;

  // Formatando datas
  formData.dataPedido = formatDate(formData.dataPedido, 'dd/MM/yyyy', 'en-US');
  formData.dataEntrega = formatDate(formData.dataEntrega, 'dd/MM/yyyy', 'en-US');

    this.produtoEntradaService.create(formData).subscribe({
      next: response => {
        this.toast.success('Entrada do produto lançada com sucesso');
        console.log(response)
        this.router.navigate(['produtoEntrada'])
      },
      error: ex => {
        if (ex.error && ex.error.errors && ex.error.errors.length > 0) {
          const primeiroErro = ex.error.errors[0];
          if (primeiroErro.message) {
            this.toast.error(primeiroErro.message);
          }
        } else {
          this.toast.error(ex.error);
        }
        console.log(ex)
      }
    })
  }

}
