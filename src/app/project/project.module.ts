import { ProjectRootComponent } from './components/project-root/project-root.component';
import { SharedModule } from './../shared/shared.module';
import { NgModule } from "@angular/core";

@NgModule({
    imports: [
        SharedModule
    ],
    declarations: [
        ProjectRootComponent
    ]
})
export class ProjectModule { }