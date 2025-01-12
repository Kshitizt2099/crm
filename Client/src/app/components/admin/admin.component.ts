import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { TicketServiceService } from '../../services/ticket-service.service';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})

export class AdminComponent {

  type:boolean=false
  username:string=''
  password:string=''
  err:string=''
  constructor(private route:Router,private ticketservice:TicketServiceService)
  {

  }
  viewpass()
  {
   this.type=!this.type
  }
  adhome()
  {
  
     if(this.username=='')
     {
       this.err='please enter username'
       setTimeout(() => {
        this.err=''
      }, 1000);
       return
     }
     if(!this.password)
     {
      this.err='please enter password'
      setTimeout(() => {
        this.err=''
      }, 1000);
      return
     }
     let login={username:this.username,password:this.password}
     this.ticketservice.employeelogin(login).subscribe((res:any)=>{
       localStorage.setItem('token',res.token);
       localStorage.setItem('e_id',res.e_id);
       localStorage.setItem('ename',res.username);
        this.route.navigate(['/adhome'])
     },(err)=>{
      
       console.log(err)
         this.err=err.error.msg
         
         
     })

     setTimeout(() => {
      this.err=''
    }, 2000);
  
  }

}
