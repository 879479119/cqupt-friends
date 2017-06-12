<template>
  <div class="container">
    <h2>{{route}}</h2>
    <div class="inner">
      <div class="left">
        <img :src="imgs[img]" alt="">
        <el-tag type="primary">2013级</el-tag>
        <el-tag type="success">2014级</el-tag>
        <el-tag type="warning">2015级</el-tag>
        <el-tag type="danger">2016级</el-tag>
      </div>
      <el-collapse v-model="activeNames" @change="handler">
        <el-collapse-item v-for="(item, index) in showData" :key="index" :title="item.spec" :name="index">
          <template v-for="(t, i) in item.classes" >
            <br v-if="chkGrade(t.name, i)">
            <router-link :to="'/class/'+t.name" :key="i">
              <el-tag :type="typeByGrade(t.name)">
                {{t.name}}<span>({{t.count}})</span>
              </el-tag>
            </router-link>
          </template>
        </el-collapse-item>
      </el-collapse>
    </div>
  </div>
</template>

<script>
  const imgs = [
    '//img.hb.aicdn.com/187bc4b1aa4fd207dbbc6c40e35fd61e77e3fe1639ca4-teanfM_fw236',
    '//img.hb.aicdn.com/5f14d8de2086abb57a46b454266a13a5e6612bc9206fc-3BnrEJ_fw236',
    '//img.hb.aicdn.com/3171c50de3ed82253b8c35e43e6543ba35c0ad7e34ef5-fVvcao_fw236',
    '//img.hb.aicdn.com/f79825ba96ab7a1d5576269290db3da87eb058f83bfbe-JEnfg7_fw236',
    '//img.hb.aicdn.com/be8ee3897d14edf3a87b67911bb6a68e748643319695e-eKCo3I_fw236',
    '//img.hb.aicdn.com/ffe6e4abed27a74e046c9ad78b9213f6bd11ae57fff9-p2BCgL_fw236',
    '//img.hb.aicdn.com/3aa7aaead80770eac5252a2ca8b1ab52861d5f631ec80-KiwBvn_fw236',
    '//img.hb.aicdn.com/e3cde941cd30a5cca4a7c216c7dcf157cf3776be1dcd2-ttPCTH_fw236',
    '//img.hb.aicdn.com/1b966365657de256034b1e6f5be3f58387d7b7104ed1d-MYN5gA_fw236',
    '//img.hb.aicdn.com/cfd9088e640a91724a1319368325b6c1ee24e0d5354cb-hM9VLT_fw236',
    '//img.hb.aicdn.com/8b4e505435b354508135a384dfa1a37de79f4b9030708-ZnmrVh_fw236',
    '//img.hb.aicdn.com/2683cce907fd9c763d2fefd48b3f057bbaa89147ac19-5u56tY_fw236',
    '//img.hb.aicdn.com/44c569102d08941a02bd5a7841f9e6ca1e5b99802fb78-PCCQ0H_fw236',
    '//img.hb.aicdn.com/c3c87a88f16a871f7579fd1ef06ea1c35d21550a2053b-9PGC8i_fw236',
    '//img.hb.aicdn.com/ddbbc56089d2c2da6ecd20efdcc2ca60f27cb43e1b373-OAJ52u_fw236',
    '//img.hb.aicdn.com/53d1ae11c232923dac5c3fbd9aa7f2bfcbb0d414386fe-CsO1dk_fw236',
  ]

  import API from "../request"
	export default {
		name: '',
		data(){
			return {
				route: 'QAQ',
        data: [],
        activeNames: '1',
        imgs
      }
		},
    computed: {
			img(){
				return this.route.length
      },
			showData(){
				let d = [], obj = {}, c = -1
        for(let i = 0;i < this.data.length;i ++){
					if(this.data[i]['c_spec'] in obj){
						d[c].classes.push({
              name: this.data[i]['c_name'],
              count: this.data[i]['c_count']
            })
          }else{
						obj[this.data[i]['c_spec']] = true
						d[++ c] = {
              spec: this.data[i]['c_spec'],
              classes: [{
              	name: this.data[i]['c_name'],
                count: this.data[i]['c_count']
              }]
            }
          }
        }
				return d
      }
    },
    mounted(e){
			this.route = this.$route.params.id
      API.getSpec(this.route).then(res => {
      	this.data = res.data
      })
    },
    methods: {
      handler(e){
      	console.info(e)
      },
      typeByGrade(e){
      	console.info(e)
        let grade = + e.match(/(\d{2})\w{2}$/)[1]
        switch (grade){
          case 13: return 'primary'
          case 14: return 'success'
          case 15: return 'warning'
          case 16: return 'danger'
        }
      },
      chkGrade(e, i){
      	if(i === 0) return false
        let class_id = e.match(/\w{2}$/)[0]
        return class_id === "01"
      }
    }
	}
</script>

<style scoped lang="scss">
.container{
  width: 90%;
  margin: 0 auto;
  .inner{
    display: flex;
    text-align: left;
    .left{
      text-align: center;
      width: 280px;
      span{
        margin-top: 10px;
        margin-left: 2px;
      }
    }
    .el-collapse{
      flex: 1;
      a{
        display: inline-block;
        margin-top: 10px;
        margin-left: 10px;
      }
    }
  }
}
</style>
