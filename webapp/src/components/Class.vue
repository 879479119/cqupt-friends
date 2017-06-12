<template>
  <div class="students">
    <h2>{{cls}}</h2>
    <section>
      <table class="table">
        <tr>
          <th>ID</th>
          <th>学号</th>
          <th>姓名</th>
          <th>性别</th>
          <th>学籍状态</th>
          <th>被点次数</th>
          <th>到场次数</th>
          <th>用户详情</th>
        </tr>
        <tr v-for="(item, index) in array" :key="index">
          <td>{{item.id}}</td>
          <td>{{item.s_num}}</td>
          <td>{{item.s_name}}</td>
          <td>{{item.s_sex}}</td>
          <td>{{item.s_status}}</td>
          <td>{{+ item.r_count}}</td>
          <td>{{+ item.r_present}}</td>
          <td><router-link :to="'/student/'+item.s_num">详情</router-link></td>
        </tr>
      </table>
      <percentage :percentages="present"></percentage>
    </section>
  </div>
</template>

<script>
  import API from "../request"
  import Percentage from "./Percentage.vue"
  export default {
    name: 'list',
    components: {
    	percentage: Percentage
    },
    data(){
      return {
        cls: '',
        array: []
      }
    },
    computed: {
    	present(){
    		let a = 0, b = 0
    		this.array.map((item, index)=>{
    			if(item.r_count > item.r_present){
    				a ++
          }else{
    				b ++
          }
        })
        return [{
    			text: "旷到记录",
          count: 100 * a / this.array.length
        },{
          text: "从未旷到",
    			count: 100 * b / this.array.length
        }]
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
      display: inline-block;
      tr:nth-child(odd){
        background: #fff;

      }
      tr{
        padding: 4px;
        &:hover{
          background: #969696;
        }
        th,td{
          max-width: 100px;
          min-width: 80px;
          margin: 10px;
          padding: 10px;
          a{
            text-decoration: none;
            color: #00bfff;
          }
        }
      }

    }
  }
</style>
