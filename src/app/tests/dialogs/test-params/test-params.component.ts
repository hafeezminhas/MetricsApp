import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {NgPopupsService} from 'ng-popups';
import {PlantService} from '../../../plant/services/plant.service';
import {TestsService} from '../../services/tests.service';
import {TestParams} from '../../../data/models/test';

@Component({
  selector: 'app-test-params',
  templateUrl: './test-params.component.html',
  styleUrls: ['./test-params.component.scss']
})
export class TestParamsComponent implements OnInit {
  form: FormGroup;
  testParams: TestParams;
  update: boolean;
  paramsDate: Date;

  error: string;

  constructor(private fb: FormBuilder,
              private dialogRef: MatDialogRef<TestParamsComponent>,
              private ngPopup: NgPopupsService,
              @Inject(MAT_DIALOG_DATA) data) {
    this.testParams = data.params;
    this.update = data.update;
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      date:           ['', Validators.required],
      airTemp:        null,
      airRH:          null,
      co2:            null,
      lightIntensity: null,
      waterPH:        null,
      waterTDS:       null,
      waterOxygen:    null,
    });

    if (this.update) {
      this.form.patchValue(this.testParams);
    }
  }

  get f(): any {
    return this.form.controls;
  }

  onDateChange(e): void {
    this.paramsDate = e.value;
  }

  onSubmit(): void {
    this.form.markAllAsTouched();
    if (this.form.invalid) {
      return;
    }

    this.dialogRef.close(this.form.getRawValue());
  }

  close(): void {
    this.dialogRef.close();
  }

}
