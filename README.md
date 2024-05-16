# Easy Angular Alerts

A customizable alert library for Angular applications. Easy Angular Alerts provides a flexible way to display various types of alerts and notifications in your Angular projects.

## Features

- Simple alert
- Error alert
- Confirmation alert with buttons
- Closeable alert with a button
- Fully customizable: colors, font, position, animations, icons, and more
- Built-in default styles for each alert type

## Installation

Install the library using npm:

```bash
npm install easy-angular-alerts
```

Usage
Import the Module
First, import the EasyAngularAlertsModule in your Angular application's module:

```typescript
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { EasyAngularAlertsModule } from 'easy-angular-alerts';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    EasyAngularAlertsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

Using the Alert Service
Inject the AlertService into your component and use it to display alerts.

```typescript
import { Component } from '@angular/core';
import { AlertService } from 'easy-angular-alerts';

@Component({
  selector: 'app-root',
  template: `
    <button (click)="showSimpleAlert()">Show Simple Alert</button>
    <button (click)="showCloseableAlert()">Show Closeable Alert</button>
    <button (click)="showConfirmationAlert()">Show Confirmation Alert</button>
    <button (click)="showErrorAlert()">Show Error Alert</button>
  `
})
export class AppComponent {
  constructor(private alertService: AlertService) {}

  showSimpleAlert() {
    this.alertService.showAlert({
      type: 'simple',
      message: 'This is a simple alert!',
      duration: 3000,
      icon: '🔔'
    });
  }

  showCloseableAlert() {
    this.alertService.showAlert({
      type: 'closeable',
      message: 'This is a closeable alert!',
      verticalPosition: 'top',
      horizontalPosition: 'center',
      icon: '⚠️'
    });
  }

  showConfirmationAlert() {
    this.alertService.showAlert({
      type: 'confirmation',
      message: 'Are you sure you want to proceed?',
      confirmText: 'Yes',
      verticalPosition: 'center',
      horizontalPosition: 'left',
      icon: '❓'
    }, () => this.onConfirm(), () => this.onCancel());
  }

  showErrorAlert() {
    this.alertService.showAlert({
      type: 'error',
      message: 'This is an error alert!',
      duration: 3000,
      icon: '❌'
    });
  }

  onConfirm() {
    console.log('Confirmed!');
    this.alertService.showAlert({
      type: 'simple',
      message: 'Action confirmed!',
      backgroundColor: 'green',
      textColor: 'white',
      verticalPosition: 'top',
      horizontalPosition: 'center',
      duration: 3000
    });
  }

  onCancel() {
    console.log('Cancelled!');
    this.alertService.showAlert({
      type: 'simple',
      message: 'Action cancelled!',
      backgroundColor: 'red',
      textColor: 'white',
      verticalPosition: 'top',
      horizontalPosition: 'center',
      duration: 3000
    });
  }
}
```

Customization
You can customize the alerts by passing additional properties to the showAlert method. Below are the available customization options:
```
type: Type of alert (simple, error, confirmation, closeable)
message: The alert message
backgroundColor: Background color of the alert
textColor: Text color of the alert
buttonColor: Background color of the buttons (for confirmation and closeable alerts)
buttonTextColor: Text color of the buttons (for confirmation and closeable alerts)
confirmText: Text for the confirmation button (for confirmation alerts)
duration: Duration before the alert auto-closes (in milliseconds)
verticalPosition: Vertical position (top, center, bottom)
horizontalPosition: Horizontal position (left, center, right)
fontSize: Font size of the alert message
fontFamily: Font family of the alert message
borderStyle: CSS border style of the alert
animation: CSS animation for the alert
icon: Icon to display in the alert
width: Width of the alert
boxShadow: Box shadow for the alert
```

Examples
Simple Alert

```typescript
this.alertService.showAlert({
  type: 'simple',
  message: 'This is a simple alert!',
  duration: 3000,
  icon: '🔔'
});
```

Closeable Alert

```typescript
this.alertService.showAlert({
  type: 'closeable',
  message: 'This is a closeable alert!',
  verticalPosition: 'top',
  horizontalPosition: 'center',
  icon: '⚠️'
});
```

Confirmation Alert

```typescript
this.alertService.showAlert({
  type: 'confirmation',
  message: 'Are you sure you want to proceed?',
  confirmText: 'Yes',
  verticalPosition: 'center',
  horizontalPosition: 'left',
  icon: '❓'
}, () => this.onConfirm(), () => this.onCancel());
```

Error Alert

```typescript
this.alertService.showAlert({
  type: 'error',
  message: 'This is an error alert!',
  duration: 3000,
  icon: '❌'
});
```

Handling Confirmation and Cancellation
For confirmation alerts, you can pass callback functions to handle the user's actions.

```typescript
showConfirmationAlert() {
  this.alertService.showAlert({
    type: 'confirmation',
    message: 'Are you sure you want to proceed?',
    confirmText: 'Yes',
    verticalPosition: 'center',
    horizontalPosition: 'left',
    icon: '❓'
  }, () => this.onConfirm(), () => this.onCancel());
}

onConfirm() {
  console.log('Confirmed!');
  this.alertService.showAlert({
    type: 'simple',
    message: 'Action confirmed!',
    backgroundColor: 'green',
    textColor: 'white',
    verticalPosition: 'top',
    horizontalPosition: 'center',
    duration: 3000
  });
}

onCancel() {
  console.log('Cancelled!');
  this.alertService.showAlert({
    type: 'simple',
    message: 'Action cancelled!',
    backgroundColor: 'red',
    textColor: 'white',
    verticalPosition: 'top',
    horizontalPosition: 'center',
    duration: 3000
  });
}
```

Contributing
Contributions are welcome! Please feel free to submit a pull request or open an issue on GitHub.

License
This project is licensed under the MIT License - see the LICENSE file for details.

Support
If you have any questions or need support, please open an issue on GitHub.

Author
Cole Baxendale - https://github.com/ColeBaxendale