import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { BookFormComponent } from './components/book-form/book-form.component';

export const appRoutes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'add-book', component: BookFormComponent },
  { path: 'edit-book/:id', component: BookFormComponent },
];
