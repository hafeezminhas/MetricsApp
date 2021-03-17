import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {Plant} from '../../../data/models/plant';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {phaseHistoryList} from '../../../data/enums/PlantPhases';
import {PlantPhaseHistory} from '../../../data/models/phase-history';
import { NgPopupsService } from 'ng-popups';

@Component({
  selector: 'app-plant-dialog',
  templateUrl: './plant-dialog.component.html',
  styleUrls: ['./plant-dialog.component.scss']
})
export class PlantDialogComponent implements OnInit {
  plant: Plant;
  form: FormGroup;
  update: boolean;

  PhaseHistoryList: string[];
  PlantType = [
    { label: 'Seed', value: 1 },
    { label: 'Clone', value: 2 },
  ];

  phaseHistoryModel: PlantPhaseHistory | any = {
    phase: null,
    start: null,
    end: null,
  };
  phaseHistory: PlantPhaseHistory[] | any[];
  errors: string[];

  constructor(private fb: FormBuilder,
              private dialogRef: MatDialogRef<PlantDialogComponent>,
              private ngPopup: NgPopupsService,
              @Inject(MAT_DIALOG_DATA) data) {
      this.plant = data.plant;
      this.update = data.update;
  }

  ngOnInit(): void {
    this.PhaseHistoryList = phaseHistoryList;

    this.form = this.fb.group({
      name:         ['', Validators.required],
      metricId:     ['', Validators.required],
      strain:       ['', Validators.required],
      type:         [1, Validators.required],
      plantedOn:    [null, Validators.required],
      mother:       null,
      currentPhase: ['', Validators.required],
      location:     ['', Validators.required],
    });

    if (this.update) {
      this.form.patchValue({ phaseHistory: false, ...this.plant });

      if (this.plant.phaseHistory.length) {
        this.phaseHistory = this.plant.phaseHistory.map(ph => ({ ...ph, isNew: false }));
      }
    } else {
      this.phaseHistory = [];
    }

    // TODO: to be removed
    // this.form.patchValue({
    //   name: 'Red Root',
    //   metricId: 'SD5S64D',
    //   strain: 'Gorilla Glue',
    //   plantedOn: new Date('2021-03-06T18:05:51.786Z'),
    //   mother: null,
    //   currentPhase: 'Seedling',
    //   phaseHistory: [],
    //   location: '3247893'
    // });
  }

  get f(): any {
    return this.form.controls;
  }

  onDateChange(e): void {
    this.plant.plantedOn = e.value;
  }

  onSubmit(): void {
    this.form.markAllAsTouched();
    if (this.form.invalid) {
      return;
    }
    this.errors = [];
    if (!this.plant.plantedOn) {
      this.errors.push('Planted On Date is required');
    }
    if (this.errors.length) {
      return;
    }

    const payload: Plant = this.form.value;
    payload.plantedOn = this.plant.plantedOn;
    payload.phaseHistory = [];
    this.phaseHistory = this.phaseHistory.filter(ph => ph.isNew === true);
    this.phaseHistory.forEach(ph => {
      delete ph.isNew;
    });
    payload.phaseHistory = [...this.phaseHistory];
    console.log(payload);

    this.dialogRef.close(payload);
  }

  close(): void {
    this.dialogRef.close();
  }

  phaseSelect(val: string): void {
    this.phaseHistoryModel.phase = val;
  }

  setHistoryDate(value: Date, key: string): void {
    this.phaseHistoryModel[key] = value;
  }

  addItem(): void {
    if (this.phaseHistory.filter(ph => ph.phase === this.phaseHistoryModel.phase).length) {
      this.ngPopup.alert(`The phase history item with phase ${this.phaseHistoryModel.phase} already exist`, {
        title: 'Duplicate Entry', okButtonText: 'I Understand'
      });

      return;
    }

    this.phaseHistory.push({ ...this.phaseHistoryModel, isNew: true });
    this.phaseHistoryModel = { phase: null, start: null, end: null };
  }

  removeHistory(idx: number): void {
    this.ngPopup.confirm(`Are you sure you want to remove this phase history entry?`, { title: 'Confirm Removal' }).subscribe(res => {
      console.log(idx, this.phaseHistory);
      if (res && this.phaseHistory[idx].isNew) {
        this.phaseHistory.splice(1, idx);
      }
    });
  }

}
