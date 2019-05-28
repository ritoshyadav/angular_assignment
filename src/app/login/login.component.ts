import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../services/service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  useremail:String;
  password:String;
  user_data:any;
  constructor(private router: Router, private service: ServiceService) { }

  ngOnInit() {
  }
  onLogin() {
    const userData = {
      "username": this.useremail,
      "password": this.password
    };
   
    this.service.fetch('user/login', userData).then((result) => {
    
      this.user_data = result;
      if (this.user_data.code == 100) {
        this.service.showSuccess('You are successfully login...');
        this.router.navigate(['/dashboard']);
      } else {
        this.service.showError(this.user_data.message);
      }
    }, (err) => {
    
      this.service.showError('Something wrong. Please try later.');
    });
}
onReset(){
  this.useremail='';
  this.password='';
}
}
