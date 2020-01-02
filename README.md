# exchange-rate
汇率看板的自制koa2后台服务
``` sh
echo "# exchange-rate" >> README.md
git init
git add README.md
git commit -m "first commit"
git remote add origin https://github.com/nimdean/exchange-rate.git
git push -u origin master
```


## exchange-rate启动方法

先克隆项目
``` sh
git clone https://github.com/nimdean/exchange-rate.git
```
打开项目文件安装依赖
``` sh
npm install
```
运行项目
``` sh
npm run dev
```
访问接口
1. 浏览器访问<br/>
  如查看`/rate`的数据，可打开浏览器直接输入`localhost:3000/rate`即可查看该接口返回的数据。
2. 运用在前端项目中<br/>
  一般使用插件`axios`来发送`ajax`请求。
    ``` js
    import axios from 'axios'
    axios.get('/rate').then(rs => {
      // rs为请求返回的内容
    })
    ```
