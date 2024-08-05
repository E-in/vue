<template>
  <div class="Record">
  <el-form :model="form">
    <p>User Id</p>
    <el-form-item>
      <el-input v-model="form.user_id" autocomplete="off" disabled></el-input>
    </el-form-item>
    <p>Date</p>
    <el-date-picker text="date"
                    v-model="form.date"
                    type="date"
                    placeholder="select date"
    >
    </el-date-picker>

    <p>Psoriasis Patterns</p>
    <el-select v-model="form.pattern" placeholder="Select your psoriasis pattern here">
      <el-option
          v-for="item in pattern_options"
          :key="item.value"
          :label="item.label"
          :value="item.value">
      </el-option>
    </el-select>

    <p>Severity</p>
    <el-select v-model="form.severity" placeholder="Choose your severity">
      <el-option
          v-for="item in severity_options"
          :key="item.value"
          :label="item.label"
          :value="item.value">
      </el-option>
    </el-select>
    <p>Location</p>
    <el-form-item>
      <el-input v-model="form.location" autocomplete="off"></el-input>
    </el-form-item>
    <p>Triggers</p>
    <el-checkbox-group v-model="triggers">
      <el-checkbox v-for="tri in triggers_table" :label="tri" :key="tri">{{tri}}</el-checkbox>
    </el-checkbox-group>
  </el-form>
    <div slot="footer" class="dialog-footer" style="width: 100%; display: flex;  padding-top: 10px; ">
      <el-button type="primary" @click="submit()" style="margin-bottom: 10px; ">Record</el-button>
    </div>
  </div>
</template>
<style>
.Record {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  margin-bottom: 20px;
  gap: 20px;
  border: 1px solid rgba(0, 30, 20, 0.11);
  border-radius: 5px;
  padding-left: 10px;
}
</style>
<script>
import request from "@/utils/request";
import * as echarts from 'echarts';
export default {
  data() {
    return {
      params: {
        user_id: '',
        pageNum: 1,
        pageSize: 20,
        search: '',
        begin_date: '',
        end_date:'',
      },
      triggers: [],
      date_range: [],
      searchDate: '',
      tableData: [],
      total: 0,
      dialogFormVisible: false,
      curveVisible: false,
      form: {},
      user: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : {},
      triggers_table: ['Emotional stress','Medications','Winter climates','Shaving or any injury to the skin','Caffeine','Alcohol','Infection','Smoking','Fatty meats',],
      severity_options: [{value: '0', label: 'Asymptomatic'}, {value: '1', label: 'Mild'}, {value: '2', label: 'Moderate'}, {value: '3', label: 'Severe'}, {value: '4', label: 'Very Severe'}],
      pattern_options: [{value: 'Plaque psoriasis', label: 'Plaque psoriasis'}, {value: 'Pustular psoriasis', label: 'Pustular psoriasis'}, {value: 'Guttate psoriasis', label: 'Guttate psoriasis'}, {value: 'Inverse psoriasis', label: 'Inverse psoriasis'}, {value: 'Erythrodermic psoriasis', label: 'Erythrodermic psoriasis'}],
    }

  },
  created() {
    this.findBySearch();
    this.form = {};
    this.form.user_id = this.user.id;
  },
  methods: {

    formatDate(dateString) {

      const date = new Date(dateString);
      // 将时间调整为 UTC
      const utcDate = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
      return utcDate.toLocaleDateString("zh-CN", {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
      }).replace(/\//g, '-');  // 将斜杠替换为短横线
    },
    findBySearch() {
      this.params.user_id=this.user.id;
      this.params.begin_date = this.date_range[0];
      this.params.end_date = this.date_range[1];
      request.get("/symptom/search", {
        params: this.params,
      }).then(res => {
        if (res.code === '0') {
          this.tableData = res.data.list.map(item => {
            item.date = this.formatDate(item.date);
            return item;
          });
          this.total = res.data.total;
        }else {
          this.$message({
            message: res.msg,
            type: "error",
          })
        }
      });
    },
    add() {
      this.form = {};
      this.form.user_id = this.user.id;
      this.dialogFormVisible = true;
    },

    submit() {
      if(this.form.date == null) {
        this.$message({
          message: "Date Cannot Be Empty",
          type: 'error',
        });
      }else {
        const formattedForm = {
          ...this.form,
          date: this.formatDate(this.form.date),
          triggers: this.triggers.join(","),
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
      }
      this.findBySearch();
      this.form = {};
      this.form.user_id = this.user.id;
      this.triggers = [];
    },
  },
}
</script>