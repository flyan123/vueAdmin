<template>
  <div>
    <div class="page-content border-bottom">
      <!-- 顶部搜索框 -->
      <div>
        <el-form :inline="true" :model="searchInfo" class="demo-form-inline">
          <el-form-item label="账号">
            <el-input
              v-model="searchInfo.number"
              placeholder="账号"
              class="form-item-width"
              clearable
            ></el-input>
          </el-form-item>
          <!-- 地区选择框 -->
          <el-form-item style="margin-left: 30px" label="地区">
            <div class="form-item-width">
              <AreaSelect @handleChange="changeArea" />
            </div>
          </el-form-item>
          <el-form-item class="right-btns">
            <el-button type="primary" @click="onAddUser">新增</el-button>
            <el-button type="primary" @click="onSearch">查询</el-button>
            <el-button @click="onReset">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <!-- 表格展示区域 -->
    <div class="page-content margin-top">
      <!-- 表格组件 -->
      <el-table
        :data="tableData"
        stripe
        style="width: 100%"
        :header-cell-style="{ background: '#eef1f6', color: '#606266' }"
      >
        <!-- 循环展示表格 -->
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
        <el-table-column label="操作" width="200">
          <template slot-scope="scope">
            <span @click="updateRow(scope.row)" class="update-btn">修改</span>
            <span @click="deleteRow(scope.row)" class="delete-btn">删除</span>
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

    <!-- 新增账号弹框 -->
    <el-dialog
      :title="isUpdate ? '修改' : '新增'"
      :visible.sync="dialogVisible"
      top="5vh"
      width="672px"
    >
      <el-form
        ref="form"
        class="dialog-form"
        :model="accountEdit"
        label-width="80px"
      >
        <el-form-item label="上传图标">
          <UploadImg :limit="1" @handleChangeImg="handleChangeImg" />
        </el-form-item>
        <el-form-item label="账号">
          <el-input
            v-model="accountEdit.number"
            placeholder="请输入账号"
          ></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input
            v-model="accountEdit.pwd"
            placeholder="请输入密码"
          ></el-input>
        </el-form-item>
        <el-form-item label="地区">
          <AreaSelect @handleChange="changeDialogArea" />
        </el-form-item>
        <el-form-item label="标题设置">
          <el-input
            v-model="accountEdit.title"
            placeholder="请输入标题"
          ></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="onSubmitDialog">确定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import Pagination from '@/components/Pagination'
import AreaSelect from '@/components/AreaSelect'
import UploadImg from '@/components/UploadImg'
import { getAccountDtatFun } from '../../../api/account'
export default {
  components: {
    Pagination,
    AreaSelect,
    UploadImg,
  },
  data() {
    return {
      // 查询数据
      searchInfo: {
        time: '',
        address: '',
        page: 1,
        size: 10,
      },
      // 弹框表单信息
      accountEdit: {
        number: '',
        pwd: '',
        area: '',
        title: '',
      },
      // 表格数据
      tableData: [],
      // 数据总数
      dataTotal: 100,
      // 标记是否新增
      isUpdate: false,
      // 是否展示弹框
      dialogVisible: false,
      // 表格标题数组
      tableTitle: [
        { name: '账号', code: 'number', width: '' },
        { name: '创建时间', code: 'time', width: '' },
        { name: '权限地区', code: 'address', width: '' },
      ],
    }
  },
  mounted() {
    // 查询数据
    this.onSearch()
  },
  methods: {
    // 切换省市区触发
    changeArea(area) {
      this.searchInfo.address = area.join('')
      this.onGetDataList()
    },
    // 切换弹框中的省市区
    changeDialogArea(area) {
      console.log(area)
    },
    // 上传图片触发
    handleChangeImg(imglist) {
      console.log(imglist)
    },
    // 查询
    onSearch() {
      this.searchInfo.page = 1
      this.onGetDataList()
    },
    // 重置
    onReset() {
      this.searchInfo.time = ''
      this.searchInfo.address = ''
      this.onSearch()
    },
    // 新增方法
    onAddUser() {
      this.isUpdate = false
      this.dialogVisible = true
    },
    // 更新数据
    updateRow(row) {
      this.isUpdate = true
      this.dialogVisible = true
      console.log(row)
    },
    // 删除数据
    deleteRow(row) {
      console.log(row)
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
      getAccountDtatFun(this.searchInfo).then((result) => {
        this.tableData = result
      })
    },
    // 弹框确认方法
    onSubmitDialog() {
      console.log(this.accountEdit)
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
.delete-btn {
  cursor: pointer;
  color: #f56c6c;
  margin-left: 20px;
}
.dialog-form {
  display: flex;
  flex-direction: column;
  gap: 15px;
}
</style>