import {Actions,Effect, ofType} from "@ngrx/effects"
import * as RecipesActions from "../store/recipes.action"
import { switchMap, map, withLatestFrom } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Recipe } from '../recipe.model';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromApp from "../../store/app.reducer"
@Injectable()
export class RecipeEffects{

    @Effect()
    fetchRecipes = this.action$.pipe(
        ofType(RecipesActions.FETCH_RECIPES),
        switchMap(()=>{
            return this.http.get<Recipe[]>('https://ng-course-project-94ac4.firebaseio.com/recipes.json')
        }),
        map((recipes) => {
            //different map bellow... bellow is js method 
            return recipes.map(recipe => {
                return {
                    ...recipe, ingredients: recipe.ingredients ? recipe.ingredients : []
                }
            })
        }),
        map((recipes)=>{
            return new RecipesActions.SetRecipes(recipes)
        })
    )

    // dispatch false because this effect doesnt dispatch any data to app store
    @Effect({dispatch:false})
    storeRecipes = this.action$.pipe(
        ofType(RecipesActions.STORE_RECIPES),
        withLatestFrom(this.store.select("recipes")),
        // for array variables, first item is from ofType() and second item is from withLatestFrom()
        switchMap(([actionData,recipesState])=>{
          return  this.http
          .put(
              'https://ng-course-project-94ac4.firebaseio.com/recipes.json',
           recipesState.recipes
           )
        })
    )

constructor(
    private action$:Actions,
    private http:HttpClient,
    private store:Store<fromApp.AppState>
    ){}
}