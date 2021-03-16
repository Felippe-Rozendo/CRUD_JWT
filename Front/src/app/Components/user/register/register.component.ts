import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Register_model } from 'src/app/_model/register_model';
import { AuthService } from 'src/app/_Service/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  public registerForm: FormGroup;
  user: Register_model;

  constructor(private fb: FormBuilder,
    private router: Router,
    private service: AuthService) { }

  ngOnInit() {
    this.registerForm = this.fb.group({
      userName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      passwords: this.fb.group({
        password: ['', [Validators.required, Validators.minLength(4)]],
        confirmPassword: ['', Validators.required],
      }, { validator: this.confirmarPassword })
    })
  }

  confirmarPassword(fb: FormGroup) {
    const passwordCtrl = fb.get('confirmPassword');
    if (passwordCtrl.errors == null || 'mismatch' in passwordCtrl.errors) {
      if (fb.get('password').value !== passwordCtrl.value) {
        passwordCtrl.setErrors({ mismatch: true });
      } else {
        passwordCtrl.setErrors(null);
      }
    }
  }

  cadastrarUsuario() {
    if (this.registerForm.valid) {
      this.user = Object.assign(
        { password: this.registerForm.get('passwords.password').value },
        this.registerForm.value);
      this.service.register(this.user).subscribe(
        () => {
          this.router.navigate(['/user/login']);
          this.service.openSnackBar();
        },
        (error: any) => {
          this.service.openSnackBarError();
        })
    }
  }
  
}


