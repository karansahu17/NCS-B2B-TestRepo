import { DistributorComponent } from "./distributor/distributor.component";
import { DealerComponent } from "./dealer/dealer.component";
import { CartComponent } from "./cart/cart.component";
import { LineItemListComponent } from './line-item-list/line-item-list.component';
import { LineItemComponent } from './line-item/line-item.component';
import { OrderListComponent } from './order-list/order-list.component';


import { UserComponent } from './user/user.component';
import { PartyListComponent } from './party-list/party-list.component';

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProductListComponent } from './product-list/product-list.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { UserListComponent } from './user-list/user-list.component';
// import { RoleComponent } from './role/role.component';
import {RoleListComponent} from './role-list/role-list.component';
import { PartyComponent } from './party/party.component';

const routes: Routes = [

  {
    path: '',
    redirectTo: 'welcome',
    pathMatch: 'full'
  },
  {
    path: 'welcome',
    component: WelcomeComponent
  },

  {
    path: 'productlist',
    component: ProductListComponent
  },
  {
    path: 'user',
    component: UserComponent
  },
    {
    path: 'party',
    component: PartyComponent
  },


  {
    path: 'partylist',
    component: PartyListComponent
  },
  {
    path: 'user/:id',
    component: UserComponent
  },
  {
    path: 'userlist',
    component: UserListComponent
  },

  {
    path: 'rolelist',
    component: RoleListComponent
  },

  {
    path: 'orderlist',
    component: OrderListComponent
  },


  {
    path: 'lineitemlist',
    component: LineItemListComponent
  },
  {
    path: 'cart',
    component: CartComponent
  },
  {
    path: 'dealer',
    component: DealerComponent
  },
  {
    path: 'distributor',
    component: DistributorComponent
  }



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
