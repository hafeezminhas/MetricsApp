import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-vendors',
  templateUrl: './vendors.component.html',
  styleUrls: ['./vendors.component.scss']
})
export class VendorsComponent implements OnInit {
  @Input('backgroundGray') public backgroundGray;
  vendors: any[] = [
    { name: 'DELL', image: 'dell.png' },
    { name: 'HP', image: 'hp.png' },
    { name: 'ALIENWARE', image: 'alienware.png' },
    { name: 'ACER', image: 'acer.png' },
    { name: 'ASUS', image: 'asus.png' },
    { name: 'Apple', image: 'apple.png' }
  ];

  constructor() { }

  ngOnInit() {
    this.vendors = this.vendors.map(v => ({ ...v, image: `assets/images/vendors/${v.image}` }));
  }

}
