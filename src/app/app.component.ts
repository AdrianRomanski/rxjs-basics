import {Component, OnInit} from '@angular/core';
import {fromOperator} from "./websites/learnrxjs/operators/creation/fromOperator";
import {catchError, generate} from "rxjs";
import {generateOperator} from "./websites/learnrxjs/operators/creation/generateOperator";
import {ofOperator} from "./websites/learnrxjs/operators/creation/ofOperator";
import {throwOperator} from "./websites/learnrxjs/operators/creation/throwOperator";
import {timerOperator} from "./websites/learnrxjs/operators/creation/timerOperator";
import {catchErrorOperator} from "./websites/learnrxjs/operators/error-handling/catchErrorOperator";
import {retryWhenOperator} from "./websites/learnrxjs/operators/error-handling/retryWhenOperator";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'rxjs';

  ngOnInit(): void {
    // retryWhenOperator();
  }
}
