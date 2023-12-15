import { LOCALE_ID, NgModule } from '@angular/core';
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
import { ProdutoCapaEntradaAtualizarComponent } from './components/produto-capa-entrada/produto-capa-entrada-atualizar/produto-capa-entrada-atualizar.component';
import { ProdutoCapaEntradaListarComponent } from './components/produto-capa-entrada/produto-capa-entrada-listar/produto-capa-entrada-listar.component';
import { ProdutoCapaAtualizarComponent } from './components/produto-capa/produto-capa-atualizar/produto-capa-atualizar.component';
import { ProdutoCapaCadastrarComponent } from './components/produto-capa/produto-capa-cadastrar/produto-capa-cadastrar.component';
import { ProdutoCapaConsultarComponent } from './components/produto-capa/produto-capa-consultar/produto-capa-consultar.component';
import { ProdutoCapaListarComponent } from './components/produto-capa/produto-capa-listar/produto-capa-listar.component';
import { ConfirmationDialogComponent } from './shared/components/confirmation-dialog/confirmation-dialog.component';
import { ProdutoEntradaEntradaCadastrarComponent } from './components/produto-capa-entrada/produto-capa-entrada-cadastrar/produto-capa-entrada-cadastrar.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MAT_DATE_LOCALE, MatNativeDateModule } from '@angular/material/core';
import localePt from '@angular/common/locales/pt';
import { registerLocaleData } from '@angular/common';

import { provideEnvironmentNgxCurrency, NgxCurrencyInputMode } from 'ngx-currency';
import { NgxCurrencyDirective } from "ngx-currency";
import { ProdutoCapaSaidaListarComponent } from './components/produto-capa-saida/produto-capa-saida-listar/produto-capa-saida-listar.component';
import { ProdutoCapaSaidaAddEditComponent } from './components/produto-capa-saida/produto-capa-saida-add-edit/produto-capa-saida-add-edit.component';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { ProdutoCapaPerdaListarComponent } from './components/produto-capa-perda/produto-capa-perda-listar/produto-capa-perda-listar.component';
import { ProdutoCapaPerdaAddEditComponent } from './components/produto-capa-perda/produto-capa-perda-add-edit/produto-capa-perda-add-edit.component';
import { UnidadeProdutivaListarComponent } from './components/unidade-produtiva/unidade-produtiva-listar/unidade-produtiva-listar.component';
import { UnidadeProdutivaAddEditComponent } from './components/unidade-produtiva/unidade-produtiva-add-edit/unidade-produtiva-add-edit.component';
import { LoginComponent } from './components/login/login.component';
import { AuthInterceptorProvider } from './interceptors/auth.interceptor';
import { UserListarComponent } from './components/user/user-listar/user-listar.component';
import { UserAddEditComponent } from './components/user/user-add-edit/user-add-edit.component';


registerLocaleData(localePt, 'pt');

export const ISO_FORMAT = {
  parse: {
      dateInput: 'dd/MM/yyyy',
  },
  display: {
      dateInput: 'dd/MM/yyyy',
      monthYearLabel: 'MMM YYYY',
  },

};

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
    ProdutoCapaConsultarComponent,
    ProdutoCapaEntradaListarComponent,
    ProdutoCapaEntradaAtualizarComponent,
    ProdutoEntradaEntradaCadastrarComponent,
    ProdutoCapaSaidaListarComponent,
    ProdutoCapaSaidaAddEditComponent,
    ProdutoCapaPerdaListarComponent,
    ProdutoCapaPerdaAddEditComponent,
    UnidadeProdutivaListarComponent,
    UnidadeProdutivaAddEditComponent,
    LoginComponent,
    UserListarComponent,
    UserAddEditComponent
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
    MatDatepickerModule,
    MatNativeDateModule,
    MatListModule,
    MatCardModule,
    MatMomentDateModule,
    MatMenuModule,
    NgxCurrencyDirective,
    ToastrModule.forRoot({
      timeOut: 4000,
      closeButton: true,
      progressBar: true
    }),
    NgxMaskDirective,
    NgxMaskPipe

  ],
  providers: [ AuthInterceptorProvider,provideNgxMask(), {provide: LOCALE_ID, useValue: 'pt' },
  provideEnvironmentNgxCurrency({
    align: "left",
    allowNegative: true,
    allowZero: true,
    decimal: ",",
    precision: 2,
    prefix: "R$ ",
    suffix: "",
    thousands: ".",
    nullable: true,
    min: null,
    max: null,
    inputMode: NgxCurrencyInputMode.Financial,
  }),{ provide: MAT_DATE_LOCALE, useValue: 'pt' },
],
  bootstrap: [AppComponent]
})
export class AppModule { }


