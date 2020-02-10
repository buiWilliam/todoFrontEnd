import { Component, OnInit } from '@angular/core';
import { TodoDataService } from '../service/data/todo-data.service';
import { Router } from '@angular/router';
import { BasicAuthenticationService } from '../service/basic-authentication.service';

export class Todo{
  constructor(
    public id:number,
    public description:string,
    public done:boolean,
    public dueDate: Date
  ){

  }
}

@Component({
  selector: 'app-list-todos',
  templateUrl: './list-todos.component.html',
  styleUrls: ['./list-todos.component.css']
})
export class ListTodosComponent implements OnInit {

  todos:Todo[] 
  message:String
  username:String
  constructor(private todoData:TodoDataService, private router:Router,private basicAuth:BasicAuthenticationService) { }

  ngOnInit() {
    this.username = this.basicAuth.getUser()
    this.refreshTable()
  }

  deleteTodo(id){
      this.todoData.deleteTodo(this.username,id).subscribe(
        response=>{
          this.message = "Delete Successful."
          this.refreshTable()
        }
      )
  }

  updateTodo(id){
    console.log(id)
    this.router.navigate(['listTodos',id])
  }
  addTodo(){
    this.router.navigate(['listTodos',-1])
  }

  refreshTable(){
    this.todoData.retrieveAllTodos(this.username).subscribe(
      response => {
        this.todos = response
      }
    )
  }

}
