import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LabelSelectComponent } from './label-select.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

describe('LabelSelectComponent', () => {
  let component: LabelSelectComponent;
  let fixture: ComponentFixture<LabelSelectComponent>;

  const mockOptions = [
    { value: 'name', display: 'Name' },
    { value: 'date', display: 'Date' },
    { value: 'priority', display: 'Priority' }
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LabelSelectComponent],
      imports: [ReactiveFormsModule, FormsModule]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LabelSelectComponent);
    component = fixture.componentInstance;
    component.label = 'Sort By';
    component.options = mockOptions;
    component.selectedOption = 'name'; // Establece selectedOption antes de detectChanges
    component.name = 'sortBy';
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the correct label', () => {
    const labelElement = fixture.debugElement.query(By.css('label')).nativeElement;
    expect(labelElement.textContent).toBe('Sort By');
  });

  it('should render the correct number of options', () => {
    const selectElement = fixture.debugElement.query(By.css('select')).nativeElement;
    expect(selectElement.options.length).toBe(mockOptions.length + 1);
  });

  it('should set the default selected option', () => {
    const selectElement = fixture.debugElement.query(By.css('select')).nativeElement;
    expect(selectElement.value).toBe('');
  });

  it('should emit selectionChange event when an option is selected', () => {
    jest.spyOn(component.selectionChange, 'emit');
    const selectElement = fixture.debugElement.query(By.css('select')).nativeElement;

    selectElement.value = 'date';
    selectElement.dispatchEvent(new Event('change'));
    fixture.detectChanges();

    expect(component.selectionChange.emit).toHaveBeenCalledWith('date');
    expect(component.value).toBe('date');
  });

  it('should disable the select when disabled input is true', () => {
    component.disabled = true;
    fixture.detectChanges();

    const selectElement = fixture.debugElement.query(By.css('select')).nativeElement;
    expect(selectElement.disabled).toBe(true);
  });

  it('should work with ControlValueAccessor: writeValue', () => {
    component.writeValue('priority');
    fixture.detectChanges();

    const selectElement = fixture.debugElement.query(By.css('select')).nativeElement;
    expect(selectElement.value).toBe('priority');
  });

  it('should register onChange and call it on selection change', () => {
    const onChangeMock = jest.fn();
    component.registerOnChange(onChangeMock);

    const selectElement = fixture.debugElement.query(By.css('select')).nativeElement;
    selectElement.value = 'priority';
    selectElement.dispatchEvent(new Event('change'));
    fixture.detectChanges();

    expect(onChangeMock).toHaveBeenCalledWith('priority');
  });

  it('should register onTouched and call it on blur', () => {
    const onTouchedMock = jest.fn();
    component.registerOnTouched(onTouchedMock);

    const selectElement = fixture.debugElement.query(By.css('select')).nativeElement;
    selectElement.dispatchEvent(new Event('blur'));
    fixture.detectChanges();

    expect(onTouchedMock).toHaveBeenCalled();
  });

  it('should set disabled state correctly', () => {
    component.setDisabledState(true);
    fixture.detectChanges();

    const selectElement = fixture.debugElement.query(By.css('select')).nativeElement;
    expect(selectElement.disabled).toBe(true);

    component.setDisabledState(false);
    fixture.detectChanges();
    expect(selectElement.disabled).toBe(false);
  });
});
