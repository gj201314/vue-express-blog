<template>
  <div class="content">
    <!-- <h2>发布文章</h2> -->
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" id="posted">
      <el-form-item label="名称" prop="name">
        <el-input type="text" auto-complete="off" v-model="ruleForm.name"></el-input>
      </el-form-item>
      <el-form-item label="分类" prop="classify">
        <el-select v-model="ruleForm.classify" placeholder="请选择分类" class="select">
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="简介" prop="introduce">
        <el-input type="textarea" v-model="ruleForm.introduce" class="textarea"></el-input>
      </el-form-item>
      <el-form-item label="标签" prop="label">
        <el-input type="text" auto-complete="off" v-model="ruleForm.label" placeholder="多个标签之间用逗号隔开"></el-input>
      </el-form-item>
      <el-form-item label="封面图片" prop="fileList">
        <el-upload
          class="upload-demo"
          action="https://jsonplaceholder.typicode.com/posts/"
          :multiple="false"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :file-list="fileList"
          list-type="picture"
          accept="image/png,image/jpg,image/jpeg"
          :auto-upload="false"
          :on-change="handleChange">
          <el-button size="small" type="primary">点击上传</el-button>
          <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb，只允许上传一张</div>
        </el-upload>
      </el-form-item>
      <el-form-item label="详情" prop="details">
        <UE :ele=Editor :config=config ref="ue" @EditorObject="setEditor"></UE>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import UE from '../../ue.vue'
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
      if(value!==this.pass){
        callback(new Error('两次输入密码不一致!'));
      }else{
        callback();
      };
    };
    return {
      ruleForm:{
        name:'',
        classify:'',
        introduce:'',
        label:'',
        details:'',
        fileList:[]
      },
      config:{
        initialFrameWidth: null,
        initialFrameHeight: 350
      },
      Editor:'Editor'+Date.parse(new Date()),  //ue内部会判断实例的id是否存在，如果存在就不会渲染了
      UE:null,
      isCover:0,
      rules:{
        name:[
          {required:true,message:'请输入文章名称',trigger:'blur'},
          {min:5,max:15,message:'文章名称长度在5-15个字之间',trigger:'blur'}
        ],
        classify:[
          {required:true,message:'请选择文章分类',trigger:'change'}
        ],
        introduce:[
          {required:true,message:'请输入文章介绍',trigger:'blur'},
          {min:50,max:200,message:'文章介绍长度在50-200个字之间',trigger:'blur'}
        ],
        label:[
          {required:true,message:'至少输入一个文章标签',trigger:'blur'}
        ]
      }
    }
  },
  components:{UE},
  methods:{
    submitForm(formName){
      this.$refs[formName].validate((valid)=>{
        if(valid){
          //ajax
        }
      })
    },
    setEditor(obj){
      this.UE = obj;
    },
    handleRemove(file, fileList){ //文件列表移除文件时的钩子file, fileList
      this.isCover = fileList.length;
    },
    handlePreview(file){ //文件上传成功,通过 file.response 拿到服务端返回数据
    },
    handleChange(file, fileList){ //文件状态改变时的钩子，添加文件、上传成功和上传失败时都会被调用
      if(file.status=="ready"){
        if(file.size>500*1024){
          fileList.pop();
        }else if(fileList.length>1){
          fileList.shift();
        };
      };
      this.isCover = fileList.length;
    }
  }
}
</script>
<style>
.textarea textarea {
  resize: none;
}
</style>
<style scoped>
.content {
  width:800px;
  /*padding-top: 100px;*/
  margin:0 auto;
}
.select {
  width: 400px;
}
.textarea {
  width: 400px;
}
.textarea textarea{
  width: 400px;
}
h2 {
  margin-top: 20px;
  margin-bottom: 10px;
  font-size:30px;
  font-weight: 500;
  text-indent: 100px;
}
#posted {
  margin-top: 20px;
}
#posted .code-input {
  width:120px;
}
#posted .code-img {
  height: 36px;
  width: auto;
  display: inline-block;
  vertical-align: middle;
}
</style>
