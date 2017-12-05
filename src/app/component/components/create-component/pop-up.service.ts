import { Injectable } from '@angular/core';

@Injectable()
export class PopUpService{
moderatorPopUp: boolean;
componentOwnerPopUp: boolean;

constructor() {
this.moderatorPopUp = false;
this.componentOwnerPopUp = false;
}

}