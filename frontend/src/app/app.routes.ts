import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home.component';
import { ServicesComponent } from './pages/services.component';
import { DoctorComponent } from './pages/doctor.component';
import { AboutComponent } from './pages/about.component';
import { AppointmentComponent } from './pages/appointment.component';
import { AdminComponent } from './pages/admin.component';
import { SuperAdminComponent } from './pages/super-admin.component';
import { SubAdminComponent } from './pages/sub-admin.component';
import { SuperAdminLoginComponent } from './pages/super-admin-login.component';
import { SubAdminLoginComponent } from './pages/sub-admin-login.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'services', component: ServicesComponent },
  { path: 'doctor', component: DoctorComponent },
  { path: 'about', component: AboutComponent },
  { path: 'appointment', component: AppointmentComponent },
  { path: 'admin', component: AdminComponent },
  { path: 'super-admin-login', component: SuperAdminLoginComponent },
  { path: 'sub-admin-login', component: SubAdminLoginComponent },
  { path: 'super-admin', component: SuperAdminComponent },
  { path: 'sub-admin', component: SubAdminComponent },
  { path: '**', redirectTo: '' },
];
