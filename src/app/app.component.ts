import {Component, OnInit} from '@angular/core';
import {concatMapToOperator} from "./websites/learnrxjs/operators/transformation/concatMapToOperator";
import {exhaustMapOperator} from "./websites/learnrxjs/operators/transformation/exhaustMapOperator";
import {expandOperator} from "./websites/learnrxjs/operators/transformation/expandOperator";
import {groupByOperator} from "./websites/learnrxjs/operators/transformation/groupByOperator";
import {mergeMapOperator} from "./websites/learnrxjs/operators/transformation/mergeMapOperator";
import {mergeScanOperator} from "./websites/learnrxjs/operators/transformation/mergeScanOperator";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'rxjs';

  ngOnInit(): void {
  }
}
