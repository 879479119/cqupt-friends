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
  getClassMember(cls){
    return axios.get('/api/fellowList', {
      params: {
        cls
      }
    })
  },
  getStudent(stu){
    return axios.get('/api/student', {
      params: {
        stu
      }
    })
  },
}
