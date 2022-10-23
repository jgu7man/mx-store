import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl, Validators, FormGroup, FormBuilder, FormGroupDirective, NgForm } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { ClientesService } from '../../../../panel/clientes/clientes.service';
import { ClienteLoginService } from '../cliente-login.service';
import { ClienteModel } from '../../../../panel/clientes/cliente.model';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss']
})
export class RegisterFormComponent implements OnInit {

  cliente: ClienteModel
  // confirmaContra
  matcher = new MyErrorStateMatcher();
  builder: FormBuilder = new FormBuilder()
  registerForm = this.builder.group( {
    nombre: [ '', [ Validators.required ] ],
    email: [ '', [ Validators.required, Validators.email ] ],
    celular: [ '', [ Validators.required ] ],
    contra: [ '', [ Validators.required ] ],
    confirmaContra: [ '' ]
  }, { validator: this.checkPasswords } )

  @Output() getRegistered: EventEmitter<any> = new EventEmitter()

  constructor (
    private _authClientes: ClienteLoginService
  ) {
    this.cliente = new ClienteModel('','','')
   }

  ngOnInit(): void {
  }

  checkPasswords( group: FormGroup ) {
    let contra = group.get( 'contra' )?.value;
    let confirmaContra = group.get( 'confirmaContra' )?.value;
    return contra === confirmaContra ? null : { notSame: true }
  }



  getErrorMessage() {
    if ( this.registerForm.hasError( 'required' ) ) {
      return 'Este dato es necesario';
    } else if ( this.registerForm.hasError('notSame') ) {
      return 'Las contraseñas no coinciden'
    }

    return this.registerForm.hasError( 'email' ) ? 'No es un email válido' : '';
  }

  onSubmit() {
    delete this.registerForm.value.confirmaContra
    this._authClientes.saveCliente( this.registerForm.value ).then( () => {
      this.getRegistered.emit()
    })
  }

}


export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState( control: FormControl | null, form: FormGroupDirective | NgForm | null ): boolean {
    const invalidCtrl = !!( control && control.invalid && control.parent?.dirty );
    const invalidParent = !!( control && control.parent && control.parent.invalid && control.parent.dirty );

    return ( invalidCtrl || invalidParent );
  }
}
