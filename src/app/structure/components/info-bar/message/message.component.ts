import { Observable } from 'rxjs/Observable';
import { State } from './../../../../state';
import { Component, OnDestroy, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import * as fromStructure from './../../../state/structure.reducer';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/observable/timer';
import * as StructureActions from './../../../state/structure.actions';
import { MessageType, Message } from './../../../state/structure.reducer';

@Component({
    selector: 'sw-message',
    template: `
        <div class="ui message" fxLayout="row" fxLayoutAlign="center center" *ngIf="active"
            [ngClass]="{ 'red': isError, 'teal': isDefault, 'yellow': isWarning, 'green': isSuccess}">
            <div>{{ message }}</div>
        </div>
    `,
    styles: [`
        .message {
            padding: 1em 1.5em;
            height: 70%;
            border-radius: 0.2em;
        }
        .error   { background: red; }
        .default { background: black; }
        .warning { background: white; }
        .success { background: green; }
    `]
})
export class MessageComponent implements OnInit, OnDestroy {

    active: boolean = false;
    message: string;

    isDefault = true;
    isError = false;
    isWarning = false;
    isSuccess = false;

    messageSub: Subscription;

    constructor(private store: Store<State>) { }

    ngOnInit(): void {
        this.messageSub = this.store.select(fromStructure.selectMessage)
            .filter(message => message.active === true)
            .subscribe(message => this.activateMessage(message));
    }

    activateMessage(message: Message) {
        this.setStateClass(message.type);
        this.active = message.active;
        this.message = message.text;
        Observable.timer(message.durationInMs).subscribe(() => {
            this.active = false;
            this.store.dispatch(new StructureActions.SetMessage({ ...message, active: false }));
        });
    }

    setStateClass(type: MessageType) {
        // reset all
        this.isDefault = false;
        this.isError = false;
        this.isSuccess = false;
        this.isWarning = false;
        switch (type) {
            case MessageType.default: { this.isDefault = true; break; }
            case MessageType.warning: { this.isWarning = true; break; }
            case MessageType.success: { this.isSuccess = true; break;}
            case MessageType.error: { this.isError = true; break; }
            default: break;
        }
    }

    ngOnDestroy(): void {
        if (this.messageSub) this.messageSub.unsubscribe();
    }
}