import {Component, OnInit} from '@angular/core';
import {concatOperator} from "./websites/learnrxjs/operators/combination/concatOperator";
import {concatAllOperator} from "./websites/learnrxjs/operators/combination/concatAllOperator";
import {endWithOperator} from "./websites/learnrxjs/operators/combination/endWithOperator";
import {forkJoinOperator} from "./websites/learnrxjs/operators/combination/forkJoinOperator";
import {mergeOperator} from "./websites/learnrxjs/operators/combination/mergeOperator";
import {mergeAllOperator} from "./websites/learnrxjs/operators/combination/mergeAllOperator";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'rxjs';

  ngOnInit(): void {
    mergeAllOperator();
  }
}
