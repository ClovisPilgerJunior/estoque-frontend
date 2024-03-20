import { Component, ElementRef, Inject, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatTable } from '@angular/material/table';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { Fornecedor } from 'src/app/models/Fornecedor';
import { ItemOrdemCompra } from 'src/app/models/ItemOrdemCompra';
import { OrdemCompra } from 'src/app/models/OrdemCompra';
import { ProdutoCapa } from 'src/app/models/ProdutoCapa';
import { FornecedorService } from 'src/app/services/fornecedor.service';
import { OrdemCompraService } from 'src/app/services/ordem-compra.service';
import { ProdutoCapaService } from 'src/app/services/produto-capa.service';
import { ProdutoEntradaService } from 'src/app/services/produto-entrada.service';
import { ConfirmationDialogComponent } from 'src/app/shared/components/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-ordem-compra-add-edit',
  templateUrl: './ordem-compra-add-edit.component.html',
  styleUrls: ['./ordem-compra-add-edit.component.scss']
})
export class OrdemCompraAddEditComponent {

  @ViewChild('skuInput') skuInput: ElementRef;
  ordemCompra: FormGroup;

  itemForm: FormGroup;

  produtoControl = new FormControl<string | ProdutoCapa>('');
  filteredProdutos: Observable<ProdutoCapa[]>;

  fornecedorControl = new FormControl<string | Fornecedor>('', [this.validateFornecedor.bind(this), Validators.required]);
  filteredFornecedor: Observable<Fornecedor[]>;

  subtotal: any;
  quantidadeTotal: any;


  constructor(
    private ordemCompraService: OrdemCompraService,
    private formBuilder: FormBuilder,
    private fornecedorService: FornecedorService,
    private produtoCapaService: ProdutoCapaService,
    private produtoEntradaService: ProdutoEntradaService,
    private dialogRef: MatDialogRef<OrdemCompraAddEditComponent>,
    private dialog: MatDialog,
    private toast: ToastrService,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.ordemCompra = this.formBuilder.group({
      id: 0,
      numeroNotaOrdem: '',
      fornecedor: [''],
      dataPedidoOrdemCompra: '',
      dataRecebimentoOrdemCompra: '',
      statusOrdem: '',
      ordemObservacao: '',
      itemOrdemCompra: [''],
    })
    console.log("Validação: ", this.ordemCompra.valid)

    this.itemForm = this.formBuilder.group({
      produtoCapaId: ['', Validators.required],
      numeroNota: [''],
      produtoCapaDesc: [''],
      quantidade: ['', Validators.required],
      observacao: [''],
      precoCompra: [0]
    });

    this.findAllFornecedor();
    this.carregarProdutosCapa();
    this.dialogRef.disableClose = true;

  }

  validateFornecedor(control: AbstractControl): ValidationErrors | null {
    const fornecedorValue = control.value;
    const fornecedor = typeof fornecedorValue === 'string' ? fornecedorValue : fornecedorValue?.empresa;
   
    // Retorna um erro se o fornecedor for vazio ou não for válido
    if (!fornecedor || !this.fornecedor.some(f => f.empresa.toLowerCase() === fornecedor.toLowerCase())) {
       return { invalidFornecedor: true };
    }
   
    return null;
   }   
   

  ngOnInit(): void {
    this.ordemCompra.patchValue(this.data);

    // Carregar os itens da ordem de compra se estivermos editando uma ordem existente
    if (this.data && this.data.id) {
      this.loadOrderItems(this.data.id);
    }


    this.filteredProdutos = this.produtoControl.valueChanges.pipe(
      startWith(''),
      map(value => {
        const name = typeof value === 'string' ? value : value?.description;
        return name ? this._filter(name as string) : this.produtoCapaList.slice();
      }),
    );

    this.filteredFornecedor = this.fornecedorControl.valueChanges.pipe(
      startWith(''),
      map(value => {
        const name = typeof value === 'string' ? value : value?.empresa;
        return name ? this._filterFornecedor(name as string) : this.fornecedor.slice();
      }),
    );
  }

  // Ajuste o método loadOrderItems para incluir a descrição e o valor total
  loadOrderItems(orderId: number): void {
    this.ordemCompraService.findAllItemsOrder(orderId).subscribe(
      (items: ItemOrdemCompra[]) => {
        // Aqui, você precisa garantir que os itens incluam a descrição e o valor total
        // Isso pode ser feito ajustando a implementação do seu serviço ou mapeando os dados aqui
        this.dataSource = items.map(item => ({
          ...item,
          // Certifique-se de que a descrição e o valor total estejam sendo incluídos
          // Isso pode ser necessário se o seu serviço não estiver retornando esses campos
          produtoCapaDesc: item.produtoCapaDesc, // Ajuste conforme necessário
          valorTotal: item.quantidade * item.precoCompra, // Calcule o valor total aqui
        }));
        this.table.renderRows();

        this.updateTotals();
        if (this.skuInput && this.skuInput.nativeElement) {
          this.skuInput.nativeElement.focus();
        }
      },
      (error) => {
        console.error('Erro ao carregar os itens da ordem de compra:', error);
        this.toast.error('Erro ao carregar os itens da ordem de compra.', 'Erro');
      }
    );
  }


