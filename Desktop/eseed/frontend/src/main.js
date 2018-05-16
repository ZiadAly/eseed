import Vue from 'vue'
import VueRouter from 'vue-router'
import VeeValidate from 'vee-validate'

// Plugins
import GlobalComponents from './globalComponents'
import GlobalDirectives from './globalDirectives'
import Notifications from './components/UIComponents/NotificationPlugin'
import SideBar from './components/UIComponents/SidebarPlugin'
import App from './App'

// router setup
import routes from './routes/routes'
import axios from 'axios'

// library imports
import Chartist from 'chartist'
import 'bootstrap/dist/css/bootstrap.css'
import './assets/sass/paper-dashboard.scss'
import 'es6-promise/auto'

// plugin setup
Vue.use(VueRouter)
Vue.use(GlobalComponents)
Vue.use(GlobalDirectives)
Vue.use(Notifications)
Vue.use(SideBar)
Vue.use(VeeValidate)

// configure router
const router = new VueRouter({
  routes, // short for routes: routes
  linkActiveClass: 'active'
})

// global library setup
Object.defineProperty(Vue.prototype, '$Chartist', {
  get () {
    return this.$root.Chartist
  }
})

axios.defaults.baseURL = process.env.NODE_ENV === 'production' ? 'https://tech-vault-backend.herokuapp.com/api' : 'http://localhost:3000/api'
axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*'
/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(App),
  router,
  data: {
    Chartist: Chartist
  }
})
