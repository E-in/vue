<template>
  <div id="app">
    <el-container>
      <el-header style="background-color: #545c64; height: 100px" >
        <el-dropdown style="float: right; height: 60px; line-height: 60px">
          <span class="el-dropdown-link" style="color: aliceblue; font-size: 16px">{{ user.name }}<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>
              <div @click="logout()">Log out</div>
            </el-dropdown-item>

          </el-dropdown-menu>
        </el-dropdown>
      </el-header>
    </el-container>
    <el-container>
      <el-aside style="overflow: hidden; min-height: 100vh; background-color: #545c64; width: 250px">
        <el-menu
            :default-active="$route.path"
            router
            class="el-menu-vertical-demo"
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#ffd04b">

          <el-menu-item index="/home">
            <template slot="title">
              <i class="el-icon-s-home"></i>
              <span slot="title">Homepage</span>
            </template>

          </el-menu-item>


          <el-menu-item index="/patient">
            <i class="el-icon-user-solid"></i>
            <span slot="title">Patient</span>
          </el-menu-item>
          <el-menu-item index="/symptom">
            <i class="el-icon-s-data"></i>
            <span slot="title">Symptom</span>
          </el-menu-item>

        </el-menu>
      </el-aside>

      <el-main>
        <router-view/>
      </el-main>
    </el-container>

  </div>
</template>

<script>
  export default {
    name: "layout",
    data(){
      return{
        user: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")):{}
      }
    },
    methods:{
      logout(){
        localStorage.removeItem("user");
        this.$router.push("/login");
      }
    }
  }
</script>

<style>
.el-menu{
  border-right: none !important;
}
</style>