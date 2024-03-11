import { createRouter, createWebHistory } from 'vue-router';

import AppHome from './pages/HomePage.vue';
import RestaurantList from './pages/RestaurantList.vue';
import SingleRestaurant from './pages/SingleRestaurant.vue';
import CategoriesList from './pages/CategoriesList.vue';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        // {
        //     path: '/',
        //     name: 'home',
        //     component: AppHome
        // },
        {
            path: '/',
            name: 'restaurants',
            component: RestaurantList
        },
        {
            path: '/restaurant/:id',
            name: 'restaurant',
            component: SingleRestaurant
        },
        {
            path: '/categories',
            name: 'categories',
            component: CategoriesList
        },
    ]
});
export { router };