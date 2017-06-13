<template>
  <div class="percentage">
    <svg width="400" height="400">
      <g transform="translate(140,60)">
        <text font-size="20">{{title}}</text>
      </g>
      <g>
        <path v-for="(item, index) in paths" :key="index" :d="item.path" stroke-width="40" fill="transparent" :stroke="item.color" :transform="`rotate(${item.rotate})`"></path>
      </g>
      <g>
        <g v-for="(item, index) in paths" :key="index" :transform="`translate(${(index % 3)*100+80}, ${320 + (index > 2 ? 30 : 0)})`">
          <rect width="20" height="20" :fill="item.color"></rect>
          <text fill="#555" :x="30" :y="16">{{item.text}}</text>
        </g>
      </g>
    </svg>
  </div>
</template>

<script>
	export default {
		name: '',
		props: ['percentages', 'title'],
		data(){
			return {
      }
		},
    computed: {
      paths(){
      	let sum = 0, colors = ['#00caab', '#00bfff', 'orange', '#ddd', 'pink', 'brown']

      	let r = 80, cx = 200, cy = 200
      	return this.percentages.map((item, index)=>{
          let progress = item.count / 100
          let degrees = progress * 360
          let rad = degrees * (Math.PI / 180)
          let x = (Math.sin(rad) * r).toFixed(2)
          let y = -(Math.cos(rad) * r).toFixed(2)
          let length = window.Number(degrees > 180)
          let descriptions = ['M', cx, cy - r, 'A', r, r, 0, length, 1, +x + cx, +y + cy]
          let t = sum
          sum += degrees
          return {
          	text: item.text,
          	rotate: t,
          	path: descriptions.join(' '),
            color: colors[index]
          }
        })
      }
    }
	}
</script>

<style scoped lang="scss">
  .percentage{
    display: inline-block;
    vertical-align: top;
    path{
      transform-origin: 200px 200px;
    }
  }

</style>
