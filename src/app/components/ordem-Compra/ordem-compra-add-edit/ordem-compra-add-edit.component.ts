import { Component, Inject, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatTable } from '@angular/material/table';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { Fornecedor } from 'src/app/models/Fornecedor';
import { ItemOrdemCompra } from 'src/app/models/ItemOrdemCompra';
import { ProdutoCapa } from 'src/app/models/ProdutoCapa';
import { FornecedorService } from 'src/app/services/fornecedor.service';
import { OrdemCompraService } from 'src/app/services/ordem-compra.service';
import { ProdutoCapaService } from 'src/app/services/produto-capa.service';

@Component({
  selector: 'app-ordem-compra-add-edit',
  templateUrl: './ordem-compra-add-edit.component.html',
  styleUrls: ['./ordem-compra-add-edit.component.scss']
})
export class OrdemCompraAddEditComponent {

  ordemCompra: FormGroup;

  itemForm: FormGroup;

  produtoControl = new FormControl<string | ProdutoCapa>('');
  filteredProdutos: Observable<ProdutoCapa[]>;

  constructor(
    private ordemCompraService: OrdemCompraService,
    private formBuilder: FormBuilder,
    private fornecedorService: FornecedorService,
    private produtoCapaService: ProdutoCapaService,
    private dialogRef: MatDialogRef<OrdemCompraAddEditComponent>,
    private dialog: MatDialog,
    private toast: ToastrService,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.ordemCompra = this.formBuilder.group({
      id: 0,
      fornecedor: '',
      dataPedidoOrdemCompra: '',
      dataRecebimentoOrdemCompra: '',
      statusOrdem: '',
    })

    this.itemForm = this.formBuilder.group({
      produtoCapaId: [0, Validators.required],
      numeroNota: [0],
      // descricao: [''],
      quantidade: [0, Validators.required],
      precoCompra: [0]
    });

    this.findAllFornecedor();
    this.carregarProdutosCapa();
    console.log(this.findAllFornecedor());
    this.dialogRef.disableClose = true;
    
  }

  ngOnInit(): void {
    this.ordemCompra.patchValue(this.data)

    this.filteredProdutos = this.produtoControl.valueChanges.pipe(
      startWith(''),
      map(value => {
        const name = typeof value === 'string' ? value : value?.description;
        return name ? this._filter(name as string) : this.produtoCapaList.slice();
      }),
    );
  }

   displayFn(produtoCapa: ProdutoCapa): string {
    return produtoCapa && produtoCapa.description ? produtoCapa.description : '';
    
  }

  private _filter(name: string): ProdutoCapa[] {
    const filterValue = name.toLowerCase();

    return this.produtoCapaList.filter(option => option.description.toLowerCase().includes(filterValue));
  }

  onProdutoSelected(event: MatAutocompleteSelectedEvent) {
    const selectedProduto = this.produtoCapaList.find(produto => produto.id === event.option.value.produtoCapaId);
    if (selectedProduto) {
       // Atualize o formulário com o ID e a descrição do produto selecionado
       this.itemForm.get('produtoCapaId').setValue(selectedProduto.id);
    }
   }

   onIdChange(event: Event) {
    const input = event.target as HTMLInputElement;
    const id = +input.value;
  
    const produto = this.produtoCapaList.find(produto => produto.id === id);
    if (produto) {
      // Atualize o FormControl do produto com o objeto ProdutoCapa
      this.produtoControl.setValue(produto);
    } else {
      // Limpe o FormControl se o produto não for encontrado
      this.produtoControl.setValue(null);
    }
  }
  
  

  ELEMENT_DATA: ItemOrdemCompra[] = []

  displayedColumns: string[] = ['id', 'sku', 'Descricao', 'quantidade', 'precoCompra', 'valorTotal', 'observacao', 'actions'];
  dataSource = [...this.ELEMENT_DATA];

  @ViewChild(MatTable) table: MatTable<ItemOrdemCompra>;

  addData() {
    const produto = this.produtoControl.value as ProdutoCapa;
  
    if (produto && produto.id) {
      const itemOrdemCompra: ItemOrdemCompra = {
        produtoCapaId: produto.id,
        numeroNota: null,
        quantidade: this.itemForm.get('quantidade').value,
        ordemCompraId: this.ordemCompra.get('id').value,
        precoCompra: this.itemForm.get('precoCompra').value,
        observacao: null,
      };
  
      this.dataSource.push(itemOrdemCompra);
      this.table.renderRows();
      this.itemForm.reset();
      this.produtoControl.setValue(null);
    } else {
      console.error('Produto não selecionado corretamente.');
    }
  }
  
  

  removeItem(index: number) {
    this.dataSource.splice(index, 1);
    this.table.renderRows();
  }

  fornecedor: Fornecedor[] = []

  findAllFornecedor(): void {
    this.fornecedorService.findAll().subscribe(response => {
      // Filtrar a lista de fornecedores para remover os inativos
      this.fornecedor = response.filter(fornecedor => fornecedor.ativo === true);
      console.log(this.fornecedor);
    });
  }



  private _filterProdutos(value: string): ProdutoCapa[] {
    const filterValue = value.toLowerCase();
    return this.produtoCapaList.filter(produto => produto.description.toLowerCase().includes(filterValue));
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
    // Aqui, você deve garantir que cada item na lista `itens` esteja no formato correto.
    // Isso pode envolver ajustar os campos que podem ser `null` para `null` explicitamente.
    // Por exemplo:
    const itensFormatados = itens.map(item => ({
       ...item,
       numeroNota: item.numeroNota || null, // Se numeroNota não estiver presente, defina como null
       observacao: item.observacao || null, // Se observacao não estiver presente, defina como null
    }));
   
    console.table(itensFormatados);
    this.ordemCompraService.adicionar(ordemCompraId, itensFormatados).subscribe({
       next: () => {
         this.toast.success('Itens da ordem de compra salvos com sucesso!', 'Sucesso!');
       },
       error: (err: any) => {
         this.toast.error(err.error.message, 'Erro');
         console.error(err);
       },
    });
   }
   

   
   onFormSubmit() {
    if (this.ordemCompra.valid) {
      if (this.data) {
        this.ordemCompraService.update(this.ordemCompra.value).subscribe({
          next: (val: any) => {
            this.toast.success('Ordem de compra atualizada com sucesso!', 'Sistema');
            // Não há necessidade de obter o ID após a atualização, pois você já o tem
            const ordemCompraId = this.ordemCompra.value.id;
            this.salvarItensOrdemCompra(ordemCompraId, this.dataSource);
            this.dialogRef.close(true);
          },
          error: (err: any) => {
            this.toast.error(err.error.message, 'Erro');
            console.error(err);
          },
        });
      } else {
        this.ordemCompraService.create(this.ordemCompra.value).subscribe({
          next: (val: any) => {
            console.log('Resposta do serviço create:', val);
            this.toast.success('Ordem de compra gerada', 'Sucesso!');
            // Certifique-se de que o ID da ordem de compra está sendo corretamente obtido
            const ordemCompraId = val.id; // Ajuste conforme necessário
            this.salvarItensOrdemCompra(ordemCompraId, this.dataSource);
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
  

}

