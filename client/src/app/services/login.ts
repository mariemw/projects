import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../user.interface';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
    apiUrl='http://localhost:3000/users/login';
    constructor(private http:HttpClient){}
    getUser(user:User){
      return this.http.post<User>(this.apiUrl,user);
    }
}
