import { CommonModule } from '@angular/common';
import { Token } from '@angular/compiler';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { TicketServiceService } from '../../services/ticket-service.service';
import { NavbarComponent } from '../navbar/navbar.component'

@Component({
  selector: 'app-ticket-info',
  standalone: true,
  imports: [CommonModule,NavbarComponent,FormsModule],
  templateUrl: './ticket-info.component.html',
  styleUrl: './ticket-info.component.css'
})
export class TicketInfoComponent {
  type:string|null=""; 
  services:any=[]
  desc:string=''
  category:string=''
  raised:string=''
  err:string=''
  constructor(private route:ActivatedRoute,private ticketService:TicketServiceService,private ac:Router)
   {
      
   }

   ngOnInit()
   {
    
    this.type=this.route.snapshot.paramMap.get("type")
     if(this.type=="Type1")
     {
       this.type="Application Support"   
      this.services=["User Support","Troubleshooting","Updating"]
     }
     else if(this.type=="Type2")
     {
      this.type="Platform Support" 
      this.services=["Operating System Management","Hardware Maintenance","Access Control"]
     }
     else{
       this.type="Customer Service"
      this.services=["Refund","Exchange","Access Control"]
     }
   }

   raiseticket()
   {
     
    
    if(!this.category)
    {
      this.err="Please select the category"
      setTimeout(()=>{
      
        this.err=''
      },2000)
      return
    }
    if(!this.desc)
    {
      this.err="Please write some desc"
      setTimeout(()=>{
      
        this.err=''
      },2000)
      return

    }
    const data={desc:this.desc,type:this.type,category:this.category}
    this.ticketService.createticket(data).subscribe((res:any)=>{
      this.raised=res.msg;
      this.ticketService.notifypending()
      
    },(err:any)=>{
      if(err.status===401)
      {
        this.ac.navigate(["/"])
      }
      else if(err.status===500 || err.status===404)
      {
        this.ac.navigate(['/error'])
      }
      else{
        
        this.err='some issue in raising ticket please try again later'
      }
   }

  )
    setTimeout(()=>{
      this.raised=''
      this.err=''
    },2000)
  
   }
  
}
