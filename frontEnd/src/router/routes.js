
const routes = [
  {
    path: '/',
    component: () => import('layouts/MyLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') }
    ]
  },
  {
    path: '/personal',
    component: () => import('layouts/MyLayout.vue'),
    children: [
      { path: '', component: () => import('pages/pPersonal.vue') }
    ]
  },
  {
    path: '/ubicacions',
    component: () => import('layouts/MyLayout.vue'),
    children: [
      { path: '', component: () => import('pages/pUbicacionsTrax.vue') }
    ]
  },
  {
    path: '/trax',
    component: () => import('layouts/MyLayout.vue'),
    children: [
      { path: '', component: () => import('pages/trax.vue') }
    ]
  },
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
