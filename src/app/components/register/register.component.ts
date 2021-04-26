import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Inscription } from 'src/app/interfaces/inscription.interface';
import { InscriptionService } from 'src/app/services/inscription.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  public titleRegister: string;
  public descriptionRegister: string;
  public company: Inscription;
  public inscriptionForm: FormGroup;
  public closeResult: string;

  constructor(
    private router: Router,
    private inscriptionService: InscriptionService,
    private modalService: NgbModal
  ) {
    this.titleRegister =
      'Datos de la persona natural o jurídica que solicita el servicio de trámites virtuales:';
    this.descriptionRegister =
      'La empresa se encuentra registrada en la Camara de Comercio de Medellín para Antioquia. Para acceder al servicio de Trámites Virtuales se utilizarán los datos reportados en el registro. <br> Los campos marcados con asterisco (*) son obligatorios.';
    this.company = this.router.getCurrentNavigation().extras.queryParams.data[0];
    console.log('receive params', this.company);
    this.validForm();
  }

  validForm() {
    this.inscriptionForm = new FormGroup({
      idType: new FormControl(null, [Validators.required]),
      id: new FormControl(null, [Validators.required]),
      companyName: new FormControl('', [Validators.required]),
      firstName: new FormControl('', [Validators.required]),
      secondName: new FormControl('', [Validators.nullValidator]),
      firstLastName: new FormControl('', Validators.required),
      secondLastName: new FormControl('', [Validators.nullValidator]),
      email: new FormControl('', [Validators.required]),
      /*via: new FormControl('', [Validators.required]),
      numberOne: new FormControl(null, [Validators.nullValidator]),
      letterOne: new FormControl('', [Validators.nullValidator]),
      numberTwo: new FormControl(null, [Validators.nullValidator]),
      letterTwo: new FormControl('', [Validators.nullValidator]),
      complementNumber: new FormControl(null, [Validators.nullValidator]),*/
      address: new FormControl('', [Validators.nullValidator]),
      municipality: new FormControl('', [Validators.required]),
      phone: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit(): void {
    console.log('receive params init', this.company);
    this.inscriptionForm.setValue({
      idType: this.company.idType,
      id: this.company.id,
      companyName: this.company.companyName,
      firstName: this.company.firstName,
      secondName: this.company.secondName,
      firstLastName: this.company.firstLastName,
      secondLastName: this.company.secondLastName,
      email: this.company.email,
      address: this.company.address,
      municipality: this.company.municipalityOfTheAddress,
      phone: this.company.cellPhone,
    });
    console.log('inscriptionForm', this.inscriptionForm);
  }

  updateCompany(content) {
    const formData = new FormData();
    console.log('SEND FORM', this.inscriptionForm.getRawValue());
    for (const i in this.inscriptionForm.value) {
      formData.append(i, this.inscriptionForm.getRawValue()[i]);
    }
    if (!this.inscriptionForm.invalid) {
      this.inscriptionService
      .httpWithOutToken(
        environment.domain + 'body/' + `${this.company.id}`,
        'patch',
        undefined,
        formData
      )
      .subscribe(
        (res) => {
          if (!environment.production) console.log('SUCCESS_UPDATE', res);
          this.activeModal(content);
        },
        (err) => {
          if (!environment.production) console.log('FAILED_UPDATE', err);
        }
      );
    }
  }

  goBack() {
    this.router.navigate(['']);
  }
  activeModal(content) {
    this.modalService
      .open(content, { ariaLabelledBy: 'modal-basic-title' })
      .result.then(
        (result) => {
          this.closeResult = `Closed with: ${result}`;
          this.router.navigate(['']);
        },
        (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
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
