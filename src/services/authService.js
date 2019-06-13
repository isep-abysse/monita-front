import { BehaviorSubject } from 'rxjs';

import config from '../config';
import Cookies from 'universal-cookie';
const cookies = new Cookies();

const currentUserSubject = new BehaviorSubject(cookies.get('currentUser'));

export const authService = {
    login,
    logout,
    register,
    currentUser: currentUserSubject.asObservable(),
    get currentUserValue () { return currentUserSubject.value }
};

async function register(body) {
    const url = `${config.apiUrl}/users`;
    const params = {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {"content-type": "application/json"}
    };
    const response = await fetch(url, params);
    return await response.json()
}

async function login(username) {

    const url = `${config.apiUrlLogin}/${username}`;
    const response = await fetch(url);
    const user = await response.text();
    // console.log(user);

    cookies.set('currentUser', user);
    currentUserSubject.next(user)
}

function logout() {
    // remove user from local storage to log user out
    let cookieArray = cookies.getAll();
    for (let cookie in cookieArray) {
        cookies.remove(cookie)
    }
    currentUserSubject.next(null);
}