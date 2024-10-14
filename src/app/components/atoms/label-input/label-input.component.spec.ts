import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LabelInputComponent } from './label-input.component';
import { By } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

describe('LabelInputComponent', () => {
  let component: LabelInputComponent;
  let fixture: ComponentFixture<LabelInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LabelInputComponent],
      imports: [FormsModule, ReactiveFormsModule]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LabelInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should display the correct label text', () => {
    component.label = 'Username';
    fixture.detectChanges();
    const labelElement = fixture.debugElement.query(By.css('label')).nativeElement;
    expect(labelElement.textContent).toBe('Username');
  });

  it('should bind the value correctly to the input field', () => {
    component.writeValue('Test Value');
    fixture.detectChanges();
    const inputElement = fixture.debugElement.query(By.css('input')).nativeElement;
    expect(inputElement.value).toBe('Test Value');
  });

  it('should emit the correct value when input is changed', () => {
    const onChangeSpy = jest.spyOn(component, 'onChange');
    const inputElement = fixture.debugElement.query(By.css('input')).nativeElement;
    
    inputElement.value = 'New Value';
    inputElement.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    expect(onChangeSpy).toHaveBeenCalledWith('New Value');
    expect(component.value).toBe('New Value');
  });

  it('should call onTouched when the input loses focus (blur event)', () => {
    const onTouchedSpy = jest.spyOn(component, 'onTouched');
    const inputElement = fixture.debugElement.query(By.css('input')).nativeElement;

    inputElement.dispatchEvent(new Event('blur'));
    fixture.detectChanges();

    expect(onTouchedSpy).toHaveBeenCalled();
  });

  
  it('should disable the input when setDisabledState is called with true', () => {
    component.setDisabledState(true);
    fixture.detectChanges();
    const inputElement = fixture.debugElement.query(By.css('input')).nativeElement;
    expect(inputElement.disabled).toBe(true);
  });
});
