
import App from '@/components/app/index';
// import Goods from './goods';
import Assets from './assets'
import user from './user'
import withdrawal from './withdrawal'
import usermusiclist from './usermusiclist'
import nftmusicforging from './nftmusicforging';
import dailymusicdata from './dailymusicdata';
import dailymusicsummary from './dailymusicsummary';
import musicdailyrevenue from './musicdailyrevenue';
import nftuser from './nftuser';
import offerlist from './offerlist';
import nfttransaction from './nfttransaction'
export default [
    {
      path: '/app/home',
      name: 'home',
      component: App,
      children: [
        {
          path: '/',
          name: 'overview',
          component: r => require.ensure([], () => r(require('../components/overview/index.vue')))
        },
        ...Assets,
        ...user,
        ...withdrawal,
        ...usermusiclist,
        ...dailymusicdata,
        ...dailymusicsummary,
        ...musicdailyrevenue,
        ...nftmusicforging,
        ...nftuser,
        ...offerlist,
        ...nfttransaction
      ]
  },
]