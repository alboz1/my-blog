// import Router from 'next/router';
import redirect from './redirect';

export function privateRoute(user, context) {
    if (!user.username) {
        redirect('/login', context);
    }
}