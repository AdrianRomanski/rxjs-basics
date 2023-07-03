import {Component, OnInit} from '@angular/core';
import {bufferOperator} from "./websites/learnrxjs/operators/transformation/bufferOperator";
import {bufferCountOperator} from "./websites/learnrxjs/operators/transformation/bufferCountOperator";
import {bufferTimeOperator} from "./websites/learnrxjs/operators/transformation/bufferTimeOperator";
import {bufferToggleOperator} from "./websites/learnrxjs/operators/transformation/bufferToggleOperator";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'rxjs';

  ngOnInit(): void {
    bufferToggleOperator();
  }
}
