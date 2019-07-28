import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {

 
  pages = [
    {
      title: 'Login',
      url: '',
      icon: 'home'
    },
    {
      title: 'Go to:',
      children: [
        {
          title: 'Register',
          url: '/register',
          icon: 'logo-ionic'
        },
        {
          title: 'Hospital',
          url: '/hospital',
          icon: 'logo-google'
        },
      ]
    }
  ];
 
  constructor() { }
 
  ngOnInit() {
  }
 
}
