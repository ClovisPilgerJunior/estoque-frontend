import { formatDate } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { parse } from 'date-fns';
import { ToastrService } from 'ngx-toastr';
import { ProdutoCapa } from 'src/app/models/ProdutoCapa';
import { ProdutoCapaService } from 'src/app/services/produto-capa.service';
import { ProdutoEntradaService } from 'src/app/services/produto-entrada.service';

@Component({
  selector: 'app-produto-capa-entrada-atualizar',
  templateUrl: './produto-capa-entrada-atualizar.component.html',
  styleUrls: ['./produto-capa-entrada-atualizar.component.scss'],
})
export class ProdutoCapaEntradaAtualizarComponent {
  produtoEntradaUpdate: FormGroup;

  ngOnInit(): void {
    this.produtoEntradaUpdate.patchValue(this.data)
    // Converta as datas para o formato esperado pelo DatePicker
    const dataPedido = parse(this.data.dataPedido, 'dd/MM/yyyy', new Date());
    const dataEntrega = parse(this.data.dataEntrega, 'dd/MM/yyyy', new Date());

    // Atribua as datas convertidas ao formulário
    this.produtoEntradaUpdate.patchValue({
      dataPedido,
      dataEntrega,
    });

    console.log(this.data)

  }

  constructor(
    private dialogRef: MatDialogRef<ProdutoCapaEntradaAtualizarComponent>,
    private formBuilder: FormBuilder,
    private produtoEntradaService: ProdutoEntradaService,
    private produtoCapaService: ProdutoCapaService,
    private toast: ToastrService,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) private data: any
  ) {
    this.produtoEntradaUpdate = this.formBuilder.group({
      id: '',
      numeroNota: '',
      dataPedido: '',
      dataEntrega: '',
      precoCompra: '',
      quantidade: '',
      observacao: '',
      produtoCapa: ''
    });
  }

  produtoCapa: ProdutoCapa[] = [];

  findAllProdutoCapa(): void {
    this.produtoCapaService.findAll().subscribe(response => {
      // Filtrar a lista de fornecedores para remover os inativos
      this.produtoCapa = response.filter(fornecedor => fornecedor.ativo === true);
      console.log(this.produtoCapa);
    });
  }


  converterParaValorNumerico(nome: string): number {
    const produtoCapa = this.produtoCapa.find(f => f.description === nome);
    return produtoCapa ? produtoCapa.id : 0; // Substitua 0 pelo valor padrão se não encontrar
  }

  onUpdate() {
    const formData = { ...this.produtoEntradaUpdate.value };
    console.log(this.produtoCapa)

    formData.precoCompra = parseFloat(
      formData.precoCompra.replace('R$', '').replace(',', '.').trim()
    );

    formData.dataPedido = formatDate(formData.dataPedido, 'dd/MM/yyyy', 'en-US');
    formData.dataEntrega = formatDate(formData.dataEntrega, 'dd/MM/yyyy', 'en-US');
    console.log(formData)

    this.produtoEntradaService.update(formData).subscribe({
      next: (val: any) => {
        console.log(val)
        this.dialogRef.close();
          this.toast.success('Produto entrada atualizado com sucesso', );
          this.router.navigate(['produtoEntrada'])
        },
        error: ex => {
          console.log(ex)
          this.toast.error(ex.error.message);
        }
    })
  }

}
