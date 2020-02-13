import { Component, OnInit } from '@angular/core';
import { TodoDataService } from '../service/data/todo-data.service';
import { Router } from '@angular/router';
import { BasicAuthenticationService } from '../service/basic-authentication.service';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import listPlugin from '@fullcalendar/list';
import { Calendar } from '@fullcalendar/core';

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
  
  events:any[]
  option:any;

  calendar:Calendar

  constructor(private todoData:TodoDataService, private router:Router,private basicAuth:BasicAuthenticationService) { }

  ngOnInit() {
    this.username = this.basicAuth.getUser()
    
    let self = this
    this.option = {
      customButtons: {
        new: {
          text: 'New Todo',
          click: function() {
            self.addTodo()
          }
        }
      },
      plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin],
      header: {
          left: 'prev,next',
          center: 'title',
          right: 'new'
      },
      timeZone:'UTC',
      aspectRatio:'1.75',
      editable:true,
      eventClick: function(info) {
        self.updateTodo(info.event.id)
      },
      eventRender: function(info){
        if(info.event.done)
          info.el.style.borderColor = "green"
      }
    }

    this.calendar = new Calendar(document.getElementById("calendar"),this.option)
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
    this.calendar.removeAllEvents();
    this.todoData.retrieveAllTodos(this.username).subscribe(
      response => {
        this.todos = response
        for(let todo of this.todos){
          this.calendar.addEvent({id:todo.id,title:todo.description,start:todo.dueDate,done:todo.done,allDay:true})
        }    
        
      }
    )
    this.calendar.render()
  }

  refreshCalendar(){
    console.log("click")
    this.calendar.render()
  }

}
