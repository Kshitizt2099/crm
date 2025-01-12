import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TicketServiceService } from '../../services/ticket-service.service';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-custreview',
  standalone: true,
  imports: [NavbarComponent,CommonModule],
  templateUrl: './custreview.component.html',
  styleUrl: './custreview.component.css'
})
export class CustreviewComponent implements OnInit{

   
  stars:number[]=[1,2,3,4,5]  
   rating:number=0
   type:string=''
   comments:string=''
   status:string=''
   t_id:any=''
   err=''
   message:string=''
  constructor(private ticketservice:TicketServiceService,private route:Router, private activatedrtoute:ActivatedRoute)
    {

    }

    ngOnInit()
    {
      const t_id=this.activatedrtoute.snapshot.paramMap.get("tid");
      
      this.ticketservice.givependingusertickets().subscribe((res:any)=>{
        let tar:any={};
        res.forEach((element:any) => {
           if(element.id==t_id)
           {
             tar=element
           }
        });
        this.type=tar.type;
        this.comments=tar.response;
        this.status=tar.status
       this.t_id=tar.ticket_id
        
      },(err:any)=>{
        if(err.status===401)
        {
          this.route.navigate(["/"])
        }
        else if(err.status===500 || err.status===404)
        {
          this.route.navigate(['/error'])
        }
        else{
          
          this.err=err.error.error||'some issue in raising ticket please try again later'
        }
      })

    }

    setrating(index:number)
    {
       //  this.score=index;
       //  console.log(this.score)
    
       console.log(index);
       this.rating=index
       
       
    }
    Reopen()
    {
      this.ticketservice.reopenticket(this.t_id).subscribe((res:any)=>{
       this.message=res.message;
       console.log(this.message)
       this.route.navigate(["/products"])
      },(err:any)=>{
        this.err='Issue in reopening the ticket'
      })
    }

    close()
    {
       console.log(this.rating)
       this.ticketservice.closewithrating(this.rating,this.t_id).subscribe((res:any)=>{
        this.message=res.message;
        console.log(this.message)
        this.route.navigate(["/products"])
       },(err:any)=>{
        this.err='Issue in Closing the ticket'
      })
    }
}
