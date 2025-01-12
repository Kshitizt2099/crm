import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserserviceService {

  constructor(private http:HttpClient) { 


  }

  logIn(data:any)
  {
    return this.http.post("http://localhost:3000/auth/login",data);
  }
  
  
  signIn(data:any)
  {
      return this.http.post("http://localhost:3000/auth/register",data);
  }
}
