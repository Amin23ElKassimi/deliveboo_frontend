import { createRouter, createWebHistory } from 'vue-router';

import AppHome from './pages/HomePage.vue';
import RestaurantList from './pages/RestaurantList.vue';
import SingleRestaurant from './pages/SingleRestaurant.vue';
import CategoriesList from './pages/CategoriesList.vue';
import FoodItemList from './pages/FoodItemList.vue';
import OrderCheckout from './pages/OrderCheckout.vue';
// import Payment from './pages/Payment.vue';



const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            name: 'home',
            component: AppHome
        },
        {
            path: '/restaurants',
            name: 'restaurants',
            component: RestaurantList
        },
        {
            path: '/restaurants/:id',
            name: 'single-restaurant',
            component: SingleRestaurant
        },
        {
            path: '/categories',
            name: 'categories',
            component: CategoriesList
        },
        {
            path: '/fooditems',
            name: 'fooditems',
            component: FoodItemList
        },
        {
            path: '/checkout',
            name: 'checkout',
            component: OrderCheckout
        },
        // {
        //     path: '/Payment',
        //     name: 'payment',
        //     component: Payment
        // },

    ]
});
export { router };