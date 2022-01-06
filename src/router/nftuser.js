export default [
    {
      path: 'nftuserlist',
      name: 'nftuserlist',
      component: r => require.ensure([], () => r(require('../components/nftuserlist/list.vue')))
    },
    
]