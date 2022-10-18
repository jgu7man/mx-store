import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { ContactoForm } from './contacto.interface';
import { MatCheckboxChange } from '@angular/material/checkbox';

@Component({
  selector: 'gdev-form-template',
  templateUrl: './form-template.component.html',
  styleUrls: ['./form-template.component.scss']
})
export class FormTemplateComponent implements OnInit {

  contacto: ContactoForm
  @Input() disableNombre: boolean
  @Input() disableEmail: boolean
  @Input() disableCelular: boolean
  @Input() disableMensaje: boolean
  @Input() linkPDP: string
  @Output() submit = new EventEmitter<ContactoForm>();

  constructor () {
    this.contacto = {
      nombre: '',
      email: '',
      telefono: '',
      mensaje: '',
      privacity: false
    }
   }

  ngOnInit(): void {
  }

  onPrivacityChange(change: MatCheckboxChange) {
    this.contacto.privacity = change.checked
  }

  validate() {
    const keys = Object.keys( this.contacto )
    var uncomplete
    keys.forEach(key => {
      if ( key == undefined || key == '' ) {
        
      }
    });
  }

  onSubmit() {
    this.submit.emit( this.contacto )
    this.contacto = {
      nombre: '',
      email: '',
      telefono: '',
      mensaje: '',
      privacity: false
    }
  }

}
