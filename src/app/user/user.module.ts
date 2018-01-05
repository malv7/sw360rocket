import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AuthenticationService } from './services/authentication.service';

@NgModule({
    imports: [
        HttpClientModule
    ],
    providers: [
        AuthenticationService
    ]
})
export class UserModule { }