import { JsonPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Service } from 'src/app/class/service';
import { ServiceService } from 'src/app/services/service.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
  service?: Service;

  constructor(private serviceService: ServiceService,
    private route : ActivatedRoute) {}

  ngOnInit(): void {
    this.getService();
  }

  getService():void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.serviceService.getService(id)
      .subscribe(service => this.service = service)
  }
}
