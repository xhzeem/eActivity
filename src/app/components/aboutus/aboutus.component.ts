import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-aboutus',
  templateUrl: './aboutus.component.html',
  styleUrls: ['./aboutus.component.scss'],
})
export class AboutusComponent implements OnInit {
  logo = '../../../assets/Imges/logo.svg';
  hero = '../../../assets/Imges/hero.png';

  constructor() {}

  ngOnInit(): void {}
}
