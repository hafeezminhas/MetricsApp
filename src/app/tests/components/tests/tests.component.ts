import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import {NgPopupsService} from 'ng-popups';
import {TestsService} from '../../services/tests.service';
import {TestsDatasource} from '../../datasources/tests.datasource';
import {Test} from '../../../data/models/test';
import {Router} from '@angular/router';

@Component({
  selector: 'app-tests',
  templateUrl: './tests.component.html',
  styleUrls: ['./tests.component.scss']
})
export class TestsComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  dataSource: TestsDatasource;

  pageConfig = { page: 1, limit: 5, search: null };
  pageSizes = [5, 10, 20];
  displayedColumns = ['name', 'metric', 'strain', 'type', 'planted', 'mother', 'phase', 'histories', 'actions'];

  constructor(private router: Router,
              private ngPopup: NgPopupsService,
              private testsService: TestsService) { }

  ngOnInit(): void {
    this.testsService.load();
    this.dataSource = new TestsDatasource(this.testsService);
  }

  ngAfterViewInit(): void {
    this.dataSource.init();
  }

  pageChange($event: PageEvent): void {
    this.testsService.changePage($event);
  }

  remove(test: Test): void {
    this.ngPopup.confirm(`Are you sure you want to remove the selected test and its associated data?`,
      { title: 'Confirm Removal' })
      .subscribe(res => {
      if (res) {
        this.testsService.remove(test._id).subscribe();
      }
    });
  }

  addNew(): void {
    this.router.navigateByUrl('/tests/create');
  }

}
