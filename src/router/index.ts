import {createRouter, createWebHistory, RouteRecordRaw} from 'vue-router';
import store from '@/store/index';

import Main from '@/modules/main/main.vue';
import Login from '@/modules/login/login.vue';
import Register from '@/modules/register/register.vue';

import Dashboard from '@/pages/dashboard/dashboard.vue';
import Profile from '@/pages/profile/profile.vue';
import ForgotPassword from '@/modules/forgot-password/forgot-password.vue';
import RecoverPassword from '@/modules/recover-password/recover-password.vue';
import PrivacyPolicy from '@/modules/privacy-policy/privacy-policy.vue';
import SubMenu from '@/pages/main-menu/sub-menu/sub-menu.vue';
import Blank from '@/pages/blank/blank.vue';
import NewReport from '@/pages/newReports/newReport.vue';

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: 'Main',
        component: Main,
        meta: {
            requiresAuth: false
        },
        children: [
            {
                path: 'newReport',
                name: 'newReport',
                component: NewReport,
                meta: {
                    requiresAuth: false
                }
            },
            {
                path: 'profile',
                name: 'Profile',
                component: Profile,
                meta: {
                    requiresAuth: false
                }
            },
            {
                path: 'blank',
                name: 'Blank',
                component: Blank,
                meta: {
                    requiresAuth: false
                }
            },
            {
                path: 'sub-menu-1',
                name: 'Sub Menu 1',
                component: SubMenu,
                meta: {
                    requiresAuth: false
                }
            },
            {
                path: 'sub-menu-2',
                name: 'Sub Menu 2',
                component: Blank,
                meta: {
                    requiresAuth: false
                }
            },
            {
                path: '',
                name: 'Dashboard',
                component: Dashboard,
                meta: {
                    requiresAuth: false
                }
            }
        ]
    },
    {
        path: '/login',
        name: 'Login',
        component: Login,
        meta: {
            requiresUnauth: false
        }
    },
    {
        path: '/register',
        name: 'Register',
        component: Register,
        meta: {
            requiresUnauth: false
        }
    },
    {
        path: '/forgot-password',
        name: 'ForgotPassword',
        component: ForgotPassword,
        meta: {
            requiresUnauth: false
        }
    },
    {
        path: '/recover-password',
        name: 'RecoverPassword',
        component: RecoverPassword,
        meta: {
            requiresUnauth: false
        }
    },
    {
        path: '/privacy-policy',
        name: 'RecoverPassword',
        component: PrivacyPolicy
    }
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
});

// router.beforeEach((to, from, next) => {
//         next();
// });

export default router;
