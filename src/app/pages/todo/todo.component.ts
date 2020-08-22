import { Component, OnInit } from '@angular/core';
import {APIService} from '../../API.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit {

  constructor(private apiService: APIService) {
    // this.createTodoTest();
    this.getTodoItems();
  }

  ngOnInit(): void {
  }

  public getTodoItems(): void {
    this.apiService.ListTodos().then((res) => {
      console.log(res.items);
    });
  }

  public createTodoTest(): void {
    this.apiService.CreateTodo({
      title: 'Test Lindon',
      description: 'Test Lindon'
    });
  }

}
