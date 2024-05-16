// projects/easy-angular-alerts/src/lib/alert.component.ts
import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'eaa-alert',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div [ngStyle]="{'background-color': backgroundColor, 'color': textColor, 'position': 'fixed', 'bottom': bottom, 'right': right}"
         class="alert"
         *ngIf="visible">
      <div *ngIf="type === 'simple' || type === 'error'">{{ message }}</div>
      <div *ngIf="type === 'confirmation'">
        {{ message }}
        <button (click)="confirm()">{{ confirmText }}</button>
        <button (click)="cancel()">Cancel</button>
      </div>
      <div *ngIf="type === 'closeable'">
        {{ message }}
        <button (click)="close()">Close</button>
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
    }
  `]
})
export class AlertComponent implements OnInit {
  @Input() type: 'simple' | 'error' | 'confirmation' | 'closeable' = 'simple';
  @Input() message!: string;
  @Input() backgroundColor!: string;
  @Input() textColor!: string;
  @Input() confirmText!: string;
  @Input() duration!: number;
  @Input() verticalPosition: 'top' | 'center' | 'bottom' = 'top';
  @Input() horizontalPosition: 'left' | 'center' | 'right' = 'center';

  visible: boolean = true;
  bottom!: string;
  right!: string;

  ngOnInit() {
    if (this.duration) {
      setTimeout(() => this.visible = false, this.duration);
    }

    // Convert vertical and horizontal positions to CSS values
    this.bottom = this.verticalPosition === 'bottom' ? '10px' : this.verticalPosition === 'center' ? '50%' : '10px';
    this.right = this.horizontalPosition === 'right' ? '10px' : this.horizontalPosition === 'center' ? '50%' : '10px';
  }

  confirm() {
    this.visible = false;
    // Logic to handle confirmation
  }

  cancel() {
    this.visible = false;
    // Logic to handle cancellation
  }

  close() {
    this.visible = false;
  }
}
