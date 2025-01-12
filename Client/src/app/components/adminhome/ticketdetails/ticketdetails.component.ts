import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TicketServiceService } from '../../../services/ticket-service.service';
import { TicketnavComponent } from '../ticketnav/ticketnav.component';

@Component({
  selector: 'app-ticketdetails',
  standalone: true,
  imports: [CommonModule,TicketnavComponent,FormsModule],
  templateUrl: './ticketdetails.component.html',
  styleUrl: './ticketdetails.component.css'
})
export class TicketdetailsComponent {
    
  stars:number[]=[1,2,3,4,5]  
   rating:number=0
   type:string=''
   comments:string=''
   status:string=''
   t_id:any=''
   err=''
   message:string=''
   ticket_id:any=''
   by:string=''
  constructor(private route:Router, private activatedrtoute:ActivatedRoute,private ticketservice:TicketServiceService)
    {

    }

    ngOnInit()
    {
      const t_id=this.activatedrtoute.snapshot.paramMap.get("tid");
     this.ticketservice.givependingusertickets().subscribe((res:any)=>{
         res.forEach((ele:any) => {
           console.log(ele.id)
           if(ele.id==t_id)
           {
              this.ticket_id=ele.ticket_id;
              this.comments=ele.description;
              this.type=ele.type
              this.by=ele.raisedBy

           }
           
         });
     },(err:any)=>{
       if(err.status==401)
       {
         this.route.navigate(["/adlog"])
       }
     })   
   

    }

    setstatus(status:any)
    {
     
      if(!this.message)
      {
        this.err="please enter some comments"
        
      }
      else{
        this.ticketservice.updatestatusofticket(this.message,this.ticket_id,status).subscribe((res:any)=>{
          this.route.navigate(['/adhome']) 
 },(err:any)=>
 {
  if(err.status===401)
  {
    this.route.navigate(["/adlog"])
  }
  else if(err.status===500)
  { 
   this.route.navigate(["/error"])
  } 
  else{
    this.err='some issue in completing the ticket'
  }
  
 })

      }

      setTimeout(()=>{
       this.err=''
      },1000)
      
       
    }
  



}
