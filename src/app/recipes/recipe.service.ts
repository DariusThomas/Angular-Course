import { Recipe } from './recipe.model';
import { Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Subject } from 'rxjs';

@Injectable()

export class RecipeService{

    recipesChanged = new Subject<Recipe[]>()
    private recipes:Recipe[]= [
        new Recipe(
            "Pasta Sauce",
            "test description 1",
            "https://c.pxhere.com/images/15/3d/9ee477ee62341b9480ce314b02f8-1417897.jpg!d",
            [
                new Ingredient("Cheese",2),
                new Ingredient("Tomato Sauce",8),
                new Ingredient("Parsley",1),
                new Ingredient("Peppers",4),
        ]), 
        new Recipe(
            "Fudge Brownies",
            "test description 2",
            "https://live.staticflickr.com/8346/8258253775_d8fa9aa697_b.jpg",
            [
                new Ingredient("Flour",1),
                new Ingredient("Coco Powder",4),
                new Ingredient("Milk",1/2),
                new Ingredient("Eggs",2),
            ])
      ];

      constructor(private slService:ShoppingListService){

      }
      getRecipes(){
          return this.recipes.slice();
      }

      addIngredientsToShoppingList(ingredients:Ingredient[]){
        this.slService.addIngredients(ingredients)
      }

      getRecipe(index:number){
          return this.recipes[index]
      }

      addRecipe(recipe:Recipe){
        this.recipes.push(recipe)
        this.recipesChanged.next(this.recipes.slice())
      }

      updateRecipe(index:number, newRecipe:Recipe){
        this.recipes[index]= newRecipe;
        this.recipesChanged.next(this.recipes.slice())
      }

      deleteRecipe(index:number){
        this.recipes.splice(index,1);
        this.recipesChanged.next(this.recipes.slice())
      }
}