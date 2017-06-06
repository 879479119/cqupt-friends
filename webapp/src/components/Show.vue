<template>
    <div>
      <p>123</p>
      <a href="#">1212331</a>
      <p>{{content}}</p>
      <label>
        <input type="text" v-model="content">
      </label>
      <p v-if="true">23333333</p>
    </div>
</template>

<script>
  export default {
  	name: 'show',
    data(){
  		return {
  			content: 123
      }
    },
    method: {
      p(c){
        return c.length % 2
      },
    },
    go(e){
    	console.info(e)
    },
    updated(){
  		console.info(123)
    },
    created(){
    	console.info(345)
    },
    destroyed(){
    	console.info(222)
    }
  }
</script>

<style scoped>
  p{
    background: #00B7FF;
  }
</style>
