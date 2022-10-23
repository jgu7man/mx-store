import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'mx-category-attributes',
  templateUrl: './category-attributes.component.html',
  styleUrls: ['./category-attributes.component.css']
})
export class MxCategoryAttributesComponent implements OnInit {


  categoryId: string
  @Output() closeForm: EventEmitter<any> = new EventEmitter()
  constructor(
    private router: Router,
    public location: Location,
    private _url: ActivatedRoute
  ) {
    this.categoryId = this._url.snapshot.params['id']
   }

  ngOnInit() {

  }

}
