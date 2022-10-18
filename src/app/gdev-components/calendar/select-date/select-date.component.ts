import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
// import timeGridPlugin from '@fullcalendar/timegrid';
// import interactionPlugin from '@fullcalendar/interaction';
// import { FullCalendarService } from '../calendar.service';

@Component({
  selector: 'gdev-calendar-select-date',
  templateUrl: './select-date.component.html',
  styleUrls: ['./select-date.component.css']
})
export class CalendarSelectDateComponent implements OnInit {
  /**
   * Calendario con las opciones por default para seleccionar fechas
   * Retorna las fechas mediante el método "getFechaClick()"
   */

  // calendarPlugins = [timeGridPlugin, interactionPlugin]

  public hoy: Date = new Date()
  public onClickFecha: EventInt[] = []
  public eventos: EventInt[] = []
  @Input() duracionEventoDefault: string
  @Input() tituloEventoClickado: string = ''
  @Input() listaEventos: EventInt[] = []
  @Input() horarioLaboral: HorarioLaboral[] = []
  @Input() diasDeshabilitados: number[] = []
  @Input() minTime: string = ''
  @Input() maxTime: string = ''


  @Output() getFechaClick: EventEmitter<Date> = new EventEmitter()


  constructor (
    // private _calendar: FullCalendarService
  ) {
    this.duracionEventoDefault = '00:30'
   }

  ngOnInit() {
    if (this.listaEventos) this.eventos = this.listaEventos;
    this.suscriptions()
  }

  suscriptions() {
    // this._calendar.limpiarSeleccion$.subscribe(req => {
    //   this.clearSelection()
    // })
  }

  clearSelection() {
    this.onClickFecha = []
    return this.listaEventos ?
        this.eventos = this.listaEventos : this.eventos = this.onClickFecha
  }

  async clickToSelectDate(event: any) {

      this.onClickFecha = []
      this.onClickFecha.push({
        title: this.tituloEventoClickado,
        start: event.date
      })

      if (this.listaEventos) {
        this.eventos = [...this.listaEventos, ...this.onClickFecha]
      } else {
        this.eventos = this.onClickFecha
      }

    return this.getFechaClick.emit(event.date)
  }

}

export interface HorarioLaboral {
  /**
   * Muestra un sombreado del horario laboral
   * @usage
   *
   * Asigna horario agrupado por bloques.
   * Ej. En un horario corrido de 8am a 2pm de lunes a viernes
   * el objeto se configura: {
   *   de: '08:00',
   *   a: '14:00',
   *   dias: [1,2,3,4,5]
   * }
   */

  startTime: string,
  endTime: string,
  daysOfWeek: number[]
}


export interface EventInt {
  /**
   * Se asigna necesariamente el título
   * y la DATE de inicio
   * la DATE de final es opcional
   */
  title: string,
  start: Date,
  end?: Date
}
