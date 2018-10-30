const express = require("express");
const router = express.Router();
const pool = require("../pool");

//注册
router.post("/add",(req,res)=>{ 
    var phone = req.body.phone;
    var upwd = req.body.upwd;
    if(!phone)
	{
		res.send('手机号不能为空');
		
    }
    if(!upwd)
	{
		res.send('密码不能为空');
		
    }
    
    var sql = "INSERT INTO `qm_user`(`uid`,`phone`,`upwd`,`uname`) VALUES (null,?,?,null)";
    pool.query(sql,[phone,upwd],(err,result)=>{
        console.log(result);
        if(err) throw err;
         if(result.affectedRows>0){
             res.send({"code":200,"msg":"注册成功"})
         }else{
             res.send({"code":301,"msg":"注册失败"})
         }
    })
})
//查询手机号是否重复
router.get("/verification",(req,res)=>{
    var _phone = req.query.phone;
    var sql = "SELECT * FROM qm_user WHERE phone = ?";
    pool.query(sql,_phone,(err,result)=>{
        if(err) throw err;
        console.log(result);
        if(result.length>0){
            res.send({"code":301,"msg":"手机号已注册"})
        }else{
            res.send({"code":200,"msg":"手机号可用"});
        }
    })
})

//登录

router.post("/login",(req,res)=>{
	var obj = req.body;
	//非空验证
	var _phone = obj.phone;
	var _upwd = obj.upwd;
	if (!_phone) {
		res.send({
			code:401,
			msg:"手机号不能为空!!"
		});
		return;
	}
	if (!_upwd) {
		res.send({
			code:402,
			msg:"密码不能为空!!"
		});
		return;
	}
	var sql = "SELECT * FROM qm_user WHERE phone=? AND upwd=?";
	pool.query(sql,[_phone,_upwd],(err,result)=>{
		if(err) throw err;
		if(result.length>0){
			result = JSON.stringify(result[0]);
			result = JSON.parse(result);
			res.send({
				"code":200,
				"msg":"登录成功!!",
				"uid":result.uid
			});
		}else{
			res.send({
				code:301,
				msg:"用户名或密码错误!!"
			})
		}
	})
})

module.exports=router;
