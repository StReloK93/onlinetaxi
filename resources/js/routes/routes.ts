const routes: any[] = [
  {
    path: '/',
    component: () => import('@/pages/general/Index.vue'),
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
        component: () => import('@/pages/general/Passengers.vue'),
        name: 'passengers',
      },
      {
        path: '/car-ride/auth-user',
        component: () => import('@/pages/general/CarRidesAuthUser.vue'),
        name: 'car-rides-auth-user',
      },
      {
        path: '/car-ride',
        component: () => import('@/pages/general/CarRides.vue'),
        name: 'car-rides',
      },
      {
        path: '/car-ride/inactive',
        component: () => import('@/pages/general/CarRidesInactive.vue'),
        name: 'car-ride-inactive',
      },
      {
        path: '/transports',
        component: () => import('@/pages/general/Transports.vue'),
        name: 'transports',
      },
      {
        path: '/operator/:id',
        component: () => import('@/pages/general/Operator.vue'),
        name: 'operator',
        props: true,
      },
    ],
  },
  {
    path: '/welcome',
    name: 'welcome',
    component: () => import('@/pages/login/Welcome.vue'),
    meta: {
      guard: 'auth',
    }
  },
  {
    path: '/install-app',
    name: 'install-app',
    component: () => import('@/pages/login/InstallApp.vue'),
  },
  {
    path: '/login',
    name: 'login',
    redirect: {
      name: 'login_page',
    },
    props: true,
    component: () => import('@/pages/login/Login.vue'),
    meta: {
      guard: 'guest',
    },
    children: [
      {
        name: 'login_page',
        path: '',
        component: () => import('@/pages/login/PhonePage.vue'),
      },
      {
        name: 'secret_code',
        path: '/secret-code',
        component: () => import('@/pages/login/SecretCode.vue'),
        props: true
      },
    ]
  },
];

export default routes;