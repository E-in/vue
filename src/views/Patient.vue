<template>
  <div>
    <div class="block">
      <span class="demonstration">name</span>
      <el-input v-model="params.name" style="width: 200px; margin-left: 10px" placeholder="Enter Name"></el-input>
      <el-button type="warning" style="margin-left: 10px" @click="findBySearch()">Search</el-button>
      <el-button type="primary" style="margin-left: 10px">Create</el-button>
    </div>
    <div>
      <el-table
        :data="tableData"
        style="width: 100%">
        <el-table-column fixed prop="id" label="id" width="150"> </el-table-column>
        <el-table-column prop="name" label="name" width="120"> </el-table-column>
        <el-table-column prop="password" label="password" width="120"> </el-table-column>
        <el-table-column prop="gender" label="gender" width="120"></el-table-column>
        <el-table-column prop="phone" label="phone" width="300"></el-table-column>
        <el-table-column label="Operation">
          <el-button type="primary" width="5">edit</el-button>
          <el-button type="danger" width="50">delete</el-button>
        </el-table-column>
      </el-table>
    </div>
    <div class="margin-top:10px">
      <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="params.pageNum"
          :page-sizes="[5, 10, 15, 20]"
          :page-size="params.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total">
      </el-pagination>
    </div>
  </div>
</template>

<script>


import request from "@/utils/request";

export default {
  data() {
    return {
      params:{
        name: '',
        pageNum: 1,
        pageSize: 5
      },
      tableData: [],
      total: 0,
    }
  },
  created() {
    this.findBySearch()
  },
  methods:{
    load(){
      request.get("/user").then(res =>{
        if (res.code === '0'){
          this.tableData = res.data.list;
        }
      })
    },
    findBySearch(){
      request.get("/user/search",{
        params: this.params
      }).then(res =>{
        if (res.code === '0'){
          this.tableData = res.data.list;
          this.total = res.data.total;
        }
      })
    },
    handleSizeChange(pageSize){
      this.params.pageSize = pageSize;
      this.findBySearch();
    },
    handleCurrentChange(pageNum){
      this.params.pageNum = pageNum;
      this.findBySearch();
    }
  },



}
</script>