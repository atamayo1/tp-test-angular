import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HomeComponent } from './home.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule],
      declarations: [HomeComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('testing title inscription', () => {
    expect(component.titleInscription).toEqual('Inscripción al servicio:');
  });

  it('testing description inscription', () => {
    expect(component.descriptionInscription).toEqual(`Ingrese el NIT de la persona natural o jurídica para la que realizará el trámite, sin incluir el digito de verificación. Luego seleccione <strong>Continuar</strong> para completar su solicitud. <br> N.I.T.`);
  });
});
