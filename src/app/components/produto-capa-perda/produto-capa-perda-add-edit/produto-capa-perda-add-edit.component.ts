import { formatDate } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { parse } from 'date-fns';
import { ToastrService } from 'ngx-toastr';
import { Observable, map, startWith } from 'rxjs';
import { ProdutoCapa } from 'src/app/models/ProdutoCapa';
import { ProdutoCapaService } from 'src/app/services/produto-capa.service';
import { ProdutoPerdaService } from 'src/app/services/produto-perda.service';

@Component({
  selector: 'app-produto-capa-perda-add-edit',
  templateUrl: './produto-capa-perda-add-edit.component.html',
  styleUrls: ['./produto-capa-perda-add-edit.component.scss'],
})
export class ProdutoCapaPerdaAddEditComponent implements OnInit {
  produtoPerda: FormGroup;

  constructor(
    private produtoPerdaService: ProdutoPerdaService,
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<ProdutoCapaPerdaAddEditComponent>,
    private toast: ToastrService,
    private router: Router,
    private produtoCapaService: ProdutoCapaService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.produtoPerda = this.formBuilder.group({
      id: '',
      data: '',
      quantidade: '',
      motivo: '',
      produtoCapa: '',
      produtoCapaDesc: '',
    });
  }

  ngOnInit(): void {
    this.produtoPerda.patchValue(this.data);

    if (this.data) {
      const data = parse(this.data.data, 'dd/MM/yyyy', new Date());
      this.produtoPerda.patchValue({
        data,
      });
    } else {
      const data = new Date();
      this.produtoPerda.patchValue({
        data,
      });
    }

    this.carregarProdutosCapa();

    this.produtoPerda.get('produtoCapa').valueChanges.subscribe((value) => {
      this.atualizarDescricaoPeloSKU(value);
    });
  }

  produtoCapaList: ProdutoCapa[] = [];

  carregarProdutosCapa() {
    this.produtoCapaService.findAll().subscribe(
      (produtos: ProdutoCapa[]) => {
        this.produtoCapaList = produtos;
      },
      (error) => {
        console.error('Erro ao carregar produtos:', error);
      }
    );
  }

  atualizarDescricaoPeloSKU(value: string) {
    if (!value) {
      // Se o SKU estiver vazio, deixe a descrição vazia
      this.produtoPerda.patchValue({
        produtoCapaDesc: '',
      });
      return;
    }

    const isNumber = !isNaN(Number(value));
    const produto = this.produtoCapaList.find(
      (p) => (isNumber && p.id === Number(value)) || p.description === value
    );

    if (!produto) {
      // Se o produto não existir, definir a descrição como 'inexistente'
      this.produtoPerda.patchValue({
        produtoCapaDesc: 'Não cadastrado',
      });
      this.toast.warning('Produto não cadastrado!', 'Sistema!');
      return;
    }

    if (!produto.ativo) {
      // Se o produto estiver inativo, definir a descrição como 'inativo'
      this.produtoPerda.patchValue({
        produtoCapaDesc: 'Produto inativado',
      });
      this.toast.warning('Produto inativado!', 'Sistema!');
      return;
    }

    // Se o produto existir e estiver ativo, definir a descrição normalmente
    this.produtoPerda.patchValue({
      produtoCapaDesc: produto.description,
    });
  }

  onFormSubmit() {
    if (this.produtoPerda.valid) {
      if (this.data) {
        const formData = { ...this.produtoPerda.value };
        formData.data = formatDate(formData.data, 'dd/MM/yyyy', 'en-US');
        this.produtoPerdaService.update(formData).subscribe({
          next: (val: any) => {
            this.toast.success('Perda do produto atualizada!', 'Sucesso!');
            this.dialogRef.close(true);
          },
          error: (err: any) => {
            if ((err.status = 409)) {
              this.toast.warning(err.error.message, 'Aviso');
            } else {
              this.toast.error(err.error.message, 'Erro');
              console.error(err);
            }
          },
        });
      } else {
        const formData = { ...this.produtoPerda.value };
        formData.data = formatDate(formData.data, 'dd/MM/yyyy', 'en-US');
        this.produtoPerdaService.create(formData).subscribe({
          next: (val: any) => {
            this.toast.success('Perda do produto lançada', 'Sucesso!');
            this.dialogRef.close(true);
          },
          error: (err: any) => {
            if ((err.status = 409)) {
              this.toast.warning(err.error.message, 'Aviso');
            } else {
              this.toast.error(err.error.message, 'Erro');
              console.error(err);
            }
          },
        });
      }
    }
  }
}
