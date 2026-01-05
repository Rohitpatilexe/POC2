import { Routes } from '@angular/router';
import { Login } from './login/login';


export const routes: Routes = [
    {path:'login' ,component:Login},
    {
        path:'notes',
        loadChildren: ()=> import('./notes/notes.route').then(m=>m.NOTES_ROUTES)//()=> helps in lazy loading
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
