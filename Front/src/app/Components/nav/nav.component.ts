import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/_Service/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  constructor(
    private router: Router,
    public service: AuthService
  ) { }

  ngOnInit() {    
  }

  loggedIn() {
    for (let i = 0; i < 1; i++) {      
      
    }
    return this.service.loggedIn();
  }
  
  reload(){
    return window.location.href = window.location.href
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    this.router.navigate(['/user/login']);
  }

}
