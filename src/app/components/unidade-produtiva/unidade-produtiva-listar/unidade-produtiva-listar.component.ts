import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UnidadeProdutiva } from 'src/app/models/unidadeProdutiva';
import { UnidadeProdutivaService } from 'src/app/services/unidade-produtiva.service';
import { ConfirmationDialogComponent } from 'src/app/shared/components/confirmation-dialog/confirmation-dialog.component';
import { ProdutoCapaSaidaAddEditComponent } from '../../produto-capa-saida/produto-capa-saida-add-edit/produto-capa-saida-add-edit.component';
import { UnidadeProdutivaAddEditComponent } from '../unidade-produtiva-add-edit/unidade-produtiva-add-edit.component';

@Component({
  selector: 'app-unidade-produtiva-listar',
  templateUrl: './unidade-produtiva-listar.component.html',
  styleUrls: ['./unidade-produtiva-listar.component.scss']
})
export class UnidadeProdutivaListarComponent implements OnInit {

  ELEMENT_DATA: UnidadeProdutiva[] = [];

  displayedColumns: string[] = [
    'id',
    'nome',
    'servico',
    'ativo',
    'action',
  ];
  dataSource = new MatTableDataSource<UnidadeProdutiva>(this.ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private service: UnidadeProdutivaService,
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
      this.dataSource = new MatTableDataSource<UnidadeProdutiva>(response);
      this.dataSource.paginator = this.paginator;
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  delete(UnidadeProdutiva: number) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: 'Você tem certeza que deseja excluír essa entrada do produto?',
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        this.service.delete(UnidadeProdutiva).subscribe({
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
    const dialogRef = this.dialog.open(UnidadeProdutivaAddEditComponent);

    dialogRef.afterClosed().subscribe({
      next: (response) => {
        response = this.findAll();
      },
    });
  }

  onEditForm(data: any) {
    const dialogRef = this.dialog.open(UnidadeProdutivaAddEditComponent, {
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
