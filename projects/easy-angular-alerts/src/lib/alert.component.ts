import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'eaa-alert',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div *ngIf="visible" [ngStyle]="getStyle()" class="alert">
      <div class="content">
        <div class="message" [ngStyle]="{'font-size': fontSize, 'font-family': fontFamily}">
          {{ message }}
        </div>
        <div *ngIf="type === 'confirmation'" class="confirmation-buttons">
          <button (click)="confirm()">
            <i class="fa fa-check"></i>
          </button>
          <button (click)="cancel()">
            <i class="fa fa-times"></i>
          </button>
        </div>
        <div *ngIf="type === 'closeable'" class="close-button">
          <button (click)="close()">
            <i class="fa fa-times"></i>
          </button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }

    @keyframes fadeOut {
      from { opacity: 1; }
      to { opacity: 0; }
    }

    .alert {
      padding: 1em 1em;
      border-radius: 1em;
      z-index: 1000;
      display: flex;
      align-items: center;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      margin-bottom: 1em;
      width: auto;
      margin-left: 1em;
      margin-right: 1em;
      text-align: center;
      font-weight: 100;
      opacity: 0; /* Initially hidden */
      animation: fadeIn 1s forwards; /* Fade in over 2 seconds */
    }
    .alert.fadeOut {
      animation: fadeOut 1s forwards; /* Fade out over 4 seconds */
    }
    .alert button {
      margin-left: 0.07em;
      border: none;
      padding: 0.5em 0.5em;
      border-radius: 0.25em;
      cursor: pointer;
      background-color: inherit; /* Match button background color to alert background color */
    }
    .alert button i {
      font-size: 1.2em;
    }
    .content {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .message {
      flex: 1;
      word-wrap: break-word;
      padding-left: 0.5em;
      padding-right: 0.5em;
      text-align: center;
      font-weight: 100;
    }
    .confirmation-buttons {
      display: flex;
      gap: 0.07em;
      margin-left: auto;
    }
    .close-button {
      cursor: pointer;
      transition: background-color 0.3s;
      color: black; /* Ensure the X is black */
    }
  `]
})
export class AlertComponent implements OnInit, OnChanges {
  @Input() type: 'simple' | 'error' | 'confirmation' | 'closeable' = 'simple';
  @Input() message: string = '';
  @Input() backgroundColor?: string;
  @Input() textColor?: string;
  @Input() duration: number = 3000;
  @Input() verticalPosition: 'top' | 'center' | 'bottom' = 'bottom';
  @Input() horizontalPosition: 'left' | 'center' | 'right' = 'center';
  @Input() fontSize: string = '.9em';
  @Input() fontFamily: string = 'Newsreader, sans-serif';
  @Input() borderStyle: string = 'none';
  @Input() width: string = 'auto';
  @Input() height: string = 'auto';
  @Input() boxShadow: string = 'none';
  @Output() confirmed = new EventEmitter<void>();
  @Output() cancelled = new EventEmitter<void>();

  visible: boolean = true;

  ngOnInit() {
    if (!this.type || !this.message) {
      console.error('Both type and message are required for the alert.');
      this.visible = false;
      return;
    }

    const allowedTypes = ['simple', 'error', 'confirmation', 'closeable'];
    if (!allowedTypes.includes(this.type)) {
      console.error(`Invalid alert type: ${this.type}. Allowed types are: ${allowedTypes.join(', ')}.`);
      this.visible = false;
      return;
    }

    if (this.type === 'confirmation' && this.duration) {
      console.warn('Duration is not applicable for confirmation alerts. Setting duration to 0.');
      this.duration = 0;
    }

    this.setDefaults();
    if (this.duration && this.type !== 'confirmation') {
      setTimeout(() => this.startFadeOut(), this.duration);
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    this.setDefaults();
  }

  setDefaults() {
    if (this.type === 'confirmation') {
      this.duration = 0; // Always set duration to 0 for confirmation alerts
    }

    if (!this.backgroundColor) {
      if (this.type === 'simple') {
        this.backgroundColor = '#DCFFE0';
        this.borderStyle = this.borderStyle || '1pt solid #61A868';
      } else if (this.type === 'error') {
        this.backgroundColor = '#FFA3A3';
        this.borderStyle = this.borderStyle || '1pt solid #C50E0E';
      } else if (this.type === 'confirmation') {
        this.backgroundColor = '#e6effa';
        this.borderStyle = this.borderStyle || '1pt solid #133C8B';
      } else if (this.type === 'closeable') {
        this.backgroundColor = '#fef8eb';
        this.borderStyle = this.borderStyle || '1pt solid #BDB505';
      }
    }

    if (!this.textColor) {
      this.textColor = 'black';
    }
  }

  getStyle() {
    const styles: { [key: string]: string } = {
      backgroundColor: this.backgroundColor!,
      color: this.textColor!,
      position: 'fixed',
      fontSize: this.fontSize,
      fontFamily: this.fontFamily,
      border: this.borderStyle, // Ensure borderStyle is applied
      width: this.width,
      height: this.height, // Ensure height is applied
      boxShadow: this.boxShadow,
      borderRadius: '1em',
      margin: '0.5em',
      padding: '0.5em 1em'
    };

    switch (this.verticalPosition) {
      case 'top':
        styles['top'] = '10px';
        styles['transform'] = this.horizontalPosition === 'center' ? 'translateX(-50%)' : '';
        break;
      case 'center':
        styles['top'] = '50%';
        styles['transform'] = this.horizontalPosition === 'center' ? 'translate(-50%, -50%)' : 'translateY(-50%)';
        break;
      case 'bottom':
        styles['bottom'] = '10px';
        styles['transform'] = this.horizontalPosition === 'center' ? 'translateX(-50%)' : '';
        break;
    }

    switch (this.horizontalPosition) {
      case 'left':
        styles['left'] = '10px';
        break;
      case 'center':
        styles['left'] = '50%';
        break;
      case 'right':
        styles['right'] = '10px';
        break;
    }

    return styles;
  }

  startFadeOut() {
    const alertElement = document.querySelector('.alert');
    if (alertElement) {
      alertElement.classList.add('fadeOut');
      setTimeout(() => this.fadeOut(), 1000); // Hide the element after the animation completes
    }
  }

  fadeOut() {
    this.visible = false;
  }

  confirm() {
    this.startFadeOut();
    this.confirmed.emit();
  }

  cancel() {
    this.startFadeOut();
    this.cancelled.emit();
  }

  close() {
    this.startFadeOut();
  }
}
