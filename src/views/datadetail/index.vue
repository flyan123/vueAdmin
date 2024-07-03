<template>
  <div>
    <div class="page-content border-bottom">
      <!-- 顶部搜索框 -->
      <div>
        <el-form :inline="true" :model="searchInfo" class="demo-form-inline">
          <el-form-item label="诈骗时间">
            <el-date-picker
              @change="handleChangeDatePicker"
              v-model="datePickerVal"
              type="daterange"
              value-format="yyyy-MM-dd"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            >
            </el-date-picker>
          </el-form-item>

          <el-form-item style="margin-left: 30px" label="诈骗类型">
            <el-select
              v-model="searchInfo.fraudType"
              clearable
              placeholder="请选择诈骗类型"
            >
              <el-option
                v-for="item in fraudTypeList"
                :key="item.code"
                :label="item.name"
                :value="item.code"
              >
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item class="right-btns">
            <el-button type="primary" @click="onDownload">下载</el-button>
            <el-button type="primary" @click="onSearch">查询</el-button>
            <el-button @click="onReset">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div class="page-content margin-top">
      <!-- 表格组件 -->
      <el-table
        :data="tableData"
        stripe
        style="width: 100%"
        @selection-change="handleSelectionChange"
        :header-cell-style="{ background: '#eef1f6', color: '#606266' }"
      >
        <!-- 多选 -->
        <el-table-column type="selection" width="55" align="center">
        </el-table-column>
        <!-- 中间字段 -->
        <el-table-column
          v-for="tab in tableTitle"
          :key="tab.code"
          :label="tab.name"
          show-overflow-tooltip
          :width="tab.width"
        >
          <template slot-scope="scope">
            <span>{{ scope.row[tab.code] }} </span>
          </template>
        </el-table-column>
        <!-- 操作 -->
        <el-table-column label="操作">
          <template slot-scope="scope">
            <span @click="examineRow(scope.row)" class="update-btn">查看</span>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页组件 -->
      <div>
        <Pagination
          :total="dataTotal"
          :page="searchInfo.page"
          :limit="searchInfo.limit"
          @pagination="onChangePages"
        />
      </div>
      <!-- 弹框组件 -->
      <DateEdit ref="edit"/>
    </div>
  </div>
</template>

<script>
import Pagination from '@/components/Pagination'
import { getDetailTabDataFun, getFraudTypeListFun } from '@/api/datadetail'
import DateEdit from './components/DateEdit.vue'

export default {
  components: {
    Pagination,
    DateEdit,
  },
  data() {
    return {
      // 诈骗时间
      datePickerVal: [],
      // 多选选中的数据
      selectList: [],
      // 诈骗类型数组
      fraudTypeList: [],
      // 查询数据
      searchInfo: {
        startTime: '',
        endTime: '',
        fraudType: '',
        page: 1,
        size: 10,
      },
      // 表格数据
      tableData: [],
      // 表格标题数组
      tableTitle: [
        { name: '诈骗时间', code: 'fraudTime', width: '200' },
        { name: '预警等级', code: 'warningLevel', width: '150' },
        { name: '诈骗类型', code: 'fraudType', width: '200' },
        { name: '诈骗域名', code: 'fraudDomain', width: '200' },
        { name: '诈骗IP', code: 'fraudIp', width: '200' },
        { name: '受害人IP', code: 'victimIp', width: '200' },
        { name: '受害人归属地', code: 'homeLocation', width: '200' },
        { name: '诈骗金额', code: 'fraudMoney', width: '150' },
      ],
      // 数据总数
      dataTotal: 100,
    }
  },
  mounted() {
    // 获取诈骗类型
    this.getFraudTypeLis()
    // 查询
    this.onGetDataList()
  },
  methods: {
    // 获取诈骗类型
    getFraudTypeLis() {
      getFraudTypeListFun().then((result) => {
        this.fraudTypeList = result
      })
    },
    // 修改诈骗时间日期框
    handleChangeDatePicker(e) {
      this.searchInfo.startTime = e[0]
      this.searchInfo.endTime = e[1]
    },
    // 多选
    handleSelectionChange(list) {
      this.selectList = list
    },
    // 下载方法
    onDownload() {
      console.log(this.selectList)
    },
    // 查询
    onSearch() {
      this.searchInfo.page = 1
      this.onGetDataList()
    },
    // 重置
    onReset() {
      this.datePickerVal = []
      this.searchInfo.startTime = ''
      this.searchInfo.endTime = ''
      this.searchInfo.fraudType = ''
      this.onSearch()
    },
    // 分页方法
    onChangePages(pageInfo) {
      const { page, limit } = pageInfo
      this.searchInfo.page = page
      this.searchInfo.size = limit
      this.onGetDataList()
    },
    // 核心查询数据方法
    onGetDataList() {
      // 查询数据方法
      getDetailTabDataFun(this.searchInfo).then((result) => {
        console.log(result)
        this.tableData = result
      })
    },
    // 查看数据详情
    examineRow(row) {
      console.log(row)
      this.$refs.edit.showDialog()
    },
  },
}
</script>

<style lang="less" scoped>
.form-item-width {
  width: 250px;
}
.right-btns {
  position: absolute;
  right: 20px !important;
}
.el-form-item {
  margin-bottom: 4px !important;
}
.border-bottom {
  border-bottom: 1px solid #e2e2e4;
}
.margin-top {
  margin-top: -15px;
}
.update-btn {
  cursor: pointer;
  color: #409eff;
}
</style>