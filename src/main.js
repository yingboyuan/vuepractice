import Vue from 'vue'
import App from './app.vue'

new Vue({
  render: h => h(App)
}).$mount("#app")

/*
上面那种方式需要创建一个index.html （在public文件加下）文件。如果不想创建可以用下面这种方式
因为vue-cli创建出来的项目就是在public文件下创建一个index.html文件，所以这里我们采用上面那种方式
const root = new Vue({
  render: (h) => h(App),
  router
}).$mount()

document.body.appendChild(root.$el)
*/