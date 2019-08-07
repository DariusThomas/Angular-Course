import { NgModule } from '@angular/core';
import { LoadingSpinnerCompoennt } from './loading-spinner/loading-spinner.component';
import { PlaceholderDirective } from './placeholder.directive';
import { DropdownDirective } from './dropdown.directive';
import { AlertComponent } from './alert/alert.component';
import { CommonModule } from '@angular/common';
import { LoggingService } from '../logging.service';

@NgModule({
    declarations:[
        AlertComponent,
        LoadingSpinnerCompoennt,
        PlaceholderDirective,
        DropdownDirective
    ],
    imports:[
        CommonModule
    ],
    exports:[
        AlertComponent,
        LoadingSpinnerCompoennt,
        PlaceholderDirective,
        DropdownDirective,
        CommonModule
    ],
    entryComponents:[
        AlertComponent
      ],
      providers:[LoggingService]
})

export class SharedModule{}