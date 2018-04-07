import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'
import Users from './pages/Users.vue'
import Home from './pages/Home.vue'
import About from './pages/About.vue'
import Contact from './pages/Contact.vue'
import Order from './pages/Order.vue';
import MainLayout from './layouts/MainLayout.vue'
import { store } from './store'

Vue.use(VueRouter);
const routes = [
    // { path: '/users/:teamId', component: Users}
    { 
        path: '/', 
        component: Home,
        beforeEnter: (to, from, next) => {
            if (localStorage.getItem("personalData") !== null) 
            {
                localStorage.removeItem("personalData");
            }
            next();
        }
    },
    { 
        path: '/order', 
        component: Order,
        beforeEnter: (to, from, next) => {
            if (localStorage.getItem("personalData") === null) 
            {
                router.push({ path: '/' })
            }
            else
            {
                next();
            }
        }
    },
    { 
        path: '/', 
        component: MainLayout,
            children: [
                {
                    path: 'about',
                    component: About,
                    name: 'About',
                    meta: {description: 'About me.'}
                },
                {
                    path: 'contact',
                    component: Contact,
                    name: 'Contact',
                    meta: {description: 'Contact to me.'}
                }
        ]
    },  
];

const router = new VueRouter({
    routes, //routes: routes
    mode: 'history'
});

new Vue({
    el: '#root',
    router, //router: router
    store,
    render: h => h(App)
})
