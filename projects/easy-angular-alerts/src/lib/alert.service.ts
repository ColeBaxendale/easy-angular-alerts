import { Injectable, ApplicationRef, Injector, ComponentRef, ViewContainerRef, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { AlertComponent } from './alert.component'

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  private viewContainerRef!: ViewContainerRef;

  constructor(
    private appRef: ApplicationRef, 
    private injector: Injector,
    @Inject(DOCUMENT) private document: Document
  ) {}

  setViewContainerRef(vcr: ViewContainerRef) {
    console.log('ViewContainerRef set:', vcr);
    this.viewContainerRef = vcr;
  }

  showAlert(config: Partial<Record<keyof AlertComponent, any>>, onConfirm?: () => void, onCancel?: () => void) {
    if (!this.viewContainerRef) {
      throw new Error('ViewContainerRef not set. Call setViewContainerRef() with a valid ViewContainerRef instance.');
    }

    const componentRef: ComponentRef<AlertComponent> = this.viewContainerRef.createComponent(AlertComponent);

    Object.keys(config).forEach((key) => {
      (componentRef.instance as any)[key as keyof AlertComponent] = config[key as keyof AlertComponent];
    });

    if (onConfirm) {
      componentRef.instance.confirmed.subscribe(onConfirm);
    }

    if (onCancel) {
      componentRef.instance.cancelled.subscribe(onCancel);
    }

    this.appRef.attachView(componentRef.hostView);

    const domElem = (componentRef.hostView as any).rootNodes[0] as HTMLElement;
    this.document.body.appendChild(domElem);
  }
}
