import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptorService } from './auth/auth-interceptor.service';


@NgModule({
    providers:[
        //services dont nee to be exported, they are automatically injected on a root level

        {
          provide:HTTP_INTERCEPTORS,
          useClass:AuthInterceptorService,
          multi:true
        }
      ]
})

export class CoreModule{}