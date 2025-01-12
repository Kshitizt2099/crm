import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TicketServiceService } from '../../services/ticket-service.service';
import { NavbarComponent } from '../navbar/navbar.component';
import { NoticketsComponent } from '../notickets/notickets.component';

@Component({
  selector: 'app-completed',
  standalone: true,
  imports: [NavbarComponent,CommonModule,NoticketsComponent],
  templateUrl: './completed.component.html',
  styleUrl: './completed.component.css'
})
export class CompletedComponent {
  tickets:any=[]
  notifs:any[]=[]
    stars:number[]=[1,2,3,4,5]
   
    
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
         if(element.status!='Open' && element.status!='pending' && element.rating>0)
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
 })
  

}

setrating(index:number,tar:number)
{
   //  this.score=index;
   //  console.log(this.score)

   console.log(index,tar);
   const tarnotif=this.notifs[tar]
   tarnotif.rating=index
   
   
}

submitrating(rating:number,t_id:string,tar:number)
{
  console.log(rating,t_id)
  this.ticketservice.updatecustomerrating(rating,t_id).subscribe((res:any)=>{
   const tarenotif=this.notifs[tar];
   tarenotif.sent=true;
  });
}

reopen(tar:number)
{
 const tarenotif=this.notifs[tar];
 tarenotif.sent=false;
}

review(tid:any)
{
   this.route.navigate([`/ticketcompleted/${tid}`])
}





}
