<template>
  <div>
    <router-link to="/Videos" tag="a" class="btn btn-primary">View All Videos</router-link>
    <!-- a button to view all videos-->
    <router-link to="/AddVideo" tag="a" class="btn btn-primary"><b>+</b> Add Video</router-link>
    <!-- a button to add a video -->

    <div class="no-videos" v-if="this.videos.length <= 0">
      You have no videos to display.
    </div>

    <div v-for="video in this.videos" class="custab">
      <div class="row">
        <div class="col-md-3">
          <div class="padded">
            <a :href="video.link" target="_blank">
              <img class="img-responsive img-rounded" :src="video.pic" alt="Girl in a jacket">
            </a>
          </div>
        </div>
        <div class="col-md-6">
          <div class="padded">
              <a :href="video.link" target="_blank"><div class="video-title"><b>{{video.name}}</b></div></a>
              {{video.description}}
          </div>
        </div>
        <div class="col-md-3">
          <div class="padded">
            <div style="margin-top:30px"><a class="btn btn-danger btn-lg" v-on:click="deleteVideo(video._id)" ><span class="glyphicon glyphicon-remove"></span> Delete</a></div>
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
      videos: []

    }
  },
  created () {
    this.showItem()
  },
  methods: {
    showItem: function () {
    // This method is for retrieving the current user's videos
      axios.get('/video/getMyVideos', {
        headers: { authorization: sessionStorage.getItem('token') }
            // retrieves the users token to allow the authorization
      })
          .then((response) => {
            this.printresults(response.data)
          })
    },
    printresults (x) {
      for (var i = 0; i < x.data.length; i++) {
        var splitArray = x.data[i].link.split('v=')
        var index = splitArray.length - 1
        x.data[i].pic = 'https://img.youtube.com/vi/' + splitArray[index] + '/0.jpg'
        this.videos.push(x.data[i])
      }
    },
    deleteVideo (c) {
      // This method deletes a video
      var result = confirm('Are you sure you want to delete this video?')
      if (result) {
        axios.delete('/video/deleteVideo/' + c, {
          headers: { authorization: sessionStorage.getItem('token') }
          //  retrieves the users token to allow the authorization
        })
        .then((response) => {
          window.location.reload()
        })
      }
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
    font-size:16pt;
    margin-top:10px;
}
.no-videos{
    margin:10px;
    margin-top:30px;
}
</style>
