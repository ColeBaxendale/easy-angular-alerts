import { Injectable, ComponentFactoryResolver, ApplicationRef, Injector } from '@angular/core';
import { AlertComponent } from './alert.component';

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  constructor(private resolver: ComponentFactoryResolver, private appRef: ApplicationRef, private injector: Injector) {}

  showAlert(config: Partial<Record<keyof AlertComponent, any>>) {
    const factory = this.resolver.resolveComponentFactory(AlertComponent);
    const componentRef = factory.create(this.injector);

    Object.keys(config).forEach((key) => {
      (componentRef.instance as any)[key as keyof AlertComponent] = config[key as keyof AlertComponent];
    });

    this.appRef.attachView(componentRef.hostView);

    const domElem = (componentRef.hostView as any).rootNodes[0] as HTMLElement;
    document.body.appendChild(domElem);
  }
}
