<template>
    <div v-if="kk === true">
      <label>Username</label>
      <input placeholder="Enter your username" key="1">
      <button @click="click">toggle!</button>
    </div>
    <div v-else-if="kk === false">
      <label>Email</label>
      <input placeholder="Enter your email address" key="1">
      <button @click="click">toggle!</button>
    </div>
</template>


<script>
	export default {
		name: '',
		data(){
			return {
				kk: true
      }
		},
    methods: {
			click(){
				this.kk = !this.kk
      }
    }
	}
</script>

<style scoped>

</style>
