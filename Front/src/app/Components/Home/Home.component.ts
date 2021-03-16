import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/_Service/auth.service';

@Component({
  selector: 'app-Home',
  templateUrl: './Home.component.html',
  styleUrls: ['./Home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(public service: AuthService) { }

  ngOnInit() {
  }

  userName() {
    return localStorage.getItem('username');
  }

}
