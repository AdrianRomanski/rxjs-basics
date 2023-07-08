import {Component, OnInit} from '@angular/core';
import {toArrayOperator} from "./websites/learnrxjs/operators/transformation/toArrayOperator";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'rxjs';

  ngOnInit(): void {
    toArrayOperator();
  }
}
