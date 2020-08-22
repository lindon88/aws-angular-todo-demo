import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AboutComponent} from './pages/about/about.component';
import {TodoComponent} from './pages/todo/todo.component';
import {PageNotFoundComponent} from './pages/page-not-found/page-not-found.component';


const routes: Routes = [
  {path: 'todo', component: TodoComponent},
  { path: 'about', component: AboutComponent},
  { path: '', redirectTo: '/todo', pathMatch: 'full'},
  { path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
