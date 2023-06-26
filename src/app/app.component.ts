import {Component, OnInit} from '@angular/core';
import {defaultIfEmptyOperator} from "./websites/learnrxjs/operators/conditional/defaultIfEmptyOperator";
import {everyOperator} from "./websites/learnrxjs/operators/conditional/everyOperator";
import {iifOperator} from "./websites/learnrxjs/operators/conditional/iifOperator";
import {sequenceEqualOperator} from "./websites/learnrxjs/operators/conditional/sequenceEqualOperator";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'rxjs';

  ngOnInit(): void {
    sequenceEqualOperator();
  }
}
