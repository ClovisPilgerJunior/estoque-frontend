import { Component, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UnidadeProdutivaService } from 'src/app/services/unidade-produtiva.service';

@Component({
  selector: 'app-unidade-produtiva-add-edit',
  templateUrl: './unidade-produtiva-add-edit.component.html',
  styleUrls: ['./unidade-produtiva-add-edit.component.scss']
})
export class UnidadeProdutivaAddEditComponent {

  unidadeProdutiva: FormGroup;

  servicos = [
    'COSTURA',
    'PLAQUINHA',
    'BORDADO',
    'ESTAMPARIA'
  ]


  constructor(
    private unidadeProdutivaService: UnidadeProdutivaService,
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<UnidadeProdutivaAddEditComponent>,
    private toast: ToastrService,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.unidadeProdutiva = this.formBuilder.group({
      id: '',
      nome: ['', Validators.required],
      servico: ['', Validators.required],
      ativo: '',
    })
  }

  ngOnInit(): void {
    this.unidadeProdutiva.patchValue(this.data)
  }

  onFormSubmit() {
    if (this.unidadeProdutiva.valid) {
      if (this.data) {
        this.unidadeProdutivaService
          .update(this.unidadeProdutiva.value)
          .subscribe({
            next: (val: any) => {
              this.toast.success('Perda do produto atualizada!', 'Sucesso!');
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
        this.unidadeProdutivaService.create(this.unidadeProdutiva.value).subscribe({
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
