import { ComponentFactoryResolver, Injectable, ViewContainerRef } from '@angular/core';
import { DynamicComponent } from '../components/dynamic/dynamic.component';

@Injectable({
  providedIn: 'root'
})
export class DynamicService {

  rootViewContainer!: ViewContainerRef;

  constructor(private factoryResolver: ComponentFactoryResolver) { }

  public setRootViewContainerRef(viewContainerRef: ViewContainerRef) {
    this.rootViewContainer = viewContainerRef;
  }

  public addDynamicComponent() {
    const factory = this.factoryResolver.resolveComponentFactory(DynamicComponent)
    const component = factory.create(this.rootViewContainer.injector);
    
    this.rootViewContainer.insert(component.hostView)
  }
}
