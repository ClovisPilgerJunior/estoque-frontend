import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ProdutoEntradaService } from 'src/app/services/produto-entrada.service';
import { ConfirmationDialogComponent } from 'src/app/shared/components/confirmation-dialog/confirmation-dialog.component';
import { ProdutoCapaEntradaAtualizarComponent } from '../produto-capa-entrada-atualizar/produto-capa-entrada-atualizar.component';
import { ProdutoEntradaEntradaCadastrarComponent } from '../produto-capa-entrada-cadastrar/produto-capa-entrada-cadastrar.component';
import { ProdutoEntrada } from './../../../models/ProdutoEntrada';

@Component({
  selector: 'app-produto-capa-entrada-listar',
  templateUrl: './produto-capa-entrada-listar.component.html',
  styleUrls: ['./produto-capa-entrada-listar.component.scss'],
})
export class ProdutoCapaEntradaListarComponent {
  ELEMENT_DATA: ProdutoEntrada[] = [];

  displayedColumns: string[] = [
    'id',
    'produtoCapa',
    'produtoCapaDesc',
    'numeroNota',
    'dataPedido',
    'dataEntrega',
    'quantidade',
    'precoCompra',
    'observacao',
    'action',
  ];
  dataSource = new MatTableDataSource<ProdutoEntrada>(this.ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private service: ProdutoEntradaService,
    private dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute,
    private toast: ToastrService
  ) {
  }

  ngOnInit(): void {
    this.findAll();
  }

  findAll() {
    this.service.findAll().subscribe((response) => {
      this.ELEMENT_DATA = response;
      this.dataSource = new MatTableDataSource<ProdutoEntrada>(response);
      this.dataSource.paginator = this.paginator;
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  delete(ProdutoEntrada: number) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: 'Você tem certeza que deseja excluír essa entrada do produto?',
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        this.service.delete(ProdutoEntrada).subscribe({
          next: () => {
            this.toast.success('Entrada do produto excluído com sucesso');
            this.findAll();
          },
          error: (ex) => {
            this.toast.error(ex.error.message);
          },
        });
      }
    });
  }

  onCreate() {
    const dialogRef = this.dialog.open(ProdutoEntradaEntradaCadastrarComponent);

    dialogRef.afterClosed().subscribe({
      next: (response) => {
        response = this.findAll();
      },
    });
  }

  onEditForm(data: any) {
    const dialogRef = this.dialog.open(ProdutoCapaEntradaAtualizarComponent, {
      data,
    });
    console.log(data)
    dialogRef.afterClosed().subscribe({
      next: (response) => {
        response = this.findAll();
      },
    });
  }
}
