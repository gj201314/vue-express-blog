<template>
  <script :id="ele" type="text/plain" style="height:500px;"></script>
</template>

<script>
import './static/UE/ueditor.config.js'
import './static/UE/ueditor.all.min.js'
import './static/UE/lang/zh-cn/zh-cn.js'
export default {
  name:'UE',
  data(){
    return {
      editor: null
    }
  },
  props:{
    ele:{
      type:String
    },
    config:{
      type:Object
    }
  },
  mounted(){
    this.config.theme = 'default';
    this.config.themePath = '/static/UE/themes/';
    this.config.UEDITOR_HOME_URL = '/static/UE/';
    this.editor = UE.getEditor(this.ele, this.config);
    this.$emit(this.ele+'Object',this.editor);
  },
  methods:{
    getUEContent() { // 获取内容方法
      return this.editor.getContent()
    }
  }
}
</script>

<style>
.edui-default {
  line-height: initial;
}
</style>
