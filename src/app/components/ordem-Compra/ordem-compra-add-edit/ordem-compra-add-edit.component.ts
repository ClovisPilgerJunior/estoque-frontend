import { Component, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Fornecedor } from 'src/app/models/Fornecedor';
import { FornecedorService } from 'src/app/services/fornecedor.service';
import { OrdemCompraService } from 'src/app/services/ordem-compra.service';

@Component({
  selector: 'app-ordem-compra-add-edit',
  templateUrl: './ordem-compra-add-edit.component.html',
  styleUrls: ['./ordem-compra-add-edit.component.scss']
})
export class OrdemCompraAddEditComponent {

  ordemCompra: FormGroup;


  constructor(
    private ordemCompraService: OrdemCompraService,
    private formBuilder: FormBuilder,
    private fornecedorService: FornecedorService,
    private dialogRef: MatDialogRef<OrdemCompraAddEditComponent>,
    private toast: ToastrService,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.ordemCompra = this.formBuilder.group({
      id: '',
      fornecedor: '',
      dataPedidoOrdemCompra: '',
      dataRecebimentoOrdemCompra: '',
      quantidade: '',
      statusOrdem: '',
    })

    this.findAllFornecedor()
   console.log(this.findAllFornecedor())
  }

  fornecedor: Fornecedor[] = []


  findAllFornecedor(): void {
    this.fornecedorService.findAll().subscribe(response => {
      // Filtrar a lista de fornecedores para remover os inativos
      this.fornecedor = response.filter(fornecedor => fornecedor.ativo === true);
      console.log(this.fornecedor);
    });
  }

  ngOnInit(): void {
    this.ordemCompra.patchValue(this.data)
  }

  onFormSubmit() {
    if (this.ordemCompra.valid) {
      if (this.data) {
        this.ordemCompraService
          .update(this.ordemCompra.value)
          .subscribe({
            next: (val: any) => {
              this.toast.success('Ordem de compra atulizada com sucesso!', 'Sistema');
              this.dialogRef.close(true);
            },
            error: (err: any) => {
              if(err.status=409) {
                this.toast.warning(err.error.message, 'Aviso')
              } else {
              this.toast.error(err.error.message, 'Erro')
              console.error(err);
              }
            },
          });
      } else {
        this.ordemCompraService.create(this.ordemCompra.value).subscribe({
          next: (val: any) => {
            this.toast.success('Perda do produto lançada', 'Sucesso!');
            this.dialogRef.close(true);
          },
          error: (err: any) => {
            if(err.status=409) {
              this.toast.warning(err.error.message, 'Aviso')
            } else {
            this.toast.error(err.error.message, 'Erro')
            console.error(err);
            }
          },
        });
      }
    }
  }


}
