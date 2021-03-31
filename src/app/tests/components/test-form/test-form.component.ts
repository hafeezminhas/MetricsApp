import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TestsService } from '../../services/tests.service';
import { Test, TestParams, TestUpdatePayload} from '../../../data/models/test';
import { Plant } from '../../../data/models/plant';
import { ActivatedRoute, Router } from '@angular/router';
import { debounceTime, finalize, switchMap, tap } from 'rxjs/operators';
import { PlantService } from '../../../plant/services/plant.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { TestParamsComponent } from '../../dialogs/test-params/test-params.component';
import { NgPopupsService } from 'ng-popups';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-test-form',
  templateUrl: './test-form.component.html',
  styleUrls: ['./test-form.component.scss']
})
export class TestFormComponent implements OnInit {
  form: FormGroup;
  errors: string[];
  update: boolean;

  test: Test;
  testParams: TestParams[] = [];
  plants: any[] = [];

  filteredPlants: Plant[] = [];
  selectedPlant: any;
  plantsSearching: boolean;
  plantsSearchErr: string;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private fb: FormBuilder,
              private dialog: MatDialog,
              private testsService: TestsService,
              private ngPopup: NgPopupsService,
              private plantService: PlantService,
              private _snackBar: MatSnackBar) {
    this.update = this.route.snapshot.data.update;
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      name:           ['', Validators.required],
      description:    ['', Validators.required],
      resultDate:     [null, Validators.required],
      wetWeight:      [null, Validators.required],
      dryWeight:      [null, Validators.required],
      trimmedWeight:  [null, Validators.required],
      THCA:           [null, Validators.required],
      DELTATHC:       [null, Validators.required],
      THCVA:          [null, Validators.required],
      CBDA:           [null, Validators.required],
      CBGA:           [null, Validators.required],
      CBL:            [null, Validators.required],
      CBD:            [null, Validators.required],
      CBN:            [null, Validators.required],
      CBT:            [null, Validators.required],
      TAC:            [null, Validators.required],
      plantSearch:    '',
    });

    this.setupPlantsSearch();

    if (this.update) {
      this.test = this.route.snapshot.data.test;
      this.patchData();
    }
  }

  patchData() {
    this.form.patchValue(this.test);
    this.testParams = this.test.testParams;
    this.plants = [...this.test.plants];
  }

  get f(): any {
    return this.form.controls;
  }

  onDateChange(e): void {
    this.test.resultDate = e.value;
  }

  plantSelect(e): void {
    this.form.controls.plantSearch.setValue('');
    if (this.plants.findIndex(p => p._id === e.source.value._id) !== -1) {
      this.ngPopup.alert(`Plant '${e.source.value.name}' already exist`, 
        { title: 'Duplicate Entry', okButtonText: 'I Understand' }
      );
      return;
    }
    this.selectedPlant = e.source.value;
    this.plants.push({ ...e.source.value, isNew: true });
  }

  removePlant(plant: Plant) {
    this.ngPopup.confirm(`Are you sure you want to remove this '${plant.name}'?`, { title: 'Confirm Removal' })
      .subscribe(res => {
        if (res) {
          const index = this.plants.findIndex(p => p._id == plant._id);
          if (index !== -1) {
            this.plants.splice(index, 1);
          }
        }
    });
  }
  
  getPlantType(type: number): string {
    return type === 1 ? 'Seed' : 'Clone';
  }

  onSubmit(): void {
    this.form.markAllAsTouched();
    if (this.form.invalid) {
      return;
    }

    if (this.update) {
      let value = this.form.value;
      delete value.plantSearch;
      const updatePayload: TestUpdatePayload = { ...value };
      updatePayload.plants = this.plants.filter(p => p.isNew).map(p => p._id);
      updatePayload.testParams = this.testParams.filter(t => !t.hasOwnProperty('_id'));
      this.updateTest(updatePayload);
    } else {
      this.addTest()
    }
  }

  close(): void {
    this.router.navigate(['/tests']);
  }

  addParams(): void {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.position = { top: '5%' };
    dialogConfig.width = '600px';
    dialogConfig.minHeight = '550px';
    dialogConfig.data = { testParams: {}, update: false };

    const addDialog = this.dialog.open(TestParamsComponent, dialogConfig);
    addDialog.afterClosed().subscribe(data => {
      if (data) {
        this.testParams.push(data);
      }
    });
  }

  updateParams(params: TestParams, idx: number): void {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.position = { top: '5%' };
    dialogConfig.width = '680px';
    dialogConfig.minHeight = '550px';
    dialogConfig.data = { params, update: true };

    const updateDialog = this.dialog.open(TestParamsComponent, dialogConfig);
    updateDialog.afterClosed().subscribe(data => {
      if (data) {
        this.testParams[idx] = { ...data };
      }
    });
  }

  removeParams(i: number) {
    this.ngPopup.confirm(`Are you sure you want to remove this entry?`, { title: 'Confirm Removal' })
    .subscribe(res => {
      if (res) {
        this.testParams.splice(i, 1);
      }
    })
  }

  private setupPlantsSearch(): void {
    this.form.controls.plantSearch.valueChanges.pipe(
      debounceTime(500),
      tap(() => {
        this.plantsSearchErr = '';
        this.plantsSearching = true;
        this.filteredPlants = [];
      }),
      switchMap(value => this.plantService.searchPlants(value).pipe(
        finalize(() => {
          this.plantsSearching = false;
        }))
      )
    ).subscribe((res: any) => {
      if (res.error) {
        this.plantsSearchErr = res.error;
      } else {
        this.filteredPlants = res.plants;
      }
    });
  }

  addTest() {
    let value  = this.form.value;
    const plants = this.plants.map(p => p._id);
    delete value.plantSearch;
    
    value.plants = plants;
    value.testParams = this.testParams;
    const payload: Test = { ...value };

    this.testsService.create(payload).subscribe(res => {
      this._snackBar.open('Test Added', '', { duration: 2000 });
    });
  }

  updateTest(updatePayload: TestUpdatePayload) {
    this.testsService.edit(this.test._id, updatePayload).subscribe(res => {
      this._snackBar.open('Test Updated', '', { duration: 2000 });
    });
  }
}
