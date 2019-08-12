import { Component, OnInit, OnDestroy } from "@angular/core"
import { Subscription } from 'rxjs';
import {map} from "rxjs/operators"
import { Store } from '@ngrx/store';
import * as fromApp from "../store/app.reducer"
import * as AuthActions from "../auth/store/auth.actions"
import * as RecipeActions from "../recipes/store/recipes.action"
@Component({
    selector: "app-header",
    templateUrl: "./header.component.html"
})

export class HeaderComponent implements OnInit, OnDestroy {
    collapsed:boolean=true;
    private userSub:Subscription
    isAuthenticated:boolean=false;

    constructor(
        private store:Store<fromApp.AppState>
        ) { }

        ngOnInit(){
            this.userSub = this.store.select("auth").pipe(
                map(
                    (authState)=>{
                    return authState.user
                })
            ).subscribe(
                (user)=>{
                    this.isAuthenticated= !!user // same as !user ? false: true
                }
            )
        }

    onSaveData() {
        // this.dataStorageService.storeRecipes();
        this.store.dispatch(new RecipeActions.StoreRecipes())
    }
    onFetchData() {
        // this.dataStorageService.fetchRecipes().subscribe();
        this.store.dispatch(new RecipeActions.FetchRecipes())
    }

    onLogout(){
        this.store.dispatch(new AuthActions.Logout())
    }

    ngOnDestroy(){
        this.userSub.unsubscribe()
    }
}