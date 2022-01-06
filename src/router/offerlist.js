export default [
    {
      path: 'offerlist',
      name: 'offerlist',
      component: r => require.ensure([], () => r(require('../components/offerlist/list.vue')))
    },
    
]