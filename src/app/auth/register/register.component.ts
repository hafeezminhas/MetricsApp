import { AuthActions } from './../store/auth.actions';
import { AppState } from './../../store/state';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AuthSelectors } from '../store';
import { NgPopupsService } from 'ng-popups';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  form: FormGroup;
  submitted: boolean;

  loading = false;
  error$;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private store: Store<AppState>,
    private dialogService: NgPopupsService) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      address1: ['', Validators.required],
      address2: '',
      postcode: ['', Validators.required],
      password: ['', Validators.required],
      confirm: ['', Validators.required]
    });

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
    if (this.form.dirty) {
      this.dialogService.confirm(`You will lose all the information in the form. Are you sure you want to cancel?`, { title: 'Confirm Cancel' }).subscribe(opt => {
        if (opt) {
          this.router.navigateByUrl('/login');
        }
      });
    } else {
      this.router.navigateByUrl('/login');
    }
  }
}
