import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Network } from '@capacitor/network';
import { AuthService } from '../services/auth.service';
import { catchError, map } from 'rxjs/operators';
import { UiService } from '../services/ui.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private auth: AuthService, private ui: UiService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const getNetwork = async () => {
      const networkStatus = await Network.getStatus();
      return networkStatus;
    }


    if (!this.auth.user) {
      return next.handle(req);
    }

    if(localStorage.getItem("isWompiRequest")){
      localStorage.removeItem("isWompiRequest")
      return next.handle(req);
    }

    const req1 = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${this.auth.token}`),
    });

    return next.handle(req1).pipe(
      map((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {

        }
        return event;
      }),
      catchError<any, Observable<any>>((error: HttpErrorResponse) => {
        // SI EL CODIGO ES IGUAL A 401 EL TOKEN ESTA AUSENTE O VENCIO LA SESIÓN.
        if (error.status === 401) {
          if (error.error) {
            const { new_token } = error.error.data;
            if (new_token) {
              this.auth.token = new_token;
              this.auth.user.last_login_date=Date.now()
              this.auth.setUser(this.auth.user)
              this.auth.setToken({ token: new_token, token_expires_in: this.auth.token_expires_in })
            }else{
              this.ui.presentAlert({
                mode: 'ios',
                header: "Sesión expirada",
                message: "Su sesión ha expirado. Por favor vuelva a intentarlo.",
                backdropDismiss: false,
                buttons: [
                  {
                    text: 'Aceptar',
                    role: 'cancel',
                    cssClass: 'secondary',
                    handler: async (res) => {
                      this.auth.logOut()
                    }
                  }
                ]
              });
            }
          }

          
          
          // localStorage.setItem("msg_login", "Su sesión ha expirado. Por favor vuelva a ingresar.");

        }
       
        // 
        return throwError(error);
      }));
  }
}