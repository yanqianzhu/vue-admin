export default [
    {
      path: 'assets',
      name: 'assets',
      component: r => require.ensure([], () => r(require('../components/assets/list.vue')))
    },
    
]