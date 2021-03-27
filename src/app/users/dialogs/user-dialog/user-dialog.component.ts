import {Component, Inject, OnInit} from '@angular/core';
import {User} from '../../../data/models/user';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Company} from '../../../data/models/company';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {CompaniesService} from '../../../admin/services/companies.service';
import {confirmErrorStateMatcher} from '../../../admin/dialogs/user-dialog/user-dialog.component';
import { PasswordConfirm } from '../../../shared/validators/confirm-password-validator';

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
  phoneRegx = /^\d{10,10}$/g;

  filteredCompanies: Company[] = [];
  selectedCompany: any;
  companiesSearching: boolean;
  companiesSearchErr: string;

  hidePassword = true;
  matcher = new confirmErrorStateMatcher();

  isActive: boolean;
  isLocked: boolean;

  constructor(private fb: FormBuilder,
              private dialogRef: MatDialogRef<UserDialogComponent>,
              @Inject(MAT_DIALOG_DATA) data,
              private companiesService: CompaniesService) {
    this.user = data.user;
    this.update = data.update;
  }

  ngOnInit(): void {
    console.log(this.user);
    if (this.update) {
      this.isActive = this.user.isActive;
      this.isLocked = this.user.isLocked;
    }

    if (this.update) { // Update
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
        isActive: [this.user.isActive, Validators.required],
        isLocked: [this.user.isLocked, Validators.required],
      });
      this.form.patchValue(this.user);
    } else { // Create
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
        password: ['', Validators.required],
        confirm: ['', Validators.required],
      }, {
        validator: PasswordConfirm('password', 'confirm')
      });
    }
  }

  get f(): any {
    return this.form.controls;
  }

  statusChanged(target): void {
    this[target] = this.form.value[target];
    console.log(target, this[target]);
  }

  onSubmit(): void {
    this.form.markAllAsTouched();
    if (this.form.invalid) {
      return;
    }
    const payload = this.form.value;
    if (this.update) {
      payload.isActive = this.isActive;
      payload.isLocked = this.isLocked;
    }
    console.log(payload);
    this.dialogRef.close(payload);
  }

  close(): void {
    this.dialogRef.close();
  }
}
