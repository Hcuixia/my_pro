SET NAMES UTF8;
DROP DATABASE IF EXISTS qm;
CREATE DATABASE qm CHARSET=UTF8;
USE qm;

/*1. 用户信息表*/
CREATE TABLE qm_user(
    uid INT PRIMARY KEY AUTO_INCREMENT DEFAULT NULL,
    uname VARCHAR(32) DEFAULT NULL,         #用户昵称
    upwd  VARCHAR(32) DEFAULT NULL,          #用户密码
    phone VARCHAR(16) DEFAULT NULL,         #用户手机号码
    user_name VARCHAR(32) DEFAULT NULL,     #用户真实姓名
    gender INT DEFAULT NULL                 #用户性别 0-女 1-男
);
INSERT INTO qm_user VALUES
     (null,"dingding","123456","15238667016","丁丁",1 ),
     (null,"dangdang","123456","15617699403","当当",0 ),
     (null,"tom","123456","15617829662","汤姆",1 ),
     (null,"lili","123456","15238667116","丽丽",0 ),
     (null,"jack","123456","15638667016","杰克",1 ),
     (null,"rose","123456","15230667016","丁丁",0 ); 


/*2.一级商品分类 */
CREATE TABLE qm_product_family(
    fid INT PRIMARY KEY AUTO_INCREMENT DEFAULT NULL, #所属家族编号
    fname VARCHAR(32) DEFAULT NULL              #类别名称
);
INSERT INTO qm_product_family VALUES
     (01,"婴童"),
     (02,"女士"),
     (03,"家居"),
     (04,"男士");

  /*商品分类图片*/
CREATE TABLE qm_product_pic(
     cid INT PRIMARY KEY AUTO_INCREMENT default NULL, 
     family_id INT default null,
     FOREIGN KEY(family_id) REFERENCES qm_product_family(fid),
     img_url VARCHAR(128) default NULL,		               		
     href VARCHAR(128) default NULL		               #图片链接
);

INSERT INTO qm_product_pic VALUES
     (null,01,"img/fenlei/20170515-kids.jpg",null),
     (null,01,"img/fenlei/kids.jpg",null ),
     (null,02,"img/fenlei/20170515-women.jpg",null),
     (null,02,"img/fenlei/women.jpg",null),
     (null,03,"img/fenlei/20170515-home.jpg",null),
     (null,03,"img/fenlei/home.jpg",null),    
     (null,04,"img/fenlei/20170515-men.jpg",null),
     (null,04,"img/fenlei/men.jpg",null);


   

/*3.二级商品分类 */
CREATE TABLE qm_pro_one(
    id INT PRIMARY KEY AUTO_INCREMENT DEFAULT NULL, 
    family_id INT DEFAULT NULL,            #所属一级类别
    FOREIGN KEY(family_id) REFERENCES qm_product_family(fid),
     one_name VARCHAR(32) DEFAULT NULL       #类别名称 
);
INSERT INTO qm_pro_one VALUES
     (01001,001,"婴童护理"),
     (01002,001,"婴童卫浴"),
     (01003,001,"婴童床品"),
     (01004,001,"婴童服饰"),

     (02001,02,"女士服装服饰"),
     (02002,02,"美容用品"),
     (02003,02,"女士卫生用品"),
     (02004,02,"孕产用品"),

     (03001,03,"厨房用品"),
     (03002,03,"床上用品"),
     (03003,03,"护理用品"),
     (03004,03,"旅游户外"),

     (04001,04,"男士服装服饰"),
     (04002,04,"男士卫生用品");

/*4. 三级商品分类*/
CREATE TABLE qm_pro_two(
    id INT PRIMARY KEY AUTO_INCREMENT DEFAULT NULL, 
    pid INT DEFAULT NULL,            #所属二级类别
    FOREIGN KEY(pid) REFERENCES qm_pro_one(id),
     two_name VARCHAR(32) DEFAULT NULL       #类别名称 
);
INSERT INTO qm_pro_two VALUES
     (01001001,01001,"隔尿裤"),
     (01001002,01001,"口水巾"),
     (01001003,01001,"婴儿棉柔巾"),
     (01001004,01001,"护脐带"),
     (01001005,01001,"安全背心"),
     
     (01002001,01002,"浴巾"),
     (01002002,01002,"面巾"),

     (01003001,01003,"枕头"),
     (01003002,01003,"包被"),
     (01003003,01003,"睡袋"),
     (01003004,01003,"抓绒毯"),
     (01003005,01003,"床笠"),
     
     (01004001,01004,"帽子"),
     (01004002,01004,"袜子"),
     (01004003,01004,"围巾"),
     (01004004,01004,"手套脚套"),
     
     (02001001,02001,"女士家居服"),
     (02001002,02001,"女士束发带"),
     (02001003,02001,"女士包包"),
     (02001004,02001,"女士毛衫"),
     (02001005,02001,"女士帽子"),

     (02002001,02002,"湿巾"),
     (02002002,02002,"化妆棉"),
     (02002003,02002,"面膜"), 

     (02003001,02003,"护理垫"),
     (02003002,02003,"一次性内裤"),
     (02003003,02003,"卫生巾"),
    
     (02004001,02004,"收腹带"),
     (02004002,02004,"待产包"),
     (02004003,02004,"孕产内衣"),
     
     (03001001,03001,"隔热手套"),
     (03001002,03001,"锅垫"),
     
     (03002001,03002,"成人纱布被"),
     (03002002,03002,"床品散件"),
     
     (03003001,03003,"酒精棉片"),
     (03003002,03003,"口罩"),
     (03003003,03003,"眼罩"),
     
     (03004001,03004,"运动巾"),
     (03004002,03004,"压缩面巾"),

     (04001001,04001,"男士内衣"),
     (04001002,04001,"男士家居服"),
     (04001003,04001,"男士鞋子"),
     (04001004,04001,"男士包包"),

     (04002001,04002,"男士一次性内裤");

