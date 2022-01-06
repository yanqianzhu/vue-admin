export default [
    {
      path: 'user',
      name: 'user',
      component: r => require.ensure([], () => r(require('../components/user/list.vue')))
    },
    
]