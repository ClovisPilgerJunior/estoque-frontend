import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Fornecedor } from 'src/app/models/Fornecedor';
import { FornecedorService } from 'src/app/services/fornecedor.service';
import { MatDialog } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ConfirmationDialogComponent } from 'src/app/shared/components/confirmation-dialog/confirmation-dialog.component';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-fornecedor-consulta',
  templateUrl: './fornecedor-consultar.component.html',
  styleUrls: ['./fornecedor-consultar.component.scss']
})
export class FornecedorConsultaComponent {
  [x: string]: any;

  ELEMENT_DATA: Fornecedor[] = []

  displayedColumns: string[] = ['id', 'empresa', 'nome', 'tipoEmpresa', 'email', 'telefone', 'endereco', 'ativo', 'action'];
  dataSource = new MatTableDataSource<Fornecedor>(this.ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private service: FornecedorService,
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

  isUserAndFornecedorCreate(): boolean {
    return this.authService.hasPermission('ROLE_USER') && this.authService.hasPermission('ROLE_FORNECEDOR_CREATE')
  }

  isUserAndFornecedorUpdate(): boolean {
    return this.authService.hasPermission('ROLE_USER') && this.authService.hasPermission('ROLE_FORNECEDOR_UPDATE')
  }

  isUserAndFornecedorDelete(): boolean {
    return this.authService.hasPermission('ROLE_USER') && this.authService.hasPermission('ROLE_FORNECEDOR_DELETE')
  }

  isManagerAndFornecedorCreate(): boolean {
    return this.authService.hasPermission('ROLE_MANAGER') && this.authService.hasPermission('ROLE_FORNECEDOR_CREATE')
  }

  isManagerAndFornecedorUpdate(): boolean {
    return this.authService.hasPermission('ROLE_MANAGER') && this.authService.hasPermission('ROLE_FORNECEDOR_UPDATE')
  }

  isManagerAndFornecedorDelete(): boolean {
    return this.authService.hasPermission('ROLE_MANAGER') && this.authService.hasPermission('ROLE_FORNECEDOR_DELETE')
  }

  ngOnInit(): void {
    this.findAll();
  }

  findAll() {
    this.service.findAll().subscribe(response => {
      this.ELEMENT_DATA = response;
      this.dataSource = new MatTableDataSource<Fornecedor>(response);
      this.dataSource.paginator = this.paginator
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  delete(fornecedor: number){
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: 'Você tem certeza que deseja excluír esse fornecedor?'
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        this.service.delete(fornecedor).subscribe({
          next: () => {
            this.toast.success('Fornecedor excluído com sucesso');
            this.findAll();
            },
            error: ex => {
              this.toast.error(ex.error.message);
            }
        });
      }
    });
  }

}