/*5.商品详情页表*/
CREATE TABLE qm_details(
    lid INT PRIMARY KEY AUTO_INCREMENT default NULL,#产品编号
    family_id INT default NULL,          #所属型号家族编号
    FOREIGN KEY(family_id) REFERENCES qm_product_family(fid),               
    title VARCHAR(128) default NULL,     #主标题
    subtitle VARCHAR(128) default NULL,  #副标题
    price DECIMAL(10,2) default NULL,    #价格
    old_price DECIMAL(10,2) default NULL, #原始价格
    promise VARCHAR(128) default NULL,    #优惠信息
    spec VARCHAR(64) default NULL,       #规格/颜色
    dname VARCHAR(64) default NULL,      #商品名称    
    details VARCHAR(1024) default NULL,  #产品详细说明
    shelf_time DATE default NULL,      #上架时间
    sales INT(11) default NULL,         #已售出的数量
    stock INT(11) default NULL,          #库存
    is_onsale BOOLEAN default NULL      #是否促销中  
);
INSERT INTO qm_details VALUES
    (null,01,"婴儿针织夹涤棉多功能抱被85x45cm， 1条装","全棉针织面料，中间加厚保暖；侧身至脚口双头长拉链，方便开合，展开后可作小被子使用。","236.6","300","【限时活动】孕妈&宝妈の口碑推荐断货王7折直降
【满赠】购物满218元送10元现金券；满358元送20元店铺优惠券；满688元送50元店铺优惠券","85*45","星际闪亮蓝",null,2018-7-6,14,67,1),


(null,01,"婴儿针织夹涤棉多功能抱被85x45cm， 1条装","全棉针织面料，中间加厚保暖；侧身至脚口双头长拉链，方便开合，展开后可作小被子使用。","236.6","300","【限时活动】孕妈&宝妈の口碑推荐断货王7折直降【满赠】购物满218元送10元现金券；满358元送20元店铺优惠券；满688元送50元店铺优惠券","85*45","森林大河马",null,2018-7-6,24,56,1);

/*6.商品详情图表*/
CREATE TABLE qm_pic(
    id INT PRIMARY KEY AUTO_INCREMENT default NULL,
    product_id INT default NULL,       #产品编号
    FOREIGN KEY(product_id) REFERENCES qm_details(lid),
    sm VARCHAR(128) default NULL,      #小图片路径
    md VARCHAR(128) default NULL,      #中图片路径
    lg VARCHAR(128) default NULL      #大图片路径
);
INSERT INTO qm_pic VALUES
     (null,1,"img/details/sm/sm_blue1.jpg","img/details/md/md_blue1.jpg","img/details/lg/lg_blue1.jpg"),
     (null,1,"img/details/sm/sm_blue2.jpg","img/details/md/md_blue2.jpg","img/details/lg/lg_blue2.jpg"),
     (null,1,"img/details/sm/sm_blue3.jpg","img/details/md/md_blue3.jpg","img/details/lg/lg_blue3.jpg"),
     (null,1,"img/details/sm/sm_blue4.jpg","img/details/md/md_blue4.jpg","img/details/lg/lg_blue4.jpg"),
     (null,1,"img/details/sm/sm_blue5.jpg","img/details/md/md_blue5.jpg","img/details/lg/lg_blue5.jpg"),
     (null,2,"img/details/sm/sm_red1.jpg","img/details/md/md_red1.jpg","img/details/lg/lg_red1.jpg"),
     (null,2,"img/details/sm/sm_red2.jpg","img/details/md/md_red2.jpg","img/details/lg/lg_red2.jpg"),
     (null,2,"img/details/sm/sm_red3.jpg","img/details/md/md_red3.jpg","img/details/lg/lg_red3.jpg"),
     (null,2,"img/details/sm/sm_red4.jpg","img/details/md/md_red4.jpg","img/details/lg/lg_red4.jpg"),
     (null,2,"img/details/sm/sm_red5.jpg","img/details/md/md_red5.jpg","img/details/lg/lg_red5.jpg");

INSERT INTO qm_pic VALUES(null,3,"img/details/sm/sm_blue1.jpg","img/details/md/md_blue1.jpg","img/details/lg/lg_blue1.jpg");
INSERT INTO qm_pic VALUES(null,4,"img/details/sm/sm_blue1.jpg","img/details/md/md_blue1.jpg","img/details/lg/lg_blue1.jpg");
INSERT INTO qm_pic VALUES(null,5,"img/details/sm/sm_blue1.jpg","img/details/md/md_blue1.jpg","img/details/lg/lg_blue1.jpg");
INSERT INTO qm_pic VALUES(null,6,"img/details/sm/sm_blue1.jpg","img/details/md/md_blue1.jpg","img/details/lg/lg_blue1.jpg");
INSERT INTO qm_pic VALUES(null,7,"img/details/sm/sm_blue1.jpg","img/details/md/md_blue1.jpg","img/details/lg/lg_blue1.jpg");
INSERT INTO qm_pic VALUES(null,8,"img/details/sm/sm_blue1.jpg","img/details/md/md_blue1.jpg","img/details/lg/lg_blue1.jpg");

CREATE TABLE qm_index_pic(
    id INT PRIMARY KEY AUTO_INCREMENT default NULL,
    title VARCHAR(128) default null,
    img_url VARCHAR(128) default null,
)



