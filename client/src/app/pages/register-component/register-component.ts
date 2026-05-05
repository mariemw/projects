import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Register } from '../../services/register';


@Component({
  selector: 'app-register-component',
  standalone:true,
  imports: [FormsModule],
  templateUrl: './register-component.html',
  styleUrl: './register-component.css',
})
export class RegisterComponent {
  email:string='';
  constructor(private registerService:Register,private router:Router){}
  saveEmail(){
    this.registerService.email=this.email;
    if (this.email){
      this.router.navigate(['/password']);
     console.log(this.registerService.email);
    }
    
  }
}
