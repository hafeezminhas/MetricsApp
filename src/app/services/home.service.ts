import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(@Inject(DOCUMENT) private document: Document) { }

  public addFix() {
    this.document.documentElement.classList.add('landing');
    this.document.body.classList.add('landing');
  }
  public removeFix() {
    this.document.documentElement.classList.remove('landing');
    this.document.body.classList.remove('landing');
  }

}
