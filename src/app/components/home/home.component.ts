import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  public titleInscription: string;
  public descriptionInscription: string;
  public textBtnNext: string;
  public textBtnPrevious: string;

  constructor(private router: Router) {
    this.titleInscription = 'Inscripción al servicio:';
    this.descriptionInscription = `Ingrese el NIT de la persona natural o jurídica para la que realizará el trámite, sin incluir el digito de verificación. Luego seleccione <strong>Continuar</strong> para completar su solicitud. <br> N.I.T.`;
    this.textBtnNext = 'Continuar >';
    this.textBtnPrevious = '< Regresar';
  }

  ngOnInit(): void {}

  goToRegister() {
    this.router.navigate(['register']);
  }
  goBack() {
    this.router.navigate(['']);
  }
}
