import { createRouter, createWebHistory } from 'vue-router'
import GeneralView from '../views/GeneralView.vue'
import JornadaView from '../views/JornadaView.vue'
import TeamsView from '../views/TeamsView.vue'
import PlayerPointsView from '../views/PlayerPointsView.vue'

const routes = [
  { path: '/general', component: GeneralView },
  { path: '/jornadas', component: JornadaView },
  { path: '/equipos', component: TeamsView },
  { path: '/jugadores', component: PlayerPointsView },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
