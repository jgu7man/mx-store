import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'gdev-products-config',
  templateUrl: './products-config.component.html',
  styleUrls: ['./products-config.component.scss']
})
export class ProductsConfigComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  needColumns: string[] = [
    'referencia',
    'precio',
    'descripcion'
  ]

}
