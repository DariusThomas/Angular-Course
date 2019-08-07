import { NgModule } from '@angular/core';
import { ShoppingEditComponent } from './shopping-edit/shopping-edit.component';
import { ShoppingListComponent } from './shopping-list.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { LoggingService } from '../logging.service';

@NgModule({
    declarations: [
        ShoppingEditComponent,
        ShoppingListComponent
    ],
    imports: [
        FormsModule,
        RouterModule.forChild(
            [
                { path: "", component: ShoppingListComponent }
            ]
        ),
        SharedModule
        //providers imported in through modules of lazy loaded modules will provide independent instances
        // rule of thumbs is to import providers into the app module. unless theres a strong reason for multiple instances of a service
    ],
    // providers:[LoggingService]
})
export class ShoppingListModule { }