import { Component, Inject, OnInit } from '@angular/core';
import { User } from 'src/app/data/models/user';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Company } from 'src/app/data/models/company';
import { debounceTime, finalize, switchMap, tap } from 'rxjs/operators';
import { CompaniesService } from '../../services/companies.service';
import { ErrorStateMatcher } from '@angular/material/core';
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

  constructor(private fb: FormBuilder,
    private dialogRef: MatDialogRef<UserDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data,
    private companiesService: CompaniesService) {
    this.user = data.user;
    this.update = data.update;
  }

  ngOnInit(): void {
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
        company: ['', Validators.required]
      });
      const payload: any = { ...this.user };
      payload.company = this.user.company?.name;
      this.form.patchValue(payload);
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
        isActive: [true],
        isLocked: [false],
        password: ['', Validators.required],
        confirm: ['', Validators.required],
        company: ['', Validators.required],
        role: ['ADMIN', Validators.required]
      }, {
        validator: PasswordConfirm('password', 'confirm')
      });
    }

    this.setupCompaniesSearch();
  }

  get f(): any {
    return this.form.controls;
  }

  onSubmit(): void {
    const payload = this.form.value;
    payload.company = payload.company ? this.selectedCompany.id : null;
    delete payload.isActive;
    delete payload.isLocked;
    this.dialogRef.close(payload);
  }

  close(): void {
    this.dialogRef.close();
  }

  companySelect(e): void {
    this.selectedCompany = e.source.value;
    this.form.controls.company.setValue(e.source.value.name);
  }

  private setupCompaniesSearch(): void {
    this.form.controls.company.valueChanges.pipe(
      debounceTime(500),
      tap(() => {
        this.companiesSearchErr = '';
        this.companiesSearching = true;
        this.filteredCompanies = [];
      }),
      switchMap(value => this.companiesService.searchCompany(value).pipe(
        finalize(() => {
          this.companiesSearching = false;
        }))
      )
    ).subscribe((res: any) => {
      if (res.error) {
        this.companiesSearchErr = res.error;
      } else {
        this.filteredCompanies = res.companies;
      }
    });
  }
}

export class confirmErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const invalidCtrl = !!(control?.invalid && control?.touched && control?.parent?.dirty);
    const invalidParent = !!(control?.parent?.errors?.notSame);

    return invalidCtrl || invalidParent;
  }
}
