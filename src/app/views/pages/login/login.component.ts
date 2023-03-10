import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators, ReactiveFormsModule  } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { ApiService } from '../../../services/api.service';

//import * as toastFire from '../../../../assets/js/toast';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  public loginForm!: FormGroup;
  token: any;
  constructor(private router: Router,
    private apiService: ApiService,
    private sanitizer: DomSanitizer,) { }

  ngOnInit(): void {
    this.createLoginForm();
  }

  async login(){
    
    //console.log(this.loginForm.value);
    
    await this.apiService.post('login', this.loginForm.value, '').subscribe(
      async (res: any) => {
        console.log(res);
        
        if (res.status == false) this.toastFireError(res);
        else {
          this.token = res.data
          localStorage.setItem('token', `${this.token}`)
          this.router.navigate(['dashboard'])
        }
      },
      (error: any) => {
        console.log('error enviando documento', error);
        this.toastFireError(error);
      }
    );
  }

  public createLoginForm() {
    this.loginForm = new FormGroup({
      username: new FormControl('', Validators.compose([Validators.required])),
      password: new FormControl('', Validators.compose([Validators.required])),
    });
  }

  toastFireError(res:any, redirect?:any) {
    Swal.fire({
      icon: "error",
      title: "Error",
      text: res.message?.toUpperCase(),
      timer: 6000,
    }).then(() => {
      if (redirect)
        window.location.href = window.location.href = "/home/dashboard";
    });
  }

  warningfireToast(title?: any, msg?: any) {
    Swal.fire({
      title: title,
      text: msg.error ? msg.error.message : msg,
      icon: 'warning',
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'OK',
    });
  }

  SuccessMessage(title: any, msg: any) {
    Swal.fire({
      title: title,
      text: msg.error ? msg.error.message : msg,
      icon: 'success',
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'OK',
    });
  }

}
