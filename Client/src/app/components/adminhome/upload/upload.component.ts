import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TicketServiceService } from '../../../services/ticket-service.service';

@Component({
  selector: 'app-upload',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './upload.component.html',
  styleUrl: './upload.component.css'
})
export class UploadComponent {

  chosen:string=''
   file:any=''
   err:string=''
   uploaded:string='';
   constructor(private ts:TicketServiceService)
   {

   }
    filehandle(event:any)
    {
      this.chosen=event.target.files[0].name;
      this.file=event.target.files[0]
      let format="";
      for(let i=this.chosen.length-1;i>=0;i--)
      {
        if(this.chosen[i]=='.')
        {
          break;
        }
        format+=this.chosen[i];
      }
      format=format.split('').reverse().join('')
      if(!["xlsx","csv"].includes(format))
      {
        console.log(format)
        this.err="format not supported"
        setTimeout(()=>{
          this.err=''
        },2000)
      }
      else{
        this.err=''
      }
    }

    submit()
    {
      if(!this.chosen)
      {
        this.err="Please choose a file"
        return
      }
     console.log(this.chosen)
      // this.adminsevice.uploadExcel(this.file).subscribe((res:any)=>{
      //    this.uploaded=res.msg;
      //    console.log(res);
      //    if(res.duplicates.length>0)
      //    {
      //     this.uploaded=res.msg + "But there were duplicates too";
      //    }
      // },(err:any)=>{
      //    this.err=(err.error.msg)
      // });
      this.ts.uploaddatamk1(this.file).subscribe((res:any)=>{
        this.uploaded="uploaded"
        console.log("done");
        
      setTimeout(()=>{
        this.uploaded=''
        this.chosen=''
        this.file=''
      },2000)

      },(err:any)=>{
        this.err=err.error.error||"Error in uploading"
        setTimeout(() => {
          this.err=''
        }, 1000);
      })
      
    }

}
