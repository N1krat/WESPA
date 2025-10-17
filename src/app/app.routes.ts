import { Routes } from '@angular/router';
import { HomePageConnector } from './home/home-connector';
import { LoginPageConnector } from './login/login-connector';
import { SigninPageConnector } from './signin/signin-connector';
import { PostPageConnector } from './post/post-connector';

export const routes: Routes = [
    {
        path: '',
        component: HomePageConnector
    }, 
    { 
        path: 'login',
        component: LoginPageConnector
    }, 
    { 
        path: 'registration',
        component: SigninPageConnector
    }, 
    { 
        path: 'post', 
        component: PostPageConnector
    }
];
