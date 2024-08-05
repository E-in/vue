<template>
  <div id="app">
    <el-container style="min-height: 100vh; display: flex; flex-direction: column;border: none">

      <el-header style="background-color: #94F4FF; height: 100px">
        <img src="@/assets/logo.png" alt="" style="width: 160px;float:left">
        <el-dropdown style="float: right; height: 60px; line-height: 60px">
          <span class="el-dropdown-link" style="color: black; font-size: 16px">{{ user.name }}<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>
              <div @click="logout()">Log out</div>
            </el-dropdown-item>
            <el-dropdown-item>
              <div @click="edit(user)">Change Password</div>
            </el-dropdown-item>


          </el-dropdown-menu>
        </el-dropdown>

      </el-header>
      <el-header class="menu-header">
        <el-menu
            :default-active="$route.path"
            router
            class="el-menu-demo"
            mode="horizontal"
            background-color="#00B0A0"
            text-color="white"
            active-text-color="yellow"
        >
          <el-menu-item index="/">
            <i class="el-icon-s-home"></i>
            <span>Homepage</span>
          </el-menu-item>
          <el-menu-item index="/record">
            <i class="el-icon-s-data"></i>
            <span>Symptom Record</span>
          </el-menu-item>
          <el-menu-item index="/manage">
            <i class="el-icon-s-data"></i>
            <span>SymptomReview</span>
          </el-menu-item>
          <el-menu-item index="/info" >
            <i class="el-icon-user-solid"></i>
            <span>Info</span>
          </el-menu-item>
        </el-menu>
      </el-header>
      <el-main style="background-color: white; flex: 1;" >
        <router-view/>
      </el-main>
      <el-footer>
      </el-footer>
    </el-container>

    <el-dialog title="Change Password" :visible.sync=EditVisible :close-on-click-modal="false">
      <el-form :model="form">
        <el-form-item label="Password" >
          <el-input v-model="form.password" show-password autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="EditVisible = false">Cancel</el-button>
        <el-button type="primary" @click="submit()">Ok</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import request from "@/utils/request";

export default {
  name: "layout",
  data() {
    return {
      EditVisible: false,
      form: {},
      user: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : {}
    }
  },
  methods: {
    logout() {
      localStorage.removeItem("user");
      this.$router.push("/login");
    },
    edit(obj) {

      this.form = JSON.parse(JSON.stringify(obj));
      this.EditVisible = true;
    },
    submit() {

      request.post("/user/edit", this.form).then(res => {
        if (res.code === '0') {
          this.$message({
            message: "Operation Success",
            type: "success",
          });
          this.EditVisible = false;
          localStorage.setItem("user", JSON.stringify(this.form));
          this.user = JSON.parse(JSON.stringify(this.form));
          this.EditVisible = false;
        } else {
          this.$message({
            message: res.msg,
            type: 'error',
          });
        }
      });
    }
  },
  color1: "silver"
}
</script>

<style>
.el-menu {
  border-right: none !important;
}

.menu-header {
  background-color: #00B0A0;
  height: 50px;
  line-height: 50px;
  padding: 0;
  display: flex;
  justify-content: center;
}

.el-menu-demo {
  height: 100%;
  line-height: 50px;
}

.el-menu-demo::before {
  height: 0; /* Remove the top border */
}

.el-menu-item {
  height: 100%;
}
</style>
