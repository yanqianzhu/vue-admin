export default [
    {
      path: 'nftmusicforging',
      name: 'nftmusicforging',
      component: r => require.ensure([], () => r(require('../components/musiclist/nftmusicforging.vue')))
    },
    
]