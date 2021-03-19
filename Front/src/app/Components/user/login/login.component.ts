import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/_Service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public model: any = {};

  constructor(
    private router: Router,
    private service: AuthService) { }

  ngOnInit() {
    if(localStorage.getItem('token') != null) {
      this.router.navigate(['/home']);
    }
  }

  login() {
    this.service.login(this.model).subscribe(
      () => {
        this.router.navigate(['/home']);
        localStorage.setItem('username',this.model.username)        
      },
      (error) => {console.log(error)}
    )
  }


}
