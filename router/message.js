const express = require("express");
const router = express.Router();
const pool = require("../pool");

router.get("/",(req,res)=>{
    var rows = [];
    rows.push({title:"婴童",date:"2018-11-11",img_url:"https://res.purcotton.com/category/adv001.jpg",des:"越努力，越..."});
	rows.push({title:"女士",date:"2018-11-11",img_url:"https://res.purcotton.com/app/images/home/1011/women.jpg",des:"越努力，越..."});
	rows.push({title:"家具",date:"2018-11-11",img_url:"https://res.purcotton.com/app/images/home/1011/home.jpg",des:"越努力，越..."});
    rows.push({title:"男士",date:"2018-11-11",img_url:"https://res.purcotton.com/app/images/home/1011/man.jpg",des:"越努力，越..."});
    rows.push({title:"其他",date:"2018-11-11",img_url:"https://res.purcotton.com/category/adv005.jpg",des:"越努力，越..."});
    res.send(rows);

});



module.exports=router;