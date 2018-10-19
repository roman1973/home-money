import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'wfm-loader',
  template: `<div class="loader-animator"></div>`,
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
