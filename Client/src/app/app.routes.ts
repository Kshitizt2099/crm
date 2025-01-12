import { Component } from '@angular/core';
import { Routes } from '@angular/router';
import { AdminComponent } from './components/admin/admin.component';
import { AdminhomeComponent } from './components/adminhome/adminhome.component';
import { TicketdetailsComponent } from './components/adminhome/ticketdetails/ticketdetails.component';
import { CompletedInfoComponent } from './components/completed-info/completed-info.component';
import { CompletedComponent } from './components/completed/completed.component';
import { CreateComponent } from './components/create/create.component';
import { CustreviewComponent } from './components/custreview/custreview.component';
import { CustupdateComponent } from './components/custupdate/custupdate.component';
import { ErrorComponent } from './components/error/error.component';
import { LoginComponent } from './components/login/login.component';
import { NoticketsComponent } from './components/notickets/notickets.component';
import { PendingComponent } from './components/pending/pending.component';
import { ProductsComponent } from './components/products/products.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ResolvedComponent } from './components/resolved/resolved.component';
import { TicketInfoComponent } from './components/ticket-info/ticket-info.component';

export const routes: Routes = [
    {
      path:"",
      component:LoginComponent
    },
    {
      path:"adlog",
      component:AdminComponent
    },
    {
       path:"adhome",
       component:AdminhomeComponent
    },
    {
      path:"create",
      component:CreateComponent
    },
    {
      path:"products",
      component:ProductsComponent

    },
    {
      path:"tinfo/:type",
      component:TicketInfoComponent
    },
    {
      path:'completed',
      component:CompletedComponent

    },
    {
      path:'pending',
      component:PendingComponent
    },
    {
      path:'resolved',
      component:ResolvedComponent
    },
    {
      path:'profile',
      component:ProfileComponent
    },
    {
      path:"ticketedit/:tid",
      component:CustupdateComponent
    
    },
    {
      path:"ticketreview/:tid",
      component:CustreviewComponent
    },
    {
      path:"ticketcompleted/:tid",
      component:CompletedInfoComponent
    },
    {
      path:"ticketdetails/:tid",
      component:TicketdetailsComponent

    },
    {
      path:"error",
      component:ErrorComponent
    }
];
