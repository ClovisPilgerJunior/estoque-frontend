import { Component } from '@angular/core';
import { Location } from '@angular/common';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { fornecedor } from 'src/app/models/Fornecedor';
import { ProdutoCapa } from 'src/app/models/ProdutoCapa';
import { FornecedorService } from 'src/app/services/fornecedor.service';
import { ProdutoCapaService } from 'src/app/services/produto-capa.service';

@Component({
  selector: 'app-produto-capa-atualizar',
  templateUrl: './produto-capa-atualizar.component.html',
  styleUrls: ['./produto-capa-atualizar.component.scss'],
})
export class ProdutoCapaAtualizarComponent {

  updateForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private location: Location,
    private produtoCapaService: ProdutoCapaService,
    private fornecedorService: FornecedorService,
    private toast: ToastrService,
    private route: ActivatedRoute,
    private router: Router
    ) {
    this.findAllFornecedor();
  }

  ngOnInit(): void {
    const produtoCapa: ProdutoCapa = this.route.snapshot.data['produtoCapa']
    console.log(produtoCapa)
    this.updateForm = this.fb.group({
      description: [produtoCapa.description],
      tipoProduto: [produtoCapa.tipoProduto]

    })
  }

  fornecedor: fornecedor[] = [];

  findAllFornecedor(): void {
    this.fornecedorService.findAll().subscribe((response) => {
      // Filtrar a lista de fornecedores para remover os inativos
      this.fornecedor = response.filter(
        (fornecedor) => fornecedor.ativo === true
      );
      console.log(this.fornecedor);
    });
  }

  medidas = [
    { valor: 0, nome: 'UNIDADE' },
    { valor: 1, nome: 'PACOTE' },
    { valor: 2, nome: 'KILO' },
    { valor: 3, nome: 'PEÇA' },
    { valor: 4, nome: 'METRO' },
    { valor: 5, nome: 'GRAMAS' },
    { valor: 6, nome: 'CAIXA' },
    { valor: 7, nome: 'SACO' },
    { valor: 8, nome: 'PAR' },
    { valor: 9, nome: 'MILHEIRO' },
    { valor: 10, nome: 'MILIGRAMAS' },
  ];

  produtos = [
    { valor: 0, nome: 'MATERIA PRIMA' },
    { valor: 1, nome: 'PRODUTO PRONTO' },
    { valor: 2, nome: 'DIVERSOS' },
  ];

  onCancel() {
    this.location.back();
  }

}
