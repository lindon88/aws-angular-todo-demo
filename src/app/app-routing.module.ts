import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AboutComponent} from './pages/about/about.component';
import {TodoComponent} from './pages/todo/todo.component';
import {PageNotFoundComponent} from './pages/page-not-found/page-not-found.component';
import {TodoEditComponent} from './pages/todo-edit/todo-edit.component';


const routes: Routes = [
  {path: 'todo', component: TodoComponent},
  {path: 'todo-edit', component: TodoEditComponent},
  {path: 'todo-edit/:id', component: TodoEditComponent},
  { path: 'about', component: AboutComponent},
  { path: '', redirectTo: '/todo', pathMatch: 'full'},
  { path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
