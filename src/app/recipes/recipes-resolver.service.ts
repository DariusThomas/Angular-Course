import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Recipe } from './recipe.model';
import { Subscription, of } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromApp from "../store/app.reducer"
import * as RecipeActions from "./store/recipes.action"
import {Actions, ofType} from "@ngrx/effects"
import { take, map, switchMap } from 'rxjs/operators';
@Injectable({providedIn:'root'})

export class RecipesResolverService implements Resolve<Recipe[] | Subscription>{
// | Subscription added due to error
    constructor(
        private store:Store<fromApp.AppState>,
        private action$:Actions
        ){}

    resolve(route:ActivatedRouteSnapshot,state:RouterStateSnapshot){
        // const recipes = this.recipeService.getRecipes()
        return this.store.select("recipes").pipe(
            take(1),
            map((recipesState)=>{
                return recipesState.recipes
            }),
            switchMap((recipes)=>{
                if(recipes.length === 0 ){
                    // return this.dataStorageService.fetchRecipes()
                    // // review workaround below for delaying resolver for fetch
                    this.store.dispatch(new RecipeActions.FetchRecipes())
                return this.action$.pipe(
                    ofType(RecipeActions.SET_RECIPES),
                    //take 1 to unsubscribe after first take
                    take(1)
                )
                }else{
                    return of(recipes)
                }
            })
        )

      
    }
}