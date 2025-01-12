import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { UserserviceService } from '../../services/userservice.service';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ NavbarComponent,FormsModule,CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email:string='';
  username:string='';
  password:string=''
   type:boolean=false
   err:string=''
   constructor(private route:Router,private user:UserserviceService)
   {
      
   }

   viewpass()
   {
    this.type=!this.type
   }
   login()
   {
    if(!this.username)
    {
        this.err='Please enter username'
        return;
    } 
    if(!this.email)
    {
      this.err='Please enter email';
      return
    }
    if(!this.password)
    {
      this.err='Please enter password'
      return
    }
    let role="customer"
    const data={password:this.password,email:this.email,username:this.username,role}
    this.user.logIn(data).subscribe((res:any)=>{
         if(res.token)
         {
          console.log(res.token)
          localStorage.setItem("u_id",res.u_id)
          localStorage.setItem("token",res.token)
          this.route.navigate(["/products"]);
         }
    },(err:any)=>{
        this.err="Invalid Cedentials"
        console.log(err)
    })
    
   
  
   }

   adlog()
   {
     this.route.navigate(["/adlog"])
   } 
}
