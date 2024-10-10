import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-label-input',
  templateUrl: './label-input.component.html',
  styleUrls: ['./label-input.component.scss']
})
export class LabelInputComponent {
  @Input() label: string = '';
  @Input() type: string = 'text';
  @Input() formControl!: FormControl;
  @Input() placeholder: string = '';
  @Input() maxlength!: number;
}
