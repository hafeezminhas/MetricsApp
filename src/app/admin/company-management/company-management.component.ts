import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {CompaniesService} from '../services/companies.service';
import {CompaniesDataSource} from '../datasources/CompaniesDataSource';
import {StateLicenceType} from '../../data/enums/state-license.enum';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import {tap} from 'rxjs/operators';
import {SubscriptionType} from '../../data/enums/subscription-type.enum';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {CompanyDialogComponent} from '../dialogs/company-dialog/company-dialog.component';
import {Company} from '../../data/models/company';

@Component({
  selector: 'app-company-management',
  templateUrl: './company-management.component.html',
  styleUrls: ['./company-management.component.scss']
})
export class CompanyManagementComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;

  pageConfig = {
    page: 1,
    limit: 5,
    search: null
  };
  pageSizes = [5, 10, 20];

  dataSource: CompaniesDataSource;
  displayedColumns = ['name', 'email', 'phone', 'address', 'license', 'subscription', 'users', 'actions'];

  constructor(private dialog: MatDialog, private companyService: CompaniesService) {}

  ngOnInit(): void {
    this.companyService.load();
    this.dataSource = new CompaniesDataSource(this.companyService);
  }

  ngAfterViewInit(): void {
    this.dataSource.init();
  }

  pageChange($event: PageEvent) {
    this.companyService.changePage($event);
  }

  getLicense(val: number): string {
    return StateLicenceType[val];
  }

  getSubscription(val: number): string {
    return SubscriptionType[val];
  }

  addNew(): void {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.position = { top: '5%' };
    dialogConfig.width = '680px';
    dialogConfig.minHeight = '550px';
    dialogConfig.data = { company: {}, update: false };

    const createDialog = this.dialog.open(CompanyDialogComponent, dialogConfig);
    createDialog.afterClosed().subscribe(payload => {
      // TODO: Implement API integration for Create Company
      console.log(payload);
      if (payload) {
        this.companyService.addCompany(payload).subscribe(res => {
          console.log('res', res);
        }, err => {
          console.log('err', err);
        });
      }
    });
  }

  update(comp: Company): void {
    console.log(comp);
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.position = { top: '5%' };
    dialogConfig.width = '680px';
    dialogConfig.minHeight = '550px';
    dialogConfig.data = { company: comp, update: true };

    const updateDialog = this.dialog.open(CompanyDialogComponent, dialogConfig);
    updateDialog.afterClosed().subscribe(payload => {
      // TODO: Implement API integration for Update Company
      this.companyService.updateCompany(comp._id, payload).subscribe(res => {
        console.log('update', res);
      }, err => {
        console.log('err', err);
      });
    });
  }
}
