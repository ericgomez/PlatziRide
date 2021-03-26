import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

// Este metodo permite validar el token que esta en localStorage y enviarlo al Headers con el Authorization
@Injectable()
export class TokenInterceptorService implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Extraer el token con el nombre jwt del localStorage
    const jwt = localStorage.getItem('jwt');
    // En caso de que exista el token
    if (!!jwt) {
      // Tomamos el request y le pegamos el Authorization 
      req = req.clone({
        setHeaders: {
          Authorization: jwt,
        }
      });
    }
    return next.handle(req);
  }
}