import Vue from 'vue'
import VueRouter from 'vue-router'
import ChatsPage from '../views/ChatsPage'
import LoginPage from '../views/LoginPage'
import RegisterPage from '../views/RegisterPage'
import LandingPage from '../views/LandingPage'

Vue.use(VueRouter)

const routes = [
    {
        path: '/chats',
        name: 'Chats',
        component: ChatsPage
    },
    {
        path: '/login',
        name: 'Login',
        component: LoginPage
    },
    {
        path: '/register',
        name: 'Register',
        component: RegisterPage
    },
    {
        path: '/',
        name: 'Landing',
        component: LandingPage
    },
    { path: '*', redirect: '/' }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

router.beforeEach((to, from, next) => {
    // redirect to login page if not logged in and trying to access a restricted page
    const publicPages = ['/', '/login', '/register'];
    const authRequired = !publicPages.includes(to.path);
    const loggedIn = localStorage.getItem('user');

    if (authRequired && !loggedIn) {
        return next('/login');
    }

    next();
})

export default router;