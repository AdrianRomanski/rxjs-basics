import {Component, OnInit} from '@angular/core';
import {filterOperator} from "./websites/learnrxjs/operators/filtering/filterOperator";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'rxjs';

  ngOnInit(): void {
    filterOperator();
  }
}
