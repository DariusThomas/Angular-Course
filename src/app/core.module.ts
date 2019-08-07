import { NgModule } from '@angular/core';
import { ShoppingListService } from './shopping-list/shopping-list.service';
import { RecipeService } from './recipes/recipe.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptorService } from './auth/auth-interceptor.service';


@NgModule({
    providers:[
        //services dont nee to be exported, they are automatically injected on a root level
        ShoppingListService, 
        RecipeService,
        {
          provide:HTTP_INTERCEPTORS,
          useClass:AuthInterceptorService,
          multi:true
        }
      ]
})

export class CoreModule{}