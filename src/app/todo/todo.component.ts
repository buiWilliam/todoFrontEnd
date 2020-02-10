import { Component, OnInit } from '@angular/core';
import { TodoDataService } from '../service/data/todo-data.service';
import { Todo } from '../list-todos/list-todos.component';
import { ActivatedRoute, Router } from '@angular/router';
import { BasicAuthenticationService } from '../service/basic-authentication.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {

  id:number
  todo: Todo
  username:String

  constructor(private todoService:TodoDataService, private route:ActivatedRoute, private router: Router,private basicAuth:BasicAuthenticationService) { }

  ngOnInit() {
    this.id=this.route.snapshot.params["id"]
    this.todo = new Todo(this.id,"",false,new Date())
    this.username = this.basicAuth.getUser()
    if(this.id!=-1)
    this.todoService.retrieveTodo(this.username,this.id).subscribe(response=>{
      this.todo = response;
    })
  }

  saveTodo(){
    if(this.id==-1){
      this.todoService.createTodo(this.username,this.todo).subscribe(response => this.router.navigate(["listTodos"]))
    }
    else
    this.todoService.updateTodo(this.username,this.id,this.todo).subscribe(
      response => this.router.navigate(["listTodos"])
    )
  }

}
