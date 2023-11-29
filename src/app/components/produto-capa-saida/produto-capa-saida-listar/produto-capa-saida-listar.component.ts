import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ProdutoSaida } from 'src/app/models/ProdutoSaida';
import { ProdutoSaidaService } from 'src/app/services/produto-saida.service ';
import { ConfirmationDialogComponent } from 'src/app/shared/components/confirmation-dialog/confirmation-dialog.component';
import { ProdutoCapaSaidaAddEditComponent } from '../produto-capa-saida-add-edit/produto-capa-saida-add-edit.component';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-produto-capa-saida-listar',
  templateUrl: './produto-capa-saida-listar.component.html',
  styleUrls: ['./produto-capa-saida-listar.component.scss']
})
export class ProdutoCapaSaidaListarComponent {

  faPlus = faPlus;

  ELEMENT_DATA: ProdutoSaida[] = [];

  displayedColumns: string[] = [
    'id',
    'produtoCapa',
    'produtoCapaDesc',
    'dataSaida',
    'quantidade',
    'retiradoPor',
    'setor',
    'unidadeProdutiva',
    'servico',
    'observacao',
    'action',
  ];
  dataSource = new MatTableDataSource<ProdutoSaida>(this.ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private service: ProdutoSaidaService,
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
      this.dataSource = new MatTableDataSource<ProdutoSaida>(response);
      this.dataSource.paginator = this.paginator;
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  delete(ProdutoSaida: number) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: 'Você tem certeza que deseja excluír essa entrada do produto?',
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        this.service.delete(ProdutoSaida).subscribe({
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
    const dialogRef = this.dialog.open(ProdutoCapaSaidaAddEditComponent);

    dialogRef.afterClosed().subscribe({
      next: (response) => {
        response = this.findAll();
      },
    });
  }

  onEditForm(data: any) {
    const dialogRef = this.dialog.open(ProdutoCapaSaidaAddEditComponent, {
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
