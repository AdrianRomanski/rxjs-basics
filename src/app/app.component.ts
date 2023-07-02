import {Component, OnInit} from '@angular/core';
import {filterOperator} from "./websites/learnrxjs/operators/filtering/filterOperator";
import {firstOperator} from "./websites/learnrxjs/operators/filtering/firstOperator";
import {ignoreElementsOperator} from "./websites/learnrxjs/operators/filtering/ignoreElementsOperator";
import {lastOperator} from "./websites/learnrxjs/operators/filtering/lastOperator";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'rxjs';

  ngOnInit(): void {
    lastOperator();
  }
}
