import { ProdutoEntrada } from './models/ProdutoEntrada';
import { ProdutoCapaCadastrarComponent } from './components/produto-capa/produto-capa-cadastrar/produto-capa-cadastrar.component';
import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavComponent } from './components/nav/nav.component';
import { FornecedorConsultaComponent } from './components/fornecedor/fornecedor-consultar/fornecedor-consultar.component';
import { FornecedorCadastroComponent } from './components/fornecedor/fornecedor-cadastrar/fornecedor-cadastrar.component';
import { FornecedorAtualizarComponent } from './components/fornecedor/fornecedor-atualizar/fornecedor-atualizar.component';
import { ProdutoCapaListarComponent } from './components/produto-capa/produto-capa-listar/produto-capa-listar.component';
import { ProdutoCapaAtualizarComponent } from './components/produto-capa/produto-capa-atualizar/produto-capa-atualizar.component';
import { produtoCapaResolver } from './guards/produto-capa.resolver';
import { ProdutoCapaConsultarComponent } from './components/produto-capa/produto-capa-consultar/produto-capa-consultar.component';
import { ProdutoCapaEntradaListarComponent } from './components/produto-capa-entrada/produto-capa-entrada-listar/produto-capa-entrada-listar.component';
import { ProdutoCapaSaidaListarComponent } from './components/produto-capa-saida/produto-capa-saida-listar/produto-capa-saida-listar.component';
import { ProdutoCapaPerdaListarComponent } from './components/produto-capa-perda/produto-capa-perda-listar/produto-capa-perda-listar.component';

const routes: Routes = [
{
  path: '',
  component: NavComponent, children: [
    { path: 'produtoCapa', component: ProdutoCapaListarComponent },
    { path: 'produtoCapa/cadastrar', component: ProdutoCapaCadastrarComponent },
    { path: 'produtoConsultar', component: ProdutoCapaConsultarComponent },

    { path: 'produtoEntrada', component: ProdutoCapaEntradaListarComponent },

    { path: 'produtoSaida', component: ProdutoCapaSaidaListarComponent },

    { path: 'produtoPerda', component: ProdutoCapaPerdaListarComponent },

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
