import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home';
import Search from './views/Search';
import Root from './components/common/Root.vue';

Vue.use(Router);

const router = new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            component: Root,
            children: [
                {
                    path: '',
                    name: 'home',
                    component: Home,
                },
                {
                    path: '/search',
                    name: 'search',
                    component: Search,
                },
            ],
        },
    ],
});

export default router;