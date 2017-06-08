<template>
  <div>
    <p>123</p>
    <a href="#">1212331</a>
    <p>{{content}}</p>
    <label>
      <input type="text" v-model="content">
    </label>
    <p v-if="true">23333333</p>
    <ul v-for="item in todos">
      <li :title="item.text" @click="p">{{item.text}}</li>
    </ul>
    <p>age: {{age | f}}</p>
    <p>your: {{my_content}}</p>
  </div>
</template>

<script>
  export default {
//  	name: 'show1',
    props: ['age'],
    data(){
  		return {
  			content: (()=>{console.info(12222223);return 0})(),
        todos: [
          { text: '学习 JavaScript' },
          { text: '学习 Vue' },
          { text: '整个牛项目' }
        ]
      }
    },
    watch: {
    	age(){
        this.content = "他改变了中国！"
      }
    },
    computed: {
    	my_content() {
        return this.content + '233333333333'
      }
    },
    methods: {
      p(c){
      	console.info(this.content)
        return c.length % 2
      },
    },
    filters: {
    	f(a){
    		return a + 'OK!'
      }
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
