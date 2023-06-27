import {Component, OnInit} from '@angular/core';
import {fromOperator} from "./websites/learnrxjs/operators/creation/fromOperator";
import {generate} from "rxjs";
import {generateOperator} from "./websites/learnrxjs/operators/creation/generateOperator";
import {ofOperator} from "./websites/learnrxjs/operators/creation/ofOperator";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'rxjs';

  ngOnInit(): void {
    ofOperator();
  }
}
