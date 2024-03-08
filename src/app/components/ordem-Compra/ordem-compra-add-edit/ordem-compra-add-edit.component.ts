import { Component, Inject, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatTable } from '@angular/material/table';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { map, startWith} from 'rxjs/operators';
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

  produtoControl = new FormControl('');
  filteredProdutos: Observable<ProdutoCapa[]>;
  options: string[] = [];

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
      id: '',
      fornecedor: '',
      dataPedidoOrdemCompra: '',
      dataRecebimentoOrdemCompra: '',
      statusOrdem: '',
    })

    this.itemForm = this.formBuilder.group({
      id: [''],
      numeroNota: [''],
      descricao: [''],
      quantidade: [''],
      precoCompra: ['']
    });

    this.findAllFornecedor();
    this.carregarProdutosCapa();
    console.log(this.findAllFornecedor());


    this.dialogRef.disableClose = true;
  }


   private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }


  ELEMENT_DATA: ItemOrdemCompra[] = []

  displayedColumns: string[] = ['id', 'sku', 'Descricao', 'quantidade', 'precoCompra', 'valorTotal', 'observacao', 'actions'];
  dataSource = [...this.ELEMENT_DATA];

  @ViewChild(MatTable) table: MatTable<ItemOrdemCompra>;

  addData() {
    const itemOrdemCompra = { ...this.itemForm.value }
    const produto = this.produtoCapaList.find(produto => produto.id === itemOrdemCompra.id);
    // Se o produto for encontrado, atribua a descrição ao item da ordem de compra
    if (produto) {
      itemOrdemCompra.descricao = produto.description;
    } else {
      // Trate o caso em que o produto não é encontrado
      console.log('Produto não encontrado');
      // Você pode querer definir uma descrição padrão ou lidar de outra forma
      itemOrdemCompra.descricao = 'Produto não encontrado';
    }
    itemOrdemCompra.valorTotal = itemOrdemCompra.precoCompra * itemOrdemCompra.quantidade;
    this.dataSource.push(itemOrdemCompra)
    this.table.renderRows();
    this.itemForm.reset();
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

  ngOnInit(): void {
    this.ordemCompra.patchValue(this.data)

    this.filteredProdutos = this.produtoControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    );
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


  onFormSubmit() {
    if (this.ordemCompra.valid) {
      if (this.data) {
        this.ordemCompraService
          .update(this.ordemCompra.value)
          .subscribe({
            next: (val: any) => {
              this.toast.success('Ordem de compra atulizada com sucesso!', 'Sistema');
              this.dialogRef.close(true);
            },
            error: (err: any) => {
              if (err.status = 409) {
                this.toast.warning(err.error.message, 'Aviso')
              } else {
                this.toast.error(err.error.message, 'Erro')
                console.error(err);
              }
            },
          });
      } else {
        this.ordemCompraService.create(this.ordemCompra.value).subscribe({
          next: (val: any) => {
            this.toast.success('Ordem de compra gerada', 'Sucesso!');
            this.dialogRef.close(true);
          },
          error: (err: any) => {
            if (err.status = 409) {
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
function startWith(arg0: string): import("rxjs").OperatorFunction<any, unknown> {
  throw new Error('Function not implemented.');
}

