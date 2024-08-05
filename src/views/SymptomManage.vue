<template>
  <div>
    <div class="block" >
      <div>
        <span class="demonstration">Date</span>
        <el-date-picker
            v-model="date_range"
            type="daterange"
            range-separator="To"
            start-placeholder="Begin"
            end-placeholder="End"
            value-format="yyyy-MM-dd"
            @change="handleDateChange"
            unlink-panels
            style="margin-left: 10px"
        >
        </el-date-picker>

        <span style="margin-left: 10px">Psoriasis Patterns</span>
        <el-select v-model="params.searchPat" placeholder="Search psoriasis pattern here" style="margin-left: 10px" clearable>
          <el-option
              v-for="item in pattern_options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
          >
          </el-option>
        </el-select>
      </div>
      <div>

        <el-checkbox-group v-model="triggers">
          <el-checkbox-button v-for="tri in triggers_table" :label="tri" :key="tri">{{tri}}</el-checkbox-button>
          <el-button type="warning" style="margin-left: 10px" @click="findBySearch()">Search</el-button>
          <el-button type="primary" style="margin-left: 10px" @click="clear()">Clear</el-button>
          <el-button type="success" style="margin-left: 10px" @click="curve()">Curve</el-button>
          <el-button type="info" style="margin-left: 10px" @click="exportToExcel()">Export</el-button>
        </el-checkbox-group>


      </div>

    </div>

    <div class="block">
      <el-table
          :data="tableData"
          style="width: 100%"
          border
      >
        <el-table-column prop="date" label="date" width="120">
          <template slot-scope="scope">
            <div :style="{ maxHeight: '100px', overflowY: 'auto' }">{{ scope.row.date }}</div>
          </template>
        </el-table-column>
        <el-table-column prop="pattern" label="Pattern" width="140">
          <template slot-scope="scope">
            <div :style="{ maxHeight: '100px', overflowY: 'auto' }">{{ scope.row.pattern }}</div>
          </template>
        </el-table-column>
        <el-table-column prop="severity" label="Severity" width="120">
          <template slot-scope="scope">
            <div :style="{ maxHeight: '100px', overflowY: 'auto' }">{{scope.row.severity }}</div>
          </template>
        </el-table-column>
        <el-table-column prop="location" label="Location" width="300">
          <template slot-scope="scope">
            <div :style="{ maxHeight: '100px', overflowY: 'auto' }">{{ scope.row.location }}</div>
          </template>
        </el-table-column>
        <el-table-column prop="triggers" label="Triggers" >
          <template slot-scope="scope">
            <div :style="{ maxHeight: '100px', overflowY: 'auto' }">{{ scope.row.triggers }}</div>
          </template>
        </el-table-column>
        <el-table-column label="Operation" width="300">
          <template slot-scope = "scope">
            <el-button type="primary"  @click = "edit(scope.row)">Edit</el-button>
            <el-popconfirm title="You sure to delete this？" @confirm="del(scope.row.id)">
              <el-button slot="reference" type="danger" style="margin-left: 10px">Delete</el-button>
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
          <el-form-item label="location" >
            <el-input v-model="form.location" autocomplete="off"></el-input>
          </el-form-item>

          <p>Triggers</p>
          <el-checkbox-group v-model="triggers">
            <el-checkbox v-for="tri in triggers_table" :label="tri" :key="tri">{{tri}}</el-checkbox>
          </el-checkbox-group>



        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">Cancel</el-button>
          <el-button type="primary" @click="submit()">Ok</el-button>
        </div>
      </el-dialog>
      <el-dialog style = "width:1000px" title="Symptom" :visible.sync="curveVisible" :close-on-click-modal="false">
        <div style = "width: 100%">
          <div id="curve" style="width: 100%; height: 400px"> </div>
        </div>
        <el-button type="success " style="position: absolute; right: 10px; bottom: 10px;" @click="expCurve()">Download</el-button>
      </el-dialog>
    </div>


  </div>
