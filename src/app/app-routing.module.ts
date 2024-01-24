import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
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
import { SellercategoriesComponent } from './components/sellercategories/sellercategories.component';
import { SellercustomersComponent } from './components/sellercustomers/sellercustomers.component';

const routes: Routes = [
  {
    path:'navbar',
    component:NavbarComponent
  },
  {
    path:'footer',
    component:FooterComponent
  },
  {
    path:'layout',
    component:LayoutComponent
  },
  {
    path:'home',
    component:HomeComponent
  },
  {
    path:'collection',
    component:CollectionComponent
  },
  {
    path:'about',
    component:AboutComponent
  },
  {
    path:'contact',
    component:ContactComponent
  },
  {
    path:'login',
    component:LoginComponent
  },
  {
    path:'register',
    component:RegisterComponent
  },
  {
    path:'navbaruser',
    component:NavbaruserComponent
  },
  {
    path:'layoutuser',
    component:LayoutuserComponent
  },
  {
    path:'cart',
    component:CartComponent
  },
  {
    path:'order',
    component:OrderComponent
  },
  {
    path:'ordering',
    component:OrderingComponent
  },
  {
    path:'navbarseller',
    component:NavbarsellerComponent
  },
  {
    path:'layoutseller',
    component:LayoutsellerComponent
  },
  {
    path:'sellerhome',
    component:SellerhomeComponent
  },
  {
    path:'sellercollection',
    component:SellercollectionComponent
  },
  {
    path:'sellerorders',
    component:SellerordersComponent
  },
  {
    path:'sellercustomers',
    component:SellercustomersComponent
  },
  {
    path:'sellercategories',
    component:SellercategoriesComponent
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
