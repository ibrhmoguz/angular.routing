import {
    CanActivate,
    ActivatedRouteSnapshot,
    RouterStateSnapshot,
    Router,
    CanActivateChild
} from "@angular/router";
import { Observable } from "rxjs/Observable";
import { Injectable } from "@angular/core";
import { AuthService } from "./authService";

@Injectable()
export class AuthGuardService implements CanActivate, CanActivateChild {
    canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
        this.canActivate(childRoute, state);
    }
    constructor(private authService: AuthService, private router: Router) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
        this.authService.isAuthenticated().then((authenticated: boolean) => {
            if (authenticated) {
                return true;
            }
            else {
                this.router.navigate(['/']);
            }
        }
        );
    }
}