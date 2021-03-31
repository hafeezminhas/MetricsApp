import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TestsComponent } from './components/tests/tests.component';
import { TestComponent } from './components/test/test.component';
import { TestFormComponent } from './components/test-form/test-form.component';
import {Route, RouterModule} from '@angular/router';
import { TestsBaseComponent } from './components/tests-base/tests-base.component';
import {MaterialModule} from '../material/material.module';
import { TestParamsComponent } from './dialogs/test-params/test-params.component';
import {TestResolver} from './services/test.resolver';

const routes: Route[] = [
  {
    path: '',
    component: TestsBaseComponent,
    children: [
      { path: '', component: TestsComponent },
      {
        path: ':id/preview',
        component: TestComponent,
        resolve: { test: TestResolver }
      },
      {
        path: ':id/update',
        data: { update: true },
        component: TestFormComponent,
        resolve: { test: TestResolver }
      },
      {
        path: 'create',
        data: { update: false },
        component: TestFormComponent
      },
    ],
  }
];

@NgModule({
  declarations: [
    TestsBaseComponent,
    TestsComponent,
    TestComponent,
    TestFormComponent,
    TestParamsComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MaterialModule
  ],
  entryComponents: [TestParamsComponent]
})
export class TestsModule { }
