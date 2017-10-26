import { Component } from '@angular/core';

@Component({
  selector: 'top-navigation',
  template: `
    <div class="host">
      <div class="el">
        <button class="ui button basic">
          Sign in <i class="fa fa-sign-in" aria-hidden="true"></i>
        </button>
      </div>
    </div>
  `,
  styleUrls: [`./top-navigation.component.scss`]
})
export class TopNavigationComponent { }