import {Component, OnInit} from '@angular/core';
import {filterOperator} from "./websites/learnrxjs/operators/filtering/filterOperator";
import {firstOperator} from "./websites/learnrxjs/operators/filtering/firstOperator";
import {ignoreElementsOperator} from "./websites/learnrxjs/operators/filtering/ignoreElementsOperator";
import {lastOperator} from "./websites/learnrxjs/operators/filtering/lastOperator";
import {sampleOperator} from "./websites/learnrxjs/operators/filtering/sampleOperator";
import {singleOperator} from "./websites/learnrxjs/operators/filtering/singleOperator";
import {skipOperator} from "./websites/learnrxjs/operators/filtering/skipOperator";
import {skipUntilOperator} from "./websites/learnrxjs/operators/filtering/skipUntilOperator";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'rxjs';

  ngOnInit(): void {
    // skipUntilOperator();
  }
}
