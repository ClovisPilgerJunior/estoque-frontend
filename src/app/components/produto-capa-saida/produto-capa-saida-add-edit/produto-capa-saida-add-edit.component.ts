import { formatDate } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ProdutoSaidaService } from 'src/app/services/produto-saida.service ';
import { UnidadeProdutiva } from './../../../models/unidadeProdutiva';
import { UnidadeProdutivaService } from './../../../services/unidade-produtiva.service';
import { parse } from 'date-fns';
import { ProdutoCapaService } from 'src/app/services/produto-capa.service';
import { ProdutoCapa } from 'src/app/models/ProdutoCapa';

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
    {valor: 3, nome: 'SERVIÇOS GERAIS'},
    {valor: 4, nome: 'FACÇÃO'}
  ]

  produtoSaida: FormGroup;


  constructor(
    private produtoSaidaService: ProdutoSaidaService,
    private unidadeProdutivaService: UnidadeProdutivaService,
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<ProdutoCapaSaidaAddEditComponent>,
    private toast: ToastrService,
    private router: Router,
    private produtoCapaService: ProdutoCapaService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.produtoSaida = this.formBuilder.group({
      id: '',
      dataSaida: ['', Validators.required],
      quantidade: ['', Validators.required],
      retiradoPor: ['', Validators.required],
      setor: ['', Validators.required],
      unidadeProdutiva: ['', Validators.required],
      observacao: '',
      produtoCapa: ['', Validators.required],
      produtoCapaDesc: '',
    });
    this.findAllUnidadeProdutiva();
  }

  private setUnidadeProdutivaValidator() {
    this.produtoSaida.get('unidadeProdutiva').setValidators([Validators.required]);
    this.produtoSaida.get('unidadeProdutiva').updateValueAndValidity();
  }

  private removeUnidadeProdutivaValidator() {
    this.produtoSaida.get('unidadeProdutiva').clearValidators();
    this.produtoSaida.get('unidadeProdutiva').updateValueAndValidity();
  }

  converterParaValorNumerico(nome: string): number {
    const setor = this.setores.find(s => s.nome === nome);
    return setor ? setor.valor : 0; // Substitua 0 pelo valor padrão se não encontrar
  }

  ngOnInit(): void {
    this.produtoSaida.patchValue(this.data)

    if(this.data){
      const dataSaida = parse(this.data.dataSaida, 'dd/MM/yyyy', new Date());
      this.produtoSaida.patchValue({
        dataSaida
      });
    } else {
      const dataSaida =  new Date();
      this.produtoSaida.patchValue({
        dataSaida
      });
    }

    this.removeUnidadeProdutivaValidator();

    // Escuta as mudanças no campo "setor" e ajusta os validadores dinamicamente
    this.produtoSaida.get('setor').valueChanges.subscribe((setor) => {
      if (setor === 'FACÇÃO') {
        this.setUnidadeProdutivaValidator();
      } else {
        this.removeUnidadeProdutivaValidator();
      }
    });
    this.carregarProdutosCapa();

    this.produtoSaida.get('produtoCapa').valueChanges.subscribe((value) => {
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
      this.produtoSaida.patchValue({
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
      this.produtoSaida.patchValue({
        produtoCapaDesc: 'Não cadastrado',
      });
      this.toast.warning('Produto não cadastrado!', 'Sistema!');
      return;
    }

    if (!produto.ativo) {
      // Se o produto estiver inativo, definir a descrição como 'inativo'
      this.produtoSaida.patchValue({
        produtoCapaDesc: 'Produto inativado',
      });
      this.toast.warning('Produto inativado!', 'Sistema!');
      return;
    }

    // Se o produto existir e estiver ativo, definir a descrição normalmente
    this.produtoSaida.patchValue({
      produtoCapaDesc: produto.description,
    });
  }

  listUnidadeProdutiva: UnidadeProdutiva[];

  findAllUnidadeProdutiva(): void {
    this.unidadeProdutivaService.findAll().subscribe(response => {
      // Filtrar a lista de fornecedores para remover os inativos
      this.listUnidadeProdutiva = response.filter(unidadeProdutiva => unidadeProdutiva.ativo === true);
      console.log(this.listUnidadeProdutiva);
    });
  }

  converterUnidadeProdutivaParaValorNumerico(nome: string): number {
    const unidadeProdutiva = this.listUnidadeProdutiva.find(u => u.nome === nome);
    return unidadeProdutiva ? unidadeProdutiva.id : 0; // Substitua 0 pelo valor padrão se não encontrar
  }

  onFormSubmit() {
    if (this.produtoSaida.valid) {
      if (this.data) {
        const formData = { ...this.produtoSaida.value };
        console.log(formData.dataSaida)
        formData.dataSaida = formatDate(formData.dataSaida, 'dd/MM/yyyy', 'en-US');
        console.log(formData.dataSaida)
        formData.setor = this.converterParaValorNumerico(formData.setor)
        console.log(formData.setor)
        if(formData.setor == 4){
          formData.unidadeProdutiva = this.converterUnidadeProdutivaParaValorNumerico(formData.unidadeProdutiva);
        }
        if(formData.setor != 4) {
          formData.unidadeProdutiva = null;
        }
        console.log(formData.unidadeProdutiva)
        this.produtoSaidaService
          .update(formData)
          .subscribe({
            next: (val: any) => {
              this.toast.success('Saida do produto atualizada!', 'Sucesso');
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
      } else {
        const formData = { ...this.produtoSaida.value };
        formData.dataSaida = formatDate(formData.dataSaida, 'dd/MM/yyyy', 'en-US');
        console.log(formData.setor)
        formData.setor = this.converterParaValorNumerico(formData.setor);
        console.log(formData.setor)
        if(formData.setor == 4){
          formData.unidadeProdutiva = this.converterUnidadeProdutivaParaValorNumerico(formData.unidadeProdutiva);
        }
        console.log(formData.unidadeProdutiva)
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

