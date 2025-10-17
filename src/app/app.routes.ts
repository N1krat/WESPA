import { Routes } from '@angular/router';
import { HomePageConnector } from './home/home-connector';
import { LoginPageConnector } from './login/login-connector';

export const routes: Routes = [
    {
        path: '',
        component: HomePageConnector
    }, 
    { 
        path: 'login',
        component: LoginPageConnector
    }
];
