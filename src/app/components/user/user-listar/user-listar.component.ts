import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { ConfirmationDialogComponent } from 'src/app/shared/components/confirmation-dialog/confirmation-dialog.component';
import { UserAddEditComponent } from '../user-add-edit/user-add-edit.component';

@Component({
  selector: 'app-user-listar',
  templateUrl: './user-listar.component.html',
  styleUrls: ['./user-listar.component.scss']
})
export class UserListarComponent {


  ELEMENT_DATA: User[] = [];

  displayedColumns: string[] = [
    'id',
    'name',
    'password',
    'profiles',
    'ativo',
    'action',
  ];
  dataSource = new MatTableDataSource<User>(this.ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator: MatPaginator;
senhaVisivel: any;

  constructor(
    private service: UserService,
    private dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute,
    private toast: ToastrService
  ) {
  }

  profileMap: { [key: string]: string } = {
    ROLE_ADMIN: 'Admin ',
    ROLE_MANAGER: 'Gerente ',
    ROLE_USER: 'Usuário ',
    ROLE_FORNECEDOR_VIEW: 'Fornecedor ',
    ROLE_FORNECEDOR_CREATE: 'Fornecedor Cadastro ',
    ROLE_FORNECEDOR_UPDATE: 'Fornecedor Atualização ',
    ROLE_FORNECEDOR_DELETE: 'Fornecedor Exclusão ',
    ROLE_FORNECEDOR_LIST: 'Fornecedor Lista ',
    ROLE_PRODUTOCAPA_VIEW: 'Produto Capa ',
    ROLE_PRODUTOCAPA_CREATE: 'Produto Capa Cadastro ',
    ROLE_PRODUTOCAPA_UPDATE: 'Produto Capa Atualização ',
    ROLE_PRODUTOCAPA_DELETE: 'Produto Capa Exclusão ',
    ROLE_PRODUTOCAPA_LIST: 'Produto Capa Lista ',
    ROLE_UNIDADEPRODUTIVA_VIEW: 'Unidade Produtiva ',
    ROLE_UNIDADEPRODUTIVA_CREATE: 'Unidade Produtiva Cadastro ',
    ROLE_UNIDADEPRODUTIVA_UPDATE: 'Unidade Produtiva Atualização ',
    ROLE_UNIDADEPRODUTIVA_DELETE: 'Unidade Produtiva Exclusão ',
    ROLE_UNIDADEPRODUTIVA_LIST: 'Unidade Produtiva Lista ',
    ROLE_PRODUTOENTRADA_VIEW: 'Produto Entrada ',
    ROLE_PRODUTOENTRADA_CREATE: 'Produto Entrada Cadastro ',
    ROLE_PRODUTOENTRADA_UPDATE: 'Produto Entrada Atualização ',
    ROLE_PRODUTOENTRADA_DELETE: 'Produto Entrada Exclusão ',
    ROLE_PRODUTOENTRADA_LIST: 'Produto Entrada Lista ',
    ROLE_PRODUTOSAIDA_VIEW: 'Produto Saída ',
    ROLE_PRODUTOSAIDA_CREATE: 'Produto Saída Cadastro ',
    ROLE_PRODUTOSAIDA_UPDATE: 'Produto Saída Atualização ',
    ROLE_PRODUTOSAIDA_DELETE: 'Produto Saída Exclusão ',
    ROLE_PRODUTOSAIDA_LIST: 'Produto Saída Lista ',
    ROLE_PRODUTOPERDA_VIEW: 'Produto Perda ',
    ROLE_PRODUTOPERDA_CREATE: 'Produto Perda Cadastro ',
    ROLE_PRODUTOPERDA_UPDATE: 'Produto Perda Atualização ',
    ROLE_PRODUTOPERDA_DELETE: 'Produto Perda Exclusão ',
    ROLE_PRODUTOPERDA_LIST: 'Produto Perda Lista ',
  };

    getUserFriendlyProfile(profile: string): string {
      return this.profileMap[profile] || profile;
    }


  senhaMostrar(user: User){
    user.senhaVisivel = !user.senhaVisivel;
   }

  ngOnInit(): void {
    this.findAll();
  }

  findAll() {
    this.service.findAll().subscribe((response) => {
      this.ELEMENT_DATA = response.map(user => ({...user, senhaVisivel: false}));
      this.dataSource = new MatTableDataSource<User>(response.map(user => ({
        ...user,
        profiles: user.profiles.map(profile => this.getUserFriendlyProfile(profile))
      })));
      this.dataSource.paginator = this.paginator;
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  onCreate() {
    const dialogRef = this.dialog.open(UserAddEditComponent);

    dialogRef.afterClosed().subscribe({
      next: (response) => {
        response = this.findAll();
      },
    });
  }

  onEditForm(data: any) {
    const dialogRef = this.dialog.open(UserAddEditComponent, {
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
