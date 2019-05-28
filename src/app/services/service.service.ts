import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from 'selenium-webdriver/http';
import { Http, Headers } from '@angular/http';
import { ToastrManager } from 'ng6-toastr-notifications';


@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  api_url = environment.api_url;
  //api_url = 'http://34.219.143.238:8083';
  action: Boolean = false;
  public loading: any;
  constructor(
    public http: Http,
    public toastr: ToastrManager
  ) {
  }



  fetch(url, dataObj) {
    console.log("test", this.api_url);
    return new Promise((resolve, reject) => {
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      this.http.post(this.api_url + url, dataObj, { headers: headers })
        .subscribe(res => {
          resolve(res.json());
        }, (err) => {
          reject(err);
        });
    });
  }



  post(url, dataObj) {
      return new Promise((resolve, reject) => {
      // let token = JSON.parse(localStorage.getItem("user_data"));
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      // headers.append('authorization', token.accessToken);
      // headers.append('Access-Control-Allow-Origin', '*');
      this.http.post(this.api_url + url, dataObj, { headers: headers })
        .subscribe(res => {
          // console.log("sres",res)
          resolve(res.json());
        }, (err) => {
          // console.log("serr",err)
          reject(err);
        });
    });
  }

  get(url) {
    return new Promise((resolve, reject) => {
      let headers = new Headers();
      // let token = JSON.parse(localStorage.getItem("user_data"));
      headers.append('Content-Type', 'application/json');
      // headers.append('authorization', token.accessToken);
      //  headers.append('Access-Control-Allow-Origin', '*');
      this.http.get(this.api_url + url, { headers: headers })
        .subscribe(res => {
          // console.log("res",res)
          resolve(res.json());
        }, (err) => {
          // console.log("err",err)
          reject(err);
        });
    });
  }

  upload(url, dataObj) {
    console.log("test", this.api_url);
    return new Promise((resolve, reject) => {
      let headers = new Headers();
      let token = JSON.parse(localStorage.getItem("user_data"));
      headers.append('authorization', token.accessToken);
      console.log("token",token.accessToken)
      this.http.post(this.api_url + url, dataObj,{ headers: headers } )
        .subscribe(res => {
          resolve(res.json());
        }, (err) => {
          reject(err);
          
        });
    });
  }

  showSuccess(msg, position: any = 'top-right') {
    this.toastr.successToastr(msg, '', {
      position: position
    });
  }

  showError(msg, position: any = 'top-right') {
    this.toastr.errorToastr(msg, '', {
      position: position
    });
  }
}
