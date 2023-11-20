import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ProdutoCapaService } from 'src/app/services/produto-capa.service';
import { ConfirmationDialogComponent } from 'src/app/shared/components/confirmation-dialog/confirmation-dialog.component';
import { ProdutoCapaAtualizarComponent } from '../produto-capa-atualizar/produto-capa-atualizar.component';
import { ProdutoCapa } from './../../../models/ProdutoCapa';

@Component({
  selector: 'app-produto-capa-listar',
  templateUrl: './produto-capa-listar.component.html',
  styleUrls: ['./produto-capa-listar.component.scss']
})
export class ProdutoCapaListarComponent {

  ELEMENT_DATA: ProdutoCapa[] = []

  displayedColumns: string[] = ['id', 'codSistema', 'description', 'tipoProduto', 'medidaUnidade', 'fornecedor', 'minimo', 'maximo', 'ativo', 'action'];
  dataSource = new MatTableDataSource<ProdutoCapa>(this.ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private service: ProdutoCapaService,
    private dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute,
    private toast: ToastrService,
  ) {
  }

  ngOnInit(): void {
    this.findAll();
  }

  findAll() {
    this.service.findAll().subscribe(response => {
      this.ELEMENT_DATA = response;
      this.dataSource = new MatTableDataSource<ProdutoCapa>(response);
      this.dataSource.paginator = this.paginator
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  delete(ProdutoCapa: number) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: 'Você tem certeza que deseja excluír esse produto capa?'
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        this.service.delete(ProdutoCapa).subscribe({
          next: () => {
            this.toast.success('Produto capa excluído com sucesso');
            this.findAll();
          },
          error: ex => {
            this.toast.error(ex.error.message);
          }
        });
      }
    });
  }

  onEditForm(data: any) {
    const dialogRef = this.dialog.open(ProdutoCapaAtualizarComponent, {
      data,
    });

    dialogRef.afterClosed().subscribe({
      next: (response) => {
        response = this.findAll();
      }
    })


  }

}

