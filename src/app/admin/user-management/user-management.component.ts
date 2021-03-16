import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { UsersService } from '../services/users.service';
import { UsersDataSource } from '../datasources/UsersDataSource';
import { tap } from 'rxjs/operators';
import { User } from 'src/app/auth/models/user';

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
    
  }

  update(user: User) {

  }
}
