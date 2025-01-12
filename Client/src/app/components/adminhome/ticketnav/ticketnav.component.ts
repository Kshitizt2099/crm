import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TicketServiceService } from '../../../services/ticket-service.service';

@Component({
  selector: 'app-ticketnav',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ticketnav.component.html',
  styleUrl: './ticketnav.component.css'
})
export class TicketnavComponent {
  pendinglength:number=0;
  notifslength:number=0;
  mobileview:boolean=false

   constructor(private route:Router, private ts:TicketServiceService)
   {

   }
 ngOnInit()
 {
   this.ts.givependingusertickets().subscribe((res:any)=>{
     console.log(res)
        res.forEach((i:any) => {
           
           if(i.status=='Open')
           { console.log('he');
           
             this.pendinglength++;
           }
        });
  })
  
 }
  
  
  setmobileview()
  {
    this.mobileview=!this.mobileview
  
  }

  gopending()
  {
     this.route.navigate(["/pending"])
  }
  gocompleted()
  {
    this.route.navigate(["/completed"])
  }
  goresolved()
  { 
    this.route.navigate(["/resolved"])
  }

  goprofile()
  {
    this.route.navigate(["/profile"])
  }
  gologout()
  {
    this.route.navigate(["/"]) 
  }

}
