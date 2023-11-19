import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ProdutoPerda } from 'src/app/models/ProdutoPerda';
import { ProdutoPerdaService } from 'src/app/services/produto-saida.service  copy';
import { ConfirmationDialogComponent } from 'src/app/shared/components/confirmation-dialog/confirmation-dialog.component';
import { ProdutoCapaPerdaAddEditComponent } from '../produto-capa-perda-add-edit/produto-capa-perda-add-edit.component';

@Component({
  selector: 'app-produto-capa-perda-listar',
  templateUrl: './produto-capa-perda-listar.component.html',
  styleUrls: ['./produto-capa-perda-listar.component.scss']
})
export class ProdutoCapaPerdaListarComponent {

  ELEMENT_DATA: ProdutoPerda[] = [];

  displayedColumns: string[] = [
    'id',
    'produtoCapa',
    'produtoCapaDesc',
    'data',
    'quantidade',
    'motivo',
    'action',
  ];
  dataSource = new MatTableDataSource<ProdutoPerda>(this.ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private service: ProdutoPerdaService,
    private dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute,
    private toast: ToastrService
  ) {
    this.findAll();
  }

  ngOnInit(): void {
    this.findAll();
  }

  findAll() {
    this.service.findAll().subscribe((response) => {
      this.ELEMENT_DATA = response;
      this.dataSource = new MatTableDataSource<ProdutoPerda>(response);
      this.dataSource.paginator = this.paginator;
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  delete(ProdutoPerda: number) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: 'Você tem certeza que deseja excluír essa entrada do produto?',
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        this.service.delete(ProdutoPerda).subscribe({
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
    const dialogRef = this.dialog.open(ProdutoCapaPerdaAddEditComponent);

    dialogRef.afterClosed().subscribe({
      next: (response) => {
        response = this.findAll();
      },
    });
  }

  onEditForm(data: any) {
    const dialogRef = this.dialog.open(ProdutoCapaPerdaAddEditComponent, {
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
