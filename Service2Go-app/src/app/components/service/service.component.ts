import { Component, OnInit } from '@angular/core';
import { Service } from 'src/app/class/service';
import { ServiceService } from 'src/app/services/service.service';

@Component({
  selector: 'app-service',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.scss']
})
export class ServiceComponent implements OnInit {
  services: Service[] = [];

  constructor(private serviceService: ServiceService) {}

  ngOnInit(): void {
    this.getServices();
  }

  getServices() :void {
    this.serviceService.getServices()
      .subscribe(services => this.services = services);
  }

}
