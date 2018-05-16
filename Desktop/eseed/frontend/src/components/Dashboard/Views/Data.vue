<!-- <template>
    <div class="row">
      <div class="col-md-12">
        <div class="card">
          <paper-table :title="table1.title" :sub-title="table1.subTitle" :data="user.data" :columns="table1.columns">

          </paper-table>
        </div>
      </div>
    </div>
</template>
<script> -->
<template>
  <div>
    <!-- <div class="row">
      <div class="col-md-12">
        <div class="card">
        </div>
      </div>+
    </div> -->
    <!-- <div>
      <input type="text" v-model= "name" > Name <br>
      <input type="text" v-model= "price"> Price <br>
      <input type="text" v-model= "deleteP"> Delete Product <br>
      <input type="text" v-model= "updatePname"> Update Name <br>
      <input type="text" v-model= "updatePprice"> Update Price <br>
      <input type="text" v-model= "updatePid"> ID of product to be updated <br>
      <button v-on:click="AddToApi"> add product</button>
      <button v-on:click="DeleteP"> delete product</button>
      <button v-on:click="UpdateP"> update product</button>
    </div> -->
  <!-- <meta http-equiv="refresh" content="10">  -->
    <div>
    <table  class="table table-striped" id="firstTable" >
    <thead >
      <tr>
        <th>name</th>
        <th>email</th>
        <th>telephone</th>
        <th>hire date</th>
      </tr>
    </thead>
    <tbody>
      <tr id="tb1" v-for="user in User">
        <td>{{user.username}}</td>
        <td>{{user.firstname}}</td>
        <td>{{user.lastname}}</td>
        <td>{{user.email}}</td>
        <td v-if="user.role=='admin'" style="background-color: white; color: black;">{{user.role}}</td>
        <td v-else>{{user.role}}</td>
        <td v-if="user.teacherReq==1 && user.role!='admin' " >Pending Request</td>
        <td v-else-if="user.teacherReq==2" >Accepted Request</td>
        <td v-else-if="user.teacherReq==3" >Denied Request</td>
        <td v-else >No Request</td>
        <td v-if="user.teacherReq==1 && user.role!='admin'">
          <span v-on:click="acceptReq(user._id)" id="x" class='btn btn-info btn-xs'> Accept </span>
          <span v-on:click="denyReq(user._id)" id="x2" class='btn btn-danger btn-xs'> Deny </span>
          </td>
        <td v-else style="background-color:darkslategrey;"></td>
      </tr>
    </tbody>
    </table>
  </div>
</div>

</template>

<script>
import axios from 'axios'
import PaperNotification from 'src/components/UIComponents/NotificationPlugin/Notification.vue'
import PaperTable from 'components/UIComponents/PaperTable.vue'
const tableColumns = ['role', 'childScore', 'ID', 'username', 'firstname', 'lastname', 'password', 'email', '']
const tableData = [{
  id: '',
  username: '',
  firstname: '',
  lastname: '',
  password: '',
  email: ''
},
{
  role: '',
  childScore: '',
  id: '',
  username: '',
  firstname: '',
  lastname: '',
  password: '',
  email: ''
}]
export default {
  components: {
    PaperTable
  },
  data () {
    return {
      table1: {
        title: 'Stripped Table',
        subTitle: 'Here is a subtitle for this table',
        columns: [...tableColumns],
        data: [...tableData]
      },
      table2: {
        title: 'Table on Plain Background',
        subTitle: 'Here is a subtitle for this table',
        columns: [...tableColumns],
        data: [...tableData]
      },
      User: [],
      // data: {
      id: '',
      username: '',
      firstname: '',
      lastname: '',
      password: '',
      email: '',
      type: ['', 'info', 'success', 'warning', 'danger'],
      arr1: []
      // }
    }
  },
  created () {
    axios.get('/user/getAllUsers')
    .then((response) => {
      console.log(response)
      this.insetIntoArr(response.data.data)
      this.notifyVue('center', 'center', 'Users data retrived succesfully!', 1)
    })
    .catch((error) => {
      this.notifyVue('top', 'left', 'You dont have the required access rights for your request, Admins only can access this page.', 4)
      console.log(error)
    })
  }
}
</script>

<style>
#firstTable{
  width: 100%;
  border: 10px greenyellow;
  padding: 15px;
  color:orange;
  background-color:black;
}
#tb1{
  width:100%;
  color: darkorange;
  border: 10px greenyellow;
  padding: 15px;
  background-color:darkslategrey;
}
#x{
  width:100%;
  padding: 14px 40px;
  background-color: black;
  color: darkorange;
}
#x:hover{
  background-color:lightgreen;
  opacity: 10;
  color: black;
  box-shadow: 0 12px 16px 0 rgba(0,0,0,0.24), 0 17px 50px 0 rgba(0,0,0,0.19);
}
#x2{
  width:50%;
  background-color: black;
  color: darkorange;
}
#x2:hover{
  background-color: red;
  opacity: 5;
  color: black;
  box-shadow: 0 12px 16px 0 rgba(0,0,0,0.24), 0 17px 50px 0 rgba(0,0,0,0.19);
}

</style>
