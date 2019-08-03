import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('f', { static: true }) slForm: NgForm
  subscription: Subscription
  editMode: boolean = false;
  edittedItemIndex: number
  edittedItem: Ingredient
  constructor(private slSerivce: ShoppingListService) { }

  ngOnInit() {
    this.subscription = this.slSerivce.startedEditing.subscribe(
      (index: number) => {
        this.edittedItemIndex = index;
        this.editMode = true;
        this.edittedItem = this.slSerivce.getIngredient(index);
        this.slForm.setValue({
          name: this.edittedItem.name,
          amount: this.edittedItem.amount
        })
      }
    )
  }
  ngOnDestroy() {
    this.subscription.unsubscribe()
  }
  onSubmitItem(form: NgForm) {
    const value = form.value
    const newIngredient = new Ingredient(value.name, value.amount)
    if (this.editMode) {
      this.slSerivce.updateIngredient(this.edittedItemIndex, newIngredient)
    } else {
      this.slSerivce.addIngredient(newIngredient)
    }
    this.editMode = false;
    form.reset()
  }

  onClear(){
    this.slForm.reset();
    this.editMode=false
  }
  onDelete(){
    this.slSerivce.deleteIngredient(this.edittedItemIndex)
    this.onClear()
  }
}
