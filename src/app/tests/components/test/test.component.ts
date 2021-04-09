import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Test } from '../../../data/models/test';
import { TestsService } from '../../services/tests.service';
import { switchMap } from 'rxjs/operators';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { TestParamsComponent } from '../../dialogs/test-params/test-params.component';
import { NgPopupsService } from 'ng-popups';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit {

  testItem: Test;

  constructor(
    private route: ActivatedRoute,
    private testsService: TestsService,
    private dialog: MatDialog,
    private ngPopup: NgPopupsService,
  ) { }

  ngOnInit(): void {
    this.route.params.pipe(
      switchMap(params => this.testsService.getTest(params.id))
    ).subscribe(test => {
      this.testItem = test;
    });
  }

  getPlantType(type: number): string {
    return type === 1 ? 'Seed' : 'Clone';
  }

  removePlant(plant, idx: number): void {
    this.ngPopup.confirm(`Are you sure you want to remove '${plant.name}'?`, { title: 'Confirm Removal' })
      .subscribe(res => {
        if (res) {
          this.testsService.removePlant(this.testItem._id, plant._id).subscribe(res => {
            this.testItem.plants.splice(idx, 1);
          });
        }
      });
  }

  removeParams(param, idx: number): void {
    this.ngPopup.confirm(`Are you sure you want to remove this entry?`, { title: 'Confirm Removal' })
      .subscribe(res => {
        if (res) {
          this.testsService.removeParam(this.testItem._id, param._id).subscribe(res => {
            this.testItem.testParams.splice(idx, 1);
          });
        }
      });
  }

  updateParams(params, idx: number): void {
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
        this.testsService.updateParams(params._id, data).subscribe(res => {
          this.testItem.testParams[idx] = data;
        });
      }
    });
  }
}
