<template>
  <div>
    <div>
     <div style="width: 400px; height: 350px; margin: 150px auto; background-color:rgba(107,149,224,0.5); border-radius: 10px">
        <div style="width: 100%; height: 100px; font-size: 30px; line-height: 100px; text-align: center; color: #4a5ed0">Welcome</div>
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
          <el-form-item label="Id" >
            <el-input v-model="form.id" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="Name" >
            <el-input v-model="form.name" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="Password" >
            <el-input v-model="form.password" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="Age" >
            <el-input v-model="form.age" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="Gender" >
            <template>
              <el-radio v-model="form.gender" label="1">Male</el-radio>
              <el-radio v-model="form.gender" label="2">Female</el-radio>
              <el-radio v-model="form.gender" label="3">Other</el-radio>
            </template>
          </el-form-item>
          <el-form-item label="Phone" >
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
  name:"Login",
  data(){
    return{
      user: {},
      dialogFormVisible: false,
      form: {},
    }
  },
  created() {
    localStorage.clear();
  },
  methods:{
    login(){
      request.post("/user/login",this.user).then(res => {
        if (res.code === '0') {
          this.$message({
            message: "Login Success",
            type: "success",
          });
          localStorage.setItem("user",JSON.stringify(res.data));
          this.$router.push("/home");

        } else {
          this.$message({
            message: res.msg,
            type: 'error',
          });
        }
      });
    },
    signup(){
      this.form = {};
      this.dialogFormVisible = true;
    },
    submit() {

      request.post("/user/signup", this.form).then(res => {
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
    }
  }
}
</script>