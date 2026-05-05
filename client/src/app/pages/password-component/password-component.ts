import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Register } from '../../services/register';
import { Router } from '@angular/router';

@Component({
  selector: 'app-password-component',
  imports: [FormsModule],
  templateUrl: './password-component.html',
  styleUrl: './password-component.css',
})
export class PasswordComponent {
  userName:string='';
  password:string='';

  constructor(private registerService:Register,private router:Router){}
  createUser(){
    this.registerService.createUser({userName:this.userName,password:this.password,email:this.registerService.email}).subscribe({
      next:()=>{
        console.log('created');
        this.password='';
        this.userName='';
        this.registerService.email='';
        
      },
      error: (err) => {
        console.error('Message de validation :', err.error.message);
      }
    })
    this.router.navigate(['/']);

  }
}
