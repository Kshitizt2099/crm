import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TicketServiceService } from '../../services/ticket-service.service';
import { NavbarComponent } from '../navbar/navbar.component';
import { NoticketsComponent } from '../notickets/notickets.component';

@Component({
  selector: 'app-pending',
  standalone: true,
  imports: [NavbarComponent,CommonModule,NoticketsComponent],
  templateUrl: './pending.component.html',
  styleUrl: './pending.component.css'
})
export class PendingComponent implements OnInit{
  tickets:any=[]
  constructor(private ticketservice:TicketServiceService,private route:Router)
  {

  }

  editdetails(t_id:number|string)
  {
     this.route.navigate([ `ticketedit/${t_id}`])
  }

  delete(t_id:any)
  {
    console.log(t_id) 
    this.tickets=[]
    this.ticketservice.deleteticket(t_id).subscribe((res:any)=>{
      res.forEach((element:any) => {
        if(element.status=="Open" && element.ticket_id!==t_id)
        {     console.log(element.ticket_id);
        
             this.tickets.push(element)
        }
      });
      this.ticketservice.notifypending()
     },(err:any)=>{
      if(err.status===401)
      {
        this.route.navigate(["/"])
      }
      else if(err.status===500 || err.status===404)
      {
        this.route.navigate(['/error'])
      }
     })

  }
  ngOnInit()
  {

    this.ticketservice.givependingusertickets().subscribe((res:any)=>{
       console.log(res)
       res.forEach((element:any) => {
         if(element.status=="Open")
         {
              this.tickets.push(element)
         }
       });
      
    },(err:any)=>{
      if(err.status===401)
      {
        this.route.navigate(["/"])
      }
      else if(err.status===500 || err.status===404)
      {
        this.route.navigate(['/error'])
      }
   })

    
    
     
  }
}
