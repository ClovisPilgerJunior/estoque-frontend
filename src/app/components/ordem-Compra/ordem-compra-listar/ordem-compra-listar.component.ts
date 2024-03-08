import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { OrdemCompra } from 'src/app/models/OrdemCompra';
import { AuthService } from 'src/app/services/auth.service';
import { OrdemCompraService } from 'src/app/services/ordem-compra.service';
import { ConfirmationDialogComponent } from 'src/app/shared/components/confirmation-dialog/confirmation-dialog.component';
import { OrdemCompraAddEditComponent } from '../ordem-compra-add-edit/ordem-compra-add-edit.component';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-ordem-compra-listar',
  templateUrl: './ordem-compra-listar.component.html',
  styleUrls: ['./ordem-compra-listar.component.scss']
})
export class OrdemCompraListarComponent {

  faPlus = faPlus;

  ELEMENT_DATA: OrdemCompra[] = [];

  displayedColumns: string[] = [
    'id',
    'fornecedor',
    'dataEmissao',
    'dataPedidoOrdemCompra', 
    'dataRecebimentoOrdemCompra',
    'quantidade',
    'statusOrdem',
    'valorTotal',
    'action',
  ];
  dataSource = new MatTableDataSource<OrdemCompra>(this.ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private service: OrdemCompraService,
    private dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute,
    private toast: ToastrService,
    private authService: AuthService
  ) {
  }

  isAdminUser(): boolean {
    // Verifique se o usuário tem a role 'ADMIN'
    return this.authService.hasPermission('ROLE_ADMIN');
  }

  isManager(): boolean {
    return this.authService.hasPermission('ROLE_MANAGER');
  }

  isUser(): boolean {
    return this.authService.hasPermission('ROLE_USER')
  }

  isUserAndProdutoSaidaCreate(): boolean {
    return this.authService.hasPermission('ROLE_USER') && this.authService.hasPermission('ROLE_PRODUTOSAIDA_CREATE')
  }

  isUserAndProdutoSaidaUpdate(): boolean {
    return this.authService.hasPermission('ROLE_USER') && this.authService.hasPermission('ROLE_PRODUTOSAIDA_UPDATE')
  }

  isUserAndProdutoSaidaDelete(): boolean {
    return this.authService.hasPermission('ROLE_USER') && this.authService.hasPermission('ROLE_PRODUTOSAIDA_DELETE')
  }

  isManagerAndProdutoSaidaCreate(): boolean {
    return this.authService.hasPermission('ROLE_MANAGER') && this.authService.hasPermission('ROLE_PRODUTOSAIDA_CREATE')
  }

  isManagerAndProdutoSaidaUpdate(): boolean {
    return this.authService.hasPermission('ROLE_MANAGER') && this.authService.hasPermission('ROLE_PRODUTOSAIDA_UPDATE')
  }

  isManagerAndProdutoSaidaDelete(): boolean {
    return this.authService.hasPermission('ROLE_MANAGER') && this.authService.hasPermission('ROLE_PRODUTOSAIDA_DELETE')
  }

  ngOnInit(): void {
    this.findAll();
  }

  findAll() {
    this.service.findAll().subscribe((response) => {
      this.ELEMENT_DATA = response;
      this.dataSource = new MatTableDataSource<OrdemCompra>(response);
      this.dataSource.paginator = this.paginator;
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


  onCreate() {
    const dialogRef = this.dialog.open(OrdemCompraAddEditComponent);

    dialogRef.afterClosed().subscribe({
      next: (response) => {
        response = this.findAll();
      },
    });
  }

  onEditForm(data: any) {
    const dialogRef = this.dialog.open(OrdemCompraAddEditComponent, {
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
