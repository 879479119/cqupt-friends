<template>
  <div class="students">
    <h2>{{cls}}</h2>
    <section>
      <el-table :data="array" stripe style="width: 100%" @click="click">
        <el-table-column prop="id" label="ID" width="180"></el-table-column>
        <el-table-column prop="s_class" label="班级" width="180"></el-table-column>
        <el-table-column prop="s_name" label="姓名" width="180"></el-table-column>
        <el-table-column prop="s_num" label="学号" width="180"></el-table-column>
        <el-table-column prop="s_sex" label="性别" width="180"></el-table-column>
        <el-table-column prop="s_status" label="学籍状态" width="180"></el-table-column>
      </el-table>
    </section>

  </div>
</template>

<script>
  import API from "../request"
  export default {
    name: 'list',
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
    },
    methods: {
    	click(e){
    		console.info(e)
      }
    }
  }
</script>

<style scoped lang="scss">
  .students{
    background: #f3f3f3;
    table{
      margin: 0 auto;
      div{
        text-align: center;
      }
    }
  }
</style>
