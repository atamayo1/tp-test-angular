import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { InscriptionService } from 'src/app/services/inscription.service';

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
  public response: string;
  public showError: boolean;
  public showedError: string;
  public toastService: any;
  public companies: any;
  public closeResult: string;

  constructor(private router: Router, private inscriptionService: InscriptionService, private modalService: NgbModal) {
    this.titleInscription = 'Inscripción al servicio:';
    this.descriptionInscription = `Ingrese el NIT de la persona natural o jurídica para la que realizará el trámite, sin incluir el digito de verificación. Luego seleccione <strong>Continuar</strong> para completar su solicitud. <br> N.I.T.`;
    this.textBtnNext = 'Continuar >';
    this.textBtnPrevious = '< Regresar';
  }

  ngOnInit(): void {}

  goToRegister(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
    this.router.navigate(['register']);
  }

  getCompaniesById(idNumber: number) {
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
      return  `with: ${reason}`;
    }
  }
}
