export function getAuthToken() {
    return localStorage.getItem('token');
}

export function setAuthToken(token) {
    localStorage.setItem('token', token);
}

export function clearAuthToken() {
    localStorage.removeItem('token');
}

export function isLoggedIn() {
    return !!getAuthToken();
}