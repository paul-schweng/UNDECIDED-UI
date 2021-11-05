import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-stars[value]',
  templateUrl: './stars.component.html',
  styleUrls: ['./stars.component.scss']
})
export class StarsComponent implements OnInit {

  @Input() max: number[] = Array(5).fill(0);
  @Input() value: number = 0;


  constructor() { }

  ngOnInit(): void {
  }

}
