import { Routes } from '@angular/router';
import { LoginComponent } from './login/login';
import { authGuard } from './auth/auth.guard';


export const routes: Routes = [
    {path:'login' ,component:LoginComponent},
    {
        path:'notes',
        loadChildren: ()=> import('./notes/notes.route').then(m=>m.NOTES_ROUTES),//()=> helps in lazy loading
        canActivate:[authGuard]
    },
    {
        path:'',
        redirectTo:'login',
        pathMatch:'full'
    },
    {
        path:'**',redirectTo:'login'//should always be present at the end
    }
];
