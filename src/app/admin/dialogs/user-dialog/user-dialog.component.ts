import { Component, Inject, OnInit } from '@angular/core';
import { User } from 'src/app/data/models/user';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-user-dialog',
  templateUrl: './user-dialog.component.html',
  styleUrls: ['./user-dialog.component.scss']
})
export class UserDialogComponent implements OnInit {
  user: User;
  form: FormGroup;
  update: boolean;
  emailRegx = /^(([^<>+()\[\]\\.,;:\s@"-#$%&=]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,3}))$/;
  phoneRegx = /^[(]?\d{3}[)]?[(\s)?.-]\d{3}[\s.-]\d{4}$/g;

  constructor(private fb: FormBuilder,
    private dialogRef: MatDialogRef<UserDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data) {
    this.user = data.user;
    this.update = data.update;
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.pattern(this.emailRegx)]],
      phone: ['', [Validators.required, Validators.pattern(this.phoneRegx)]],
      address: this.fb.group({
        street: ['', Validators.required],
        city: ['', Validators.required],
        state: ['', Validators.required],
        zip: [null, Validators.required]
      }),
      role: ['', Validators.required]
    });
  }

  get f(): any {
    return this.form.controls;
  }

  onSubmit(): void {
  }

  close(): void {
    this.dialogRef.close();
  }
}
