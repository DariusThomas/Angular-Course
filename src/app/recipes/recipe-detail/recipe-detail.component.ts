import { Component, OnInit} from '@angular/core';
import { Recipe } from '../recipe.model';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as fromApp from "../../store/app.reducer"
import * as RecipeActions from "../store/recipes.action"
import * as ShoppingListActions from "../../shopping-list/store/shopping-list.action"
import { map } from 'rxjs/operators';
@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  recipe:Recipe;
  id:number;
  constructor(
    private store:Store<fromApp.AppState>,
     private route :ActivatedRoute,
     private router:Router) { }
 
  ngOnInit() {
    this.route.params.subscribe(
      (params:Params)=>{
        this.id=+params.id;
        // this.recipe=this.recipeSerivce.getRecipe(this.id);
        this.store.select("recipes").pipe(
          map((recipesState)=>{
            return recipesState.recipes.find((recipe,index)=>{
              return index===this.id
            })
          })
          ).subscribe(recipe=>{
            this.recipe=recipe
          })
    })

  }

  onAddToShoppingList(){
    // this.recipeSerivce.addIngredientsToShoppingList(this.recipe.ingredients)
    this.store.dispatch(new ShoppingListActions.AddIngredients(this.recipe.ingredients))
  }

  onEditRecipe(){
    this.router.navigate(['../',this.id,'edit'],{relativeTo:this.route})
    //this.router.navigate(['edit'],{relativeTo:this.route})
  }

  onDeleteRecipe(){
    // this.recipeSerivce.deleteRecipe(this.id);
    this.store.dispatch(new RecipeActions.DeleteRecipe(this.id))
    this.router.navigate(['/recipes'])
  }
}
