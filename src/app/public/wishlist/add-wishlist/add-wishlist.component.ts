import { Component, OnInit, Input } from '@angular/core';
import { WishlistService } from '../wishlist.service';

@Component({
  selector: 'app-add-wishlist',
  templateUrl: './add-wishlist.component.html',
  styleUrls: ['./add-wishlist.component.scss']
})
export class AddWishlistComponent implements OnInit {

  @Input() product: string
  constructor (
    public wishlist: WishlistService
  ) { }

  ngOnInit(): void {
    console.log(this.product);
    this.wishlist.getWishlist()
  }

}
