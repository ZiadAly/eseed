<template>
  <div>
    <router-link to="/MyVideos" tag="a" class="btn btn-primary">My Videos</router-link>
    <!-- a button to view user's own videos -->
    <router-link to="/Videos" tag="a" class="btn btn-primary">View All Videos</router-link>
    <!-- a button to view All other users' items -->
    <br>
    <br>
    <br>
    <table>
      <tr>
        <td>   Video Name*    </td>
        <td style="padding-left:15px;"><input style="width:400px" type="text" v-model="name"> </input></td>
      </tr>
      <br>
      <tr>
        <td>   Video Link*   </td>
        <td style="padding-left:15px;"><input style="width:400px" type="text" v-model="link"> </input></td>
      </tr>
      <br>
      <tr>
        <td>     Video Description   </td>
        <td style="padding-left:15px;"><textarea style="width:400px" v-model="description"> </textarea></td>
      </tr>
      <br>
      <tr>
        <td></td>
        <td align="right">
          <a class="btn" v-on:click="addItem" >Submit</a>
          <!-- a button to add a new video-->
        </td>
      </tr>
    </table>
  </div>
</template>
<script>
import axios from 'axios'
export default {
  data () {
    return {
      name: '',
      link: '',
      description: ''
    }
  },
  methods: {
    addItem () {
    // method for adding an item which connects to createItem in the backend
      var re = new RegExp('(http(s)?:\\/\\/.)?(www\\.)?[-a-zA-Z0-9@:%._\\+~#=]{2,256}\\.[a-z]{2,6}\\b([-a-zA-Z0-9@:%_\\+.~#?&//=]*)')
      if (!this.name || !this.link || this.name <= 0 || this.link <= 0) {
        alert('Please insert values for the "Name" and "Link" fields.')
        return
      }
      if (re.test(this.link)) {
        axios.post(`/video/createNewVideo`, {
          name: this.name,
          link: this.link,
          description: this.description
          //  adds item if all attributes except price are given as inputs
        },
          {
            headers: { authorization: sessionStorage.getItem('token') }
            //  retrieves the users token to allow the authorization
          })
        .then((response) => {
          this.$router.push('MyVideos')
          console.log(response)
        })
      } else {
        alert('Please provide a proper URL in the "link" field.')
      }
    }
  }
}
</script>
