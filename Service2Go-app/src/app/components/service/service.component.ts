import { Component } from '@angular/core';
import { Service } from 'src/app/class/service';
import { ServiceService } from 'src/app/services/service.service';

@Component({
  selector: 'app-service',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.scss']
})
export class ServiceComponent {
  services: Service[] = [];

  constructor(private serviceService: ServiceService) {

  }

  ngOninit():void {
    this.getService();
  }

  getService():void {
    this.serviceService.getServices()
      .subscribe(services => this.services = services);
  }
}
