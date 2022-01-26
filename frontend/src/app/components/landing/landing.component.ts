import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss'],
})
export class LandingComponent implements OnInit {
  logo = '../../../assets/img/logo.svg';
  hero = '../../../assets/img/hero.png';

  constructor() {}

  ngOnInit(): void {
  }
}
