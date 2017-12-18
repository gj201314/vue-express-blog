import mongodb from './db'
class User {
  constructor(user){
    this.name=user.name;
    this.pass=user.pass;
    this.email=user.email;
    this.ip=user.ip;
  }
  Save(callback){
    //要存入数据库的用户文档
    let user = {
        name: this.name,
        password: this.pass,
        email: this.email,
        ip:this.ip,
        create_time:new Date().getTime(),
        update_time:new Date().getTime()
    };
    //打开数据库
    mongodb.open((err,db)=>{
      if(err){
        mongodb.close();
        return callback(err); //错误，返回信息
      };
      //读取 users 集合
      db.collection('users',(err,collection)=>{
        if(err){
          mongodb.close();
          return callback(err); //错误，返回信息
        };
        //将用户数据插入 users 集合
        collection.insert(user,{
          safe:true
        },(err,user)=>{
          mongodb.close();
          if(err){
            return callback(err);
          };
          callback(null,user);
        })
      })
    });
  }
  Get(data,callback){
    //打开数据库
    mongodb.open((err,db)=>{
      if(err){
        mongodb.close();
        return callback(err); //错误，返回信息
      };
      //读取 users 集合
      db.collection('users',(err,collection)=>{
        if(err){
          mongodb.close();
          return callback(err); //错误，返回信息
        };
        //查寻是否存在这条数据 类型：object
        collection.findOne(data,(err,user)=>{
          mongodb.close();
          if(err){
            return callback(err);
          };
          callback(null,user);
        })
      })
    });
  }
};

export default User;