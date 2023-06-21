import {Component, OnInit} from '@angular/core';
import {concatOperator} from "./websites/learnrxjs/operators/combination/concatOperator";
import {concatAllOperator} from "./websites/learnrxjs/operators/combination/concatAllOperator";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'rxjs';

  ngOnInit(): void {
    concatAllOperator();
  }
}
