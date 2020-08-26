import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, FormControl, Validators} from '@angular/forms';
import {APIService} from '../../API.service';
import {ActivatedRoute, Router} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {ConfirmDialogComponent} from '../../components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-todo-edit',
  templateUrl: './todo-edit.component.html',
  styleUrls: ['./todo-edit.component.scss']
})
export class TodoEditComponent implements OnInit {
  public formGroup: FormGroup;
  public todoId: string;
  public showProgressBar: boolean;

  constructor(private apiService: APIService, private router: Router,
              private formBuilder: FormBuilder, private route: ActivatedRoute,
              private dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(p => {
      if (p && p.id) {
        this.todoId = p.id;
      }
      this.createForm();
    });
  }

  public cancel(event): void {
    if (event) {
      event.preventDefault();
    }

    this.router.navigate(['/todo']);
  }

  public async onSubmit(value): Promise<any> {
    if (!value) {
      return;
    }

    if (!this.todoId){
      await this.apiService.CreateTodo(value);
    } else {
      value.id = this.todoId;
      await this.apiService.UpdateTodo(value);
    }
    return this.router.navigate(['/todo']);
  }

  private async createForm(): Promise<any> {
    this.initializeEmptyForm();
    if (this.todoId) {
      this.showProgressBar = true;
      this.fillForm();
    }
  }

  private initializeEmptyForm(): void {
    this.formGroup = this.formBuilder.group({
      title: [null, Validators.required],
      description: [null, Validators.required],
      dueDate: null,
      isFavorite: false,
      isCompleted: false
    });
  }

  private async fillForm(): Promise<any> {
    const data = await this.apiService.GetTodo(this.todoId);
    this.showProgressBar = false;
    if (!data) {
      this.showErrorDialog('Could not find an todo item with submitted id!');
      return;
    }
    this.formGroup.setValue({
      title: data.title,
      description: data.description,
      dueDate: data.dueDate,
      isCompleted: data.isCompleted,
      isFavorite: data.isFavorite
    });
  }

  private showErrorDialog(message): void{
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Error',
        description: message
      }
    });

    dialogRef.afterClosed().subscribe(async result => {
      if (result) {
        this.router.navigate(['/todo']);
      }
    });
  }

}
