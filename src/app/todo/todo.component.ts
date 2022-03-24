import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DataService } from '../core/data.service';
import { ITodo } from '../shared/interface';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {

  initialTodo: ITodo = {
    id: "",
    description: "",
    status: false
  };

  public todos: ITodo[] = [];
  public selectedTodos: ITodo[] = [];
  protected todo: ITodo = this.initialTodo;
  public done: boolean = false;

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.getTodos();
  }

  public addTodo(addTodoForm: NgForm): void {
    this.dataService.addTodo(addTodoForm.value).subscribe(
      (response: string) => {
        console.log(response);
        addTodoForm.reset();
        this.getTodos();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public getTodos(): void {
    this.dataService.getTodos().subscribe(
      (response: ITodo[]) => {
        this.todos=response;
        this.selectedTodos = response.filter((t) => t.status === this.done);
        console.log(response);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public deleteTodo(id: string): void {
    this.dataService.deleteTodo(id).subscribe(
      (response: string) => {
        console.log(response);
        this.getTodos();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public toggle(todo: ITodo, id: string):void {
    this.todo = todo;
    this.todo.status = !todo.status;
    this.dataService.updateTodo(this.todo, id).subscribe(
      (response: string) => {
        console.log(response);
        this.getTodos();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
    this.todo = this.initialTodo;
  }

  public changeTab(value: boolean):void {
    if (value) {
      this.done = !this.done;
      this.selectedTodos = this.todos.filter((t) => t.status === this.done);
    }
  }

}
