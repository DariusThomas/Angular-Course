import { Routes, RouterModule, PreloadAllModules } from "@angular/router"
import { NgModule } from '@angular/core';


const appRoutes: Routes = [
    { path: '', redirectTo: '/recipes', pathMatch: "full" },
    {path:'recipes',loadChildren:"./recipes/recipes.module#RecipesModule"},
    {path:'shopping-list',loadChildren:"./shopping-list/shopping-list.module#ShoppingListModule"},
    {path:'auth',loadChildren:"./auth/auth.module#AuthModule"}
    // for loadChildren: '<relativepath to module>#<exported module>
    //lazy loading is only effective if components are only loaded in the exported module
    //
    // another syntax const 
    //
//    routes: Routes = [{
//   path: 'your-path',
//   loadChildren: () => import('./your-module-path/module-name.module').then(m => m.ModuleName)
// }];
]

@NgModule({
    imports: [
        RouterModule.forRoot(
            appRoutes,
             {preloadingStrategy:PreloadAllModules}
             )
             // will load modules after initial load
             // typically seen as being done during idol time after inital load
    ],
    exports: [
        RouterModule
    ]
})

export class AppRouting {

}