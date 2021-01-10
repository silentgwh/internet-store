import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthenticationService } from './authentication.service';

@Injectable()
export class AuthenticationInterceptor implements HttpInterceptor {
    constructor(
        private authentication: AuthenticationService,
        private router: Router
    ) {}


    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if(this.authentication.isAuthenticated) {
            req = req.clone({
                setParams: {
                    auth: this.authentication.token
                }
            });
        }

        return next.handle(req)
        .pipe(   
            catchError(error => {
                if(error.status === 401 ) {
                    this.authentication.logout();
                    this.router.navigate(['/admin', 'login']);
                }
                return throwError(error)
            })       
        )
    }
}