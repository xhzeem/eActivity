import { Component, OnInit } from '@angular/core';
import { AnimationOptions } from 'ngx-lottie';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {
  logo = '/assets/imgs/mainlogo.svg';
  options: AnimationOptions = {
    path: '/assets/jasons/doggy.json',
  };
  constructor() {}

  ngOnInit(): void {}
}
