import { Component } from '@angular/core';

import { ViewEncapsulation } from '@angular/core';
import { AuthService} from './auth/auth.service';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None

})

export class AppComponent {
  name:string = 'Novel-Ti'
  itIsMarch:boolean

  constructor() {
      var date = new Date()
      this.itIsMarch = (date.getMonth() == 2 && date.getFullYear() == 2018)
  }
}
