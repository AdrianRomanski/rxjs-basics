import {Component, OnInit} from '@angular/core';
import {publishOperator} from "./websites/learnrxjs/operators/multicasting/publishOperator";
import {multicastOperator} from "./websites/learnrxjs/operators/multicasting/multicastOperator";
import {shareReplayOperator} from "./websites/learnrxjs/operators/multicasting/shareReplayOperator";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'rxjs';

  ngOnInit(): void {
    shareReplayOperator();
  }
}
