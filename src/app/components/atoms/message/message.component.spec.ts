import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { MessageComponent } from './message.component';

describe('MessageComponent', () => {
  let component: MessageComponent;
  let fixture: ComponentFixture<MessageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MessageComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the correct message text', () => {
    component.text = 'This is a success message';
    fixture.detectChanges();
    const messageElement = fixture.debugElement.query(By.css('.message')).nativeElement;
    expect(messageElement.textContent).toContain('This is a success message');
  });

  it('should apply success class when type is "success"', () => {
    component.type = 'success';
    fixture.detectChanges();
    const messageElement = fixture.debugElement.query(By.css('.message')).nativeElement;
    expect(messageElement.classList).toContain('success');
  });

  it('should apply error class when type is "error"', () => {
    component.type = 'error';
    fixture.detectChanges();
    const messageElement = fixture.debugElement.query(By.css('.message')).nativeElement;
    expect(messageElement.classList).toContain('error');
  });

  it('should default to error type when no type is provided', () => {
    fixture.detectChanges();
    const messageElement = fixture.debugElement.query(By.css('.message')).nativeElement;
    expect(messageElement.classList).toContain('error');
  });
});
