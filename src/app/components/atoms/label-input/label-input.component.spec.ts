import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LabelInputComponent } from './label-input.component';
import { FormsModule, ReactiveFormsModule, FormControl, Validators } from '@angular/forms';
import { By } from '@angular/platform-browser';

describe('LabelInputComponent', () => {
  let component: LabelInputComponent;
  let fixture: ComponentFixture<LabelInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LabelInputComponent ],
      imports: [ ReactiveFormsModule, FormsModule ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LabelInputComponent);
    component = fixture.componentInstance;
    // Inicializar el FormControl antes de detectar cambios
    component.formControl = new FormControl('', Validators.required);
    fixture.detectChanges();
  });

  it('debería crear el componente', () => {
    expect(component).toBeTruthy();
  });

});