  displayFn(produtoCapa: ProdutoCapa): string {
    return produtoCapa && produtoCapa.description ? produtoCapa.description : '';

  }

  displayFnFornecedor(fornecedor: Fornecedor): string {
    return fornecedor && fornecedor.empresa ? fornecedor.empresa : '';

  }

  private _filter(name: string): ProdutoCapa[] {
    const filterValue = name.toLowerCase();

    return this.produtoCapaList.filter(option => option.description.toLowerCase().includes(filterValue));
  }

  private _filterFornecedor(name: string): Fornecedor[] {
    const filterValue = name.toLowerCase();

    return this.fornecedor.filter(option => option.empresa.toLowerCase().includes(filterValue));
  }

  onProdutoSelected(event: MatAutocompleteSelectedEvent) {
    const selectedProduto = event.option.value as ProdutoCapa;
    console.log(selectedProduto);
    if (selectedProduto) {
      // Verificar se o produto está inativo
      if (!selectedProduto.ativo) {
        // Limpar os campos se o produto estiver inativo
        this.itemForm.patchValue({
          produtoCapaId: null,
          produtoCapaDesc: '',
          precoCompra: null,
        });
        this.produtoControl.setValue(null);
        this.toast.warning('Produto inativado!', 'Sistema!');
        if (this.skuInput && this.skuInput.nativeElement) {
          this.skuInput.nativeElement.focus();
        }
        return;
      }

      // Atualizar o formulário com o ID do produto selecionado
      this.itemForm.get('produtoCapaId').setValue(selectedProduto.id);
      // Atualizar o FormControl do produto com o objeto ProdutoCapa completo
      this.produtoControl.setValue(selectedProduto);

      // Buscar a última entrada do produto
      this.produtoEntradaService.findAll().subscribe(entradas => {
        const entradasDoProduto = entradas.filter(entrada => entrada.produtoCapa === selectedProduto.id);
        if (entradasDoProduto.length > 0) {
          // Ordenar as entradas por id em ordem decrescente e pegar a primeira
          const ultimaEntrada = entradasDoProduto.sort((a, b) => b.id - a.id)[0];
          // Atualizar o preço de compra no formulário
          this.itemForm.patchValue({
            produtoCapaDesc: selectedProduto.description,
            precoCompra: ultimaEntrada.precoCompra,
          });
        } else {
          // Se não houver entradas para o produto, zerar o preço de compra
          this.itemForm.patchValue({
            produtoCapaDesc: selectedProduto.description,
            precoCompra: 0,
          });
        }
      });
    }
  }


  onIdChange(event: Event) {
    const input = event.target as HTMLInputElement;
    const value = input.value;
   
    // Tentar encontrar o produto pelo ID
    let produto = this.produtoCapaList.find(produto => produto.id === +value);
   
    // Se não encontrar pelo ID, tentar encontrar pelo nome
    if (!produto) {
       produto = this.produtoCapaList.find(produto => produto.description.toLowerCase() === value.toLowerCase());
    }
   
    if (produto) {
       // Verificar se o produto está inativo
       if (!produto.ativo) {
         // Limpar os campos se o produto estiver inativo
         this.produtoControl.setValue(null);
         this.itemForm.patchValue({
           produtoCapaId: null,
           produtoCapaDesc: '',
           quantidade: '',
           precoCompra: null,
         });
         this.toast.warning('Produto inativado!', 'Sistema!');
         if (this.skuInput && this.skuInput.nativeElement) {
           this.skuInput.nativeElement.focus();
         }
         return;
       }
   
       // Atualizar o FormControl do produto com o objeto ProdutoCapa
       this.produtoControl.setValue(produto);
   
       // Buscar a última entrada do produto
       this.produtoEntradaService.findAll().subscribe(entradas => {
         const entradasDoProduto = entradas.filter(entrada => entrada.produtoCapa === produto.id);
         if (entradasDoProduto.length > 0) {
           // Ordenar as entradas por id em ordem decrescente e pegar a primeira
           const ultimaEntrada = entradasDoProduto.sort((a, b) => b.id - a.id)[0];
           // Atualizar o preço de compra no formulário
           this.itemForm.patchValue({
            produtoCapaDesc: produto.description,
             precoCompra: ultimaEntrada.precoCompra,
           });
         } else {
           // Se não houver entradas para o produto, zerar o preço de compra
           this.itemForm.patchValue({
            produtoCapaDesc: produto.description,
             precoCompra: 0,
           });
         }
       });
    } else {
       // Limpe o FormControl se o produto não for encontrado
       this.produtoControl.setValue(null);
       // Limpar os campos do formulário se o produto não for encontrado
       this.itemForm.patchValue({
         produtoCapaId: null,
         produtoCapaDesc: '',
         precoCompra: null,
       });
       // Adicionar um aviso específico para o usuário
       this.toast.error('Produto não encontrado!', 'Erro!');
       // Limpar o campo de entrada após o aviso
       input.value = '';
       if (this.skuInput && this.skuInput.nativeElement) {
        this.skuInput.nativeElement.focus();
      }
    }
   }
   




