import { Component, HostBinding, HostListener, Inject, OnInit } from '@angular/core';
import { DOCUMENT } from '@angular/common';

import { WINDOW_PROVIDERS, WINDOW } from '../../../shared/helpers/window.helper';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-header',
  templateUrl: './home-header.component.html',
  styleUrls: ['./home-header.component.scss']
})
export class HomeHeaderComponent implements OnInit {
  isFixed;

  constructor(
    private router: Router,
    @Inject(DOCUMENT) private document: Document,
    @Inject(WINDOW) private window: Window
  ) { }

  ngOnInit() {}

  @HostListener("window:scroll", [])
  onWindowScroll() {
    const offset = this.window.pageYOffset || this.document.documentElement.scrollTop || this.document.body.scrollTop || 0;
    this.isFixed = (offset > 10);
  }

  @HostBinding("class.menu-opened") menuOpened = false;

  toggleMenu() {
    this.menuOpened = !this.menuOpened
  }

  signIn() {
    this.router.navigateByUrl('/login');
  }
}
