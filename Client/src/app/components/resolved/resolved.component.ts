import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { log } from 'console';
import { TicketServiceService } from '../../services/ticket-service.service';
import { ErrorComponent } from '../error/error.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { NoticketsComponent } from '../notickets/notickets.component';

@Component({
  selector: 'app-resolved',
  standalone: true,
  imports: [NavbarComponent,CommonModule,NoticketsComponent,ErrorComponent],
  templateUrl: './resolved.component.html',
  styleUrl: './resolved.component.css'
})
export class ResolvedComponent {
  tickets:any=[]
  notifs:any[]=[]
    stars:number[]=[1,2,3,4,5]
   rating:number=0;
    
    constructor(private ticketservice:TicketServiceService,private route:Router)
    {

    }
  ngOnInit()
  {
  //   this.tickets.push({
  //     desc:"ksdjcdsn;cmdsmcdsds;sddsl;cmsdm;ldscldsdsl;ldwcmncdkwlcdklcsdln",
  //     type:"typ1",
  //     status:"resolved",
  //     date:"3/5/24",
  //     category:"Amazing",
  //     rating:0
  //   },{
  //   desc:"mgr2",
  //   type:"typ1",
  //   status:"resolved",
  //   date:"3/5/24",
  //   category:"Amazing",
  //   rating:5
  // })
  // this.notifs=this.tickets;
  // this.notifs.forEach((i)=>{
  //     if(i.rating==0)
  //     {
  //       i.sent=false;
  //     }
  //     else{
  //       i.sent=true;
  //     }
  // })

  this.ticketservice.givependingusertickets().subscribe((res:any)=>{
     res.forEach((element:any) => {
         if(element.status!='Open' && element.status!='pending' && element.rating<=0)
         {
           this.notifs.push(element)
         }
         console.log(this.notifs);
         
           
     });
  },(err:any)=>{
     if(err.status===401)
     {
       this.route.navigate(["/"])
     }
     else if(err.status===500)
     { 
      this.route.navigate(["/error"])
     }
  })
}

setrating(index:number,tar:number)
{
   //  this.score=index;
   //  console.log(this.score)

 
   const tarnotif=this.notifs[tar]
   tarnotif.rating=index
  this.rating=index;

   
   
}

submitrating(t_id:string)
{
  console.log(t_id,this.rating)
  // this.ticketservice.updatecustomerrating(rating,t_id).subscribe((res:any)=>{
  //  const tarenotif=this.notifs[tar];
  //  tarenotif.sent=true;
  // });
  
  this.ticketservice.closewithrating(this.rating,t_id).subscribe((res:any)=>{
       this.notifs=this.notifs.filter((i:any)=>i.ticket_id!=t_id)
  })
}

reopen(tar:number)
{
 const tarenotif=this.notifs[tar];
 tarenotif.sent=false;
}

review(tid:any)
{
   this.route.navigate([`/ticketreview/${tid}`])
}

}
