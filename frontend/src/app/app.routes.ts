import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { MapComponent } from './components/map/map.component';
import { FullcalendarComponent } from './components/fullcalendar/fullcalendar.component';
import { ChartComponent } from './components/chart/chart.component';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full'},
  { path: '', component: HomeComponent },
  { path: 'map', component: MapComponent },
  { path: 'fullCalendar', component: FullcalendarComponent },
  { path: 'chart', component: ChartComponent },
  { path: '**', redirectTo: '' }
];
