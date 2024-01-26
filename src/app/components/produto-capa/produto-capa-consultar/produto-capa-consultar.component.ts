import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ProdutoCapaCalculated } from 'src/app/models/ProdutoCapaCalculated';
import { AuthService } from 'src/app/services/auth.service';
import { ProdutoCapaService } from 'src/app/services/produto-capa.service';

@Component({
  selector: 'app-produto-capa-consultar',
  templateUrl: './produto-capa-consultar.component.html',
  styleUrls: ['./produto-capa-consultar.component.scss']
})
export class ProdutoCapaConsultarComponent {

  ELEMENT_DATA: ProdutoCapaCalculated[] = []

  displayedColumns: string[] = ['id', 'codSistema', 'description', 'tipoProduto', 'medidaUnidade', 'fornecedor', 'entradas', 'saidas', 'perdas', 'saldo', 'valorCompra', 'valorTotal', 'minimo', 'maximo', 'resuprimento'];
  dataSource = new MatTableDataSource<ProdutoCapaCalculated>(this.ELEMENT_DATA);

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


  ngOnInit(): void {
    this.findAll();
  }

  findAll() {
    this.service.findAllCalculated().subscribe(response => {
      this.ELEMENT_DATA = response;
      this.dataSource = new MatTableDataSource<ProdutoCapaCalculated>(response);
      this.dataSource.paginator = this.paginator
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getTotalCost() {
    return this.ELEMENT_DATA.map(t => t.valorTotal).reduce((acc, value) => acc + value, 0);
  }

  getTotalUnit() {
    return this.ELEMENT_DATA.map(t => t.valorCompra).reduce((acc, value) => acc + value, 0);
  }

  getTotalSaida() {
    return this.ELEMENT_DATA.map(t => t.saidas).reduce((acc, value) => acc + value, 0);
  }

  getTotalEntrada() {
    return this.ELEMENT_DATA.map(t => t.entradas).reduce((acc, value) => acc + value, 0);
  }

  getTotalPerda() {
    return this.ELEMENT_DATA.map(t => t.perdas).reduce((acc, value) => acc + value, 0);
  }

  getTotalSaldo() {
    return this.ELEMENT_DATA.map(t => t.saldo).reduce((acc, value) => acc + value, 0);
  }
}
