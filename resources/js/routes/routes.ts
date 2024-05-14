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
        meta: {
          title: "Yo'lovchilar",
        },
      },
      {
        path: '/car-rides/auth-user',
        component: () => import('@/pages/general/CarRidesAuthUser.vue'),
        name: 'car-rides-auth-user',
        meta: {
          title: "Qatnovlar",
        },
      },
      {
        path: '/car-rides',
        component: () => import('@/pages/general/CarRides.vue'),
        name: 'car-rides',
        meta: {
          title: "Qatnovlar",
        },
      },
      {
        path: '/send-roads',
        component: () => import('@/pages/general/SendRoads.vue'),
        name: 'send-roads',
        meta: {
          title: "Junatilgan transportlar",
        },
      },
      {
        path: '/transports',
        component: () => import('@/pages/general/Transports.vue'),
        name: 'transports',
        meta: {
          title: "Transportlar",
        },
      },
      {
        path: '/operator/:id',
        component: () => import('@/pages/general/Operator.vue'),
        name: 'operator',
        props: true,
        meta: {
          title: "Operatorlarga",
        },
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