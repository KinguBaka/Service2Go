import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ServiceService } from 'src/app/services/service.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent {

  constructor(public serviceService : ServiceService, public router : Router ) {}

  onSubmit(serviceForm: NgForm) {
    console.log(serviceForm.value);
    this.serviceService.addService(serviceForm.value);
    this.router.navigate(["home"]);
  }
}
