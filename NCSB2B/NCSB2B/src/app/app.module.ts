import { PartyComponent } from "./party/party.component";
import { DistributorService } from "./distributor.service";
import { DealerService } from "./dealer.service";
import { CartService } from "./cart.service";
import { LineItemService } from './line-item.service';
import { UserService } from './user.service';
import { PartyService } from './party.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductService } from './product.service';
import { HttpClientModule } from '../../node_modules/@angular/common/http';
import { ProductListComponent } from './product-list/product-list.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { WelcomeComponent } from './welcome/welcome.component';

import { PartyListComponent } from './party-list/party-list.component';
import { UserComponent } from './user/user.component';
import { UserListComponent } from './user-list/user-list.component';
// import { RoleComponent } from './role/role.component';
import {RoleListComponent} from './role-list/role-list.component';
import { RoleService } from './role.service';

import { OrderListComponent } from './order-list/order-list.component';
import { OrderService } from './order.service';
import { LineItemComponent } from './line-item/line-item.component';
import { LineItemListComponent } from './line-item-list/line-item-list.component';
import { Valid } from './utility/validator';
import { CartComponent } from './cart/cart.component';
import { DealerComponent } from './dealer/dealer.component';
import { DistributorComponent } from './distributor/distributor.component';




@NgModule({
  declarations: [
    AppComponent,

    ProductListComponent,
    NavBarComponent,
    WelcomeComponent,

    PartyListComponent,
    UserComponent,
    UserListComponent,
    // RoleComponent,
    RoleListComponent,
   PartyComponent,
    OrderListComponent,
    LineItemComponent,
    LineItemListComponent,
    CartComponent,
    DealerComponent,
    DistributorComponent,




  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [ProductService, PartyService, UserService, RoleService, OrderService, LineItemService, Valid, CartService,
     DealerService, DistributorService],
  bootstrap: [AppComponent]
})
export class AppModule { }

