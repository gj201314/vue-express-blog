import Default from './default/components/template.vue'
export default {
  routes: [
    { 
      name: '前台',
      path: '/default', 
      component: Default
    },
    { 
      name: '前台',
      path: '/', 
      component: Default
    }
  ]
}