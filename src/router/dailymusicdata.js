export default [
    {
      path: 'dailymusicdata',
      name: 'dailymusicdata',
      component: r => require.ensure([], () => r(require('../components/dailymusicdata/list.vue')))
    },
    
]