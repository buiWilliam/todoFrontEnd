import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { ErrorComponent } from './error/error.component';
import { ListTodosComponent } from './list-todos/list-todos.component';
import { LogoutComponent } from './logout/logout.component';
import { TodoComponent } from './todo/todo.component'
import { RouteGuardService } from './service/route-guard.service';
import { from } from 'rxjs';


const routes: Routes = [
  {path:"",component:LoginComponent},
  {path:"login",component:LoginComponent},
  {path:"logout",component:LogoutComponent,canActivate:[RouteGuardService]},
  {path:"welcome/:name",component:WelcomeComponent,canActivate:[RouteGuardService]},
  {path:"listTodos",component:ListTodosComponent,canActivate:[RouteGuardService]},
  {path:"listTodos/:id",component:TodoComponent,canActivate:[RouteGuardService]},
  {path:"**",component:ErrorComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
