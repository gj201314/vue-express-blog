<template>
  <div class="content">
    <h2>注册</h2>
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" id="reg">
      <el-form-item label="用户名" prop="name">
        <el-input type="text" auto-complete="off" v-model="ruleForm.name"></el-input>
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input type="email" auto-complete="off" v-model="ruleForm.email"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="pass">
        <el-input type="password" auto-complete="off" v-model="ruleForm.pass"></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="checkPass">
        <el-input type="password" auto-complete="off" v-model="ruleForm.checkPass"></el-input>
      </el-form-item>
      <el-form-item label="验证码" prop="code">
        <el-input type="text" class="code-input" v-model="ruleForm.code"></el-input>
        <div class="code-img" v-html="svg" @click="getSvg()"></div>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" v-loading.fullscreen.lock="fullscreenLoading" element-loading-text="正在提交" @click="submitForm('ruleForm')">提交</el-button>
        <el-button @click="resetForm('ruleForm')" >重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  data(){
    let validateEmail = (rule,value,callback) =>{
      if(!/^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/.test(value)){
        callback(new Error('请输入正确的邮箱格式'))
      }else{
        callback();
      };
    };
    let validateCheckPass = (rule,value,callback) =>{
      if(value!==this.ruleForm.pass){
        callback(new Error('两次输入密码不一致!'));
      }else{
        callback();
      };
    };
    return {
      ruleForm:{
        name:'',
        email:'',
        pass:'',
        checkPass:'',
        code:''
      },
      rules:{
        name:[
          {required:true,message:'请输入用户名',trigger:'blur'},
          {min:2,max:5,message:'用户名在2-5个字之间',trigger:'blur'}
        ],
        email:[
          {required:true,message:'请输入邮箱',trigger:'blur'},
          {validator:validateEmail,trigger:'blur'}
        ],
        pass:[
          {required:true,message:'请输入密码',trigger:'blur'}
        ],
        checkPass:[
          {required:true,message:'请输入确认密码',trigger:'blur'},
          {validator:validateCheckPass,trigger:'blur'}
        ],
        code:[
          {required:true,message:'请输入图形验证码',trigger:'blur'}
        ]
      },
      svg:null,
      fullscreenLoading:false
    }
  },
  mounted(){
    this.getSvg();
  },
  methods:{
    submitForm(formName){
      this.$refs[formName].validate((valid)=>{
        if(valid){
          this.fullscreenLoading = true;
          this.$ajax.post('/reg',this.ruleForm).then((res)=>{
            let data = res.data;
            this.fullscreenLoading = false;
            if(data.code){
              this.$message({
                message: data.msg,
                type: 'success'
              });
              /*储存token*/
              localStorage.setItem('t',data.data.t);
              /*储存用户名称*/
              localStorage.setItem('u_name',this.ruleForm.name);
              setTimeout(()=>{
                //跳转页面
                this.$router.push({path:'/default'});
              },1500);
            }else{
              this.$message({
                message: data.msg,
                type: 'error'
              });
              this.getSvg();
            };
          }).catch((err)=>{

          })
        }
      })
    },
    resetForm(formName){
      this.$refs[formName].resetFields();
    },
    getSvg(){
      let _this = this;
      this.$ajax({
        method:'get',
        url:'/captcha',
      }).then((res)=>{
        this.svg=res.data;
      }).catch((err)=>{

      });
    }
  }
}
</script>
<style scoped>
.content {
  width:500px;
  padding-top: 100px;
  height: 680px;
  margin:0 auto;
}
h2 {
  margin-top: 20px;
  margin-bottom: 10px;
  font-size:30px;
  font-weight: 500;
  text-indent: 100px;
}
#reg {
  margin-top: 20px;
}
#reg .code-input {
  width:120px;
}
#reg .code-img {
  height: 36px;
  width: auto;
  display: inline-block;
  vertical-align: middle;
}
</style>
