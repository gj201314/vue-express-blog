<template>
  <div>
    <header id="header">
      <div class="wrap">
        <div class="fl">
          <div class="logo"><router-link to="/default"><img src="/static/img/logo.png" alt="" /></router-link></div>
          <nav id="nav">
            <router-link to="/default" class="active">首页</router-link>
            <router-link to="/list">列表页</router-link>
          </nav>
        </div>
        <div class="fr">
          <ul class="user-info" v-show="u_name">
            <li>你好,<b>{{u_name}}</b></li>
            <li><span id="logout">退出</span></router-link></li>
            <li><router-link to="/default/posted">发布</router-link></li>
          </ul>
          <ul class="user-info" v-show="!u_name">
            <li><router-link to="/default/login">登录</router-link></li>
            <li><router-link to="/default/reg">注册</router-link></li>
          </ul>
        </div>
      </div>
    </header>
    <router-view></router-view>
    <footer id="footer">
      <div class="wrap">
        <p>© Company 2014</p>
      </div>
    </footer>
  </div>
</template>
<script>
export default {
  data(){
    return {
      u_name:''
    }
  },
  created(){
    let u_name = localStorage.getItem('u_name');
    if(u_name!=null){
      this.u_name = u_name;
    }
  }
}
</script>
<style>
*{
  margin:0;
  padding:0;
  cursor: default;
}
img {
  border:none;
}
html,body {
  width:100%;
  height: 100%;
}
ul,ol,li {
  list-style: none;
}
body {
  font-size:12px;
  color: #5e6d82;
  font-family: '微软雅黑';
}
.clearfix:before,
.clearfix:after {
    display: table;
    content: "";
}

.clearfix:after {
    clear: both
}
a {
  color: #333;
  text-decoration: none;
}
a:hover{
  color:#20a0ff;
}
.fl {
  float: left;
}
.fr {
  float: right;
}
.wrap {
  width: 1024px;
  margin:0 auto;
}
#header {
  background-color: rgb(32, 160, 255);
  height: 50px;
  font-size: 0;
}
#header .logo {
  display: inline-block;
}
#header .logo img {
  width: 120px;
  height: 50px;
}
#nav {
  display: inline-block;
  vertical-align: top;
  height: 50px;
  margin-left:20px;
}
#nav a {
  line-height: 50px;
  font-size: 14px;
  padding: 0 10px;
  color:#fff;
  display: inline-block;
}
#nav a.active {
  background: #2597ec;
}
ul.user-info li{
  float: left;
  line-height: 50px;
  font-size: 14px;
  padding: 0 10px;
  color:#fff;
}
ul.user-info li a {
  color:#fff;
}
ul.user-info li b {
  margin:0 10px;
}
#logout {
  cursor: pointer;
}
.content {
  width:1200px;
  margin:0 auto;
  position: relative;
}
#footer {
    height: 120px;
    background-color: #324057;
    color: #a4aebd;
    width: 100%;
    margin-top: 10px;
}
#footer p {
  height: 120px;
  line-height: 120px;
}
</style>
