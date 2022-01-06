export default [
    {
      path: 'dailymusicsummary',
      name: 'dailymusicsummary',
      component: r => require.ensure([], () => r(require('../components/dailymusicsummary/list.vue')))
    },
    
]