</template>
<style>
.block {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
  gap: 20px;
  border: 1px solid rgba(0, 30, 20, 0.11);
  border-radius: 5px;
}
</style>
<script>
import request from "@/utils/request";
import * as echarts from 'echarts';
import * as XLSX from 'xlsx';
export default {
  data() {
    return {
      params: {
        user_id: '',
        pageNum: 1,
        pageSize: 20,
        searchTri: '',
        searchPat: '',
        begin_date: '',
        end_date:'',
      },
      date_range: [],
      triggers: [],
      searchDate: '',
      tableData: [],
      total: 0,
      dialogFormVisible: false,
      curveVisible: false,
      form: {},
      triggers_table: ['Emotional stress','Medications','Winter climates','Shaving or any injury to the skin','Caffeine','Alcohol','Infection','Smoking','Fatty meats',],
      pattern_options: [{value: 'Plaque psoriasis', label: 'Plaque psoriasis'}, {value: 'Pustular psoriasis', label: 'Pustular psoriasis'}, {value: 'Guttate psoriasis', label: 'Guttate psoriasis'}, {value: 'Inverse psoriasis', label: 'Inverse psoriasis'}, {value: 'Erythrodermic psoriasis', label: 'Erythrodermic psoriasis'}],
      severityMap : {0: 'Asymptomatic', 1: 'Mild', 2: 'Moderate', 3: 'Severe', 4: 'Very Severe'},
      user: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : {},
      severity_options: [{value: '0', label: 'Asymptomatic'}, {value: '1', label: 'Mild'}, {value: '2', label: 'Moderate'}, {value: '3', label: 'Severe'}, {value: '4', label: 'Very Severe'}],
      value: ''
    }

  },
  created() {
    this.findBySearch();

  },
  mounted() {
    this.initCurve();
  },
  methods: {
    clear(){
      this.triggers=[];
      this.params.searchPat='';
      this.searchDate='';
      this.date_range=[];
      this.findBySearch();
    },
    mapSeverity(severity) {
      return this.severityMap[severity] || severity;
    },
    handleDateChange(date) {
      if (date) {
        this.utcDate = this.convertToUTC(date);
      } else {
        this.utcDate = null;
      }
    },
    convertToUTC(date) {
      const dateObj = new Date(date);
      return new Date(Date.UTC(dateObj.getFullYear(), dateObj.getMonth(), dateObj.getDate()));
    },
    curve(){
      this.curveVisible = true;
      this.initEchart();
    },
    exportToExcel() {
      const wb = XLSX.utils.book_new();
      const ws = XLSX.utils.json_to_sheet(this.tableData);
      XLSX.utils.book_append_sheet(wb, ws, "Table Data");
      XLSX.writeFile(wb, this.user.name+" symptom.xlsx");
    },
    expCurve() {
      const chartDom = document.getElementById('curve');
      const myChart = echarts.getInstanceByDom(chartDom);

      if (myChart) {
        const imgURL = myChart.getDataURL({
          type: 'png',
          pixelRatio: 2,
          backgroundColor: '#fff'
        });

        const link = document.createElement('a');
        link.href = imgURL;
        String
        let userName;
        userName = this.user.name;
        link.download =userName +' curve.png';

        link.click();
      } else {
        this.$message({
          message: 'no curve',
          type: 'error',
        });
      }
    },
    initEchart(){
      this.params.user_id=this.user.id;
      request.get("/symptom/echarts/getchat", {
        params: this.params,
      }).then(res => {
        if (res.code === '0') {
          let map = res.data;
          this.initCurve(map.xAxis,map.yAxis);
        }else {
          this.$message({
            message: res.msg,
            type: "error",
          })
        }
      });
    },

    initCurve(xAxis,yAxis){
     // const mappedyAxis = this.mapyAxis(yAxis);
      let chartDom = document.getElementById('curve');
      let myChart = echarts.init(chartDom);
      let option;

      option = {
        grid: {
          left: '30%',

        },
        xAxis: {
          type: 'category',
          data: xAxis,
        },
        yAxis: {
          type: 'value',
          inside: false,
          min: 0, // 设置 y 轴的最小值
          max: 4, // 设置 y 轴的最大值
          interval: 1, // 设置 y 轴的间隔为 1
          axisLabel: {

            formatter: (value) => {
              return this.mapSeverity(value);
            }
          }
        },
        series: [
          {
            data: yAxis,
            type: 'line'
          }
        ]
      };

      option && myChart.setOption(option);
    },

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
      this.params.searchTri=this.triggers.join(",");
      this.params.user_id=this.user.id;
      this.params.begin_date = this.date_range[0];
      this.params.end_date = this.date_range[1];
      request.get("/symptom/search", {
        params: this.params,
      }).then(res => {
        if (res.code === '0') {
          this.tableData = res.data.list.map(item => {
            item.date = this.formatDate(item.date);
            item.severity = this.mapSeverity(item.severity);
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
    edit(obj) {
      this.form = JSON.parse(JSON.stringify(obj));
      this.form.user_id = this.user.id;
      this.triggers = obj.triggers.split(",");
      this.form.severity = this.severity_options.find(option => option.label === this.mapSeverity(this.form.severity)).value;
      this.dialogFormVisible = true;
    },
    del(id) {
      request.delete("/symptom/" + id).then(res => {
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