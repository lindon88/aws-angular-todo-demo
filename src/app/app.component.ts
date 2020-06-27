import { Component } from '@angular/core';
import {APIService} from './API.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'AngularAwsTodo';

  constructor(private apiService: APIService) {
    // this.createTodoTest();
    this.getTodoItems();
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