  ELEMENT_DATA: ItemOrdemCompra[] = []

  displayedColumns: string[] = ['id', 'sku', 'produtoCapaDesc', 'quantidade', 'precoCompra', 'valorTotal', 'observacao', 'actions'];
  dataSource = [...this.ELEMENT_DATA];

  @ViewChild(MatTable) table: MatTable<ItemOrdemCompra>;

  addData() {
    const itemOrdemCompra = { ...this.itemForm.value };
    const produto = this.produtoControl.value as ProdutoCapa;

    // Converter produtoCapaId para número
    itemOrdemCompra.produtoCapaId = +itemOrdemCompra.produtoCapaId;
    if (itemOrdemCompra.precoCompra == null) {
      itemOrdemCompra.precoCompra = 0.0;
    }

    // Se o produto for encontrado, atribua a descrição ao item da ordem de compra
    if (produto && produto.description) {
      itemOrdemCompra.produtoCapaDesc = produto.description;
    } else {
      // Trate o caso em que o produto não é encontrado ou não tem descrição
      console.log('Produto não encontrado ou sem descrição');
      itemOrdemCompra.produtoCapaDesc = 'Produto não encontrado';
    }

    itemOrdemCompra.numeroNota = this.ordemCompra.value.numeroNotaOrdem;
    itemOrdemCompra.valorTotal = itemOrdemCompra.precoCompra * itemOrdemCompra.quantidade;

    // Verifica se um item com o mesmo produtoCapaId já existe
    const existingItemIndex = this.dataSource.findIndex(item => item.produtoCapaId === itemOrdemCompra.produtoCapaId);
    if (existingItemIndex !== -1) {
      // Atualiza o item existente
      this.dataSource[existingItemIndex] = itemOrdemCompra;
    } else {
      // Adiciona um novo item
      this.dataSource.push(itemOrdemCompra);
    }

    this.table.renderRows();
    this.itemForm.reset();
    this.produtoControl.setValue(null);

    this.updateTotals();
    if (this.skuInput && this.skuInput.nativeElement) {
      this.skuInput.nativeElement.focus();
    }
    console.table(itemOrdemCompra)
  }


  removeItem(index: number) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: 'Você tem certeza que deseja retirar esse produto da sua Ordem de Compra?',
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        this.dataSource.splice(index, 1);
        this.table.renderRows();

