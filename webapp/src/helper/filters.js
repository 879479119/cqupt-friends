/**
 * @author zi
 * @created 2017/6/13
 * @description
 */
import Vue from "vue"

Vue.filter("dateFormat", e => {
  let d = new Date(+e)
  let str = `${d.getMonth()+1}-${d.getDate()}  ${d.getHours()}:${d.getMinutes()}`
  return str
})
