import { Injectable, ComponentFactoryResolver, ApplicationRef, Injector, ViewContainerRef, ComponentRef } from '@angular/core';
import { AlertComponent } from './alert.component';
@Injectable({
  providedIn: 'root',
})
export class AlertService {
  private viewContainerRef!: ViewContainerRef;
  private alertComponentRef!: ComponentRef<AlertComponent>;

  constructor(
    private resolver: ComponentFactoryResolver,
    private appRef: ApplicationRef,
    private injector: Injector
  ) {}

  setViewContainerRef(viewContainerRef: ViewContainerRef) {
    this.viewContainerRef = viewContainerRef;
  }

  showAlert(config: Partial<Record<keyof AlertComponent, any>>, onConfirm?: () => void, onCancel?: () => void) {
    if (this.alertComponentRef) {
      this.viewContainerRef.remove(this.viewContainerRef.indexOf(this.alertComponentRef.hostView));
    }

    const factory = this.resolver.resolveComponentFactory(AlertComponent);
    this.alertComponentRef = factory.create(this.injector);

    if (config) {
      Object.assign(this.alertComponentRef.instance, config);
    }

    if (onConfirm) {
      this.alertComponentRef.instance.confirmed.subscribe(() => {
        onConfirm();
        this.removeAlert();
      });
    }

    if (onCancel) {
      this.alertComponentRef.instance.cancelled.subscribe(() => {
        onCancel();
        this.removeAlert();
      });
    }

    this.viewContainerRef.insert(this.alertComponentRef.hostView);
  }

  private removeAlert() {
    if (this.alertComponentRef) {
      this.viewContainerRef.remove(this.viewContainerRef.indexOf(this.alertComponentRef.hostView));
    }
  }
}