        this.updateTotals();
      }
    });
  }


  fornecedor: Fornecedor[] = []

  findAllFornecedor(): void {
    this.fornecedorService.findAll().subscribe(response => {
      // Filtrar a lista de fornecedores para remover os inativos
      this.fornecedor = response.filter(fornecedor => fornecedor.ativo === true);
      console.log(this.fornecedor);

      if (this.data && this.data.id) {
        const fornecedorSelecionado = this.fornecedor.find(fornecedor =>
          fornecedor.empresa.trim().toLowerCase() === this.data.fornecedor.trim().toLowerCase()
        );
    
        if (fornecedorSelecionado) {
          // Definir o valor sem acionar o evento de mudança
          this.fornecedorControl.setValue(fornecedorSelecionado, { emitEvent: false });
        } else {
          console.error('Fornecedor não encontrado:', this.data.fornecedor);
        }
     }
    });
  }


  toggleEditMode(item: ItemOrdemCompra): void {
    item.editMode = !item.editMode;

    if (item.editMode) {
      // Crie um novo FormGroup específico para este item
      item.formGroup = this.formBuilder.group({
        quantidade: [item.quantidade],
        precoCompra: [item.precoCompra],
        observacao: [item.observacao]
      });
    } else {
      // Limpe o formGroup quando sair do modo de edição
      item.formGroup = undefined;
    }
  }

  confirmEdit(item: ItemOrdemCompra): void {
    // Aplicar mudanças do FormGroup ao item
    const formValues = item.formGroup?.value;
    item.quantidade = formValues?.quantidade;
    item.precoCompra = formValues?.precoCompra;
    item.valorTotal = formValues?.quantidade * formValues?.precoCompra;
    item.observacao = formValues?.observacao;

    // Sair do modo de edição
    item.editMode = false;
    item.formGroup = undefined;

    // Aqui você também deve atualizar os dados no servidor conforme necessário
    this.updateTotals()
  }

  cancelEdit(item: ItemOrdemCompra): void {
    item.editMode = false;
    item.formGroup = undefined;
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


  salvarItensOrdemCompra(ordemCompraId: number, itens: ItemOrdemCompra[]) {
    console.table(itens);
    this.ordemCompraService.adicionar(ordemCompraId, itens).subscribe({
      next: () => {
        this.router.navigate(['/ordemCompra']).then(() => {
          this.router.navigate(['/ordemCompra']);
         });
      },
      error: (err: any) => {
        this.toast.error(err.error.message, 'Erro');
        console.error(err);
      },
    });
  }


  onFormSubmit() {
    if (this.ordemCompra.valid) {
      const ordemCompraId = this.ordemCompra.value.id;
      const fornecedorSelecionado = this.fornecedorControl.value as Fornecedor;
      const ordemObservacao = this.ordemCompra.value.ordemObservacao;
      const numeroNotaOrdem = this.ordemCompra.value.numeroNotaOrdem;
      const fornecedorId = fornecedorSelecionado ? fornecedorSelecionado.id : null;
      const itens = this.dataSource; // Obtenha os itens da lista dataSource

      const ordemCompraParaSalvar = {
        ...this.ordemCompra.value,
        fornecedor: fornecedorId, // Inclua o ID do fornecedor aqui
        ordemObservacao: ordemObservacao,
        numeroNotaOrdem: this.ordemCompra.value.numeroNotaOrdem, 
      };

      if (ordemCompraId) {
        // Se o ordemCompraId estiver disponível, atualiza a OrdemCompra existente
        // Inclui o fornecedorId e os itens na chamada para o método update
        this.ordemCompraService.update(ordemCompraId, numeroNotaOrdem, ordemObservacao, fornecedorId, itens ).subscribe({
          next: (val: any) => {
            console.table("atualizar:", val)
            this.toast.success('Ordem de compra atualizada com sucesso!', 'Sistema');
            this.dialogRef.close(true);
          },
          error: (err: any) => {
            this.toast.error(err.error.message, 'Erro');
            console.error(err);
          },
        });
      } else {
        // Se o ordemCompraId não estiver disponível, cria uma nova OrdemCompra
        // Não inclui o fornecedorId aqui, pois não é necessário para a criação
        this.ordemCompraService.create(ordemCompraParaSalvar).subscribe({
          next: (val: any) => {
            console.log('Resposta do serviço create:', val);
            this.toast.success('Ordem de compra gerada', 'Sucesso!');
            const newOrdemCompraId = val.id;
            this.updateOrdemCompraIdOnItems(newOrdemCompraId);
            this.salvarItensOrdemCompra(newOrdemCompraId, this.dataSource);
            this.dialogRef.close(true);
          },
          error: (err: any) => {
            this.toast.error(err.error.message, 'Erro');
            console.error(err);
          },
        });
      }
    }
  }


  private updateOrdemCompraIdOnItems(ordemCompraId: number): void {
    this.dataSource.forEach(item => {
      item.ordemCompraId = ordemCompraId;
    });
  }


  updateTotals() {
    // Calcular o subtotal e a quantidade total
    const totalQuantidade = this.dataSource.reduce((acc, item) => acc + item.quantidade, 0);
    const valorTotal = this.dataSource.reduce((acc, item) => acc + (item.precoCompra * item.quantidade), 0);

    // Atualizar os valores na interface do usuário
    // Aqui, você precisa atualizar os campos correspondentes na sua interface do usuário
    // Por exemplo, se você tiver campos de texto para subtotal e quantidade total, você pode atualizá-los aqui
    this.subtotal = valorTotal;
    this.quantidadeTotal = totalQuantidade;

  }


  updateOrdemCompraItems(ordemCompraId: number, newItems: ItemOrdemCompra[]): void {
    // Supondo que this.dataSource seja a lista atual de itens da ordem de compra
    newItems.forEach(newItem => {
      const existingItemIndex = this.dataSource.findIndex(item => item.id === newItem.id);
      if (existingItemIndex !== -1) {
        // Atualiza o item existente
        this.dataSource[existingItemIndex] = newItem;
      } else {
        // Adiciona um novo item
        this.dataSource.push(newItem);
      }
    });

    // Atualiza a tabela e os totais
    this.table.renderRows();
    this.updateTotals();
  }


}




