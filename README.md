# dataview
监控大屏，基于vue2和echarts

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run dev
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).


###  如何去掉mock
-  mock文件夹
- 删除 main.js 文件里面的mock引用： import '@/mock/index.js'
- 修改/src/apis/http.js,将baseURL恢复成代理模式，将http://yourproductserver.com:8080修改成实际后台api的地址

### 主页浏览

![alt 属性文本](/public/home.png?raw=true)
