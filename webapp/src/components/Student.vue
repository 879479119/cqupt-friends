<template>
  <el-table
    :data="array"
    stripe
    style="width: 100%">
    <el-table-column
      prop="date"
      label="日期"
      width="180">
    </el-table-column>
    <el-table-column
      prop="name"
      label="姓名"
      width="180">
    </el-table-column>
    <el-table-column
      prop="address"
      label="地址">
    </el-table-column>
  </el-table>
</template>

<script>
  import API from "../request"
	export default {
    name: '',
		data(){
			return {
				cls: '',
				array: []
      }
		},
    mounted(){
			this.cls = this.$route.params.id
			API.getClassMember(this.cls).then(res => {
				this.array = res.data
      })
    }
	}
</script>

<style scoped lang="scss">

</style>
