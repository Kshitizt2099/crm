import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { TicketServiceService } from '../../services/ticket-service.service';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [NavbarComponent,FormsModule,CommonModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit{

  err:string=''
  user:any={}
  oldpassword:any=''
  password:any=''
  edited:any=''
  constructor(private ts:TicketServiceService,private route:Router)
  {

  }
  ngOnInit()
  { 
    this.ts.getuserinfo().subscribe((res:any)=>{
       this.user=res[0]
     
       
    },(err:any)=>{
      if(err.status===401)
      {
        this.route.navigate(["/"])
      }
   }
   
 )

  }

  editpassword()
  {
   
    if(!this.password)
    {
      this.err='Password should not be empty if you want to reset it'
    }
    else if(this.oldpassword.length<8 || !this.oldpassword)
    {
       this.err='Please enter Old password properly'
    }
   else if(this.password==this.oldpassword)
   {
     this.err='Old and new password can not be same'
   }
   
    else if(this.password.length<8)
    {
      console.log(this.password) 
      this.err='Password should be of 8 letters atleast'
    }
    else{
      let data={oldPassword:this.oldpassword,newPassword:this.password}
      this.ts.editpassword(data).subscribe((res:any)=>{
        this.edited=res.message
        setTimeout(()=>{
         this.route.navigate(['/products'])
        },1000)
      },(err)=>{
        if(err.status===401)
        {
          this.route.navigate(['/'])
        }
        else if(err.status===500 || err.status===404)
        {
          this.route.navigate(['/error'])
        }
         this.err=err.error.error
         
      })
    }

    setTimeout(()=>{
         this.err=''
    },2000)
    
 
  }

}
