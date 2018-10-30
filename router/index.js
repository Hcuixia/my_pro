const express = require("express");
const router = express.Router();
const pool = require("../pool");

router.get("/",(req,res)=>{
    var obj={imgs:{},product:[]};
    (async function(){ 
        var sql = `SELECT md_url FROM qm_product_pic`;
        await new Promise(function(open){
            pool.query(sql,(err,result)=>{
                if(err) console.log(err);
                obj.imgs=result;
                open();
            })
        }) 
        var sql = `SELECT lid,title,price,(
            SELECT md FROM qm_pic
              where product_id = lid
              LIMIT 1
          ) AS md
          FROM qm_details LIMIT 0,6`;
        await new Promise(function(open){
            pool.query(sql,(err,result)=>{
                if(err) console.log(err);
                obj.product=result;
                open();
            })
        }) 
             
        res.send(obj);
    })()
    
})

















//导出路由
module.exports = router;