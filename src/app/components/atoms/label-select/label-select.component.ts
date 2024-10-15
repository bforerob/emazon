import { Component, Input, Output, EventEmitter, forwardRef, OnChanges, SimpleChanges } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-label-select',
  templateUrl: './label-select.component.html',
  styleUrls: ['./label-select.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => LabelSelectComponent),
      multi: true
    }
  ]
})
export class LabelSelectComponent implements ControlValueAccessor, OnChanges {
  @Input() label: string = '';
  @Input() options: Array<{ value: string; display: string }> = [];
  @Input() selectedOption: string = '';
  @Input() name: string = '';
  @Input() disabled: boolean = false;

  @Output() selectionChange: EventEmitter<string> = new EventEmitter<string>();

  value: string = '';

  onChange: (value: string) => void = () => {};
  onTouched: () => void = () => {};

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['selectedOption']) {
      this.value = changes['selectedOption'].currentValue || '';
      this.onChange(this.value); // Notifica el cambio al ControlValueAccessor
    }
  }

  writeValue(value: string): void {
    this.value = value;
    this.onChange(this.value);
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  onSelectionChange(event: Event): void {
    const select = event.target as HTMLSelectElement;
    this.value = select.value;
    this.onChange(this.value);
    this.selectionChange.emit(this.value);
  }
}
