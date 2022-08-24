import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-stepper',
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.scss'],
})
export class StepperComponent implements OnInit {

  step = 1;
  percent = 0
  constructor() { }

  ngOnInit(): void {
    console.log("Stepper ng oninit")
    if(localStorage.getItem("step")){
      this.step = Number(localStorage.getItem("step"));
      this.percent = Number(this.step/8)
    }
    
  }

}
