import Vue from 'vue'
import App from './App'
import router from './router'
import {
  Button, Search, Icon, Swipe, SwipeItem, Lazyload, Image as VanImage,
  Tabbar, TabbarItem, Card, Tab, Tabs, Popup, TreeSelect, Pagination, List,
  Cell, Tag, Toast
} from 'vant';
import '@/assets/style/common.css'
import axios from 'axios'

Vue.prototype.$http = axios
axios.defaults.baseURL = 'https://autumnfish.cn/'
Vue.config.productionTip = false
Vue.use(Button)
Vue.use(Search)
Vue.use(Icon)
Vue.use(Swipe)
Vue.use(SwipeItem)
Vue.use(Lazyload)
Vue.use(VanImage)
Vue.use(Tabbar)
Vue.use(TabbarItem)
Vue.use(Card)
Vue.use(Tab)
Vue.use(Tabs)
Vue.use(Popup)
Vue.use(TreeSelect)
Vue.use(Pagination)
Vue.use(List)
Vue.use(Cell)
Vue.use(Tag)
Vue.use(Toast)

new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
