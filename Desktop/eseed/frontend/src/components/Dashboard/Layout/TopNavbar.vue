<template>
  <nav class="navbar navbar-default">
    <div class="container-fluid">
      <div class="navbar-header">

        <a class="navbar-brand">{{routeName}}</a>

      </div>
      <div class="collapse navbar-collapse">
        <ul class="nav navbar-nav navbar-right">
          <li class="open">
          <button v-if="token.length > 1" type="button" class="btn btn-primary btn-lg btn-block"
          style=" border-color:blue;background-color:beige; color:blue"
          v-on:click="logout"> SIGN OUT </button>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>
<script>
  import PaperNotification from 'src/components/UIComponents/NotificationPlugin/Notification.vue'
  export default {
    components: {
      PaperNotification
    },
    data () {
      return {
        activeNotifications: false,
        type: ['', 'info', 'success', 'warning', 'danger'],
        token: sessionStorage.getItem('token')
      }
    },
    computed: {
    },
    methods: {
      sleep (milliseconds) {
        var start = new Date().getTime()
        for (var i = 0; i < 1e7; i++) {
          if ((new Date().getTime() - start) > milliseconds) {
            break
          }
        }
      },
      capitalizeFirstLetter (string) {
        return string.charAt(0).toUpperCase() + string.slice(1)
      },
      toggleNotificationDropDown () {
        this.activeNotifications = !this.activeNotifications
      },
      closeDropDown () {
        this.activeNotifications = false
      },
      toggleSidebar () {
        this.$sidebar.displaySidebar(!this.$sidebar.showSidebar)
      },
      hideSidebar () {
        this.$sidebar.displaySidebar(false)
      },
      logout () {
        sessionStorage.clear()
        location.reload()
        window.location.replace('#/admin/Registration')
        this.notifyVue('top', 'left', 'Goodbye, have a nice!', 2)
      },
      notifyVue (verticalAlign, horizontalAlign, message, col) {
        this.$notifications.notify(
          {
            message: message,
            icon: 'ti-comments-smiley',
            horizontalAlign: horizontalAlign,
            verticalAlign: verticalAlign,
            type: this.type[col]
          })
      }
    }
  }

</script>
<style>

</style>
