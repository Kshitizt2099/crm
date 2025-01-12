import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TicketServiceService } from '../../services/ticket-service.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit{

  pendinglength:number=0;
  notifslength:number=0;
  mobileview:boolean=false

   constructor(private route:Router, private ts:TicketServiceService)
   {

   }
 ngOnInit()
 {
   
  this.ts.givependingusertickets().subscribe((res:any)=>{
     
        res.forEach((i:any) => {
           
           if(i.status=='Open')
           { 
           
             this.pendinglength++;
           }
           else if(i.rating<=0){
             console.log(i);
             
            this.notifslength++;

           }
        });
  })
  this.ts.notifyObservable$.subscribe((res)=>{
    this.pendinglength=0;
    this.notifslength=0;
      this.ts.givependingusertickets().subscribe((res:any)=>{
        res.forEach((i:any) => {
            
            
          if(i.status=='Open')
          { 
            console.log("Called",i);
            this.pendinglength++;
          }
          else if(i.rating<=0){
            console.log(i);
            
           this.notifslength++;

          }
       });

      })

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
    localStorage.clear()
    this.route.navigate(["/"]) 
  }
}
