import { Component, Output } from '@angular/core';
import { Router } from '@angular/router';
import { EventEmitter } from '@angular/core';
import { TicketServiceService } from '../../../services/ticket-service.service';
import { CommonModule } from '@angular/common';
import { NoemptComponent } from '../../noempt/noempt.component';

@Component({
  selector: 'app-tickets',
  standalone: true,
  imports: [CommonModule,NoemptComponent],
  templateUrl: './tickets.component.html',
  styleUrl: './tickets.component.css'
})
export class TicketsComponent {
  tickets:any[]=[]
  alltickets:any[]=[]
  pendingtickets:any[]=[]
  completedtickets:any[]=[]
  pending:boolean=true;
  completed:boolean=false;
  all:boolean=false;
  notifs:any=[]
  showdetails:boolean=false;
  
  @Output() pendinglength:EventEmitter<number>=new EventEmitter<number>();
   constructor(private ticketService:TicketServiceService,private route:Router)
   {

   }
ngDoCheck(): void {
   this.pendinglength.emit(this.pendingtickets.length)
}

   ngOnInit()
   {
    // let cat=["ab","bc","vy"] 
    // for(let i=0;i<3;i++)
    //  {
    //     this.tickets.push({id:i,name:"A"+i,type:"ABC",category:cat[i]});
    //  }
        // this.ticketService.gettickets().subscribe((res:any)=>{
         
        //   this.tickets=res.tickets
        //   this.alltickets=this.tickets;
        //   this.pendingtickets=this.tickets.filter((i)=>{
        //     return i.status==='pending'
        //   })
        //   this.completedtickets=this.tickets.filter((i)=>{
        //     return i.status!=='pending'
        //   })
        //   this.pendinglength.emit(this.pendingtickets.length)
        //   this.tickets=this.pendingtickets
        // },(err:any)=>{
        //   console.log(err.error)
        // })
    
          this.ticketService.givependingusertickets().subscribe((res:any)=>{
            this.alltickets=res
            this.notifs=this.alltickets
            this.notifs=this.alltickets.filter((i:any)=>i.status==='Open')
          },(err:any)=>{
            if(err.status===401)
         {
          
           
          this.route.navigate(["/adlog"])
         }
         else if(err.status===500 || err.status===403)
         { 
          this.route.navigate(["/error"])
         }
        
          })
   
     
        
       
   }
   ticketinfo(t_id:string){
     this.route.navigate([`/ticketInfo/${t_id}`])
   }
   filter(by:string)
   {
      if(by==='Pending')
      {
        this.pending=true;
        this.completed=false;
        this.all=false;
        this.tickets=this.pendingtickets
      }
      else if(by==='Resolved/Rejected')
      {
        this.pending=false;
        this.completed=true;
        this.all=false
        this.tickets=this.completedtickets
      }
      else if(by=='All')
      {
           this.all=true;
           this.completed=false
           this.pending=false
           this.tickets=this.alltickets
      }
   }
   viewdetails(id:any)
   {
     this.route.navigate([`/ticketdetails/${id}`])
        
 
   }

   Complete()
   {
     this.notifs=this.alltickets.filter((i:any)=>i.status!=='Open')
     
   }
   Pending()
   {
    this.notifs=this.alltickets.filter((i:any)=>i.status==='Open')
    
   }

   All()
   {
     this.notifs=this.alltickets
   }

}
