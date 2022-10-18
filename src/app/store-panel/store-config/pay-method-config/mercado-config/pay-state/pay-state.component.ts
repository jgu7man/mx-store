import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  templateUrl: './pay-state.component.html',
  styleUrls: ['./pay-state.component.scss']
})
export class PayStateComponent implements OnInit {

  constructor (
    public dialog_: MatDialogRef<PayStateComponent>,
    @Inject(MAT_DIALOG_DATA) public state: 'success' | 'pending' | 'failure'
  ) {

   }

  ngOnInit(): void {

  }

}
