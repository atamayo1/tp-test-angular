import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Inscription } from 'src/app/interfaces/inscription.interface';

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
  public company: Inscription;

  constructor(private router: Router) {
    this.titleRegister =
      'Datos de la persona natural o jurídica que solicita el servicio de trámites virtuales:';
    this.descriptionRegister =
      'La empresa se encuentra registrada en la Camara de Comercio de Medellín para Antioquia. Para acceder al servicio de Trámites Virtuales se utilizarán los datos reportados en el registro. <br> Los campos marcados con asterisco (*) son obligatorios.';
    this.textBtnNext = 'Continuar >';
    this.textBtnPrevious = '< Regresar';

    console.log('receive params', this.router.getCurrentNavigation().extras.queryParams);
    this.company = this.router.getCurrentNavigation().extras.queryParams.data;
  }

  ngOnInit(): void {}
  updateCompany() {}
  goBack() {
    this.router.navigate(['']);
  }
}
