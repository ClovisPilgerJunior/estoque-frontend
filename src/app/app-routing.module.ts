import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FornecedorAtualizarComponent } from './components/fornecedor/fornecedor-atualizar/fornecedor-atualizar.component';
import { FornecedorCadastroComponent } from './components/fornecedor/fornecedor-cadastrar/fornecedor-cadastrar.component';
import { FornecedorConsultaComponent } from './components/fornecedor/fornecedor-consultar/fornecedor-consultar.component';
import { LoginComponent } from './components/login/login.component';
import { NavComponent } from './components/nav/nav.component';
import { ProdutoCapaEntradaListarComponent } from './components/produto-capa-entrada/produto-capa-entrada-listar/produto-capa-entrada-listar.component';
import { ProdutoCapaPerdaListarComponent } from './components/produto-capa-perda/produto-capa-perda-listar/produto-capa-perda-listar.component';
import { ProdutoCapaSaidaListarComponent } from './components/produto-capa-saida/produto-capa-saida-listar/produto-capa-saida-listar.component';
import { ProdutoCapaCadastrarComponent } from './components/produto-capa/produto-capa-cadastrar/produto-capa-cadastrar.component';
import { ProdutoCapaConsultarComponent } from './components/produto-capa/produto-capa-consultar/produto-capa-consultar.component';
import { ProdutoCapaListarComponent } from './components/produto-capa/produto-capa-listar/produto-capa-listar.component';
import { UnidadeProdutivaListarComponent } from './components/unidade-produtiva/unidade-produtiva-listar/unidade-produtiva-listar.component';
import { authGuard } from './auth/auth.guard';
import { UserListarComponent } from './components/user/user-listar/user-listar.component';
import { OrdemCompraListarComponent } from './components/ordem-Compra/ordem-compra-listar/ordem-compra-listar.component';

const routes: Routes = [
{ path: 'login', component: LoginComponent},
{
  path: '',
  component: NavComponent, canActivate: [authGuard], children: [

    { path: 'userListar', canActivate: [authGuard],
    data: {
      requiredRoles: ['ROLE_ADMIN', 'ROLE_USER'] // Adicione as roles necessárias para esta rota
    }, component: UserListarComponent },

    { path: 'produtoCapa', component: ProdutoCapaListarComponent },
    { path: 'produtoCapa/cadastrar', component: ProdutoCapaCadastrarComponent },
    { path: 'produtoConsultar', component: ProdutoCapaConsultarComponent },

    { path: 'ordemCompra', component: OrdemCompraListarComponent },

    { path: 'produtoEntrada', component: ProdutoCapaEntradaListarComponent },

    { path: 'produtoSaida', component: ProdutoCapaSaidaListarComponent },

    { path: 'produtoPerda', component: ProdutoCapaPerdaListarComponent },

    { path: 'unidadeProdutiva', component: UnidadeProdutivaListarComponent},

    { path: 'fornecedor', component: FornecedorConsultaComponent },
    { path: 'fornecedor/cadastrar', component: FornecedorCadastroComponent },
    { path: 'fornecedor/atualizar/:id', component: FornecedorAtualizarComponent }
  ]
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
