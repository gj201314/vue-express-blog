<template>
  <div class="content">
    <h2>登录</h2>
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" id="reg">
      <el-form-item label="用户名" prop="name">
        <el-input type="text" auto-complete="off" v-model="ruleForm.name"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="pass">
        <el-input type="password" auto-complete="off" v-model="ruleForm.pass"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  data(){
    return {
      ruleForm:{
        name:'',
        pass:''
      },
      rules:{
        name:[
          {required:true,message:'请输入用户名',trigger:'blur'},
          {min:3,max:5,message:'用户名长度在3-5个',trigger:'blur'}
        ],
        pass:[
          {required:true,message:'请输入密码',trigger:'blur'}
        ]
      }
    }
  },
  methods:{
    submitForm(formName){
      this.$refs[formName].validate((valid)=>{
        if(valid){
          //ajax
        }
      })
    }
  }
}
</script>
<style scoped>
.content {
  width:360px;
  margin:0 auto;
  padding-top: 180px;
  height: 600px;
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
