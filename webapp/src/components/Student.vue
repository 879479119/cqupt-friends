<template>
  <div>
    <div class="profile">
      <div class="user">
        <img :src="'http://jwzx.cqupt.edu.cn/showstuPic.php?xh='+profile.s_num" alt="">
        <section>
          <p>姓名: <span>{{profile.s_name}}</span></p>
          <p>学号: <span>{{profile.s_num}}</span></p>
          <p>专业: <span>{{profile.c_spec}}</span></p>
          <p>学院: <span>{{profile.depart}}</span></p>
          <p>性别: <span>{{profile.s_sex}}</span></p>
        </section>
      </div>

      <percentage :percentages="pp" title="个人旷到比例"></percentage>
    </div>
    <table class="table">
      <tr>
        <th>ID</th>
        <th>学号</th>
        <th>是否出席</th>
        <th>点到时间</th>
      </tr>
      <tr v-for="(item, index) in list" :key="index">
        <td>{{item.r_id}}</td>
        <td>{{item.s_num}}</td>
        <td>{{item.r_present ? '旷课' : '到场'}}</td>
        <td>{{item.r_date | dateFormat}}</td>
      </tr>
    </table>
  </div>

</template>

<script>
  import API from "../request"
  import Percentage from "./Percentage"
	export default {
    name: '',
    components: {
      percentage: Percentage
    },
		data(){
			return {
				stu: '',
				profile: {
					"class_id":56,
          "c_name":"0151301",
          "c_count":18,
          "c_spec":"广播电视工程",
          "id_spec":4,
          "s_num": 0,
          "s_name":"欧阳林芳",
          "depart":"通信与信息工程学院",
          "id":1463,
          "s_sex":"女",
          "s_class":"0151301",
          "s_status":"在校",
          "r_count":"00000"
        },
        list: []
      }
		},
    computed: {
			pp(){
        let a = 0, b = 0
        this.list.map((item, index)=>{
          if(item.r_present === 1) a ++
          else b ++
        })
        console.info(a,b)
        let k = [{
          text: "到堂次数",
          count: tt(a === 0 ? 0 : (100 * a / this.list.length), this.list.length)
        },{
          text: "旷到次数",
          count: tt(100 * b / this.list.length, this.list.length)
        }]
        console.info(k)
        return k
      }
    },
    mounted(){
			this.stu = this.$route.params.id
			API.getStudent(this.stu).then(res => {
				this.profile = res.data
      })
      API.getRandomDetails(this.stu).then(res => {
				this.list = res.data
      })
    }
	}

	function tt(e, sum) {
    if(e === 0) return 0.01
    if(e === 100) return 99.99
    return 100 * e / sum
  }
</script>

<style lang="scss">
  .profile{
    text-align: left;
    display: inline-block;
    vertical-align: top;
    .user{
      display: inline-block;
      margin-top: 60px;
      section{
        margin-left: 40px;
      }
    }

    img{
      width: 160px;
      height: 240px;
      vertical-align: top;
    }

    section{
      display: inline-block;
    }
  }
  table {
    display: inline-block;
    margin-top:60px;

    tr:nth-child(odd) {
      background: #fff;

    }
    tr {
      padding: 4px;
      &:not(:first-child):hover {
        background: #ddd;
      }
      th, td {
        max-width: 100px;
        min-width: 80px;
        margin: 10px;
        padding: 10px;
        a {
          text-decoration: none;
          color: #00bfff;
        }
      }
    }
  }
</style>
