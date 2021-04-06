import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Test} from '../../../data/models/test';
import {TestsService} from '../../services/tests.service';
import {switchMap} from 'rxjs/operators';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit {

  testItem: Test;

  constructor(private route: ActivatedRoute, private testsService: TestsService) { }

  ngOnInit(): void {
    this.route.params.pipe(
      switchMap(params => this.testsService.getTest(params.id))
    ).subscribe(test => {
      this.testItem = test;
    });
  }

  getPlantType(type: number): string {
    return type === 1 ? 'Seed' : 'Clone';
  }

  removePlant(plant): void {}

  removeParams(param): void {}

  updateParams(param, idx: number): void {}
}
