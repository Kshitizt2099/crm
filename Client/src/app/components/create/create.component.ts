import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { UserserviceService } from '../../services/userservice.service';

@Component({
  selector: 'app-create',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './create.component.html',
  styleUrl: './create.component.css'
})
export class CreateComponent {
  phone:string='';
  email:string='';
  name:string='';
  password:string='';
  confirmpassword:string='';
  error:string=''
 constructor(private user:UserserviceService,private route:Router)
 {
 
 }
  
 type:boolean=false
 typecn:boolean=false
 viewpass()
 {
  this.type=!this.type
 }
 viewpasscn()
 {
  this.typecn=!this.typecn
 }

 createAcc()
 { 
   if(!this.name)
   {
     this.error='Please enter your Name to proceed'
         return;

   }  
   if(!this.email)
   {
     this.error='Please enter Email'
     return;
   }
   if(!this.phone)
   {
     this.error='Please enter Phone number'
     return;
   }
   if(this.phone)
   {
     if(this.hasAlphabets(this.phone))
     {
       this.error='Only numbers are allowed in phone number '
       return;
     
     }
     
     if(this.phone.length!=10)
     {
       this.error='Please enter Phone number of 10 digits'
       return;
     }
   }
   if(this.password.length<8)
   {
     this.error='Password should be 8 leters atleast'
     return;
   }
  
   if(this.confirmpassword!=this.password)
       {
            this.error='passwords do not match'; 
            return;
       } 
      
    const data={name:this.name,phone:this.phone,password:this.password,email:this.email,status,role:'customer'}
     this.user.signIn(data).subscribe((res)=>{
      
       this.route.navigate(["/"])
     },(err:any)=>{
        this.error=err.msg
     })
   
   
   
   

 }

hasAlphabets(str:string) {
 const regex = /\D/;
 return regex.test(str);
 }

}
