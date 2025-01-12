import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { log } from 'console';
import { TicketServiceService } from '../../services/ticket-service.service';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-custupdate',
  standalone: true,
  imports: [NavbarComponent,FormsModule,CommonModule],
  templateUrl: './custupdate.component.html',
  styleUrl: './custupdate.component.css'
})
export class CustupdateComponent implements OnInit{
t_id:any=''
categories:any[]=[]
category:any=''
currcategory:any=''
type:any=''
currtype:any=''
types:any[]=[]
desc:string=''
currdesc:string=''
err:string=''
updated:string=''
constructor(private router:ActivatedRoute, private route:Router,private ts:TicketServiceService)
{
  
}

ngOnInit()
{
   this.t_id=this.router.snapshot.paramMap.get('tid')
   console.log(this.t_id);
   
   this.types=["Application Support","Platform Support","Customer Service"]
   this.ts.getticketbyidmk1(this.t_id).subscribe((res:any)=>{
      this.type=res.type
      this.desc=res.description
      this.category=res.category
      this.setdetails()
      
   },(err)=>{
      
   })

  
  
  
 
   
}
setdetails()
{
  if(this.type=="Type1" || this.type=="Application Support")
  {
    this.type="Application Support"   
   this.categories=["User Support","Troubleshooting","Updating"]
  }
  else if(this.type=="Type2" || this.type=="Platform Support")
  {
   this.type="Platform Support" 
   this.categories=["Operating System Management","Hardware Maintenance","Access Control"]
  }
  else{
    this.type="Customer Service"
    this.categories=["Refund","Exchange","Access Control"]
  }
  this.currtype=this.type
  this.currcategory=this.category
  this.currdesc=this.desc
}

changeType(ntype:string)
{
  this.type=ntype
  console.log(this.type);
  
  if(this.type=="Type1" || this.type=="Application Support"  )
  {
    this.type="Application Support"   
   this.categories=["User Support","Troubleshooting","Updating"]
   
  }
  else if(this.type=="Type2" || this.type=="Platform Support")
  {
   this.type="Platform Support" 
   this.categories=["Operating System Management","Hardware Maintenance","Access Control"]
  }
  else{
    this.type="Customer Service"
    this.categories=["Refund","Exchange","Access Control"]
  }
  this.currcategory=this.categories[0]
}

 submit()
 {
   if(!this.currdesc)
   {
      this.err="please enter desc"
   } 
   else if(this.currdesc===this.desc && this.type===this.currtype && this.category===this.currcategory)
    {
      console.log(this.currdesc,this.type, this.category);
       
      this.err="You have not changed anything";
    
       
    
 

    }
    else{
      this.ts.updateticketbycust({category:this.currcategory, type:this.currtype, description:this.currdesc},this.t_id).subscribe((res:any)=>{
        this.updated=res.message
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
      ;
    }
   
    setTimeout(()=>{
       this.err=''
      if(this.updated)
      {
         this.route.navigate(['/products'])
         
      }
    },2000)



    
  
 }

}
