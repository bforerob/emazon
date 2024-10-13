import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent {
  @Input() type: 'success' | 'error' = 'error';
  @Input() text: string = 'An error has ocurred o yo que se';
}
