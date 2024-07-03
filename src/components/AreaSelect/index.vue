<template>
  <div>
    <el-cascader
      style="width: 100%;height:36px"
      :options="options"
      v-model="selectedOptions"
      @change="handleChange"
      clearable
    >
    </el-cascader>
  </div>
</template>

<script>
import { regionData, CodeToText } from 'element-china-area-data'
export default {
  data() {
    return {
      options: [],
      selectedOptions: [],
    }
  },
  mounted() {
    // 只获取山东省下面的数据
    this.options = regionData.find((item) => item.label === '山东省').children
  },
  methods: {
    handleChange() {
      let loc = []
      for (let i = 0; i < this.selectedOptions.length; i++) {
        loc.push(CodeToText[this.selectedOptions[i]])
      }
      this.$emit('handleChange', loc)
    },
  },
}
</script>