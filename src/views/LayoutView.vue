<template>
  <div id="app">
    <el-container style="min-height: 100vh; display: flex; flex-direction: column;border: none">
      <el-header style="background-color: mediumturquoise; height: 100px">
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
      <el-header class="menu-header">
        <el-menu
            :default-active="$route.path"
            router
            class="el-menu-demo"
            mode="horizontal"
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#ffd04b">
          <el-menu-item index="/">
            <i class="el-icon-s-home"></i>
            <span>Homepage</span>
          </el-menu-item>
          <el-menu-item index="/patient">
            <i class="el-icon-user-solid"></i>
            <span>Patient</span>
          </el-menu-item>
          <el-menu-item index="/symptom">
            <i class="el-icon-s-data"></i>
            <span>Symptom</span>
          </el-menu-item>
        </el-menu>
      </el-header>
      <el-main style="background-color: mediumturquoise; flex: 1;" >
        <router-view/>
      </el-main>
      <el-footer style="background-color: #ffd04b; height: 60px;" >
      </el-footer>
    </el-container>
  </div>
</template>

<script>
export default {
  name: "layout",
  data() {
    return {
      user: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : {}
    }
  },
  methods: {
    logout() {
      localStorage.removeItem("user");
      this.$router.push("/login");
    }
  }
}
</script>

<style>
.el-menu {
  border-right: none !important;
}

.menu-header {
  background-color: mediumturquoise;
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
