import {Component, OnInit} from '@angular/core';
import {concatOperator} from "./websites/learnrxjs/operators/combination/concatOperator";
import {concatAllOperator} from "./websites/learnrxjs/operators/combination/concatAllOperator";
import {endWithOperator} from "./websites/learnrxjs/operators/combination/endWithOperator";
import {forkJoinOperator} from "./websites/learnrxjs/operators/combination/forkJoinOperator";
import {mergeOperator} from "./websites/learnrxjs/operators/combination/mergeOperator";
import {mergeAllOperator} from "./websites/learnrxjs/operators/combination/mergeAllOperator";
import {pairwiseOperator} from "./websites/learnrxjs/operators/combination/pairwiseOperator";
import {raceOperator} from "./websites/learnrxjs/operators/combination/raceOperator";
import {withLatestFromOperator} from "./websites/learnrxjs/operators/combination/withLatestFromOperator";
import {zipOperator} from "./websites/learnrxjs/operators/combination/zipOperator";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'rxjs';

  ngOnInit(): void {
    zipOperator();
  }
}
