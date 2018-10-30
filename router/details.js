const express=require("express")
const router=express.Router()
const pool=require("../pool")

router.get("/",(req,res)=>{
    //按lid查询商品信息和规格列表
    var lid = req.query.lid;
    var obj={product:{},dnames:[],pics:[]};
    (async function(){
        //1.按lid查询商品信息--异步
        var sql = `SELECT * 
          FROM qm_details WHERE family_id=?`;
        await new Promise(function(open){
            pool.query(sql,[lid],(err,result)=>{
                if(err) console.log(err);
                obj.product=result[0];
                open();
            })
        }) 
        //2. 按lid查询颜色列表——异步
    var sql=`select lid, dname from qm_details 
    where family_id=(
      select family_id from qm_details where lid=?)`;
    await new Promise(function(open){
      pool.query(sql,[lid],(err,result)=>{
        if(err) console.log(err);
        obj.dnames=result;
        open(); 
      })
    })
    
        //4. 按lid查询图片列表——异步
    var sql=`select * from qm_pic where product_id=?`;
    await new Promise(function(open){
      pool.query(sql,[lid],(err,result)=>{
        if(err) console.log(err);
        obj.pics=result;
        open(); 
      })
    })
    //console.log(obj);
    res.send(obj);//5. 返回结果   
    })()
})

module.exports=router
