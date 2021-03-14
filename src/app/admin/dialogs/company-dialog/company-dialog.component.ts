import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Company} from '../../../data/models/company';
import {CompanySize} from '../../../data/enums/company-size.enum';
import {StateLicenceType} from '../../../data/enums/state-license.enum';

@Component({
  selector: 'app-company-dialog',
  templateUrl: './company-dialog.component.html',
  styleUrls: ['./company-dialog.component.scss']
})
export class CompanyDialogComponent implements OnInit {
  company: Company;
  form: FormGroup;
  update: boolean;
  emailRegx = /^(([^<>+()\[\]\\.,;:\s@"-#$%&=]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,3}))$/;
  phoneRegx = /^[(]?\d{3}[)]?[(\s)?.-]\d{3}[\s.-]\d{4}$/g;

  constructor(private fb: FormBuilder,
              private dialogRef: MatDialogRef<CompanyDialogComponent>,
              @Inject(MAT_DIALOG_DATA) data) {
    this.company = data.company;
    this.update = data.update;
  }

  Subscriptions = [
    { label: 'Basic', value: 1 },
    { label: 'Premium', value: 2 },
  ];
  CompanySizeOptions = [];
  StateLicenceChecks = [];

  ngOnInit(): void {
    Object.keys(CompanySize).forEach((k: string) => {
      this.CompanySizeOptions.push({ value: k, label: CompanySize[k] });
    });
    console.log(this.CompanySizeOptions);
    Object.keys(StateLicenceType).filter(k => isNaN(k as any)).forEach((k: string) => {
      this.StateLicenceChecks.push({ name: k, selected: this.update ? (this.company.stateLicence.indexOf(k) !== -1) : false });
    });
    console.log(this.StateLicenceChecks);
    this.form = this.fb.group({
      name:     ['', Validators.required],
      email:    ['', [Validators.required, Validators.pattern(this.emailRegx)]],
      phone:    ['', [Validators.required, Validators.pattern(this.phoneRegx)]],
      website:  '',
      established: null,
      address:  this.fb.group({
        street: ['', Validators.required],
        city:   ['', Validators.required],
        state:  ['', Validators.required],
        zip:    [null, Validators.required]
      }),
      companySize: 1,
      metricId: ['', Validators.required],
      subscriptionType: 1,
    });
  }

  get f(): any {
    return this.form.controls;
  }

  toggleLicence(i, curr: boolean): void {
    this.StateLicenceChecks[i].selected = !curr;
  }

  onSubmit(): void {
    console.log(this.form.value);
    if(this.form.invalid) {
      return;
    }
    const payload: Company = this.form.value;
    if (this.update) {
      // TODO: Implement
    }
    payload.stateLicence = this.StateLicenceChecks.filter(sl => sl.selected).map(sl => sl.name as string);

    this.dialogRef.close(payload);
  }

  close(): void {
    this.dialogRef.close();
  }

}
