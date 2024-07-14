import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
   type:boolean=false
   constructor(private route:Router)
   {

   }

   viewpass()
   {
    this.type=!this.type
   }
   login()
   {
     this.route.navigate(["/products"]);
   }
}
