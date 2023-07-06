import {Component, OnInit} from '@angular/core';
import {concatMapToOperator} from "./websites/learnrxjs/operators/transformation/concatMapToOperator";
import {exhaustMapOperator} from "./websites/learnrxjs/operators/transformation/exhaustMapOperator";
import {expandOperator} from "./websites/learnrxjs/operators/transformation/expandOperator";
import {groupByOperator} from "./websites/learnrxjs/operators/transformation/groupByOperator";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'rxjs';

  ngOnInit(): void {
    groupByOperator();
  }
}
