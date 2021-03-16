import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {PlantService} from '../services/plant.service';
import {PlantsDataSource} from '../datasources/plants.datasource';
import {MatPaginator} from '@angular/material/paginator';
import {tap} from 'rxjs/operators';
import {PlantDialogComponent} from '../dialogs/plant-dialog/plant-dialog.component';

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
  displayedColumns = ['name', 'metric', 'strain', 'type', 'planted', 'mother', 'phase'];

  constructor(private dialog: MatDialog, private plantService: PlantService) { }

  ngOnInit(): void {
    this.dataSource = new PlantsDataSource(this.plantService);
  }

  ngAfterViewInit(): void {
    this.dataSource.loadPlants(this.paginator.pageIndex, this.paginator.pageSize);
    this.paginator.page.pipe(
      tap(() => this.plantService.update(this.paginator.pageIndex, this.paginator.pageSize))
    )
    .subscribe();
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

  update(): void {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.position = { top: '5%' };
    dialogConfig.width = '680px';
    dialogConfig.minHeight = '550px';
    dialogConfig.data = { plant: {}, update: false };

    const updateDialog = this.dialog.open(PlantDialogComponent, dialogConfig);
    updateDialog.afterClosed().subscribe(payload => {

    });
  }
}
