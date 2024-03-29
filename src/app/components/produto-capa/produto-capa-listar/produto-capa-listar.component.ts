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
import { AuthService } from 'src/app/services/auth.service';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-produto-capa-listar',
  templateUrl: './produto-capa-listar.component.html',
  styleUrls: ['./produto-capa-listar.component.scss']
})
export class ProdutoCapaListarComponent {

  faPlus = faPlus;

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

  isUserAndProdutoCapaCreate(): boolean {
    return this.authService.hasPermission('ROLE_USER') && this.authService.hasPermission('ROLE_PRODUTOCAPA_CREATE')
  }

  isUserAndProdutoCapaUpdate(): boolean {
    return this.authService.hasPermission('ROLE_USER') && this.authService.hasPermission('ROLE_PRODUTOCAPA_UPDATE')
  }

  isUserAndProdutoCapaDelete(): boolean {
    return this.authService.hasPermission('ROLE_USER') && this.authService.hasPermission('ROLE_PRODUTOCAPA_DELETE')
  }

  isManagerAndProdutoCapaCreate(): boolean {
    return this.authService.hasPermission('ROLE_MANAGER') && this.authService.hasPermission('ROLE_PRODUTOCAPA_CREATE')
  }

  isManagerAndProdutoCapaUpdate(): boolean {
    return this.authService.hasPermission('ROLE_MANAGER') && this.authService.hasPermission('ROLE_PRODUTOCAPA_UPDATE')
  }

  isManagerAndProdutoCapaDelete(): boolean {
    return this.authService.hasPermission('ROLE_MANAGER') && this.authService.hasPermission('ROLE_PRODUTOCAPA_DELETE')
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

