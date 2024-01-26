import { formatDate } from '@angular/common';
import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ProdutoCapa } from 'src/app/models/ProdutoCapa';
import { ProdutoEntrada } from 'src/app/models/ProdutoEntrada';
import { ProdutoCapaService } from 'src/app/services/produto-capa.service';
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
    private produtoCapaService: ProdutoCapaService,
    private router: Router
  ) {

    this.produtoEntrada = this.formBuilder.group({
    numeroNota: '',
    dataPedido: ['', Validators.required],
    dataEntrega: ['', Validators.required],
    precoCompra: ['', Validators.required], // A validação será aplicada apenas quando retornoFac não estiver selecionado
    quantidade: ['', Validators.required],
    observacao: '',
    produtoCapa: ['', Validators.required],
    produtoCapaDesc: '',
    retornoFac: false,
    }),
    this.findAllEntradas();

    this.produtoEntrada.get('retornoFac')?.valueChanges.subscribe((valor) => {
      const precoCompraControl = this.produtoEntrada.get('precoCompra');

      // Se retornoFac não estiver selecionado, torna precoCompra obrigatório
      if (!valor) {
        precoCompraControl?.setValidators([Validators.required]);
      } else {
        // Se retornoFac está selecionado, remove a validação obrigatória
        precoCompraControl?.setValidators(null);
      }

      // Atualiza o estado de validação do campo precoCompra
      precoCompraControl?.updateValueAndValidity();
    });

  }

  ngOnInit(): void {
    this.carregarProdutosCapa();

    this.produtoEntrada.get('produtoCapa').valueChanges.subscribe((value) => {
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
      this.produtoEntrada.patchValue({
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
      this.produtoEntrada.patchValue({
        produtoCapaDesc: 'Não cadastrado',
      });
      this.toast.warning('Produto não cadastrado!', 'Sistema!');
      return;
    }

    if (!produto.ativo) {
      // Se o produto estiver inativo, definir a descrição como 'inativo'
      this.produtoEntrada.patchValue({
        produtoCapaDesc: 'Produto inativado',
      });
      this.toast.warning('Produto inativado!', 'Sistema!');
      return;
    }

    // Se o produto existir e estiver ativo, definir a descrição normalmente
    this.produtoEntrada.patchValue({
      produtoCapaDesc: produto.description,
    });
  }

  listaDeEntradas: ProdutoEntrada[] = []

  findAllEntradas(): void {
    this.produtoEntradaService.findAll().subscribe(response => {
      // Filtrar a lista de fornecedores para remover os inativos
      this.listaDeEntradas = response
      console.log(this.listaDeEntradas);
    });
  }

  obterPrecoCompra(sku: number): number {
    const listaInvertida = [...this.listaDeEntradas].reverse(); // Invertendo a ordem da lista
    const produtoEntrada = listaInvertida.find(f => f.produtoCapa === sku);
    return produtoEntrada ? produtoEntrada.precoCompra : 0; // Substitua 0 pelo valor padrão se não encontrar
  }

  create(): void {
    const formData = this.produtoEntrada.value;

    // Formatando datas
    formData.dataPedido = formatDate(formData.dataPedido, 'dd/MM/yyyy', 'en-US');
    formData.dataEntrega = formatDate(formData.dataEntrega, 'dd/MM/yyyy', 'en-US');

    // Aguarde até que a lista de entradas seja carregada antes de obter o preço de compra
    this.findAllEntradas();

    // Verifica se retornoFac é verdadeiro
    if (formData.retornoFac) {
      // Obtenha o SKU (ID do produtoCapa)
      const sku = formData.produtoCapa;

      // Obtenha o valor existente de precoCompra
      const precoCompra = this.obterPrecoCompra(sku);

      // Defina o preço de compra no formulário
      formData.precoCompra = precoCompra;
    }

    // Chame o serviço create
    this.salvarProdutoEntrada(formData);
  }

  salvarProdutoEntrada(formData: any): void {
    this.produtoEntradaService.create(formData).subscribe({
      next: response => {
        this.toast.success('Entrada do produto lançada com sucesso');
        console.log(response);
        this.dialogRef.close();
        this.router.navigate(['produtoEntrada']);
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
        console.error(ex);
      }
    });
  }
}
