import { Ingredient } from 'src/app/shared/ingredient.model';
import * as ShoppingListActions from './shopping-list.action';


export interface State{
    ingredients:Ingredient[],
    editedIngredient:Ingredient,
    editedIngredientIndex:number;
}
const initialState:State={
    editedIngredient:null,
    editedIngredientIndex:-1,
    ingredients:[
        new Ingredient("Apples",5),
        new Ingredient("Tomatoes",10)
      ]
}

export function shoppingListReducer(
    state:State=initialState,
    action:ShoppingListActions.ShoppingListActions){
    switch(action.type){
        case ShoppingListActions.ADD_INGREDIENT:
        return {
            ...state,// good practie to always copy old state
            ingredients:[
                ...state.ingredients,
                action.payload
            ]
        }
        break;
        case ShoppingListActions.ADD_INGREDIENTS:

            return{
                ...state,
                ingredients:[
                    ...state.ingredients,
                    ...action.payload
                ]
            }
            break;
            case ShoppingListActions.UPDATE_INGREDIENT:

            const ingredient = state.ingredients[state.editedIngredientIndex];
            const updatedIngredient ={
                ...ingredient,
                ...action.payload
            }
            const updatedIngredients =[
                ...state.ingredients
            ]
            updatedIngredients[state.editedIngredientIndex]=updatedIngredient;
                return{
                    ...state,
                    ingredients:updatedIngredients,
                    editedIngredient:null,
                    editedIngredientIndex:-1
                };
                break;
            case ShoppingListActions.DELETE_INGREDIENT:

                const ingredients = [...state.ingredients]
                ingredients.splice(state.editedIngredientIndex,1)
                return{
                    ...state,
                    ingredients:ingredients
                }
                break;
                case ShoppingListActions.START_EDIT:
                    return{
                        ...state,
                        editedIngredientIndex:action.payload,
                        editedIngredient:{...state.ingredients[action.payload]}
                    }
                    break;
                case ShoppingListActions.STOP_EDIT:
                    return{
                        ...state,
                        editedIngredient:null,
                        editedIngredientIndex:-1
                    }
                    break;
        default:
            return state;
    }
}