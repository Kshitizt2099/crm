import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { tick } from '@angular/core/testing';
import { Router } from '@angular/router';
import { TicketServiceService } from '../../services/ticket-service.service';
import { DownloadComponent } from './download/download.component';
import { TicketsComponent } from './tickets/tickets.component';
import { UploadComponent } from './upload/upload.component';

@Component({
  selector: 'app-adminhome',
  standalone: true,
  imports: [TicketsComponent,UploadComponent,DownloadComponent,CommonModule],
  templateUrl: './adminhome.component.html',
  styleUrl: './adminhome.component.css'
})
export class AdminhomeComponent  implements OnInit {
  
   support:boolean=true;
   imports:boolean=true;
   orders:boolean=false;
   pdlength:number=0;
   mobileview:boolean=false
   emp_name:string=''
    ngOnInit()
    {
      // if(!localStorage.getItem("token"))
      // {
      //     this.route.navigate(["/adlog"])
      // }
      
      this.ts.givependingusertickets().subscribe((res:any)=>{
       res.forEach((t:any)=>{
           if(t.status=='Open')
           {
             this.pdlength+=1
           }

       });    
   
      },(err:any)=>{
        if(err.status===401)
     {
     
      this.route.navigate(["/adlog"])
     }
     else if(err.status===500)
     { 
      this.route.navigate(["/error"])
     }
     else{
       console.log(err)
     }
      }

      )

      this.emp_name=localStorage.getItem('ename')||''
;    }
  
   constructor(private route:Router,private ts:TicketServiceService)
   {

   }
   goOrders()
   {
     this.orders=true;
     this.support=false;
     this.mobileview=false
     this.imports=false;
   }

   goImports()
   {
    this.orders=false;
    this.support=false;
    this.mobileview=false
    this.imports=true;

   }

  
  
  goSupport()
  {
    this.orders=false;
    this.support=true;
    this.mobileview=false
    this.imports=false;
  }

  setmobileview()
  {
    this.mobileview=!this.mobileview
    this.support=false
    this.imports=false
    this.orders=false
  }
  logout()
  {
    localStorage.clear();
    this.route.navigate(["/"])
  }
 
}
