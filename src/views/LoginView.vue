<template>
  <div class="full-page">
    <div>
      <div style="width: 400px; height: 350px;  background-color:#00B0A0; border-radius: 10px">
        <div style="width: 100%; height: 100px; font-size: 30px; line-height: 100px; text-align: center; color: yellow">PsoriaLog</div>
        <div style="margin-top: 25px; text-align: center; height: 320px;">
          <el-form :model="user">
            <el-form-item>
              <el-input v-model="user.id" prefix-icon="el-icon-user" style="width: 80%" placeholder="Enter user id"></el-input>
            </el-form-item>
            <el-form-item>
              <el-input v-model="user.password" show-password prefix-icon="el-icon-lock" style="width: 80%" placeholder="Enter password"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button style="width: 80%; margin-top: 10px" type="primary" @click="login()">login</el-button>
            </el-form-item>
            <el-form-item>
              <el-button style="width: 80%; margin-top: 2px" type="primary" @click="signup()">signup</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
    <div>
      <el-dialog title="Sign Up" :visible.sync=dialogFormVisible :close-on-click-modal="false">
        <el-form :model="form">
          <el-form-item label="Id">
            <el-input v-model="form.id" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="Name">
            <el-input v-model="form.name" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="Password">
            <el-input v-model="form.password" show-password autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="Age">
            <el-input v-model="form.age" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="Gender">
            <template>
              <el-radio v-model="form.gender" label="Male">Male</el-radio>
              <el-radio v-model="form.gender" label="Female">Female</el-radio>
              <el-radio v-model="form.gender" label="Other">Other</el-radio>
            </template>
          </el-form-item>
          <el-form-item label="Phone">
            <el-input v-model="form.phone" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">Cancel</el-button>
          <el-button type="primary" @click="submit()">Ok</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import request from "@/utils/request";

export default {
  name: "Login",
  data() {
    return {
      user: {},
      dialogFormVisible: false,
      form: {},
    };
  },
  created() {
    localStorage.clear();
  },
  methods: {
    login() {
      request.post("/user/login", this.user).then((res) => {
        if (res.code === '0') {
          this.$message({
            message: "Login Success",
            type: "success",
          });
          localStorage.setItem("user", JSON.stringify(res.data));
          this.$router.push("/");
        } else {
          this.$message({
            message: res.msg,
            type: 'error',
          });
        }
      });
    },
    signup() {
      this.form = {};
      this.dialogFormVisible = true;
    },
    submit() {
      request.post("/user/signup", this.form).then((res) => {
        if (res.code === '0') {
          this.$message({
            message: "Operation Success",
            type: "success",
          });
          this.dialogFormVisible = false;
        } else {
          this.$message({
            message: res.msg,
            type: 'error',
          });
        }
      });
    },
  },
};
</script>

<style scoped>
.full-page {
  background-color: #b9dbe3;
  height: 100vh;
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
}

body {
  margin: 0;
}
</style>
