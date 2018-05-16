<template>
  <div v-if="showPage">
    <router-link to="/MyVideos" tag="a" class="btn btn-primary">View My Videos</router-link>
    <!-- a button to view user's own items -->
    <router-link to="/AddVideo" tag="a" class="btn btn-primary"><b>+</b> Add Video</router-link>
    <!-- a button to view user's own items -->
    <div v-for="post in this.posts" class="custab">
      <div class="row">
        <div class="col-md-3">
          <div class="padded">
            <a :href="post.link" target="_blank">
              <img class="img-responsive img-rounded" :src="post.pic" alt="Girl in a jacket">
            </a>
          </div>
        </div>
        <div class="col-md-6">
          <div class="padded">
              <div class="video-title"><b><a :href="post.link" target="_blank">{{post.name}}</a></b></div>
              {{post.description.substring(0,170)}}...
          </div>
        </div>
        <div class="col-md-3">
          <div class="padded" align="center">
            <div style="font-size:45pt"><b>{{post.voters.length}}</b></div>
            <div><i v-if="!post.voters.includes(userId)" class="btn btn-success" v-on:click="addVote(post._id)">Vote</i></div>
            <div><i v-if="post.voters.includes(userId)" class="btn btn-danger" v-on:click="removeVote(post._id)">Remove Vote</i></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
export default {
  data () {
    return {
      posts: [],
      userId: null,
      showPage: true,
      type: ['', 'info', 'success', 'warning', 'danger']
    }
  },
  created () {
    this.showItem()
  },
  methods: {
    showItem: function () {
    // method for retrieving items which connects to getVideos in the backend
      axios.get('/video/getVideos', {
        headers: { authorization: sessionStorage.getItem('token') }
            //  retrieves the users token to allow the authorization
      })
          .then((response) => {
            this.userId = response.data.userId
            this.printresults(response.data)
          })
          .catch((error) => {
            this.showPage = false
            this.notifyVue('top', 'left', 'You must be logged in to access the videos section. Please login and try again.', 4)
            console.log(error)
          })
    },
    printresults (x) {
      for (var i = 0; i < x.data.length; i++) {
        var splitArray = x.data[i].link.split('v=')
        var index = splitArray.length - 1
        x.data[i].pic = 'https://img.youtube.com/vi/' + splitArray[index] + '/0.jpg'
        this.posts.push(x.data[i])
      }
    },
    addVote (c) {
      // This method adds the user's vote to the video
      axios.patch('/video/addVote/' + c, {}, {
        headers: { authorization: sessionStorage.getItem('token') }
        //  retrieves the users token to allow the authorization
      })
      .then((response) => {
        window.location.reload()
      })
    },
    removeVote (c) {
      // This method removes the user's vote from the video
      axios.patch('/video/removeVote/' + c, {}, {
        headers: { authorization: sessionStorage.getItem('token') }
        //  retrieves the users token to allow the authorization
      })
      .then((response) => {
        window.location.reload()
      })
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
.custab{
    border: 1px solid #ccc;
    padding: 5px;
    margin: 2% 0;
    box-shadow: 3px 3px 2px #ccc;
    transition: 0.5s;
    padding: 0;
    height: auto;
    background-color:white;
    }
.custab:hover{
    box-shadow: 3px 3px 0px transparent;
    transition: 0.5s;
    }
.padded{
    padding:10px;
}
.video-title{
    font-weight:strong;
    font-size:15pt;
    margin-top:10px;
}
</style>
