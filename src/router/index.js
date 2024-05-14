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
                    component: () => import('@/views/pages/templateControl/templateCreation.vue')
                },
                {
                    path: '/templateControl/templateList',
                    name: 'Template List',
                    component: () => import('@/views/pages/templateControl/templateList.vue')
                },
                {
                    path: '/eventControl/eventLifecycleList',
                    name: 'Event Lifecycle List',
                    component: () => import('@/views/pages/eventControl/eventLifecycleList.vue')
                },
                {
                    path: '/eventControl/addEventType',
                    name: 'Add Event Type',
                    component: () => import('@/views/pages/eventControl/addEventType.vue')
                },
                {
                    path: '/passportControl/aggregateStatistics',
                    name: 'Aggregate Statistics',
                    component: () => import('@/views/pages/passportControl/aggregateStatistics.vue')
                },
                {
                    path: '/passportControl/dppsForm',
                    name: 'DPPs Form',
                    component: () => import('@/views/pages/passportControl/dppsForm.vue')
                },
                {
                    path: '/passportControl/uuidView',
                    name: 'UUID View',
                    component: () => import('@/views/pages/passportControl/uuidView.vue')
                },
                {
                    path: '/passportControl/uuidUpdate',
                    name: 'UUID Update',
                    component: () => import('@/views/pages/passportControl/uuidUpdate.vue')
                },
                {
                    path: '/passportControl/visualiseRandom',
                    name: 'Visualise Random',
                    component: () => import('@/views/pages/passportControl/visualiseRandom.vue')
                },
                {
                    path: '/passportControl/dppsVisualisation/:uuid?',
                    name: 'DPP Visualisation',
                    component: () => import('@/views/pages/passportControl/dppsVisualisation.vue')
                },
                {
                    path: '/credentialControl/list',
                    name: 'Credential Control List',
                    component: () => import('@/views/pages/credentialControl/list.vue')
                }
            ]
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
