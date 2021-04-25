import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  public titleRegister: string;
  public descriptionRegister: string;
  public textBtnNext: string;
  public textBtnPrevious: string;

  constructor(private router: Router) {
    this.titleRegister =
      'Datos de la persona natural o jurídica que solicita el servicio de trámites virtuales:';
    this.descriptionRegister =
      'La empresa se encuentra registrada en la Camara de Comercio de Medellín para Antioquia. Para acceder al servicio de Trámites Virtuales se utilizarán los datos reportados en el registro. <br> Los campos marcados con asterisco (*) son obligatorios.';
    this.textBtnNext = 'Continuar >';
    this.textBtnPrevious = '< Regresar';
  }

  ngOnInit(): void {}
  saveCompany() {}
  goBack() {
    this.router.navigate(['']);
  }
}
