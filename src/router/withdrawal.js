export default [
    {
      path: 'withdrawal',
      name: 'withdrawal',
      component: r => require.ensure([], () => r(require('../components/withdrawal/list.vue')))
    },
    
]