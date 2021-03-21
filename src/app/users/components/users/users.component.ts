import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {NgPopupsService} from 'ng-popups';
import {UsersService} from '../../services/users.service';
import {UsersDataSource} from '../../datasources/users.datasource';
import {UserDialogComponent} from '../../dialogs/user-dialog/user-dialog.component';
import {User} from '../../../data/models/user';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  dataSource: UsersDataSource;

  displayedColumns = ['firstName', 'lastName', 'email', 'phone', 'address', 'role', 'active', 'locked', 'actions'];

  constructor(private dialog: MatDialog, private ngPopup: NgPopupsService, private usersService: UsersService) { }

  ngOnInit(): void {
    this.usersService.load();
    this.dataSource = new UsersDataSource(this.usersService);
  }

  ngAfterViewInit(): void {
    this.dataSource.init();
  }

  addNew(): void {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.position = { top: '5%' };
    dialogConfig.width = '680px';
    dialogConfig.minHeight = '550px';
    dialogConfig.data = { user: { role: 'USER' }, update: false };

    const addDialog = this.dialog.open(UserDialogComponent, dialogConfig);
    addDialog.afterClosed().subscribe(payload => {
      if (payload) {
        this.usersService.create(payload).subscribe();
      }
    });
  }

  update(user: User): void {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.position = { top: '5%' };
    dialogConfig.width = '680px';
    dialogConfig.minHeight = '550px';
    dialogConfig.data = { user, update: true };

    const updateDialog = this.dialog.open(UserDialogComponent, dialogConfig);
    updateDialog.afterClosed().subscribe(payload => {
      if (payload) {
        this.usersService.update(user._id, payload).subscribe();
      }
    });
  }

  remove(user: User): void {
    this.ngPopup.confirm(`Are you sure you want to remove the selected user?`, { title: 'Confirm Removal' }).subscribe(res => {
      if(res) {
        this.usersService.remove(user._id);
      }
    });
  }
}
