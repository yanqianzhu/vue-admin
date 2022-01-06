<template>
  <div class="app-home">
    <div class="home-left">
      <div class="logImg">
        <img src="../../assets/nftmusic.png" />
        <h1 style="color: #fff">nftmusic</h1>
      </div>
      <div>
        <a-menu
          style="width: 256px"
          :default-selected-keys="['1']"
          :open-keys.sync="openKeys"
          mode="inline"
          @click="handleClick"
        >
        <a-sub-menu key="sub1" @titleClick="titleClick">
          <span slot="title"><a-icon type="mail" /><span>用户</span></span>
          <a-menu-item-group v-for="(item,index) in userlist" :key="index">
          <a-menu-item v-if="!item.childrens" :key="item.link" @click="clickmenu">
            {{ item.name }}
          </a-menu-item>
        </a-menu-item-group>
        </a-sub-menu>
        <a-sub-menu key="sub2" @titleClick="titleClick">
          <span slot="title"><a-icon type="appstore" /><span>音乐</span></span>
            <a-menu-item-group v-for="(item,index) in musiclist" :key="index">
            <a-menu-item v-if="!item.childrens" :key="item.link" @click="clickmenu">
              {{ item.name }}
            </a-menu-item>
          </a-menu-item-group>
        </a-sub-menu>
      </a-menu>
  </div>
    </div>
    <div class="home-right">
      <div class="home-right-bar">
        <a-dropdown>
          <span> {{ userInfo }} <a-icon type="down" /> </span>
          <a-menu slot="overlay">
            <a-menu-item>
              <span @click="logout">
                <a-icon type="logout" />
                退出登陆
              </span>
            </a-menu-item>
          </a-menu>
        </a-dropdown>
      </div>
      <div class="home-right-content">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      current: ['mail'],
      openKeys: ['sub1'],
      selectedKeys: ['/app/home/assets'],
      openKeys: [],
      userInfo: {},
      userlist: [
        {
          type: "products",
          name: "用户列表",
          key: "products",
          link: "/app/home/user",
        },
        {
          type: "assets",
          name: "用户资产列表",
          key: "assets",
          link: "/app/home/assets",
        },
        {
          type: "withdrawal",
          name: "用户提现列表",
          key: "withdrawal",
          link: "/app/home/withdrawal",
        },
        {
          type: "nftuserlist",
          name: "用户nft列表",
          key: "nftuserlist",
          link: "/app/home/nftuserlist",
        },
        {
          type: "offerlist",
          name: "用户出价列表",
          key: "offerlist",
          link: "/app/home/offerlist",
        },
      ],
      musiclist:[
        {
          type: "usermusiclist",
          name: "用户音乐列表",
          key: "usermusiclist",
          link: "/app/home/usermusiclist",
        },
        {
          type: "nftmusicforging",
          name: "音乐nft锻造列表",
          key: "nftmusicforging",
          link: "/app/home/nftmusicforging",
        },
        {
          type: "dailymusicdata",
          name: "每日音乐数据",
          key: "dailymusicdata",
          link: "/app/home/dailymusicdata",
        },
        {
          type: "musicdailyrevenue",
          name: "音乐每日收益",
          key: "musicdailyrevenue",
          link: "/app/home/musicdailyrevenue",
        },
        {
          type: "dailymusicsummary",
          name: "每日音乐汇总",
          key: "dailymusicsummary",
          link: "/app/home/dailymusicsummary",
        },
        {
          type: "nfttransaction",
          name: "nft交易列表",
          key: "nfttransaction",
          link: "/app/home/nfttransaction",
        }
      ]
    };
  },
  watch: {
    openKeys(val) {
      console.log('openKeys', val);
    },
  },
  mounted() {
    this.getInfor();
    this.selectedKeys = [this.$route.path]
    console.log(this.$route.path)
  },
  methods: {
    handleClick(e) {
      console.log('click', e);
    },
    titleClick(e) {
      console.log('titleClick', e);
    },
    clickmenu(e) {
        this.selectedKeys = [e.key]
        this.$router.push(e.key);
    },
    clicknftmusic(){
      this.$router.push()
    },
    clickmusiclist(e){
      this.selectedKeys = [e.key]
      this.$router.push(e.key);
    },
    getInfor() {
      this.$get("/api/v1.0/cloud/user/getUserBasic").then((res) => {
        if (res.code == 0) {
          this.userInfo = res.data.NickName;
        }
      });
    },
    logout() {
      localStorage.removeItem("token");
      this.$router.push("/");
    },
  },
};
</script>

<style lang='less' scoped>
.ant-menu-vertical .ant-menu-item, .ant-menu-vertical-left .ant-menu-item, .ant-menu-vertical-right .ant-menu-item, .ant-menu-inline .ant-menu-item, .ant-menu-vertical .ant-menu-submenu-title, .ant-menu-vertical-left .ant-menu-submenu-title, .ant-menu-vertical-right .ant-menu-submenu-title, .ant-menu-inline .ant-menu-submenu-title{
    margin-top:0 !important;
}
.ant-menu-dark{
    color:#000 !important;
    background:#fff;
}
.ant-menu-item{
    color:#000 !important;
}
.contentlist {
  margin: 24px 24px 0;
  .tablecont {
    background: #fff;
    padding: 24px;
    //   margin-bottom: 20px;
  }
  .product_fields-_roup {
    background: #fff;
    padding: 24px;
    margin-bottom: 20px;
  }
}
.standard {
  margin: -24px -24px 0;
  .title {
    height: 72px;
    background: #fff;
    line-height: 72px;
    padding-left: 24px;
    font-weight: 600;
    font-size: 20px;
    color: rgba(0, 0, 0, 0.85);
  }
}
.app-home {
  width: 100%;
  // min-width: 1080px;
  display: flex;
  .home-left {
    height: 100vh;
    width: 200px;
    overflow: auto;
    background:#fff;
    // background: #001529;
    box-shadow: rgba(0, 0, 0, 0.08) 0px 2px 16px 0px;
    > div {
      height: 47px;
    //   padding-top: 4px;
      // background: #001529;
      background: linear-gradient(270deg, #877bff 0%, #7eb6ff 100%);
      line-height: 47px;
      display: flex;
      box-sizing: border-box;
      > h1 {
        font-size: 18px;
      }
      img {
        width: 28px;
        height: 28px;
        display: flex;
        margin: 0 15px;
        position: relative;
        top: 10px;
      }
    }
  }
  .home-right {
    max-height: 100vh;
    overflow: scroll;
    flex: 1;
    .home-right-bar {
      height: 48px;
      background: linear-gradient(270deg,#7eb6ff 0%,#877bff 100%);
      border-bottom: 1px solid rgb(218, 218, 218);
      padding-right: 50px;
      display: flex;
      justify-content: flex-end;
      color: #fff;
      align-items: center;
      > a {
        color: rgba(0, 0, 0, 0.65);
        margin-right: 20px;
      }
    }
    .home-right-content {
      min-height: 800px;
      padding: 24px 24px 0;
      background: #f0f2f5;
    }
    .home-right-bottom {
      color: #9c9c9c;
      height: 69px;
      padding-top: 10px;
      background: #f0f2f5;
      font-size: 14px;
      text-align: center;
      a {
        padding-left: 22px;
        line-height: 30px;
        color: #9c9c9c;
      }
    }
  }
}
</style>