import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarSelectDateComponent } from './select-date/select-date.component';
// import { FullCalendarModule } from '@fullcalendar/angular';



@NgModule({
  declarations: [
    CalendarSelectDateComponent,

  ],
  imports: [
    CommonModule,
    // FullCalendarModule
  ],
  exports: [
    CalendarSelectDateComponent
  ]
})
export class GdevCalendarServiceModule { }
