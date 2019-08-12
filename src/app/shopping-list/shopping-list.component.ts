import { Component, OnInit, OnDestroy } from '@angular/core';
import {Ingredient} from "../shared/ingredient.model"
import { Subscription, Observable } from 'rxjs';
import { LoggingService } from '../logging.service';
import { Store } from '@ngrx/store';
import * as fromApp from "../store/app.reducer"
import * as ShoppingListActions from "./store/shopping-list.action"

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  // ingredients: Ingredient[];
  ingredients:Observable<{ingredients:Ingredient[]}>
  private subscription:Subscription

  constructor(private loggingService:LoggingService,
    private store:Store<fromApp.AppState>) { }

  ngOnInit() {
        // //this.store.select is an observable
    this.ingredients = this.store.select("shoppingList")

    // this.ingredients=this.slService.getIngredients();
    // this.subscription = this.slService.ingredientsChanged.subscribe((ingredients:Ingredient[])=>{
    //   this.ingredients=ingredients
    // })
  this.loggingService.printLog("Hello from ShoppingListComponent ngOnInit")
  }

  ngOnDestroy(){
  //  this.subscription.unsubscribe();
  }

  onEditItem(index:number){
    // this.slService.startedEditing.next(index)
    this.store.dispatch(new ShoppingListActions.StartEdit(index))
  }
}
