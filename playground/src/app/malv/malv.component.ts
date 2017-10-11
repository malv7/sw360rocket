// Import the Component decorator function as well as the OnInit lifecycle hook interface.
import { Component, OnInit } from '@angular/core';

@Component({

  // The component decorator function expects an object which
  // specifies at least a selector and a template || templateUrl

  selector: 'play-malv',
  template: `

    <!-- Inline template -->

    <p class="green">
      active component: malv.component.ts
    </p>


  `,
  // (optional) but mostly needed anyway, others: styleUrls: [`./malv.component.scss`]
  styles: [`.green { color: green; }`]
})
export class MalvComponent implements OnInit {

  constructor() { }

  ngOnInit() { }

}
