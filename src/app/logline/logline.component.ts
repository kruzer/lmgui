import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-logline',
  templateUrl: './logline.component.html',
  styleUrls: ['./logline.component.css']
})
export class LoglineComponent implements OnInit {

  @Input() logData: any;
  @Output() delEvent = new EventEmitter();
  hidden: boolean = true;
  constructor() { }

  deleteMe(){
    this.delEvent.emit(this.logData);
  }

  ngOnInit() {
  }

}
