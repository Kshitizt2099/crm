import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { log } from 'node:console';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TicketServiceService {

  private pending = new Subject<void>();
  notifyObservable$ = this.pending.asObservable();

  constructor(private http:HttpClient) {

  }
 

  createticket(ticketdata:any):Observable<any>
  {
   ticketdata.u_id = localStorage.getItem("u_id") || '';
  console.log(ticketdata);
  
   // Retrieve token from localStorage and create headers
   let token = localStorage.getItem("token") || '';
   const headers = new HttpHeaders({
     'Authorization': `Bearer ${token}`
   });

   // Make the POST request with headers
   return this.http.post("http://localhost:3000/ticket/raise", ticketdata, { headers: headers });
  }

  gettickets(changed:boolean=false):Observable<any>
  {
     // if(localStorage.getItem("Tickets") && !changed)
     // {
     //    let ticketsArray = [];
     //    const ticketsArrayString = localStorage.getItem('Tickets');
     //   if (ticketsArrayString) 
     //   {
     //       ticketsArray = JSON.parse(ticketsArrayString);
     //       const ticketsObject = { tickets: ticketsArray };

        
        
     //   return of(ticketsObject);
     //    }
        
     // }
     // console.log("on change call hua hai");
     
     
     return this.http.get("http://localhost:4500/gettickets")
  }
  getTicketInfo(id:string|undefined):Observable<any>
  {
     
     return this.http.get(`http://localhost:4500/getticketinfo/${id}`)
  }
  changeStatus(status:string,t_id:string)
  {
     const data={status,t_id} 
     return this.http.post("http://localhost:4500/changestatus",data)
  }

  givependingusertickets():Observable<any>
  {
    // const u_id=localStorage.getItem("u_id")
   //   return this.http.get(`http://localhost:4500/getpendingtickets/${u_id}`);
   let token = localStorage.getItem("token") || '';
   const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get(`http://localhost:3000/ticket/view`,{headers:headers})
  }

  givecompletedusertickets():Observable<any>
  {
     const u_id=localStorage.getItem("u_id")
     return this.http.get(`http://localhost:4500/getcompletedtickets/${u_id}`);
  }
  updatecustomerrating(rating:number,t_id:string)
  {
     return this.http.post(`http://localhost:4500/updaterating/`,{rating,t_id})
  }

  deleteticket(t_id:any)
  {
   let token = localStorage.getItem("token") || '';
   const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });   
   return this.http.delete(`http://localhost:3000/ticket/delete/${t_id}`,{headers:headers})
  }

  reopenticket(t_id:any)
  {
   let token = localStorage.getItem("token") || '';
   console.log(token)
   const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });   
   return this.http.put(`http://localhost:3000/ticket/reopen/${t_id}`,{},{headers:headers})
  }

  closewithrating(rating:any,t_id:any)
  {
   let token = localStorage.getItem("token") || '';
   console.log(token)
   const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });   
   return this.http.put(`http://localhost:3000/ticket/rate/${t_id}`,{rating},{headers:headers})
  }

employeelogin(data:any)
{
  data.role='employee'
  return this.http.post("http://localhost:3000/auth/login",data);
}

updatestatusofticket(response:string,ticket_id:any,status:any)
{
  let token = localStorage.getItem("token") || '';
  console.log(token)
  const headers = new HttpHeaders({
     'Authorization': `Bearer ${token}`
   });

  return this.http.put(`http://localhost:3000/ticket/update-status`,{ticket_id,status,response},{headers})
}

notifypending()
{
  this.pending.next()

}
getticketreport()
{
  let token = localStorage.getItem("token") || '';
  
  const headers = new HttpHeaders({
     'Authorization': `Bearer ${token}`
   });

  return this.http.get(`http://localhost:3000/report/generate`,{headers});
}

editpassword(data:any)
{
  let token = localStorage.getItem("token") || '';
  
  const headers = new HttpHeaders({
     'Authorization': `Bearer ${token}`
   });

   return this.http.patch(`http://localhost:3000/ticket/change-password`,data,{headers});
}

getuserinfo()
{
  
  let token = localStorage.getItem("token") || '';
  
  const headers = new HttpHeaders({
     'Authorization': `Bearer ${token}`
   });
  return this.http.get('http://localhost:3000/customer/details',{headers});
}

getticketbyidmk1(t_id:any)
{
  let token = localStorage.getItem("token") || '';
  
  const headers = new HttpHeaders({
     'Authorization': `Bearer ${token}`
   });
   
   return this.http.get(`http://localhost:3000/ticket/${t_id}`,{headers});
}

uploaddatamk1(file:any)
{
  
  let token = localStorage.getItem("token") || '';
  const formdata=new FormData();
  formdata.append('file',file);
  const headers = new HttpHeaders({
     'Authorization': `Bearer ${token}`
   });
  return this.http.post(`http://localhost:3000/import/import`,formdata,{headers:headers})
}

updateticketbycust(data:any,t_id:any)
{
  let token = localStorage.getItem("token") || '';
  
  const headers = new HttpHeaders({
     'Authorization': `Bearer ${token}`
   });
  
   
   return this.http.patch(`http://localhost:3000/ticket/update/${t_id}`,data,{headers})
}
}