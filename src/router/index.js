import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue'
import LandingPage from '../views/LandingPage.vue'
import MapView from '../views/MapView.vue'
import addEcopoint from '../views/AddEcopoint.vue'
import Maps from '../components/Maps.vue'
import PerfilView from '../views/PerfilView.vue'
import EditPerfilView from '../views/EditPerfilView.vue'
import RankingView from '../views/RankingView.vue'

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'LandingPage',
      component: LandingPage
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/register',
      name: 'register',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: RegisterView
    },
    {
      path: '/LandingPage',
      name: 'landingPage',
      component: LandingPage
    },

    {
      path: '/map',
      name: 'map',
      component: Maps
    },

    {
      path: '/mapView',
      name: 'mapView',
      component: MapView
    },
    {
      path: '/perfil',
      name: 'perfil',
      component: PerfilView
    },
    {
      path: '/editPerfil',
      name: 'editPerfil',
      component: EditPerfilView
    },
    {
      path: '/ranking',
      name: 'ranking',
      component: RankingView
    },
    {
      path: '/addEcopoint',
      name: 'addEcopoint',
      component: addEcopoint
    }
  ]
})

export default router
