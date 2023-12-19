import { Dialog } from '@angular/cdk/dialog';
import { Component, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl, FormArray, FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-add-edit',
  templateUrl: './user-add-edit.component.html',
  styleUrls: ['./user-add-edit.component.scss']
})
export class UserAddEditComponent {

  userForm: FormGroup;

  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<UserAddEditComponent>,
    private toast: ToastrService,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.userForm = this.formBuilder.group({
      id: '',
      name: ['', Validators.required],
      password: ['', Validators.required],
      profiles: this.formBuilder.array([]),
      ativo: '',
    })
  }

  ngOnInit(): void {
    this.userForm.patchValue(this.data)
  }

  get profilesArray(): FormArray {
    return this.userForm.get('profiles') as FormArray;
  }

  addProfile(profile: any): void {
    if (this.profilesArray.value.includes(profile)) {
      const index = this.profilesArray.value.indexOf(profile);
      this.profilesArray.removeAt(index);
    } else {
      this.profilesArray.push(new FormControl(profile));
    }
  }


  onFormSubmit() {
    if (this.userForm.valid) {
      if (this.data) {
        this.userService
          .update(this.userForm.value)
          .subscribe({
            next: (val: any) => {
              this.toast.success('Usuário atualizado!', 'Sucesso!');
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
        this.userService.create(this.userForm.value).subscribe({
          next: (val: any) => {
            this.toast.success('Usuárido cadastrado', 'Sucesso!');
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

