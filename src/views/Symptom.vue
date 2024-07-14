<template>
  <div>
    <div class="block">
      <span class="demonstration">Date</span>
      <el-date-picker
          v-model="selectedDate"
          type="date"
          placeholder="Selected Date">
      </el-date-picker>
      <el-input v-model="params.user_id" style="width: 200px; margin-left: 200px" placeholder="Enter Id"></el-input>
      <el-button type="warning" style="margin-left: 10px" @click="findBySearch()">Search</el-button>
      <el-button type="primary" style="margin-left: 10px" @click="add()">Create</el-button>
    </div>

    <div>
      <el-table
          :data="tableData"
          style="width: 100%">
        <el-table-column prop="user_id" label="userid" width="120"> </el-table-column>
        <el-table-column prop="date" label="date" width="120"> </el-table-column>
        <el-table-column prop="severity" label="Severity" width="120"></el-table-column>
        <el-table-column prop="location" label="Location" width="300"></el-table-column>
        <el-table-column prop="description" label="Description" width="300"></el-table-column>
        <el-table-column label="Operation">
          <template slot-scope = "scope">
            <el-button type="primary"  @click = "edit(scope.row.id)">edit</el-button>
            <el-popconfirm title="You sure to delete this？" @confirm="del(scope.row.id)">
              <el-button slot="reference" type="danger" style="margin-left: 10px">delete</el-button>
            </el-popconfirm>
          </template>
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
    <div>
      <el-dialog title="Symptom" :visible.sync=dialogFormVisible :close-on-click-modal="false">
        <el-form :model="form">
          <el-form-item label="user_id" >
            <el-input v-model="form.user_id" autocomplete="off"></el-input>
          </el-form-item>
          <p>Date{{ value }}</p>
          <el-date-picker text="date"
                          v-model="form.date"
                          type="date"
                          placeholder="select date">
          </el-date-picker>
          <el-form-item label="severity" >
            <el-input v-model="form.severity" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="location" >
            <el-input v-model="form.location" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="description" >
            <el-input v-model="form.description" autocomplete="off"></el-input>
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
  data() {
    return {
      params: {
        user_id: '',
        pageNum: 1,
        pageSize: 5
      },
      tableData: [],
      total: 0,
      dialogFormVisible: false,
      form: {},
    }
  },
  created() {
    this.findBySearch();
  },
  methods: {
    formatDate(dateString) {
      const date = new Date(dateString);
      return date.toLocaleDateString("zh-CN", {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
      }).replace(/\//g, '-');  // 将斜杠替换为短横线
    },
    findBySearch() {
      request.get("/symptom/search", {
        params: this.params
      }).then(res => {
        if (res.code === '0') {
          this.tableData = res.data.list.map(item => {
            item.date = this.formatDate(item.date);
            return item;
          });
          this.total = res.data.total;
        }
      });
    },
    add() {
      this.form = {};
      this.dialogFormVisible = true;
    },
    edit(obj){
      this.form = obj;
      this.dialogFormVisible = true;
    },
    del(id){
      request.delete("/symptom/"+id).then(res =>{
        if (res.code === '0') {
          this.$message({
            message: "Operation Success",
            type: "success",
          });
          this.findBySearch();
        } else {
          this.$message({
            message: res.msg,
            type: "error",
          });
        }
      })
    },
    submit() {
      const formattedForm = {
        ...this.form,
        date: this.formatDate(this.form.date)
      };
      request.post("/symptom", formattedForm).then(res => {
        if (res.code === '0') {
          this.$message({
            message: "Operation Success",
            type: "success",
          });
          this.dialogFormVisible = false;
          this.findBySearch();
        } else {
          this.$message({
            message: res.msg,
            type: 'error',
          });
        }
      });
    },
    handleSizeChange(pageSize) {
      this.params.pageSize = pageSize;
      this.findBySearch();
    },
    handleCurrentChange(pageNum) {
      this.params.pageNum = pageNum;
      this.findBySearch();
    }
  },
}
</script>
