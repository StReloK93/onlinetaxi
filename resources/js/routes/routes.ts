import { RouteRecordRaw } from 'vue-router'
import CarRidePage from '@/pages/general/CarRidesPage.vue'
import TransportsPage from '@/pages/general/TransportsPage.vue'
import PassengersPage from '@/pages/general/PassengersPage.vue'


const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    component: () => import('@/layouts/General.vue'),
    name: 'main',
    redirect: {
      name: 'car-rides',
    },
    meta: {
        guard: 'auth',
    },
    children: [
      {
        path: '/passengers',
        component: PassengersPage,
        name: 'passengers',
      },
      {
        path: '/car-ride',
        component: CarRidePage,
        name: 'car-rides',
        meta: {
          method: 'getOnlyActive'
        }
      },
      {
        path: '/car-ride/auth-user',
        component: CarRidePage,
        name: 'car-rides-auth-user',
        meta: {
          method: 'getOnlyAuthUser'
        }
      },
      {
        path: '/car-ride/inactive',
        component: CarRidePage,
        name: 'car-ride-inactive',
        meta: {
          method: 'getOnlyInactive'
        }
      },
      {
        path: '/transports',
        component: TransportsPage,
        name: 'transports',
      },
      {
        path: '/operator/:id',
        component: () => import('@/pages/general/OperatorPage.vue'),
        name: 'operator',
        props: true,
      },
    ],
  },
  {
    path: '/login',
    name: 'login',
    redirect: {
      name: 'login_page',
    },
    props: true,
    component: () => import('@/layouts/Login.vue'),
    meta: {
      guard: 'guest',
    },
    children: [
      {
        name: 'login_page',
        path: '',
        component: () => import('@/pages/login/LoginPhonePage.vue'),
      },
      {
        name: 'secret_code',
        path: '/secret-code',
        component: () => import('@/pages/login/LoginSendSmsPage.vue'),
        props: true
      },
    ]
  },
  {
    path: '/welcome',
    name: 'welcome',
    component: () => import('@/pages/login/WelcomePage.vue'),
    meta: {
      guard: 'auth',
    }
  },
  {
    path: '/install-app',
    name: 'install-app',
    component: () => import('@/pages/login/InstallAppPage.vue'),
  },
];

export default routes;