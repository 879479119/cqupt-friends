<template>
  <div class="students">
    <h2>{{cls}}</h2>
    <section>
      <table class="table">
        <tr v-for="(item, index) in array" :key="index">
          <td>{{item.id}}</td>
          <td>{{item.s_num}}</td>
          <td>{{item.s_name}}</td>
          <td>{{item.s_sex}}</td>
          <td>{{item.s_status}}</td>
          <td>{{+ item.r_count}}</td>
          <td><router-link :to="'/student/'+item.s_num">详情</router-link></td>
        </tr>
      </table>
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

      tr{
        padding: 10px;
        td{
          width: 100px;
          margin: 10px;
          a{
            text-decoration: none;
            color: #00bfff;
          }
        }
      }
      tr:nth-child(odd){
        background: #fff;

      }
    }
  }
</style>
