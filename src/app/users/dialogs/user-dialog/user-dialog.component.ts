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
  phoneRegx = /^[(]?\d{3}[)]?[(\s)?.-]\d{3}[\s.-]\d{4}$/g;

  filteredCompanies: Company[] = [];
  selectedCompany: any;
  companiesSearching: boolean;
  companiesSearchErr: string;

  hidePassword = true;
  hideConfirmPassword = true;
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
    this.isActive = !!this.update ? this.user.isActive : true;
    this.isLocked = !!this.update ? this.user.isLocked : false;

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
        isActive: [false, Validators.required],
        isLocked: [false, Validators.required],
        company: ['', Validators.required]
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
    if (target === 'isActive') {
      this.isActive = this.form.value.isActive;
    }
    if (target === 'isLocked') {
      this.isLocked = this.form.value.isLocked;
    }
  }

  onSubmit(): void {
    this.form.markAllAsTouched();
    if (this.form.invalid) {
      return;
    }
    const payload = this.form.value;
    payload.company = payload.company ? this.selectedCompany.id : null;
    delete payload.isActive;
    delete payload.isLocked;
    this.dialogRef.close(payload);
  }

  close(): void {
    this.dialogRef.close();
  }
}
