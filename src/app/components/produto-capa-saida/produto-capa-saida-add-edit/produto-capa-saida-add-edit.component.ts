import { formatDate } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { parse } from 'date-fns';
import { ToastrService } from 'ngx-toastr';
import { ProdutoSaidaService } from 'src/app/services/produto-saida.service ';

@Component({
  selector: 'app-produto-capa-saida-add-edit',
  templateUrl: './produto-capa-saida-add-edit.component.html',
  styleUrls: ['./produto-capa-saida-add-edit.component.scss']
})
export class ProdutoCapaSaidaAddEditComponent implements OnInit {

  setores = [
    {valor: 0, nome: 'MERKETING'},
    {valor: 1, nome: 'ESCRITORIO'},
    {valor: 2, nome: 'USO INTERNO'},
    {valor: 3, nome: 'SERVIÇOS GERAIS'}
  ]

  produtoSaida: FormGroup;


  constructor(
    private produtoSaidaService: ProdutoSaidaService,
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<ProdutoCapaSaidaAddEditComponent>,
    private toast: ToastrService,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.produtoSaida = this.formBuilder.group({
      id: '',
      dataSaida: [formatDate(new Date(), 'dd/MM/yyyy', 'pt'), Validators.required],
      quantidade: ['', Validators.required],
      retiradoPor: ['', Validators.required],
      setor: ['', Validators.required],
      observacao: '',
      produtoCapa: ['', Validators.required],
      produtoCapaDesc: '',
    })
  }

  converterParaValorNumerico(nome: string): number {
    const setor = this.setores.find(s => s.nome === nome);
    return setor ? setor.valor : 0; // Substitua 0 pelo valor padrão se não encontrar
  }

  ngOnInit(): void {
    this.produtoSaida.patchValue(this.data)
  }

  onFormSubmit() {
    if (this.produtoSaida.valid) {
      if (this.data) {
        const formData = { ...this.produtoSaida.value };
        formData.setor = this.converterParaValorNumerico(formData.setor)
        formData.dataSaida = formatDate(formData.dataSaida, 'dd/MM/yyyy', 'pt');
        this.produtoSaidaService
          .update(formData)
          .subscribe({
            next: (val: any) => {
              this.toast.success('Saida do produto atualizada!', 'Sucesso');
              this.dialogRef.close(true);
            },
            error: (err: any) => {
              this.toast.error(err.message)
              console.error(err);
            },
          });
      } else {
        const formData = { ...this.produtoSaida.value };
        formData.dataSaida = formatDate(formData.dataSaida, 'dd/MM/yyyy', 'en-US');
        formData.setor = this.converterParaValorNumerico(formData.setor)
        this.produtoSaidaService.create(formData).subscribe({
          next: (val: any) => {
            this.toast.success('Saida do produto lançada', 'Sucesso!');
            this.dialogRef.close(true);
          },
          error: (err: any) => {
            if(err.status=409) {
              this.toast.warning(err.error.message, 'Aviso')
            } else {
            this.toast.error(err.error.message, 'Erro')
            console.error(err);
            }
          },
        });
      }
    }
  }
}
