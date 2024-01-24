import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
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
import { OrderService } from './components/order.service';
import { CustomerService } from './components/customer.service';
import { CategoryService } from './components/category.service';
import { AuthService } from './components/auth.service';
import { HttpClientModule } from '@angular/common/http';
import { UserhomeComponent } from './components/userhome/userhome.component';
import { UsercollectionComponent } from './components/usercollection/usercollection.component';
import { UseraboutComponent } from './components/userabout/userabout.component';
import { UsercontactComponent } from './components/usercontact/usercontact.component';
import { UserComponent } from './components/user/user.component';

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
    UserhomeComponent,
    UsercollectionComponent,
    UseraboutComponent,
    UsercontactComponent,
    UserComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [ProductService,
  OrderService,
CustomerService,
CategoryService,
AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
