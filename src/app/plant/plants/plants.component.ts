import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { PlantService } from '../services/plant.service';
import { PlantsDataSource } from '../datasources/plants.datasource';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { tap } from 'rxjs/operators';
import { PlantDialogComponent } from '../dialogs/plant-dialog/plant-dialog.component';
import { Plant } from '../../data/models/plant';
import { NgPopupsService } from 'ng-popups';

@Component({
  selector: 'app-plants',
  templateUrl: './plants.component.html',
  styleUrls: ['./plants.component.scss']
})
export class PlantsComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  dataSource: PlantsDataSource;

  pageConfig = { page: 1, limit: 5, search: null };
  pageSizes = [5, 10, 20];
  displayedColumns = ['name', 'metric', 'strain', 'type', 'planted', 'mother', 'phase', 'histories', 'actions'];

  constructor(private dialog: MatDialog, private ngPopup: NgPopupsService, private plantService: PlantService) { }

  ngOnInit(): void {
    this.plantService.load();
    this.dataSource = new PlantsDataSource(this.plantService);
  }

  ngAfterViewInit(): void {
    this.dataSource.init();
  }

  pageChange($event: PageEvent): void {
    this.plantService.changePage($event);
  }

  addNew(): void {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.position = { top: '5%' };
    dialogConfig.width = '680px';
    dialogConfig.minHeight = '550px';
    dialogConfig.data = { plant: {}, update: false };

    const addDialog = this.dialog.open(PlantDialogComponent, dialogConfig);
    addDialog.afterClosed().subscribe(payload => {
      if (payload) {
        this.plantService.create(payload).subscribe();
      }
    });
  }

  update(plant: Plant): void {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.position = { top: '5%' };
    dialogConfig.width = '680px';
    dialogConfig.minHeight = '550px';
    dialogConfig.data = { plant, update: true };

    const updateDialog = this.dialog.open(PlantDialogComponent, dialogConfig);
    updateDialog.afterClosed().subscribe(payload => {
      if (payload) {
        this.plantService.edit(plant._id, payload).subscribe();
      }
    });
  }

  remove(plant: Plant): void {
    this.ngPopup.confirm(`Are you sure you want to remove the selected plant?`, { title: 'Confirm Removal' }).subscribe(res => {
      if (res) {
        this.plantService.remove(plant._id).subscribe();
      }
    });
  }
}
