<template>
  <div class="profile">
    <img :src="'http://jwzx.cqupt.edu.cn/showstuPic.php?xh='+profile.s_num" alt="">
    <section>
      <p>姓名: <span>{{profile.s_name}}</span></p>
      <p>学号: <span>{{profile.s_num}}</span></p>
      <p>专业: <span>{{profile.c_spec}}</span></p>
      <p>学院: <span>{{profile.depart}}</span></p>
      <p>性别: <span>{{profile.s_sex}}</span></p>
    </section>
  </div>
</template>

<script>
  import API from "../request"
	export default {
    name: '',
		data(){
			return {
				stu: '',
				profile: {
					"class_id":56,
          "c_name":"0151301",
          "c_count":18,
          "c_spec":"广播电视工程",
          "id_spec":4,
          "s_num":2013210278,
          "s_name":"欧阳林芳",
          "depart":"通信与信息工程学院",
          "id":1463,
          "s_sex":"女",
          "s_class":"0151301",
          "s_status":"在校",
          "r_count":"00000"
        },
      }
		},
    mounted(){
			this.stu = this.$route.params.id
			API.getStudent(this.stu).then(res => {
				this.profile = res.data
      })
    }
	}
</script>

<style scoped lang="scss">
  .profile{
    text-align: left;

    img{
      width: 160px;
      height: 240px;
    }

    section{
      display: inline-block;
    }
  }
</style>
