import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ProdutoPerdaService } from 'src/app/services/produto-saida.service  copy';

@Component({
  selector: 'app-produto-capa-perda-add-edit',
  templateUrl: './produto-capa-perda-add-edit.component.html',
  styleUrls: ['./produto-capa-perda-add-edit.component.scss']
})
export class ProdutoCapaPerdaAddEditComponent implements OnInit {

  produtoPerda: FormGroup;


  constructor(
    private produtoPerdaService: ProdutoPerdaService,
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<ProdutoCapaPerdaAddEditComponent>,
    private toast: ToastrService,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.produtoPerda = this.formBuilder.group({
      id: '',
      data: '',
      quantidade: '',
      motivo: '',
      produtoCapa: '',
      produtoCapaDesc: '',
    })
  }

  ngOnInit(): void {
    this.produtoPerda.patchValue(this.data)
  }

  onFormSubmit() {
    if (this.produtoPerda.valid) {
      if (this.data) {
        this.produtoPerdaService
          .update(this.produtoPerda.value)
          .subscribe({
            next: (val: any) => {
              this.toast.success('Perda do produto atualizada!');
              this.dialogRef.close(true);
            },
            error: (err: any) => {
              this.toast.error(err.message)
              console.error(err);
            },
          });
      } else {
        this.produtoPerdaService.create(this.produtoPerda.value).subscribe({
          next: (val: any) => {
            this.toast.success('Perda do produto lançada');
            this.dialogRef.close(true);
          },
          error: (err: any) => {
            this.toast.error(err.error.message)
            console.error(err);
          },
        });
      }
    }
  }

}
