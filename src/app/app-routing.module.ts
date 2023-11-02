import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavComponent } from './components/nav/nav.component';
import { EntradaCadastroComponent } from './components/entrada-cadastro/entrada-cadastro.component';
import { FornecedorConsultaComponent } from './components/fornecedor/fornecedor-consultar/fornecedor-consultar.component';
import { FornecedorCadastroComponent } from './components/fornecedor/fornecedor-cadastrar/fornecedor-cadastrar.component';
import { FornecedorAtualizarComponent } from './components/fornecedor/fornecedor-atualizar/fornecedor-atualizar.component';

const routes: Routes = [
{
  path: '',
  component: NavComponent, children: [
    { path: 'entrada-cadastro', component: EntradaCadastroComponent },

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
