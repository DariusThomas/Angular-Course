import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from "@angular/common/http"
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { AppRouting } from './app-routing.module';
import { SharedModule } from './shared/shared.module';
import { CoreModule } from "./core.module"
import {StoreModule} from "@ngrx/store"
import * as fromApp from "./store/app.reducer"
import { EffectsModule } from '@ngrx/effects';
import { AuthEffects } from './auth/store/auth.effects';
import { StoreDevtoolsModule} from "@ngrx/store-devtools"
import { environment } from 'src/environments/environment';
import {StoreRouterConnectingModule} from "@ngrx/router-store"
import { RecipeEffects } from './recipes/store/recipes.effects';

@NgModule({
  declarations: [
    //only one declaration is allowed. all else must be imported through modules
    AppComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule, // browser module only needed once
    HttpClientModule,//for http service functionality
    AppRouting,
    // RecipesModule, //recipes module included in lazing loading under app-routing.module.
    //                //to be affective it also must not be included in app modules file 
    SharedModule,
    CoreModule,
    StoreModule.forRoot(fromApp.appReducer),
    EffectsModule.forRoot([AuthEffects,RecipeEffects]),
    StoreDevtoolsModule.instrument({logOnly:environment.production}),
    StoreRouterConnectingModule.forRoot()
  ],
  // providers: [LoggingService],
  bootstrap: [AppComponent]
})
export class AppModule { }
