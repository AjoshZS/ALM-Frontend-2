import { Injectable } from '@angular/core';
import jwt_decode, { JwtPayload, jwtDecode } from "jwt-decode";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  avilableRoles = ['receiver','register','DC1','DC2','QC','QA','QaPhoto','QaEdit','admin','pharmaDimension','photographer','pharmaPhotographer','release','vendor','pharmaVendor','ivsmSupervisor', 'customerSupport', 'adminViewer', 'ivsmViewer'];
  constructor() { }

  isAuthenticated(){
    let token = localStorage.getItem('accessToken');
    if(token === null) return false;
    else {
      let decodedToken: any = jwtDecode<JwtPayload>(token);
      if(decodedToken?.id) return true;
      else return false;
    }
  }

  getUser(){
    let token = localStorage.getItem('accessToken');
    if(token === null) return false;
    else return jwtDecode<JwtPayload>(token);
  }
  
}