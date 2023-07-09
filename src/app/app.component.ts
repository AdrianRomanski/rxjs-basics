import {Component, OnInit} from '@angular/core';
import {delayOperator} from "./websites/learnrxjs/operators/utility/delayOperator";
import {dematerializeOperator} from "./websites/learnrxjs/operators/utility/dematerializeOperator";
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'rxjs';

  ngOnInit(): void {
    dematerializeOperator();
  }
}
