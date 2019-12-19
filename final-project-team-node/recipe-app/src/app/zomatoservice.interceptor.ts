import { Injectable, NgModule } from '@angular/core';
import { HttpInterceptor, HTTP_INTERCEPTORS } from "@angular/common/http";
import { HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable()
export class ZomatoServiceInterceptor implements HttpInterceptor{
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      console.log(req);
      if(req.url === "https://developers.zomato.com/api/v2.1/search"){
        const dupRequest = req.clone({
             headers : req.headers.set('user-key','e5006abc7f5c62198d5ead64c1a38209')
        });
        return next.handle(dupRequest);
      }
      else {
          return next.handle(req);
      }
    }
}

@NgModule({
    providers : [
        {
            provide : HTTP_INTERCEPTORS,
            useClass : ZomatoServiceInterceptor,
            multi : true
        }
    ]
})
export class InterceptorModule{}
