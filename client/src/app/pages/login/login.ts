import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { LoginService } from '../../services/login';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink,FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class LoginComponent {
  userName:string='';
  password:string='';
  constructor(private loginService:LoginService,private router:Router){}

  login(){
     this.loginService.getUser({userName:this.userName,password:this.password}).subscribe({
      next:(data) =>{
        console.log(data);
        this.router.navigate(['/projects',data._id]);
      },
      error: (err) => {
        console.error('Erreur:', err);
      }
    });
  }

}
