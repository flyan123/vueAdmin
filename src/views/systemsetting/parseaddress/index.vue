<template>
  <div class="page-content">
    <el-row style="margin-bottom: 20px" :gutter="20">
      <el-col :span="6">
        <el-input v-model="address" placeholder="请输入地址"></el-input>
      </el-col>
      <el-col :span="6">
        <el-button type="success" @click="search">查询</el-button>
      </el-col>
    </el-row>

    <!-- 地址表格 -->
    <el-table :data="addressList" width="100%" height="400px">
      <el-table-column label="地点名称" prop="name"></el-table-column>
      <el-table-column label="地址" prop="address"></el-table-column>
      <el-table-column label="省" prop="province"></el-table-column>
      <el-table-column label="市" prop="city"></el-table-column>
      <el-table-column label="区" prop="area"></el-table-column>
      <el-table-column label="电话" prop="telephone"></el-table-column>
      <el-table-column label="经纬度">
        <template slot-scope="scope">
          <span @click="lookMap(scope.row)" style="color:blue">{{ scope.row.local }}</span>
        </template>
      </el-table-column>
    </el-table>

    <div>
      <Map ref="map"></Map>
    </div>
  </div>
</template>
<script>
import http from 'axios'
import Map from './component/Map.vue'
export default {
  components: {
    Map,
  },
  data() {
    return {
      address: '',
      addressList: [],
      ak: 'K41uUmX1jaPXO6pnczAePzI0LlPcPGUZ',
      query: '医院',
    }
  },
  methods: {
    search() {
      http
        .get(
          `/baidu/place/v2/search?query=${this.address}&region=全国&output=json&ak=${this.ak}`
        )
        .then((res) => {
          console.log(res.data.results)
          this.addressList = res.data.results
          this.addressList.forEach((item) => {
            item['local'] = `${item.location.lng},${item.location.lat}`
          })
        })
    },
    lookMap(row) {
      this.$refs.map.setLoacl(row.location.lng, row.location.lat)
    },
  },
}
</script>