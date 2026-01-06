import { inject } from "@angular/core";
import { Router,CanActivateFn } from "@angular/router";
import { AuthService } from "./auth";

// "CanActivateFn" is the type for a route guard function
export const authGuard:CanActivateFn=()=>{
    const authService=inject(AuthService);
    const router=inject(Router);
    if(authService.isAuthetucated()){
        return true;
    }else{
        router.navigate(['/login']);
        return false;
    }

}