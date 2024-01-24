import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { LayoutComponent } from './components/layout/layout.component';
import { HomeComponent } from './components/home/home.component';
import { CollectionComponent } from './components/collection/collection.component';
import { AboutComponent } from './components/about/about.component';
import { ContactComponent } from './components/contact/contact.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { NavbaruserComponent } from './components/navbaruser/navbaruser.component';
import { LayoutuserComponent } from './components/layoutuser/layoutuser.component';
import { CartComponent } from './components/cart/cart.component';
import { OrderComponent } from './components/order/order.component';
import { OrderingComponent } from './components/ordering/ordering.component';
import { NavbarsellerComponent } from './components/navbarseller/navbarseller.component';
import { LayoutsellerComponent } from './components/layoutseller/layoutseller.component';
import { SellerhomeComponent } from './components/sellerhome/sellerhome.component';
import { SellercollectionComponent } from './components/sellercollection/sellercollection.component';
import { SellerordersComponent } from './components/sellerorders/sellerorders.component';
import { SellercustomersComponent } from './components/sellercustomers/sellercustomers.component';
import { SellercategoriesComponent } from './components/sellercategories/sellercategories.component';
import { ProductService } from './components/product.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    LayoutComponent,
    HomeComponent,
    CollectionComponent,
    AboutComponent,
    ContactComponent,
    LoginComponent,
    RegisterComponent,
    NavbaruserComponent,
    LayoutuserComponent,
    CartComponent,
    OrderComponent,
    OrderingComponent,
    NavbarsellerComponent,
    LayoutsellerComponent,
    SellerhomeComponent,
    SellercollectionComponent,
    SellerordersComponent,
    SellercustomersComponent,
    SellercategoriesComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [ProductService],
  bootstrap: [AppComponent]
})
export class AppModule { }
