import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../user.interface';

@Injectable({
  providedIn: 'root',
})
export class Register {
  email:string='';
  constructor(private http:HttpClient){}
  createUser(user:User){
    return this.http.post<any>(`http://localhost:3000/users/new`,user)
  }
}
