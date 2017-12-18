/* 前台 */
import Default from './default/Default.vue'
import DefaultIndex from './default/components/index.vue'
import DefaultReg from './default/components/reg.vue'
import DefaultLogin from './default/components/login.vue'
import DefaultPosted from './default/components/posted.vue'
/* 后台 */
import Admin from './admin/Admin.vue'
import AdminIndex from './admin/components/index.vue'
export default {
  routes: [
    {
      path: '/',
      redirect: '/default'
    },
    {
      path: '/default',
      component: Default,
      children:[
        {
          path:'',
          meta:{
            title:'首页'
          },
          component:DefaultIndex
        },
        {
          path:'reg',
          meta:{
            title:'注册'
          },
          component:DefaultReg
        },
        {
          path:'login',
          meta:{
            title:'登录'
          },
          component:DefaultLogin
        },
        {
          path:'posted',
          meta:{
            title:'发布文章'
          },
          component:DefaultPosted
        }
      ]
    },
    {
      path: '/admin',
      component:Admin,
      children:[
        {
          path:'index',
          component:AdminIndex
        }
      ]
    }
  ]
}