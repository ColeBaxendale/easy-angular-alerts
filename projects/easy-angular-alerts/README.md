# Easy Angular Alerts

A customizable alert library for Angular applications. Easy Angular Alerts provides a flexible way to display various types of alerts and notifications in your Angular projects.

## Table of Contents

- [Default Styles](#default-styles)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Import the Module](#import-the-module)
- [Using the Alert Service](#using-the-alert-service)
- [Customization](#customization)
- [Usage Example](#usage-example)
- [Inputs Summary](#inputs-summary)
- [Contributing](#contributing)
- [License](#license)
- [Support](#support)
- [Author](#author)

## Default Styles

<img src="https://github.com/ColeBaxendale/easy-angular-alerts/blob/master/projects/easy-angular-alerts/src/images/simple_default.png?raw=true"/>

<img src="https://github.com/ColeBaxendale/easy-angular-alerts/blob/master/projects/easy-angular-alerts/src/images/error_default.png?raw=true"/>

<img src="https://github.com/ColeBaxendale/easy-angular-alerts/blob/master/projects/easy-angular-alerts/src/images/confirm_default.png?raw=true"/>

<img src="https://github.com/ColeBaxendale/easy-angular-alerts/blob/master/projects/easy-angular-alerts/src/images/closeable_default.png?raw=true"/>

## Features

- Simple alert
- Error alert
- Confirmation alert with buttons
- Closeable alert with a button
- Fully customizable: colors, font, position and more
- Built-in default styles for each alert type

## Installation

Install the library using npm:

```bash
npm install easy-angular-alerts
```

### Usage

Import the Module
First (if applicable), import the EasyAngularAlertsModule in your Angular application's module:

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
Mandatory inputs: 'type & message'
ADD THIS IN YOUR MAIN HTML CONTAINER 
```HTML
<div #alertContainer></div>
``` 

```typescript
import { Component, ViewChild, ViewContainerRef, AfterViewInit } from '@angular/core';
import { AlertService } from './alert.service';

@Component({
  selector: 'app-root',
  template: `
    <div #alertContainer></div> 
    <button (click)="showSimpleAlert()">Show Simple Alert</button>
    <button (click)="showErrorAlert()">Show Error Alert</button>
    <button (click)="showConfirmationAlert()">Show Confirmation Alert</button>
    <button (click)="showCloseableAlert()">Show Closeable Alert</button>
  `,
  styleUrls: ['./app.component.css'],
  standalone: true
})
export class AppComponent implements AfterViewInit {
  @ViewChild('alertContainer', { read: ViewContainerRef }) alertContainer!: ViewContainerRef;
  

  constructor(private alertService: AlertService) {}

  ngAfterViewInit() {
    this.alertService.setViewContainerRef(this.alertContainer);
  }

  showSimpleAlert() {
    this.alertService.showAlert({
      type: 'simple',
      message: 'This is a simple alert that is longer to show the width auot off!',
    });
  }

  showErrorAlert() {
    this.alertService.showAlert({
      type: 'error',
      message: 'This is an error alert!',
    });
  }

  showConfirmationAlert() {
    this.alertService.showAlert({
      type: 'confirmation',
      message: 'Do you confirm this action?',
    }, () => {
      alert('Confirmed!'); // On confirm do something here
    }, () => {
      alert('Cancelled!'); // On cancel do something here
    });
  }

  showCloseableAlert() {
    this.alertService.showAlert({
      type: 'closeable',
      message: 'This alert can be closed!',
    });
  }
}

/*
  1) add <div #alertContainer></div> in your main container of HTML
  2) import { AlertService } from './alert.service'; && import { Component, ViewChild, ViewContainerRef, AfterViewInit }
  3) add class memeber @ViewChild('alertContainer', { read: ViewContainerRef }) alertContainer!: ViewContainerRef;
  4) add constructor(private alertService: AlertService) {}
  5) add ngAfterViewInit() {
    this.alertService.setViewContainerRef(this.alertContainer);
    }
  6) now call this.alertService.showAlert({...})
*/

```

### Customization

You can customize the alerts by passing additional properties to the showAlert method. Below are the available customization options:

#### REQUIRED: type

Description: Type of alert. </br>
Values: 'simple', 'error', 'confirmation', 'closeable'</br>
Example:</br>

```typescript
type: 'simple'
```

#### REQUIRED: message

Description: The alert message.
Example:

```typescript
message: 'This alert can be closed!'
```

#### backgroundColor

Description: Background color of the alert. </br>
Example: </br>

```typescript
backgroundColor: '#DCFFE0'
```

#### textColor

Description: Text color of the alert. </br>
Example: </br>

```typescript
textColor: 'black'
```

#### duration (NOT ALLOWED IN confirmation TYPE)

Description: Duration before the alert auto-closes (in milliseconds). </br>
Example: </br>

```typescript
duration: 3000
```

#### verticalPosition

Description: Vertical position of the alert. </br>
Values: 'top', 'center', 'bottom' </br>
Example:

```typescript
verticalPosition: 'bottom'
```

#### horizontalPosition

Description: Horizontal position of the alert. </br>
Values: 'left', 'center', 'right' </br>
Example:

```typescript
horizontalPosition: 'center'
```

#### fontSize

Description: Font size of the alert message. </br>
Example: </br>

```typescript
fontSize: '.9em'
```

#### fontFamily

Description: Font family of the alert message. </br>
Example: </br>

```typescript
fontFamily: 'Newsreader, sans-serif'
```

#### borderStyle

Description: CSS border style of the alert. </br>
Example: </br>

```typescript
borderStyle: '1pt solid #61A868'
```

#### width

Description: Width of the alert. </br>
Example: </br>

```typescript
width: 'auto'
```

#### height

Description: Height of the alert. </br>
Example: </br>

```typescript
height: 'auto'
```

#### boxShadow

Description: Box shadow for the alert. </br>
Example: </br>

```typescript
boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
```

#### borderStyle

Description: Box shadow for the alert. </br>
Example: </br>

```typescript
borderStyle: 'solid 1px black',
```

### Usage Example

```typescript
import { AlertService } from 'easy-angular-alerts';

// Example usage
this.alertService.showAlert({
  type: 'simple',
  message: 'This is a simple alert!',
  backgroundColor: '#DCFFE0',
  textColor: 'black',
  duration: 3000,
  verticalPosition: 'bottom',
  horizontalPosition: 'center',
  fontSize: '1em',
  fontFamily: 'Arial, sans-serif',
  borderStyle: '1pt solid #61A868',
  width: 'auto',
  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
});
```

```typescript
import { AlertService } from 'easy-angular-alerts';

// Example usage for simple alert
this.alertService.showAlert({
  type: 'simple',
  message: 'This is a simple alert with different styles!',
  backgroundColor: '#F0F8FF',
  textColor: '#00008B',
  duration: 5000,
  verticalPosition: 'top',
  horizontalPosition: 'left',
  fontSize: '1.2em',
  fontFamily: 'Verdana, sans-serif',
  borderStyle: '2pt dashed #00008B',
  width: '400px',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)'
});

// Example usage for error alert
this.alertService.showAlert({
  type: 'error',
  message: 'This is an error alert with custom styles!',
  backgroundColor: '#FFCCCB',
  textColor: '#8B0000',
  duration: 4000,
  verticalPosition: 'center',
  horizontalPosition: 'right',
  fontSize: '1em',
  fontFamily: 'Courier New, monospace',
  borderStyle: '1pt solid #8B0000',
  width: '350px',
  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.3)'
});

// Example usage for confirmation alert
this.alertService.showAlert({
  type: 'confirmation',
  message: 'Do you confirm this custom action?',
  backgroundColor: '#E0FFFF',
  textColor: '#008B8B',
  verticalPosition: 'bottom',
  horizontalPosition: 'center',
  fontSize: '1em',
  fontFamily: 'Tahoma, sans-serif',
  borderStyle: '1pt solid #008B8B',
  width: '300px',
  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
}, () => {
  alert('Confirmed!'); // On confirm do something here
}, () => {
  alert('Cancelled!'); // On cancel do something here
});

// Example usage for closeable alert
this.alertService.showAlert({
  type: 'closeable',
  message: 'This closeable alert has custom styles!',
  backgroundColor: '#FFFACD',
  textColor: '#B8860B',
  verticalPosition: 'top',
  horizontalPosition: 'center',
  fontSize: '1.1em',
  fontFamily: 'Georgia, serif',
  borderStyle: '1pt solid #B8860B',
  width: '450px',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.25)'
});
```

### Inputs Summary

```typescript
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
```

Ensure you add these customizations as needed to fit your specific use cases!

Contributing
Contributions are welcome! Please feel free to submit a pull request or open an issue on GitHub.

License
This project is licensed under the MIT License - see the LICENSE file for details.

Support
If you have any questions or need support, please open an issue on GitHub. -<https://github.com/ColeBaxendale/easy-angular-alerts/issues>

Author
Cole Baxendale - <https://github.com/ColeBaxendale>
