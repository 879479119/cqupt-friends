<template>
  <div class="students">
    <h2>{{cls}}</h2>
    <section>
      <section>
        <percentage :percentages="present" title="旷到人数比例"></percentage>
        <percentage :percentages="absence" title="全班旷到次数"></percentage>
        <percentage :percentages="ppp" title="全班被点次数"></percentage>
      </section>
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
    		if(this.array.length === 0){
          return [{
            text: "旷到记录",
            count: 50
          },{
            text: "从未旷到",
            count: 50
          }]
        }
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
      },
      absence(){
        if(this.array.length === 0){
          return [{
            text: "旷到记录",
            count: 50
          },{
            text: "从未旷到",
            count: 50
          }]
        }
        let k = new Array(5).fill(0)
        this.array.map((item, index)=>{
        	let p = item.r_present
          if(p >= 4) p = 4
          k[p] += 1
        })
        return k.map((t, i)=>{
        	return {
        		text: i + '次',
            count: t * 100 / this.array.length
          }
        })
      },
      ppp(){
        if(this.array.length === 0){
          return [{
            text: "旷到记录",
            count: 100
          }]
        }
        let k = new Array(6).fill(0)
        this.array.map((item, index)=>{
        	let p = item.r_count
          k[(p / 2) >>> 0] += 1
        })
        return k.map((t, i)=>{
        	return {
        		text: i * 2 +'-'+ (i * 2 + 1) + '次',
            count: t * 100 / this.array.length
          }
        })
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
        &:not(:first-child):hover{
          background: #ddd;
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
