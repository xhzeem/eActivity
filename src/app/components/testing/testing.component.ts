import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-testing',
  templateUrl: './testing.component.html',
  styleUrls: ['./testing.component.scss'],
})
export class TestingComponent implements OnInit {
  doggie = '../../../assets/Imges/dog.jfif';
  logo = '../../../assets/Imges/logo.svg';

  constructor() {}

  ngOnInit(): void {}
}
