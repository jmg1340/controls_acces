import axios from 'axios'

export default ({ Vue }) => {
  //Vue.prototype.$axios = axios


  /* el servidor esta a PROJECTS/EXPRESS/CONTROLSACCESS*/
  
  Vue.prototype.$axios = axios.create({
    baseURL: 'http://localhost:4001',
    withCredentials: false,
    // timeout: 1000,
    // headers: {
    //   'header': 'value'
    // }
  })  
}
