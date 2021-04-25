import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Inscription } from 'src/app/interfaces/inscription.interface';
import { InscriptionService } from 'src/app/services/inscription.service';
import { environment } from 'src/environments/environment';

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
  public closeResult: string;
  public companies: Inscription;

  constructor(
    private router: Router,
    private inscriptionService: InscriptionService,
    private modalService: NgbModal
  ) {
    this.titleInscription = 'Inscripción al servicio:';
    this.descriptionInscription = `Ingrese el NIT de la persona natural o jurídica para la que realizará el trámite, sin incluir el digito de verificación. Luego seleccione <strong>Continuar</strong> para completar su solicitud. <br> N.I.T.`;
    this.textBtnNext = 'Continuar >';
    this.textBtnPrevious = '< Regresar';
  }

  ngOnInit(): void {}

  goToRegister(content) {
    this.modalService
      .open(content, { ariaLabelledBy: 'modal-basic-title' })
      .result.then(
        (result) => {
          this.closeResult = `Closed with: ${result}`;
        },
        (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
    this.router.navigate(['register']);
  }

  getCompanyById(id: string) {
    this.inscriptionService
      .httpWithOutToken(environment.domain + '/body/', 'get', { id: id })
      .subscribe(
        (res) => {
          console.log('get company', res);
          if (res) this.companies = res['results'];
        },
        (err) => {
          console.error('error', err);
        }
      );
  }

  goBack() {
    this.router.navigate(['']);
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
}
