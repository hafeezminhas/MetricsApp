import { Component, OnInit } from '@angular/core';
import {UsersService} from '../../services/users.service';

@Component({
  selector: 'app-users-base',
  templateUrl: './users-base.component.html',
  styleUrls: ['./users-base.component.scss']
})
export class UsersBaseComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {}
}
