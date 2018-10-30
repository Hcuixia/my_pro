const express=require("express")
const router=express.Router()
const pool=require("../pool")

///products
//测试 http://127.0.0.1:3000/products/?kw=棉
router.get("/",(req,res)=>{
  var kw=req.query.kw;
  var kws=kw.split(" ");
  console.log(req.query)
  
  kws.forEach((elem,i,kws)=>
    kws[i]=` title like '%${elem}%' `);
  var where=` where ${kws.join(" and ")} `
  
  var sql=`SELECT * ,(
    SELECT md FROM qm_pic
      where product_id = lid
      LIMIT 1
  ) AS md
  FROM qm_details`;   
  sql += where;
  // data.pageCount = Math.ceil(count/8);
  //var pno= req.query.pno;
  // var limit = ` limit ${data.pno*8},8`
  // sql += limit;

  pool.query(sql,[],(err,result)=>{
    if(err) console.log(err);
    //console.log(result);
    data={};                     //新建结果对象
    data.pno = req.query.pno;  

    data.pageCount = Math.ceil(result.length/8)

    data.products=result.slice(data.pno*8,data.pno*8+8);

    res.send(data);
    //console.log(data);
  })
  //测试: 
  //http://127.0.0.1:3000/products/?kw=棉&pno=0
})

module.exports=router