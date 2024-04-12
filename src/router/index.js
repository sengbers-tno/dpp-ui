import { createRouter, createWebHistory } from 'vue-router';
import AppLayout from '@/layout/AppLayout.vue';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            component: AppLayout,
            children: [
                {
                    path: '/',
                    name: 'Main',
                    component: () => import('@/views/pages/MainPage.vue')
                },
                {
                    path: '/settings',
                    name: 'Settings',
                    component: () => import('@/views/pages/SettingsPage.vue')
                },
                {
                    path: '/profile',
                    name: 'Profile',
                    component: () => import('@/views/pages/ProfilePage.vue')
                },
                {
                    path: '/templateControl/templateCreation',
                    name: 'Template Creation',
                    component: () => import('@/views/templateControl/templateCreation.vue')
                },
                {
                    path: '/templateControl/templateList',
                    name: 'Template List',
                    component: () => import('@/views//templateControl/templateList.vue')
                },
                {
                    path: '/eventControl/eventLifecycleList',
                    name: 'Event Lifecycle List',
                    component: () => import('@/views/eventControl/eventLifecycleList.vue')
                },
                {
                    path: '/eventControl/addEventType',
                    name: 'Add Event Type',
                    component: () => import('@/views/eventControl/addEventType.vue')
                },
                {
                    path: '/passportControl/aggregateStatistics',
                    name: 'Aggregate Statistics',
                    component: () => import('@/views/passportControl/aggregateStatistics.vue')
                },
                {
                    path: '/passportControl/visualiseRandom',
                    name: 'Visualise Random',
                    component: () => import('@/views/passportControl/visualiseRandom.vue')
                },
                {
                    path: '/credentialControl/list',
                    name: 'Credential Control List',
                    component: () => import('@/views/credentialControl/list.vue')
                },   
            ]
        },
        {
            path: '/landing',
            name: 'landing',
            component: () => import('@/views/pages/Landing.vue')
        },
        {
            path: '/pages/notfound',
            name: 'notfound',
            component: () => import('@/views/pages/NotFound.vue')
        },

        {
            path: '/auth/login',
            name: 'login',
            component: () => import('@/views/pages/auth/Login.vue')
        },
        {
            path: '/auth/access',
            name: 'accessDenied',
            component: () => import('@/views/pages/auth/Access.vue')
        },
        {
            path: '/auth/error',
            name: 'error',
            component: () => import('@/views/pages/auth/Error.vue')
        }
    ]
});

export default router;
