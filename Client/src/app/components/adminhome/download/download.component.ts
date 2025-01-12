import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TicketServiceService } from '../../../services/ticket-service.service';

@Component({
  selector: 'app-download',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './download.component.html',
  styleUrl: './download.component.css'
})
export class DownloadComponent {
   err:string=''
   downloaded:boolean=false
  constructor(private ts:TicketServiceService)
  {

  }
   download()
   {
     this.ts.getticketreport().subscribe((res)=>{
       
       this.downloaded=true
       setTimeout(()=>{
         this.downloaded=false
       },
       2000)
     },(err)=>{
       console.log(err)
       this.err="Error in downloading ticket,plz try again later"
       setTimeout(()=>{
        this.err=''
      },
      2000)
     })  
   }
}
