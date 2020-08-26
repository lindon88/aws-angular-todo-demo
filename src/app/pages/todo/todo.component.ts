import {Component, OnInit} from '@angular/core';
import {APIService, UpdateTodoInput} from '../../API.service';
import {MatDialog} from '@angular/material/dialog';
import {ConfirmDialogComponent} from '../../components/confirm-dialog/confirm-dialog.component';
import {Router} from '@angular/router';
import * as moment from 'moment';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit {
  public todoList: any[];
  public showProgressBar = true;
  public searchValue: string;
  public visibleFilter: string;

  constructor(private apiService: APIService, private dialog: MatDialog, private router: Router) {
  }

  ngOnInit(): void {
    this.createSubscriptions();
    this.getTodoItems();
  }

  public async getTodoItems(): Promise<any> {
    this.todoList = [];
    const response = await this.apiService.ListTodos();
    setTimeout(() => {
      this.showProgressBar = false;
    }, 500);

    if (!response && !response.items) {
      return;
    }

    this.todoList = response.items;
    this.todoList.forEach(x => {
      x.favIcon = 'favorite_border';
      if (x.isFavorite) {
        x.favIcon = 'favorite';
      }

      if (x.dueDate) {
        x.formattedDueDate = moment(x.dueDate).format('LL');
      }
    });

    console.log(this.todoList);
  }

  public async toggleCompleteStatus(todoItem): Promise<any> {
    if (!todoItem) {
      return;
    }

    const updateTodo = {id: todoItem.id, isCompleted: todoItem.isCompleted};
    await this.apiService.UpdateTodo(updateTodo);
  }

  public async toggleFavoriteStatus(todoItem, event): Promise<any> {
    if (event) {
      event.preventDefault();
    }

    todoItem.isFavorite = !todoItem.isFavorite;
    todoItem.favIcon = todoItem.isFavorite ? 'favorite' : 'favorite_border';
    return await this.apiService.UpdateTodo({id: todoItem.id, isFavorite: todoItem.isFavorite});
  }

  public editTodo(todo, event): void {
    if (event) {
      event.stopPropagation();
    }

    if (!todo || !todo.id) {
      return;
    }

    this.router.navigate(['/todo-edit', todo.id]);
  }

  public async removeTodo(todoItem, event): Promise<any> {
    if (event) {
      event.stopPropagation();
    }

    if (!todoItem || !todoItem.id) {
      return;
    }

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Remove Todo item',
        description: 'Are you sure you want to remove todo item!'
      }
    });

    dialogRef.afterClosed().subscribe(async result => {
      if (result) {
        this.showProgressBar = true;
        const res = await this.apiService.DeleteTodo({id: todoItem.id});
      }
    });

  }

  private createSubscriptions(): any {
    this.apiService.OnDeleteTodoListener.subscribe(this.handleDelete.bind(this));
  }

  private async handleDelete(x): Promise<any> {
    await this.getTodoItems();
  }

}
