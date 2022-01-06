export default [
    {
      path: 'musicdailyrevenue',
      name: 'musicdailyrevenue',
      component: r => require.ensure([], () => r(require('../components/musicdailyrevenue/list.vue')))
    },
    
]