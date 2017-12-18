import ueditor from 'ueditor'
export default (app,path)=>{
	// /ueditor 入口地址配置 https://github.com/netpi/ueditor/blob/master/example/public/ueditor/ueditor.config.js
  // 官方例子是这样的 serverUrl: URL + "php/controller.php"
  // 我们要把它改成 serverUrl: URL + 'ue'
  app.use('/ueditor/ue',ueditor(path.join(__dirname,'public'),(req,res,next)=>{
      let imgDir = '/img/ueditor/'; //默认上传地址为图片
      let ActionType = req.query.action;
      console.log(req.query);
      if (ActionType === 'uploadimage' || ActionType === 'uploadfile' || ActionType === 'uploadvideo') {
        var file_url = imgDir;//默认上传地址为图片
        /*其他上传格式的地址*/
        if (ActionType === 'uploadfile') {
            file_url = '/file/ueditor/'; //附件保存地址
        }
        if (ActionType === 'uploadvideo') {
            file_url = '/video/ueditor/'; //视频保存地址
        }
        res.ue_up(file_url); //你只要输入要保存的地址 。保存操作交给ueditor来做
        res.setHeader('Content-Type', 'text/html');
      }else if(ActionType === 'listimage'){ //客户端发起图片列表请求
        res.ue_list(imgDir); //
      }else{  //客户端发起其它请求
        res.setHeader('Content-Type', 'application/json');
        res.redirect('/ueditor/ueditor.config.json')
      };
  }))
};