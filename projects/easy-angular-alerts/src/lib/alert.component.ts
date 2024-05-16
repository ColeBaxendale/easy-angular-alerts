import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'eaa-alert',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div [ngStyle]="getStyle()"
         class="alert"
         *ngIf="visible">
      <div *ngIf="icon" class="icon">{{ icon }}</div>
      <div class="message" [ngStyle]="{'font-size': fontSize, 'font-family': fontFamily}">
        {{ message }}
      </div>
      <div *ngIf="type === 'confirmation'">
        <button (click)="confirm()" [ngStyle]="{'background-color': buttonColor, 'color': buttonTextColor}">{{ confirmText }}</button>
        <button (click)="cancel()" [ngStyle]="{'background-color': buttonColor, 'color': buttonTextColor}">Cancel</button>
      </div>
      <div *ngIf="type === 'closeable'">
        <button (click)="close()" [ngStyle]="{'background-color': buttonColor, 'color': buttonTextColor}">Close</button>
      </div>
    </div>
  `,
  styles: [`
    .alert {
      padding: 1em;
      border-radius: 0.5em;
      z-index: 1000;
      transition: all 0.3s ease-in-out;
    }
    .alert button {
      margin-left: 1em;
      border: none;
      padding: 0.5em 1em;
      border-radius: 0.25em;
      cursor: pointer;
    }
    .icon {
      display: inline-block;
      margin-right: 0.5em;
    }
    .message {
      display: inline-block;
    }
  `]
})
export class AlertComponent implements OnInit, OnChanges {
  @Input() type!: 'simple' | 'error' | 'confirmation' | 'closeable';
  @Input() message!: string;
  @Input() backgroundColor!: string;
  @Input() textColor!: string;
  @Input() buttonColor?: string;
  @Input() buttonTextColor?: string;
  @Input() confirmText: string = 'Confirm';
  @Input() duration!: number;
  @Input() verticalPosition!: 'top' | 'center' | 'bottom';
  @Input() horizontalPosition!: 'left' | 'center' | 'right';
  @Input() fontSize: string = '1em';
  @Input() fontFamily: string = 'Arial, sans-serif';
  @Input() borderStyle: string = 'none';
  @Input() animation: string = 'none';
  @Input() icon: string = '';
  @Input() width: string = 'auto';
  @Input() boxShadow: string = 'none';
  @Output() confirmed = new EventEmitter<void>();
  @Output() cancelled = new EventEmitter<void>();

  visible: boolean = true;

  ngOnInit() {
    if (this.duration) {
      setTimeout(() => this.visible = false, this.duration);
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['type'] && !changes['type'].isFirstChange()) {
      this.setDefaults();
    }
    this.setDefaults();
  }

  setDefaults() {
    switch (this.type) {
      case 'simple':
        this.backgroundColor = this.backgroundColor || 'green';
        this.textColor = this.textColor || 'white';
        this.buttonColor = this.buttonColor || 'green';
        this.buttonTextColor = this.buttonTextColor || 'white';
        break;
      case 'error':
        this.backgroundColor = this.backgroundColor || 'red';
        this.textColor = this.textColor || 'white';
        this.buttonColor = this.buttonColor || 'red';
        this.buttonTextColor = this.buttonTextColor || 'white';
        break;
      case 'confirmation':
        this.backgroundColor = this.backgroundColor || 'blue';
        this.textColor = this.textColor || 'white';
        this.buttonColor = this.buttonColor || 'blue';
        this.buttonTextColor = this.buttonTextColor || 'white';
        break;
      case 'closeable':
        this.backgroundColor = this.backgroundColor || 'gray';
        this.textColor = this.textColor || 'white';
        this.buttonColor = this.buttonColor || 'gray';
        this.buttonTextColor = this.buttonTextColor || 'white';
        break;
    }
  }

  getStyle() {
    const styles: { [key: string]: string } = {
      backgroundColor: this.backgroundColor,
      color: this.textColor,
      position: 'fixed',
      fontSize: this.fontSize,
      fontFamily: this.fontFamily,
      border: this.borderStyle,
      width: this.width,
      boxShadow: this.boxShadow,
      animation: this.animation
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

  confirm() {
    this.visible = false;
    this.confirmed.emit();
  }

  cancel() {
    this.visible = false;
    this.cancelled.emit();
  }

  close() {
    this.visible = false;
  }
}
