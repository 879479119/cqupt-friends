<template>
  <div>
    <h2>学院列表</h2>
    <div class="container">
      <el-card :body-style="{ padding: '0px' }" v-for="(o, index) in departList" v-bind:key="index">
        <a :style="{backgroundImage: `url(${imgs[index]})`}" :href="'#/specList/'+o.depart">
          <span>{{o.depart}}</span>
        </a>
      </el-card>
    </div>
  </div>
</template>

<script>
  import API from "../request/index"

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

	export default {
		name: '',
		data(){
			return {
				departList: [],
        imgs
      }
		},
    mounted(){
			API.getDepart().then(res => {
        console.info(res)
        this.departList = res.data
      })
    }
	}
</script>

<style scoped lang="scss">
.container{
  flex-wrap: wrap;
  display: flex;
  .el-card{
    /*width: 220px;*/
    margin: 13px;
    cursor: pointer;
    a{
      max-height: 400px;
      display: block;
      padding-top: 10px;
      background: #fff ;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      span{
        width: 60px;
        display: inherit;
        font-size: 50px;
        font-weight: bold;
        /*background-clip: text;*/
      }
      position: relative;
      transition: padding-top 1s;
      &:hover{
        padding-top: 20px;
      }
    }
  }
}
</style>
