import DashboardLayout from '../components/Dashboard/Layout/DashboardLayout.vue'
// GeneralViews
import NotFound from '../components/GeneralViews/NotFoundPage.vue'

// Admin pages
import Registration from 'src/components/Dashboard/Views/Registration.vue'
import Data from 'src/components/Dashboard/Views/Data.vue'
import MyVideos from 'src/components/Dashboard/Views/MyVideos.vue'
import AddVideo from 'src/components/Dashboard/Views/AddVideo.vue'
import Videos from 'src/components/Dashboard/Views/Videos.vue'

const routes = [
  {
    path: '/',
    component: DashboardLayout,
    redirect: '/admin/Registration',
    children: [
      {
        path: 'AddVideo',
        name: 'Add Video',
        component: AddVideo
      },
      {
        path: 'Videos',
        name: 'Videos',
        component: Videos
      },
      {
        path: 'MyVideos',
        name: 'My Videos',
        component: MyVideos
      }
    ]
  },
  {
    path: '/admin',
    component: DashboardLayout,
    redirect: '/admin/stats',
    children: [
      {
        path: 'Registration',
        name: 'Registration',
        component: Registration
      },
      {
        path: 'Data',
        name: 'Admin Section',
        component: Data
      }
    ]
  },
  { path: '*', component: NotFound }
]

/**
 * Asynchronously load view (Webpack Lazy loading compatible)
 * The specified component must be inside the Views folder
 * @param  {string} name  the filename (basename) of the view to load.
function view(name) {
   var res= require('../components/Dashboard/Views/' + name + '.vue');
   return res;
};**/

export default routes
