import express from 'express'
import path from 'path'
import favicon from 'serve-favicon'
import logger from 'morgan'
import cookieParser from 'cookie-parser'
import session from 'express-session'
import connectMongo from 'connect-mongo'
import bodyParser from 'body-parser'

import webpack from 'webpack'
import webpackDevMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'

import router from './router'
import settings from './settings'
import config from '../../webpack.config'

/*ueditor上传配置*/
import ueditor from './ueditor'


const app = express()
let MongoStore = connectMongo(session);

// view engine setup
app.set('port', process.env.PORT || 9393);
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))
app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())
//配置session,并和数据库关联
app.use(session({
  resave:true,
  saveUninitialized:false,
  secret: settings.cookieSecret,
  key: settings.db,//cookie name
  cookie: {maxAge: 1000 * 60 * 60 * 24 * 30},//30 days
  store: new MongoStore({
    db: settings.db,
    url:'mongodb://'+settings.host+':'+settings.port+'/'+settings.db
  })
}));
// 设置public文件夹为存放静态文件的目录
app.use(express.static(path.join(__dirname, 'public')))
// 设置前端静态资源目录
app.use('/static',express.static('src/client/static'))

const compiler = webpack(config)

app.use(webpackDevMiddleware(compiler, {
  publicPath: config.output.publicPath,
  stats: { colors: true }
}))

app.use(webpackHotMiddleware(compiler))

ueditor(app,path);
router(app);

app.listen(app.get('port'),'0.0.0.0', function() {
  console.log('Express server listening on port ' + app.get('port'));
});

export default app