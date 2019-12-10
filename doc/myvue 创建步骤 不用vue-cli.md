## myvue 创建步骤 不用vue-cli

1.  初始化项目 npm init -y

2.  下载 vue包 npm install vue --save

3.  创建文件目录

   3.1  src 源码目录 

   3.2  public html模板

   3.3 创建webpack.config.js、程序主入口 main.js 在src文件夹下 创建 App.vue 文件

   app.vue 代码

   ```
   <template>
     <div>
       <h1>
         这是一个vue项目
       </h1>
     </div>
   </template>
   ```

   main.js 代码 页面入口js文件

   ```
   import Vue from 'vue'
   import App from './app.vue'
   
   new Vue({
     render: h => h(App)
   }).$mount("#app")
   ```

   

   

4.  安装webpack webpack-cli  npm install --save-dev webpack webpack-cli

5.  配置webpack.config.js 

   ```
   const path = require('path')
   
   module.exports={
     entry: './src/main.js',
     output: {
       filename: 'bundle.js',
       path: path.resolve(__dirname,'dist')
     }
   }
   ```

   

6. package.json 文件 scripts 下添加一下两句 "build": "webpack"

   "dev": "webpack-dev-server"

   ```
   srcripts:{
   	"build": "wepback"
   }
   ```

7. 安装 解析vue 的loader 文件

   npm install --save-dev vue-loader vue-template-compiler 

8. 运行 npm run build （打包文件）

   报错如下：

   ![avatar](G:\yyb\myvue\doc\imgerror\builderror01.png)

​       报错提示 vue-loader 没有相应的插件 

​		参考官方文档 https://vue-loader.vuejs.org/migrating.html#a-plugin-is-now-required . Vue-loader			         		在15.*之后的版本都是 vue-loader的使用都是需要伴生 VueLoaderPlugin的,

9. 在webpack.config.js 中加入  require('vue-loader/lib/plugin')

   ```
   const path = require('path')
   const VueLoaderPlugin =require('vue-loader/lib/plugin')
   
   module.exports={
     entry: './src/main.js',
     output: {
       filename: 'bundle.js',
       path: path.resolve(__dirname,'dist')
     },
     module:{
       rules:[
         {
           test:/\.vue$/,
           loader:'vue-loader'
         }
       ]
     },
     plugins:[
       new VueLoaderPlugin()
     ]
   }
   ```

10. 打包成功。 为了在本地跑起来 安装 npm install --save-dev webpack-dev-server

11. 配置webpack.config.js 文件

    ```
    devServer:{
    	contentBase:'./dist',
    	inline:true
    }
    ```

    在package.js 文件中加一下代码.和build 在一个层级下

    ```
    	"server": "webpack-dev-server"
    	
    ```

12. 执行 npm run serve 。生成成功 打开网页显示如下：

    <img src="G:\yyb\myvue\doc\imgerror\npmservererror01.png" alt="avatar" style="zoom:50%;" />

13. 这主要是因为没有入口html 文件造成 

14. 安装 html 插件 npm install html-webpack-plugin --save-dev

    配置webpack.config.js

    ```
    const HTMLWebpackPlugin = require('html-webpakc-plugin')
    module.exports = {
    ```
    	plugins:[
    		new HTMLWebpackPlugin()
    	]
    	```
    }

    ```
    
    ```

15. 再次运行 npm run serve 成功后 在浏览器打开localhost：8080.再次报错：

    ![avatar](G:\yyb\myvue\doc\imgerror\servererror02.png)

这个错误 一看是渲染的问题。但是解决这个问题还是花了些时间。在stackflow上找到了答案

This is a [chicken-and-egg](https://en.wikipedia.org/wiki/Chicken_or_the_egg) problem. You're trying to amount the root component to the `#app` div, but the `#app` div exists inside the `App` component. At the time when you call `new Vue` the `#app` div doesn't exist because the `App` component hasn't mounted!

Most Vue apps have an empty `` in the `index.html` file so that the root Vue component has somewhere to mount to when the page has loaded.

If you don't want to do it that way then you can mount it manually instead:

```es6
const root = new Vue({
  render: (h) => h(App),
  router
}).$mount()

document.body.appendChild(root.$el)
```

大概意思就是

 试图将根组件赋值给 ”App“，但是id 为 app 的div 在组件内部。当调用vue的时候 id="div"不存在，因为“app.vue”组件还没安装

大多数vue应用程序在都有一个空的index.html 文件。因此页面加载后，根据Vue组件可以装载到某个位置。

如果不想这样做，则可以手动安装：

```const root = new Vue({
  render: (h) => h(App),
  router
}).$mount()

document.body.appendChild(root.$el)
```

ok

那我们在 public文件夹下 创建index.html 文件

修改webpack.config.js 文件

```
module.export = {
···
    plugins:[
        new HTMLWebpackPlugin({
            template:'./public/index.html'//打包创建html文件模板
        })
    ]
···
}
```
ok

16. 再次运行 npm run serve 打开网页 成功
17.  然后我们在 项目中在添加一些样式 ，需要引入一些样式 loader css-loader style-loader
18. end

## 接下来 我们要对 webpack.config.js文件进行分离

1. 新建一个build 文件夹
2. 在 build文件夹下创建三个文件。分别为 base.config.js production.config.js dev.config.js
3. 安装合并配置文件的 插件 npm install --save-dev webpack-merge