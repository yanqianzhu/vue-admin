export default [
    {
      path: 'nfttransaction',
      name: 'nfttransaction',
      component: r => require.ensure([], () => r(require('../components/nfttransaction/list.vue')))
    },
    
]