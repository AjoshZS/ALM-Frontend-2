import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }
  authToken: any;

  getToken() {
    if (this.authToken) return this.authToken;
    else {
      let token = localStorage.getItem('userToken');
      if (token === null) return '';
      else return token;
    }
  }

  getLoginToken() {
    let token = localStorage.getItem('LoginToken');
    if (token === null) return '';
    else return token;
  }

  setHeaders() {
    let header = new HttpHeaders({
      // 'Authorization': `Bearer ${this.getToken()}`,
      'X-Frame-Options': 'SAMEORIGIN',
      'X-Content-Type-Options': 'nosniff',
      'X-Xss-Protection': '1; mode=block'
    });
    return header;
  }

  setLoginHeaders() {
    let header = new HttpHeaders({
      'Authorization': `Bearer ${this.getLoginToken()}`,
      'X-Frame-Options': 'SAMEORIGIN',
      'X-Content-Type-Options': 'nosniff',
      'X-Xss-Protection': '1; mode=block'
    });
    return header;
  }

  imageUpload(url: string, data: any): Observable<any> {
    return this.http.post(url, data);
  }

  post(url: string, data: any): Observable<any> {
    return this.http.post(url, data, { headers: this.setHeaders() });
  }

  get(url: string): Observable<any> {
    return this.http.get(url, { headers: this.setHeaders() });
  }

  LoginPost(url: string, data: any): Observable<any> {
    return this.http.post(url, data, { headers: this.setLoginHeaders() });
  }
}
