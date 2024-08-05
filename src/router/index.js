import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LayoutView from "@/views/LayoutView.vue";

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/LoginView.vue')
  },
  {
    path: '/',
    name: 'Layout',
    component: LayoutView,
    children: [
      {
        path: '',
        name: 'home',
        component: HomeView
      },
      {
        path: 'about',
        name: 'about',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import('../views/AboutView.vue')
      },
      {
        path: 'patient',
        name: 'Patient',
        component: () => import('../views/Patient.vue')
      },
      {
        path: 'Record',
        name: 'Record',
        component: () => import('../views/RecordView.vue')
      },
      {
        path: 'Manage',
        name: 'Manage',
        component: () => import('../views/SymptomManage.vue')
      },
      {
        path: 'info',
        name: 'Info',
        component: () => import('../views/InfoView.vue')
      }
    ]
  }


]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

//JWT+路由守卫
router.beforeEach((to,from,next) => {
  if (to.path === 'login'){
    next();
  }
  const user = localStorage.getItem("user");
  if(!user && to.path !== '/login'){
    return next('/login');
  }
  next();
})

export default router
