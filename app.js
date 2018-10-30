//使用express构建web服务器
const express = require('express');
const bodyParser = require('body-parser');
//引入路由模块
const index = require("./router/index");
const users = require("./router/users");
const products = require("./router/products");
const details = require("./router/details")
const message = require("./router/message");

//加载处理post参数第三方模块

var app = express();
app.listen(3000);
//使用body-parser中间件
app.use(bodyParser.urlencoded({extended:false}));
//托管静态资源到public目录下
app.use(express.static(__dirname+"/public"));

//使用路由器来管理路由
app.use("/index",index);
app.use("/users",users);
app.use("/products",products);
//测试 http://127.0.0.1:3000/products/?kw=棉
app.use("/details",details);
app.use("/message",message);


