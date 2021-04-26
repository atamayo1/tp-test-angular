import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
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
  public filterText: string;
  public titleInscription: string;
  public descriptionInscription: string;
  public textBtnNext: string;
  public textBtnPrevious: string;
  public closeResult: string;
  public company: Inscription;

  constructor(
    private router: Router,
    private inscriptionService: InscriptionService,
    private modalService: NgbModal
  ) {
    this.titleInscription = 'Inscripción al servicio:';
    this.descriptionInscription = `Ingrese el NIT de la persona natural o jurídica para la que realizará el trámite, sin incluir el digito de verificación. Luego seleccione <strong>Continuar</strong> para completar su solicitud. <br> N.I.T.`;
    this.textBtnNext = 'Continuar';
    this.textBtnPrevious = 'Regresar';
  }

  ngOnInit(): void {}

  consultingAndGoToUpdateRegister(content, nit: string) {
    console.log('filterText', nit);
    console.log('content', content);

    if (nit) {
      this.inscriptionService
        .httpWithOutToken(environment.domain + 'body/', 'get', { id: nit })
        .subscribe(
          (res) => {
            console.log('get company', res);
            if (res.length > 0) {
              this.company = res;
              localStorage.setItem('company', JSON.stringify(this.company));
              this.router.navigate(['register']);
            } else {
              this.activeModal(content);
            }
          },
          (err) => {
            console.error('error', err);
            this.activeModal(content);
          }
        );
    } else {
      this.activeModal(content);
    }
  }

  activeModal(content) {
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
