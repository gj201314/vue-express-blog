import svgCaptcha from 'svg-captcha'
import crypto from 'crypto'
import user from './models/user'
/*使用jwt-simple去处理token*/
import jwt from 'jwt-simple'
/*使用moment来设置token的失效时间*/
import moment from 'moment'

/*获取并验证token*/
function getToken(req){
  let token = (req.body && req.body.access_token) || 
  (req.query && req.query.access_token) || req.headers['x-access-token'];
  if (token) {
    try {
      var decoded = jwt.decode(token, app.get('jwtTokenSecret'));
      if (decoded.exp <= Date.now()) {
        return {
          code:0,
          msg:'token过期'
        };
      }else{
        return {
          code:1,
          data:decoded.iss,
          msg:'token正确'
        };
      }
    } catch (err) {
      return {
        code:0,
        msg:'token异常'
      };
    }
  } else {
    return {
      code:0,
      msg:'token不存在'
    };
  }
};
/*
 *自增id
 *db-数据表
 *name-自增的数据名
*/
function getNextSequence(db,name){
  let ret = db.counters.findAndModify({
    query: {name:'name'},
    update: {$inc:{seq:1}},
    new: true
  });
  return ret.seq;
};
export default (app)=>{
  /*设置jwtTokenSecret变量*/
  app.set('jwtTokenSecret', 'Fat_times');//Fat_times秘密字符串
  /*设置token失效日期*/
  let expires = moment().add(1,'hour').valueOf(); //month-月,week-周,days-天,hour-小时,minute-分钟
	//首页
	app.get('/', (req, res, next)=>{
    console.log(req.session.user)
	  res.render('index', { title: 'blog'});
	});
  //注册
  app.post('/reg',(req,res,next)=>{
    let reqData = req.body;
    let resData = {
        code:0,
        data:[],
        msg:null
    };
    //获取客户端ip
    let ip = req.headers['x-forwarded-for'] ||
        req.ip ||
        req.connection.remoteAddress ||
        req.socket.remoteAddress ||
        req.connection.socket.remoteAddress || '';
    if(ip.split(',').length>0){
        ip = ip.split(',')[0]
    };
    if(reqData.name.length<2 || reqData.name.length>5) {
      resData.msg = '用户名在2-5个字之间'
      return res.json(resData);
    };
    //检验用户两次输入的密码是否一致
    if(reqData.checkPass!=reqData.pass){
      resData.msg = '两次输入的密码不一致!'
      return res.json(resData);
    };
    //判断图形验证码是否一致 toLowerCase:大写转换成小写
    if(reqData.code.toLowerCase()!=req.session['randomcode']){
      resData.msg = '图形验证码错误!'
      return res.json(resData);
    };
    //生成密码的 md5 值
    let md5 = crypto.createHash('md5');
    reqData.pass = md5.update(reqData.pass).digest('hex');
    let newUser = new user({
      name:reqData.name,
      pass:reqData.pass,
      email:reqData.email,
      ip:ip
    });
    //检查邮箱是否已经存在
    newUser.Get({email:newUser.email},(err,user)=>{
      if(err){
        resData.msg = err;
        return res.json(resData);
      };
      if(user){
        resData.msg = '邮箱已经被注册';
        return res.json(resData);
      };
      //如果不存在则新增用户
      newUser.Save((err,user)=>{
        if(err){
          resData.msg = err;
          return res.json(resData);
        };
        let token = jwt.encode({
          iss: user.insertedIds[0], //用户的objectId
          exp: expires
        }, app.get('jwtTokenSecret'));
        return res.json({
          code:1,
          msg:'注册成功',
          data:{
            t:token
          }
        });
      });
    });
  });
  //登录
  app.post('/login',(req,res,next)=>{
    // let md5 = crypto
  });
  //图形验证码
  app.get('/captcha', (req,res,next)=>{
    let captcha = svgCaptcha.create({
      // 翻转颜色  
        inverse: false,  
        // 字体大小  
        fontSize: 36,  
        // 噪声线条数  
        noise: 3,  
        // 宽度  
        width: 80,  
        // 高度  
        height: 30
    });
    req.session["randomcode"] = captcha.text.toLowerCase();
    res.send(captcha.data);
  });
};