// 配置一个axios,导出一个配置好的axios
import axios from 'axios'
/* import store from '@/store'
import router from '@/router' */

// 进行配置
axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0/'
export default axios
