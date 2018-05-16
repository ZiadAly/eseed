import Sidebar from './SideBar.vue'
// <!-- hanakhod dih-->
const SidebarStore = {
  showSidebar: false,
  sidebarLinks: [
    {
      name: 'Registration',
      icon: 'ti-pencil-alt2',
      path: '/admin/Registration'
    },
    {
      name: 'Admin Section',
      icon: 'ti-key',
      path: '/admin/Data'
    }
  ],
  displaySidebar (value) {
    this.showSidebar = value
  }
}

const SidebarPlugin = {

  install (Vue) {
    Vue.mixin({
      data () {
        return {
          sidebarStore: SidebarStore
        }
      }
    })

    Object.defineProperty(Vue.prototype, '$sidebar', {
      get () {
        return this.$root.sidebarStore
      }
    })
    Vue.component('side-bar', Sidebar)
  }
}

export default SidebarPlugin
