<template>
  <div>
    <div>
      <el-descriptions class="margin-top" title="Info" :column="1"  border>
        <template slot="extra">
          <el-button type="primary" size="small" @click = "edit(user)">Edit</el-button>
          <el-popconfirm title="You sure to delete account？" @confirm="del(user.id)">
            <el-button slot="reference" type="danger" style="margin-left: 10px">Delete Account</el-button>
          </el-popconfirm>
        </template>

        <el-descriptions-item :label-style="{ width: '200px' }">
          <template slot="label" >
            <i class="el-icon-office-building"></i>
            Id
          </template>
          {{user.id}}
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-user"></i>
            Name
          </template>
          {{user.name}}
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-mobile-phone"></i>
            Phone
          </template>
          {{user.phone}}
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-tickets"></i>
            age
          </template>
          {{user.age}}
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-tickets"></i>
            Gender
          </template>
          {{user.gender}}
        </el-descriptions-item>
        <el-descriptions-item >
          <template slot="label">
            <i class="el-icon-tickets"></i>
            Profile
          </template>
          {{user.profile}}
        </el-descriptions-item>
      </el-descriptions>
    </div>

    <div>
      <el-dialog title="Edit" :visible.sync=EditVisible :close-on-click-modal="false">
        <el-form :model="form">
          <el-form-item label="Id" >
            <el-input v-model="form.id" autocomplete="off" disabled></el-input>
          </el-form-item>
          <el-form-item label="Name" >
            <el-input v-model="form.name" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="Age" >
            <el-input v-model="form.age" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="Gender" >
            <template>
              <el-radio v-model="form.gender" label="Male">Male</el-radio>
              <el-radio v-model="form.gender" label="Female">Female</el-radio>
              <el-radio v-model="form.gender" label="Other">Other</el-radio>
            </template>
          </el-form-item>
          <el-form-item label="Phone" >
            <el-input v-model="form.phone" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="Profile" >
            <el-input type="textarea" :autosize="{ minRows: 4}" v-model="form.profile" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="EditVisible = false">Cancel</el-button>
          <el-button type="primary" @click="submit()">Ok</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>
<style>
.block {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
<script>


import request from "@/utils/request";

export default {
  data() {
    return {
      EditVisible: false,
      form: {},
      user: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : {}
    }
  },
  created() {
  },

  methods:{
    edit(obj) {

      this.form = JSON.parse(JSON.stringify(obj));
      this.EditVisible = true;
    },
    del(id) {
      request.delete("/user/" + id).then(res => {
        if (res.code === '0') {
          this.$message({
            message: "Operation Success",
            type: "success",
          });
          localStorage.removeItem("user");
          this.$router.push("/login");
        } else {
          this.$message({
            message: res.msg,
            type: "error",
          });
        }
      })
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



}
</script>