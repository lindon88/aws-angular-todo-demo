import {Component, OnInit} from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-time-display',
  templateUrl: './time-display.component.html',
  styleUrls: ['./time-display.component.scss']
})
export class TimeDisplayComponent implements OnInit {
  public time: string;
  public date: string;

  constructor() {
  }

  ngOnInit(): void {
    this.initializeTime();
    this.timer();
  }

  private timer(): void {
    setInterval(() => {
      this.time = moment().format('LT');
    }, 1000);
  }

  private initializeTime(): void {
    const now = moment();
    this.time = now.format('LT');
    this.date = now.format('LL');
  }
}
