import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { MapComponent } from './components/map/map.component';
import { FullcalendarComponent } from './components/fullcalendar/fullcalendar.component';
import { ChartComponent } from './components/chart/chart.component';
import { AddEditProductComponent } from './components/add-edit-product/add-edit-product.component';
import { ListProductsComponent } from './components/list-products/list-products.component';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full'},
  { path: '', component: ListProductsComponent },
  { path: 'map', component: MapComponent },
  { path: 'fullCalendar', component: FullcalendarComponent },
  { path: 'chart', component: ChartComponent },
  { path: 'add', component: AddEditProductComponent },
  { path: 'edit/:id', component: AddEditProductComponent },
  { path: '**', redirectTo: '', pathMatch: "full" }
];
