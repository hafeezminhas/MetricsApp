import { Observable } from 'rxjs';
import { AuthService } from './../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';

import { AppState } from './../../store/state';
import { AuthActions } from '../store/auth.actions';
import { AuthSelectors } from '../store/auth.selectors';
import { Router } from '@angular/router';
import { tap, map } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  submitted: boolean;

  loading$;
  error$;

  constructor(private router: Router, private store: Store<AppState>, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      email: ['xadmin@milkmen.com', [Validators.required, Validators.email]],
      password: ['TestPass', Validators.required]
    });

    this.loading$ = this.store.select(AuthSelectors.isLoading);
    this.error$ = this.store.select(AuthSelectors.selectAuthError);
  }

  get f(): any {
    return this.form.controls;
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }

    this.store.dispatch(AuthActions.LoginRequestAction(this.form.value));
  }

  cancel() {
    this.router.navigateByUrl('/');
  }
}
