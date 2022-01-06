export default [
    {
      path: 'usermusiclist',
      name: 'usermusiclist',
      component: r => require.ensure([], () => r(require('../components/musiclist/usermusiclist.vue')))
    },
    
]