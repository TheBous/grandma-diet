const routes = [
    { name: 'login', path: '/login', needAuth: false },
    { name: 'home', path: '/', needAuth: false },
    { name: 'dashboard', path: '/dashboard', needAuth: true },
];

export const getRoutes = (isLogged = false) => {
    return routes.filter(({ needAuth = false }) => {
        if (needAuth) return isLogged;
        return !isLogged;
    });
};


export default routes;