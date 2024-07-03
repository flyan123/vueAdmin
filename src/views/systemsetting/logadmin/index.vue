<template>
  <div>
    <div class="page-content border-bottom">
      <!-- 顶部搜索框 -->
      <div>
        <el-form :inline="true" :model="searchInfo" class="demo-form-inline">
          <el-form-item label="日期">
            <el-date-picker
              v-model="searchInfo.time"
              type="date"
              placeholder="选择日期"
              value-format="yyyy-MM-dd"
              class="form-item-width"
              clearable
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item style="margin-left: 30px" label="账号">
            <el-input
              v-model="searchInfo.number"
              placeholder="账号"
              class="form-item-width"
              clearable
            ></el-input>
          </el-form-item>
          <el-form-item class="right-btns">
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
        :header-cell-style="{ background: '#eef1f6', color: '#606266' }"
      >
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
    </div>
  </div>
</template>

<script>
import Pagination from '@/components/Pagination'
import { getTableListFun } from '../../../api/logadming'
export default {
  components: {
    Pagination,
  },
  data() {
    return {
      // 查询数据
      searchInfo: {
        time: '',
        number: '',
        page: 1,
        size: 10,
      },
      // 表格数据
      tableData: [],
      // 表格标题数组
      tableTitle: [
        { name: '账号', code: 'number', width: '' },
        { name: '时间', code: 'time', width: '' },
        { name: 'IP地址', code: 'ip', width: '' },
      ],
      // 数据总数
      dataTotal: 100,
    }
  },
  mounted() {
    this.onGetDataList()
  },
  methods: {
    // 查询
    onSearch() {
      this.searchInfo.page = 1
      this.onGetDataList()
    },
    // 重置
    onReset() {
      this.searchInfo.time = ''
      this.searchInfo.number = ''
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
      getTableListFun(this.searchInfo).then((result) => {
        this.tableData = result
      })
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
</style>