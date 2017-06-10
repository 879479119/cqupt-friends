import axios from "axios"

export default {
  getDepart(){
    return axios.get('/api/departList')
  },
  getSpec(depart){
    return axios.get('/api/allSpecList', {
      params: {
        depart
      }
    })
  },
}
