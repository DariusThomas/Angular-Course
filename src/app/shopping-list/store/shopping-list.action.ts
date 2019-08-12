import {Action} from "@ngrx/store"
import { Ingredient } from 'src/app/shared/ingredient.model';

export const ADD_INGREDIENT ="[Shopping List] Add Ingredient"
export const ADD_INGREDIENTS="[Shopping List] Add ingredient"
export const UPDATE_INGREDIENT ="[Shopping List] Update Ingredient"
export const DELETE_INGREDIENT ="[Shopping List] Delete Ingredient"
export const START_EDIT ="[Shopping List] Start_Edit"
export const STOP_EDIT ="[Shopping List] Stop Edit"

export class AddIngredient implements Action{

    readonly type = ADD_INGREDIENT;

    constructor(public payload:Ingredient){}
}

export class AddIngredients implements Action{

    readonly type=ADD_INGREDIENTS

    constructor(public payload:Ingredient[]){}
}

export class UpdateIngredient{
    readonly type=UPDATE_INGREDIENT
    constructor(public payload:Ingredient){}
}

export class DeleteIngredient{
    readonly type = DELETE_INGREDIENT;
    constructor(){}
}

export class StartEdit{
    readonly type =START_EDIT;
    constructor(public payload:number){}
}

export class StopEdit{
    readonly type =STOP_EDIT;
    constructor(){}
}


export type ShoppingListActions= 
AddIngredient 
| AddIngredients 
| UpdateIngredient 
| DeleteIngredient 
| StopEdit 
| StartEdit