import { Recipe } from './recipe.model';
import { EventEmitter, Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';

@Injectable()

export class RecipeService{
    recipeSelected= new EventEmitter<Recipe>()
    private recipes:Recipe[]= [
        new Recipe(
            "Test name 1",
            "test desirption 1",
            "https://c.pxhere.com/images/15/3d/9ee477ee62341b9480ce314b02f8-1417897.jpg!d",
            [
                new Ingredient("Cheese",2),
                new Ingredient("Tomato Sauce",8),
                new Ingredient("Parsley",1),
                new Ingredient("Peppers",4),
        ]), 
        new Recipe(
            "Test name 2",
            "test desirption 2",
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
}