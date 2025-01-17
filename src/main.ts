import { enableProdMode } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter, Routes } from '@angular/router';
import { provideHttpClient } from '@angular/common/http'; // Import HttpClient provider
import { AppComponent } from './app/app.component';
import { HomeComponent } from './app/components/home/home.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  {
    path: 'add-book',
    loadComponent: () =>
      import('./app/components/book-form/book-form.component').then(
        (m) => m.BookFormComponent
      ),
  },
  {
    path: 'edit-book/:id',
    loadComponent: () =>
      import('./app/components/book-form/book-form.component').then(
        (m) => m.BookFormComponent
      ),
  },
];

bootstrapApplication(AppComponent, {
  providers: [provideRouter(routes), provideHttpClient()],
}).catch((err) => console.error(err));