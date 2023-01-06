import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/class/user';
import { InMemoryDataService } from 'src/app/services/in-memory-data.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-my-profil',
  templateUrl: './my-profil.component.html',
  styleUrls: ['./my-profil.component.scss']
})
export class MyProfilComponent implements OnInit {

  constructor(private inMemoryDataService : InMemoryDataService, private userService : UserService) {

  }

  ngOnInit() {
    console.log("test")
    let myId = this.inMemoryDataService.getData('id');
    console.log(myId)
  }
}
