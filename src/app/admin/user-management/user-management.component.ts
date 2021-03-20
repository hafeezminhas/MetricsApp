import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { UsersService } from '../services/users.service';
import { UsersDataSource } from '../datasources/UsersDataSource';
import { tap } from 'rxjs/operators';
import { UserDialogComponent } from '../dialogs/user-dialog/user-dialog.component';
import { User } from 'src/app/data/models/user';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.scss']
})
export class UserManagementComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;

  pageConfig = {
    page: 1,
    limit: 5,
    search: null
  };
  pageSizes = [5, 10, 20];

  dataSource: UsersDataSource;
  displayedColumns = ['firstName', 'lastName', 'email', 'phone', 'role'];

  constructor(private dialog: MatDialog, private userService: UsersService) { }

  ngOnInit(): void {
    this.dataSource = new UsersDataSource(this.userService);
  }

  ngAfterViewInit(): void {
    this.dataSource.loadUsers(this.paginator.pageIndex, this.paginator.pageSize);
    this.paginator.page.pipe(
      tap(() => this.userService.update(this.paginator.pageIndex, this.paginator.pageSize))
    )
      .subscribe();
  }

  addNew() {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.position = { top: '5%' };
    dialogConfig.width = '680px';
    dialogConfig.minHeight = '550px';
    dialogConfig.data = { company: {}, update: false };

    const createDialog = this.dialog.open(UserDialogComponent, dialogConfig);
    createDialog.afterClosed().subscribe(payload => {
      // TODO: Implement API integration for Create User 
      this.userService.addUser(payload).subscribe(res => {
        console.log('res', res);
      }, err => {
        console.log('err', err);
      });
    });
  }

  update(user: User) {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.position = { top: '5%' };
    dialogConfig.width = '680px';
    dialogConfig.minHeight = '550px';
    dialogConfig.data = { user, update: true };

    const createDialog = this.dialog.open(UserDialogComponent, dialogConfig);
    createDialog.afterClosed().subscribe(payload => {
      // TODO: Implement API integration for Create User 
      this.userService.edit(user._id, payload).subscribe(res => {
        console.log('res', res);
      }, err => {
        console.log('err', err);
      });
    });
  }
}
