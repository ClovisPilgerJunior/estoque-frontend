import { Component, Inject, OnInit, TrackByFunction } from '@angular/core';
import { Location } from '@angular/common';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Fornecedor } from 'src/app/models/Fornecedor';
import { ProdutoCapa } from 'src/app/models/ProdutoCapa';
import { FornecedorService } from 'src/app/services/fornecedor.service';
import { ProdutoCapaService } from 'src/app/services/produto-capa.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Enum } from 'src/app/models/enum';

interface testEnum {
  valor: number;
  nome: string;
}

@Component({
  selector: 'app-produto-capa-atualizar',
  templateUrl: './produto-capa-atualizar.component.html',
  styleUrls: ['./produto-capa-atualizar.component.scss'],
})


export class ProdutoCapaAtualizarComponent implements OnInit {

  updateForm: FormGroup

  produtoCapa: ProdutoCapa;


  ngOnInit(): void {
    this.updateForm.patchValue(this.data);


  }


  constructor(
    private dialogRef: MatDialogRef<ProdutoCapaAtualizarComponent>,
    private fb: FormBuilder,
    private produtoCapaService: ProdutoCapaService,
    private fornecedorService: FornecedorService,
    private toast: ToastrService,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) private data: any
  ) {
    this.updateForm = this.fb.group({
      id: '',
      description: '',
      tipoProduto: null,
      medidaUnidade: null,
      fornecedor: null,
      minimo: '',
      maximo: '',
      ativo: true
    });
    this.findAllFornecedor();
    console.log(data)
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
    { valor: 0, nome: 'MATERIA PRIMA' },
    { valor: 1, nome: 'PRODUTO PRONTO' },
    { valor: 2, nome: 'DIVERSOS' },
  ];

  listFornecedor: Fornecedor[]


  converterProdutoValorNumerico(nome: string): number {
    const produto = this.produtos.find(p => p.nome === nome);
    return produto ? produto.valor : 0; // Substitua 0 pelo valor padrão se não encontrar
  }

  converterMedidaValorNumerico(nome: string): number {
    const medida = this.medidas.find(p => p.nome === nome);
    return medida ? medida.valor : 0; // Substitua 0 pelo valor padrão se não encontrar
  }

  converterParaValorNumerico(nome: string): number {
    const fornecedor = this.listFornecedor.find(f => f.empresa === nome);
    return fornecedor ? fornecedor.id : 0; // Substitua 0 pelo valor padrão se não encontrar
  }

  findAllFornecedor(): void {
    this.fornecedorService.findAll().subscribe(response => {
      // Filtrar a lista de fornecedores para remover os inativos
      this.listFornecedor = response.filter(fornecedor => fornecedor.ativo === true);
      console.log(this.listFornecedor);
    });
  }

  onUpdate() {
    // Copie os valores do formulário para evitar alterações indesejadas
    const formData = { ...this.updateForm.value };

    // Converta o tipoProduto de volta para o valor numérico antes de enviar para o serviço
    formData.tipoProduto = this.converterProdutoValorNumerico(formData.tipoProduto);
    formData.medidaUnidade = this.converterMedidaValorNumerico(formData.medidaUnidade);
    formData.fornecedor = this.converterParaValorNumerico(formData.fornecedor)


    this.produtoCapaService.update(formData).subscribe({
      next: (val: any) => {
        console.log(val)
        this.dialogRef.close();
          this.toast.success('Produto Capa atualizado com sucesso', );
          this.router.navigate(['produtoCapa'])
        },
        error: ex => {
          console.log(ex)
          this.toast.error(ex.error.message);
        }
    })
  }

}
