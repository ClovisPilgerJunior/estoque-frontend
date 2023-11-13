import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// Para trabalhar com formulários no Angular
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

// Para realizar requisições HTTP
import { HttpClientModule } from '@angular/common/http';

// Imports para componentes do Angular Material
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ToastrModule } from 'ngx-toastr';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';
import { FornecedorAtualizarComponent } from './components/fornecedor/fornecedor-atualizar/fornecedor-atualizar.component';
import { FornecedorCadastroComponent } from './components/fornecedor/fornecedor-cadastrar/fornecedor-cadastrar.component';
import { FornecedorConsultaComponent } from './components/fornecedor/fornecedor-consultar/fornecedor-consultar.component';
import { NavComponent } from './components/nav/nav.component';
import { ProdutoCapaAtualizarComponent } from './components/produto-capa/produto-capa-atualizar/produto-capa-atualizar.component';
import { ProdutoCapaCadastrarComponent } from './components/produto-capa/produto-capa-cadastrar/produto-capa-cadastrar.component';
import { ProdutoCapaConsultarComponent } from './components/produto-capa/produto-capa-consultar/produto-capa-consultar.component';
import { ProdutoCapaListarComponent } from './components/produto-capa/produto-capa-listar/produto-capa-listar.component';
import { ConfirmationDialogComponent } from './shared/components/confirmation-dialog/confirmation-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    FornecedorConsultaComponent,
    FornecedorCadastroComponent,
    FornecedorAtualizarComponent,
    ConfirmationDialogComponent,
    ProdutoCapaListarComponent,
    ProdutoCapaCadastrarComponent,
    ProdutoCapaAtualizarComponent,
    ProdutoCapaConsultarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatAutocompleteModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatFormFieldModule,
    MatPaginatorModule,
    MatCheckboxModule,
    MatSnackBarModule,
    MatToolbarModule,
    MatSidenavModule,
    MatDialogModule,
    MatButtonModule,
    MatSelectModule,
    MatInputModule,
    MatRadioModule,
    MatTableModule,
    MatIconModule,
    FontAwesomeModule,
    MatListModule,
    MatCardModule,
    MatMenuModule,
    ToastrModule.forRoot({
      timeOut: 4000,
      closeButton: true,
      progressBar: true
    }),
    NgxMaskDirective,
    NgxMaskPipe

  ],
  providers: [provideNgxMask()],
  bootstrap: [AppComponent]
})
export class AppModule { }
