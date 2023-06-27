import {Component, OnInit} from '@angular/core';
import {fromOperator} from "./websites/learnrxjs/operators/creation/fromOperator";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'rxjs';

  ngOnInit(): void {
    fromOperator();
  }
}
