import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import * as ShoppingListActions from "../store/shopping-list.action"
import * as fromApp from "../../store/app.reducer"
@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})

export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('f', { static: true }) slForm: NgForm
  subscription: Subscription
  editMode: boolean = false;
  edittedItem: Ingredient
  constructor(
    private store:Store<fromApp.AppState>) { }

  ngOnInit() {
    this.subscription = this.store.select('shoppingList').subscribe(
      (stateData)=>{
        if(stateData.editedIngredientIndex >-1){
          this.editMode=true
          this.edittedItem=stateData.editedIngredient
          this.slForm.setValue({
            name: this.edittedItem.name,
            amount: this.edittedItem.amount
          })
        }else{
          this.editMode = false
        }
      }
    )

  }
  ngOnDestroy() {
    this.subscription.unsubscribe()
    this.store.dispatch(new ShoppingListActions.StopEdit())
  }
  onSubmitItem(form: NgForm) {
    const value = form.value
    const newIngredient = new Ingredient(value.name, value.amount)
    if (this.editMode) {
      // this.slSerivce.updateIngredient(this.edittedItemIndex, newIngredient)
      this.store.dispatch(new ShoppingListActions.UpdateIngredient(newIngredient))
    } else {
      // this.slSerivce.addIngredient(newIngredient)
      this.store.dispatch(new ShoppingListActions.AddIngredient(newIngredient))
    }
    this.editMode = false;
    form.reset()
  }

  onClear(){

    this.slForm.reset();
    this.editMode=false
    this.store.dispatch(new ShoppingListActions.StopEdit())
  }
  onDelete(){
    // this.slSerivce.deleteIngredient(this.edittedItemIndex)
    this.store.dispatch(new ShoppingListActions.DeleteIngredient())
    this.onClear()
  }
}
