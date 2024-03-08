import { createRouter, createWebHistory } from 'vue-router';

import AppHome from './pages/HomePage.vue';
import ProjectList from './pages/ProjectList.vue';
import SingleProject from './pages/SingleProject.vue';
import TechnologiesList from './pages/TechnologiesList.vue';

const router = createRouter({
    history: createWebHistory(),
    routes: [
            {
                path: '/',
                name: 'home',
                component: AppHome
            },
            {
                path: '/blog',
                name: 'projects',
                component: ProjectList
            },
            {
                path: '/blog',
                name: 'project',
                component: SingleProject
            },
            {
                path: '/blog',
                name: 'technologies',
                component: TechnologiesList
            },
        ]
    });
export { router };