import { Routes } from '@angular/router';
import { HomeComponent } from './Home/home-component/home-component';
import { NotFoundComponent } from './core/not-found-component/not-found-component';
import { ProByCatComponent } from './Product/FilterByCat/pro-by-cat-component/pro-by-cat-component';
import { LoveComponent } from './Love/love-component/love-component';
import { CartComponent } from './Cart/cart-component/cart-component';
import { DetailsComponent } from './Product/Details/details-component/details-component';
import { RelatedComponent } from './Product/Details/Related/related-component/related-component';
import { CheckComponent } from './CheckOut/check-component/check-component';
import { RegisterComponent } from './Account/Register/register-component/register-component';
import { LoginComponent } from './Account/Login/login-component/login-component';
import { authGuard } from './Guards/auth-guard';
import { DashboardComponent } from './Dashboard/dashboard-component/dashboard-component';
import { OrderSuccessComponent } from './core/OrderSuccess/order-success-component/order-success-component';
import { Title } from '@angular/platform-browser';
import { MyOrderComponent } from './MyOrder/my-order-component/my-order-component';
import { Component } from '@angular/core';
import { SettingComponent } from './Setting/setting-component/setting-component';
import { OrdersComponent } from './Orders/orders-component/orders-component';
import { ProductBoardComponent } from './ProductBoard/product-board-component/product-board-component';
import { CustomerComponent } from './Customer/customer-component/customer-component';
import { ContentComponent } from './ContentBoard/content-component/content-component';
import { MessageComponent } from './Message/message-component/message-component';
import { AddComponent } from './Product/AddProduct/add-component/add-component';


export const routes: Routes = [
  { path: `home`, component: HomeComponent, title: 'Home' },
  {
    path: `product`,
    loadChildren: () =>
      import(`./Product/productList/product-component/product.routes`).then(
        (a) => a.productRoute
      ),
    canActivate: [authGuard],
  },
  { path: `ProByCat/:id`, component: ProByCatComponent, title: `ProdctsByCat` },
  {
    path: `details/:id`,
    component: DetailsComponent,
    title: `Details`,
    children: [{ path: `related/:catId`, component: RelatedComponent }],
  },
  { path: 'wishlist', component: LoveComponent },
  { path: `cart`, component: CartComponent, title: `Cart` },
  { path: `checkout`, component: CheckComponent, title: `Check Out` },
  { path: `register`, component: RegisterComponent, title: `Sign Up` },
  { path: `login`, component: LoginComponent, title: `Login` },
  {
    path: `board`,
    component: DashboardComponent,
    title: `Admin`,
    children: [
      { path: `setting`, component: SettingComponent, title: `Setting` },
      { path: `orders`, component: OrdersComponent, title: `Orders` },
      {
        path: `products`,
        component: ProductBoardComponent,
        title: `Product Setting`,
      },
      { path: `addPro`, component: AddComponent, title: `Add Product` },
      { path: `customer`, component: CustomerComponent, title: `Customers` },
      { path: `message`, component: MessageComponent, title: `Messages` },
      { path: `dashContent`, component: ContentComponent, title: `Dashboard` },
    ],
  },

  {
    path: `orderSuccess/:id`,
    component: OrderSuccessComponent,
    title: `Order Success`,
  },
  { path: `myOrder`, component: MyOrderComponent, title: `My Orders` },

  { path: '', redirectTo: 'home', pathMatch: 'full' },

  { path: '**', component: NotFoundComponent, title: 'Not Found' },
];
